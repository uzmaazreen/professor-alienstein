"""Step 5: build the final YouTube description (chapters from scene start times + sources + disclosure)."""
import json, os
from common import WORK


def stamp(sec):
    sec = int(sec)
    h, m, s = sec // 3600, (sec % 3600) // 60, sec % 60
    return f"{h}:{m:02d}:{s:02d}" if h else f"{m}:{s:02d}"


def main():
    scenes = json.load(open("my-video/public/scenes.json", encoding="utf-8"))["scenes"]
    meta = json.load(open(f"{WORK}/meta.json", encoding="utf-8"))
    topic = json.load(open(f"{WORK}/topic.json", encoding="utf-8"))
    chapters, t = [], 0.0
    last_start = -100
    for i, s in enumerate(scenes):
        if i == 0 or t - last_start >= 15:
            chapters.append((t, (s.get("big") or f"Part {i + 1}").title()))
            last_start = t
        t += s["duration"]
    if len(chapters) < 3:
        chapters = [(0, "Intro")]
        t = 0.0
        for i, s in enumerate(scenes):
            if i in (len(scenes) // 3, 2 * len(scenes) // 3) and i > 0:
                chapters.append((t, (s.get("big") or f"Part {i + 1}").title()))
            t += s["duration"]
    lines = [meta.get("intro", "").strip(), "", "In this video:"]
    lines += [f"{stamp(c[0])} {c[1]}" for c in chapters]
    lines += ["", "Sources:", f"{topic['source']}: {topic['link']}", "",
              "About this video: the voice is an AI voice trained on the creator's own voice, and the pictures are computer-made animation. Facts are taken from the source above.",
              "", "#science #explained #ProfessorAlienstein"]
    desc = "\n".join(lines)
    open(f"{WORK}/description.txt", "w", encoding="utf-8").write(desc)
    print(desc)


if __name__ == "__main__":
    main()
