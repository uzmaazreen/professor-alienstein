"""Step 3: ask Gemini for title, description intro, tags, thumbnail plan and a first comment."""
import json, os, re, sys
from common import load_state, ensure_work, WORK, call_gemini, ICONS

TAG_RE = re.compile(r"\[(\w+)(?::([^\]]*))?\]")


def loose_json(raw):
    """Read JSON even when the model wraps it in text or cuts it short."""
    raw = raw.strip()
    raw = re.sub(r"^```(?:json)?|```$", "", raw, flags=re.M).strip()
    try:
        return json.loads(raw)
    except Exception:
        pass
    a, b = raw.find("{"), raw.rfind("}")
    if a != -1 and b > a:
        try:
            return json.loads(raw[a:b + 1])
        except Exception:
            pass
    return None


def fallback_meta(topic):
    words = re.sub(r"[^A-Za-z0-9 ]", "", topic["title"]).split()
    return {
        "title": topic["title"][:90],
        "intro": "Professor Alienstein explains this real science story in very simple words.",
        "tags": [w.lower() for w in words if len(w) > 3][:12] + ["science", "explained"],
        "comment": "Which science story should Professor Alienstein explain next?",
        "thumb": {"style": "B", "line1": " ".join(words[:2]).upper(), "line2": "EXPLAINED", "sub": "Real science, simply", "icon": "question", "number": "", "mood": "shock"},
    }


def main():
    ensure_work()
    key = os.environ.get("GEMINI_API_KEY", "")
    topic = json.load(open(f"{WORK}/topic.json", encoding="utf-8"))
    script = open(f"{WORK}/script_scenes.txt", encoding="utf-8").read()
    spoken = " ".join(TAG_RE.sub("", ln) for ln in script.splitlines() if not ln.startswith("#"))
    last_style = load_state().get("last_style", "")
    prompt = f"""You are the YouTube manager of the channel "Professor Alienstein" (an alien professor explaining real science news in simple English).
Based ONLY on the script below, return ONE JSON object with these keys:
"title": honest, curious, max 70 characters, no ALL CAPS sentences, no lies, no fake urgency.
"intro": 2 or 3 friendly sentences for the top of the description (what the viewer will learn).
"tags": 12 short search tags (strings).
"comment": one friendly question for viewers to answer in the comments.
"thumb": an object with:
   "style": one of "A" (dramatic event, something happened/fell/broke), "B" (a why/what-happened explainer or mystery), "C" (a striking number is the hook). Avoid "{last_style}" if another style fits.
   "line1": 1 to 2 BIG words in CAPITALS (max 10 letters each)
   "line2": 1 to 2 BIG words in CAPITALS that are true to the story (max 10 letters each)
   "sub": a small honest line (max 28 characters)
   "icon": one of {", ".join(ICONS)}
   "number": a number that really appears in the script, as digits, or "" if none
   "mood": one of "shock", "think", "happy", "laugh"
Thumbnail words must be TRUE to the video. No clickbait that the video does not deliver.

SCRIPT:
{spoken[:6000]}
"""
    meta = None
    for attempt in range(3):
        try:
            raw = call_gemini(prompt, key, json_mode=True, temperature=0.6, max_tokens=8192)
            meta = loose_json(raw)
        except Exception as e:
            print("Gemini problem:", e)
            meta = None
        if isinstance(meta, dict) and meta.get("title"):
            break
        print(f"metadata attempt {attempt + 1} was not usable, trying again")
        meta = None
    if meta is None:
        print("Using simple fallback title and description")
        meta = fallback_meta(topic)
    meta["title"] = str(meta.get("title", topic["title"]))[:95]
    meta["tags"] = [str(t)[:30] for t in meta.get("tags", [])][:15]
    th = meta.get("thumb", {}) or {}
    if th.get("style") not in ("A", "B", "C"):
        th["style"] = "B"
    if th.get("icon") not in ICONS:
        th["icon"] = "question"
    meta["thumb"] = th
    json.dump(meta, open(f"{WORK}/meta.json", "w", encoding="utf-8"), ensure_ascii=False, indent=2)
    pm = re.search(r"^#\s*palette:\s*(\w+)", script, re.M | re.I)
    palette = pm.group(1).lower() if pm and pm.group(1).lower() in ("sunrise", "ocean", "grape", "forest") else "sunrise"
    clean = lambda t, n: re.sub(r"[^A-Za-z0-9 '!?.,-]", "", str(t or "")).upper()[:n].strip()
    thumb = {
        "style": th["style"],
        "line1": clean(th.get("line1"), 14),
        "line2": clean(th.get("line2"), 14),
        "sub": clean(th.get("sub"), 28),
        "icon": th["icon"],
        "number": re.sub(r"[^0-9.,%x]", "", str(th.get("number") or ""))[:5],
        "mood": th.get("mood") if th.get("mood") in ("shock", "think", "happy", "laugh") else "shock",
        "palette": palette,
    }
    json.dump(thumb, open(f"{WORK}/thumb.json", "w", encoding="utf-8"), indent=2)
    print("TITLE:", meta["title"], "| thumbnail style:", th["style"])


if __name__ == "__main__":
    main()
