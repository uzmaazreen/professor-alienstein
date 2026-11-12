"""Pick today's Short topic from the library, using what is trending / people are curious about.
Writes shorts/work/topic.json and shorts/work/meta.json (title, tags) and description.txt
Usage: python shorts/pick_short_topic.py [forced_topic_id]"""
import json, os, re, sys, random, datetime, xml.etree.ElementTree as ET
import requests
from common_shorts import *

FEEDS = ["https://trends.google.com/trending/rss?geo=US", "https://trends.google.com/trending/rss?geo=IN", "https://trends.google.com/trending/rss?geo=GB"]


def trending():
    words = []
    for url in FEEDS:
        try:
            r = requests.get(url, timeout=30, headers={"User-Agent": "Mozilla/5.0"})
            r.raise_for_status()
            root = ET.fromstring(r.content)
            for item in root.iter("item"):
                t = item.findtext("title")
                if t:
                    words.append(t.strip())
                for el in item:
                    if el.tag.endswith("news_item_title") and el.text:
                        words.append(el.text.strip())
        except Exception as e:
            print("trend feed skipped:", url, e)
    seen, out = set(), []
    for w in words:
        if w.lower() not in seen:
            seen.add(w.lower()); out.append(w)
    return out[:60]


def choose(lib, state, forced=None):
    if forced:
        return forced, "forced by you"
    used = [u["id"] for u in state["used"]]
    recent = set(used[-max(1, len(lib) - 3):])          # do not repeat until almost every topic was used
    cand = [t for t in lib.values() if t["id"] not in recent] or list(lib.values())
    if len(cand) == 1:
        return cand[0]["id"], "only one topic left"
    trends = trending()
    print("Trending items:", len(trends))
    key = os.environ.get("GEMINI_API_KEY")
    if trends and key:
        try:
            from common import call_gemini
            menu = "\n".join(f'- {t["id"]}: {t["title"]} (keywords: {", ".join(t["keywords"])})' for t in cand)
            prompt = ("You choose today's science explainer Short for a kids-friendly, advertiser-friendly YouTube channel.\n"
                      "Here is what people are searching / reading about today:\n" + "\n".join(trends) +
                      "\n\nHere are the topics we have ready:\n" + menu +
                      "\n\nPick the ONE topic that best connects to something people are curious about today (even loosely: season, news, habit, tech). "
                      "Never pick a topic only because of politics, war, crime, health scares or celebrities. If nothing connects, pick the one that is most generally interesting. "
                      'Answer ONLY JSON: {"id":"<topic id>","reason":"<10 words>"}')
            ans = call_gemini(prompt, key, json_mode=True, temperature=0.4, max_tokens=2048)
            j = json.loads(ans)
            if j.get("id") in lib and j["id"] in {c["id"] for c in cand}:
                return j["id"], j.get("reason", "trending match")
        except Exception as e:
            print("Gemini choice failed, picking by rotation:", e)
    return random.choice(cand)["id"], "rotation (no trend match)"


def main():
    lib = load_topics()
    if not lib:
        raise SystemExit("No topics in shorts/topics")
    forced = sys.argv[1] if len(sys.argv) > 1 and sys.argv[1] in lib else None
    tid, why = choose(lib, load_state(), forced)
    t = lib[tid]
    print(f"TOPIC: {tid} ({why})")
    os.makedirs(WORK, exist_ok=True)
    json.dump(dict(t, why=why), open(os.path.join(WORK, "topic.json"), "w", encoding="utf-8"), indent=2, ensure_ascii=False)
    title = (t.get("short_title") or t["title"])[:88] + " #shorts"
    tags = t.get("tags", []) + ["shorts", "science", "Professor Alienstein"]
    meta = {"title": title, "tags": tags, "comment": t.get("comment", "")}
    json.dump(meta, open(os.path.join(WORK, "meta.json"), "w", encoding="utf-8"), indent=2, ensure_ascii=False)
    desc = (t["description"] + "\n\nNew simple science every day with Professor Alienstein.\n\n"
            "About this video: the voice is an AI voice trained on the creator's own voice, and the pictures are computer-made animation.\n\n"
            "#shorts #science #explained #ProfessorAlienstein")
    open(os.path.join(WORK, "description.txt"), "w", encoding="utf-8").write(desc)
    gh = os.environ.get("GITHUB_OUTPUT")
    if gh:
        open(gh, "a").write(f"topic_id={tid}\n")


if __name__ == "__main__":
    main()
