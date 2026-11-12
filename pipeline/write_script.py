"""Step 2: ask Gemini (free) to write the Professor Alienstein script from the real article."""
import json, os, re, sys
from common import (load_state, ensure_work, WORK, call_gemini, ICONS, MOODS, SFX, CUE_TYPES)

MINUTES = float(os.environ.get("MINUTES", "3"))
WORDS_PER_MIN = 150
TARGET = int(MINUTES * WORDS_PER_MIN)

SYSTEM = f"""You write scripts for the YouTube channel "Professor Alienstein": a friendly, funny, curious ALIEN professor who explains real science news to humans in very simple English. The audience is worldwide, from teenagers to adults. No jargon. Short sentences. Warm humour (the alien is amazed by human things). Never boring.

ABSOLUTE RULES
- Use ONLY facts that appear in the SOURCE TEXT below. Never invent numbers, names, dates, quotes or causes. If the source does not say it, do not say it.
- No medical, health, financial or legal advice. No politics. No scary or graphic content.
- Write numbers as WORDS in the spoken text (twenty-two, not 22) because a voice will read it. Digits are allowed ONLY inside the [tags].
- No emojis, no markdown, no brackets except the tags below, no parentheses, no stage directions.
- The spoken text must sound natural when read aloud.

FORMAT (follow exactly)
Start with one line:  # palette: sunrise   (choose one of: sunrise, ocean, grape, forest)
Then many scenes. Each scene is:
## mood | SHORT TITLE | sfx
spoken lines...
- mood is one of: {", ".join(MOODS)}
- SHORT TITLE is 2 to 5 words in CAPITAL LETTERS (shown on screen as a chapter label)
- sfx is one of: {", ".join(SFX)}
- each scene has 25 to 60 spoken words.

VISUAL TAGS (placed inside the spoken text, right BEFORE the words they illustrate; they are not spoken)
[strip:space]                      only for space topics: a torn paper strip with a satellite and Earth
[date:NOV 4|2026]                  big date or big short word, with an optional small second line
[icon:NAME|Label]                  a drawn picture card. NAME must be one of: {", ".join(ICONS)}. Label is 1 to 4 words.
[count:22|years|in space]          a counting number: number|unit|short label (digits only for the number)
[bars:Planned=2;Actual=22|Years of work]   2 to 4 bars: Name=number;Name=number|title (numbers must come from the source)
[flow:Step one>Step two>Step three]        3 to 5 short steps showing cause and effect
[compare:Left title=short text|Right title=short text]
[word:BIG PHRASE]                  a big headline word or phrase (max 4 words)
[note:22|years!]                   a sticky note: big text|small text
[board:How it works|sun:Sunlight,cloud:Air,eye:Your eyes]   a whiteboard where a hand draws 1 to 3 pictures one after another with arrows. Format: Title|icon:Label,icon:Label. Use it once or twice per video to explain a process.
[circle]                           a red marker circle drawn around the previous picture card or bars card
Use 1 to 3 tags per scene, roughly one tag every 12 to 25 spoken words. Mix many different tag types across the video. Do not use the same icon twice in a row.

STORY SHAPE
1. Hook in the first scene: a surprising fact or question, and the alien introducing himself in ONE short sentence ("Hey everyone, Professor Alienstein here!").
2. Explain step by step with small surprises and open questions ("But here's the twist...").
3. Include ONE clearly marked simple analogy.
4. End with a quick recap and a soft call to action: ask viewers to comment which topic to explain next. Do not beg for likes.
"""


def build_prompt(topic, extra=""):
    return (
        SYSTEM
        + f"\nLENGTH: about {TARGET} spoken words in total (this is a {MINUTES:g} minute video). Count only spoken words, not tags.\n"
        + extra
        + f"\nSOURCE TITLE: {topic['title']}\nSOURCE NAME: {topic['source']}\nSOURCE TEXT:\n{topic['text']}\n\n"
        + "Now write the complete script. Output ONLY the script in the format above, nothing else."
    )


TAG_RE = re.compile(r"\[(\w+)(?::([^\]]*))?\]")


def clean_tag(m):
    kind = m.group(1).lower()
    arg = (m.group(2) or "").strip()
    ok = False
    if kind == "strip":
        ok = arg.lower() == "space"
        arg = "space"
    elif kind == "date":
        ok = 0 < len(arg.split("|")[0].strip()) <= 14
    elif kind == "icon":
        name = arg.split("|")[0].strip().lower()
        ok = name in ICONS
        if ok:
            label = arg.split("|", 1)[1].strip() if "|" in arg else ""
            arg = name + ("|" + label[:28] if label else "")
    elif kind == "count":
        parts = arg.split("|")
        try:
            float(parts[0].strip())
            ok = True
        except ValueError:
            ok = False
    elif kind == "bars":
        rows = arg.split("|")[0].split(";")
        good = 0
        for r in rows:
            if "=" in r:
                try:
                    float(r.split("=")[1])
                    good += 1
                except ValueError:
                    pass
        ok = 2 <= good <= 4 and good == len(rows)
    elif kind == "flow":
        ok = 3 <= len([x for x in arg.split(">") if x.strip()]) <= 5
    elif kind == "compare":
        ok = len(arg.split("|")) == 2 and all("=" in s for s in arg.split("|"))
    elif kind == "word":
        ok = 0 < len(arg) <= 30
    elif kind == "note":
        ok = len(arg) > 0
    elif kind == "board":
        parts = arg.split("|", 1)
        title = parts[0].strip()
        items = []
        if len(parts) == 2:
            for it in parts[1].split(","):
                nm, _, lab = it.partition(":")
                nm = nm.strip().lower()
                if nm in ICONS:
                    items.append(nm + (":" + lab.strip()[:18] if lab.strip() else ""))
        ok = 0 < len(title) <= 32 and 1 <= len(items) <= 3
        if ok:
            arg = title + "|" + ",".join(items[:3])
    elif kind == "circle":
        ok = True
        arg = ""
    if not ok:
        return ""
    return f"[{kind}:{arg}]" if arg else f"[{kind}]"


def sanitize(script):
    script = script.replace("```", "").strip()
    script = TAG_RE.sub(clean_tag, script)
    lines = []
    for ln in script.splitlines():
        ln = ln.rstrip()
        if ln.startswith("##"):
            parts = [p.strip() for p in ln[2:].split("|")]
            mood = parts[0].lower() if parts and parts[0].lower() in MOODS else "happy"
            title = (parts[1] if len(parts) > 1 else "").upper()[:40]
            sfx = parts[2].lower() if len(parts) > 2 and parts[2].lower() in SFX else "none"
            ln = f"## {mood} | {title} | {sfx}"
        ln = ln.replace("*", "").replace("_", " ") if not ln.startswith("#") else ln
        lines.append(ln)
    return "\n".join(lines)


def spoken_words(script):
    n = 0
    for ln in script.splitlines():
        if ln.startswith("#"):
            continue
        n += len(TAG_RE.sub("", ln).split())
    return n


def check(script):
    problems = []
    if script.count("## ") < max(4, int(MINUTES * 1.2)):
        problems.append("too few scenes")
    w = spoken_words(script)
    if w < TARGET * 0.7:
        problems.append(f"too short: {w} words, need about {TARGET}")
    if w > TARGET * 1.4:
        problems.append(f"too long: {w} words, need about {TARGET}")
    if re.search(r"\d", "\n".join(TAG_RE.sub("", ln) for ln in script.splitlines() if not ln.startswith("#"))):
        problems.append("digits found in spoken text; write numbers as words")
    return problems


def main():
    ensure_work()
    key = os.environ.get("GEMINI_API_KEY", "")
    if not key:
        print("GEMINI_API_KEY is missing")
        sys.exit(1)
    topic = json.load(open(f"{WORK}/topic.json", encoding="utf-8"))
    extra = ""
    best = ""
    for attempt in range(3):
        text = call_gemini(build_prompt(topic, extra), key, temperature=0.8, max_tokens=16384)
        script = sanitize(text)
        problems = check(script)
        print(f"attempt {attempt + 1}: {spoken_words(script)} words, problems: {problems or 'none'}")
        if not best or len(problems) <= len(check(best)):
            best = script
        if not problems:
            break
        extra = "\nFIX THESE PROBLEMS FROM YOUR LAST TRY: " + "; ".join(problems) + "\n"
    if check(best) and spoken_words(best) < TARGET * 0.5:
        print("Script is far too short even after retries")
        sys.exit(1)
    open(f"{WORK}/script_scenes.txt", "w", encoding="utf-8").write(best + "\n")
    print("Script saved:", spoken_words(best), "spoken words")


if __name__ == "__main__":
    main()
