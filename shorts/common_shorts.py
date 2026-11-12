"""Shared helpers for the daily Shorts."""
import json, os, glob, sys, datetime

SHORTS = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(SHORTS)
TOPICS = os.path.join(SHORTS, "topics")
WORK = os.path.join(SHORTS, "work")
OUT = os.path.join(SHORTS, "out")
STATE = os.path.join(SHORTS, "state_shorts.json")
FPS = 30
PAD = 0.35  # silence after each scene (seconds)
OUTRO = {"mood": "laugh", "text": "Follow for more simple science!"}
sys.path.insert(0, os.path.join(ROOT, "pipeline"))  # reuse the Gemini helper from the long-video pipeline


def load_topics():
    out = {}
    for p in sorted(glob.glob(os.path.join(TOPICS, "*.json"))):
        t = json.load(open(p, encoding="utf-8"))
        out[t["id"]] = t
    return out


def load_state():
    if os.path.exists(STATE):
        try:
            return json.load(open(STATE, encoding="utf-8"))
        except Exception:
            pass
    return {"used": []}


def save_state(st):
    json.dump(st, open(STATE, "w", encoding="utf-8"), ensure_ascii=False, indent=2)


def scenes_with_outro(topic):
    return list(topic["scenes"]) + [OUTRO]


def default_durations(scenes):
    """Rough scene lengths from word count (only used for previews without a real voice)."""
    return [round(max(2.5, len(s["text"].split()) / 2.6 + PAD + 0.4), 2) for s in scenes]


def write_timings(scenes, durations, env=None):
    t, out = 0.0, []
    for sc, d in zip(scenes, durations):
        out.append({"text": sc["text"], "mood": sc.get("mood", "happy"), "s": round(t, 3), "e": round(t + d, 3)})
        t += d
    data = {"scenes": out, "duration": round(t + 0.6, 3)}
    if env is not None:
        data["env"] = [round(float(x), 3) for x in env]
    os.makedirs(WORK, exist_ok=True)
    with open(os.path.join(WORK, "timings.js"), "w", encoding="utf-8") as f:
        f.write("window.TIMINGS=" + json.dumps(data) + ";")
    json.dump(data, open(os.path.join(WORK, "timings.json"), "w"))
    return data
