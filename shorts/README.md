# Daily Shorts (2D cutaway explainers)

- `topics/<id>.json` = narration + title/tags/keywords of a topic. `topics/<id>.js` = its drawing + animation.
- `pick_short_topic.py` picks a topic using today's trends (Gemini), `speak_short.py` makes the voice (your cloned voice),
  `render_short.py` draws the frames and builds the video, workflow: `.github/workflows/daily-short.yml`.
- To add a topic: add `<id>.json` and `<id>.js` in `topics/` (copy `fridge.*`).
