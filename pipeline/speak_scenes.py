"""
Professor Alienstein - scene voiceover maker.
Reads script_scenes.txt, makes one voice file per scene (in your cloned voice),
and writes my-video/public/scenes.json for the video maker.
Scenes whose spoken text did not change are skipped, so re-running is fast.
At the end it also makes the lip-sync data and word timings (make_mouth.py).

Script format:
  # palette: sunrise        (optional: sunrise, ocean, grape, forest)
  ## mood | BIG TITLE | sound effect
  Spoken text. [icon:sun|Label] more spoken text. [count:4|x|more scattering]
Visual tags like [icon:...] are NOT spoken. They appear on screen at that word.
"""
import re, json, os, time, hashlib

VOICE = "my_voice.mp3"
SCRIPT = "script_scenes.txt"
PUBLIC = os.path.join("my-video", "public")
AUDIO_DIR = os.path.join(PUBLIC, "audio")
JSON_PATH = os.path.join(PUBLIC, "scenes.json")
PAUSE_BETWEEN_CHUNKS = 0.25   # seconds
PAD_AT_END = 0.35             # seconds of silence after each scene
VALID_MOODS = {"happy", "shock", "think", "laugh"}
CUE_RE = re.compile(r"\[(\w+)(?::([^\]]*))?\]")


def extract_cues(text):
    """Remove [type:args] tags from the spoken text and remember which word each one sits before."""
    cues, clean, pos = [], "", 0
    for m in CUE_RE.finditer(text):
        clean += text[pos:m.start()]
        cues.append({"word": len(clean.split()), "type": m.group(1).lower(), "arg": (m.group(2) or "").strip()})
        pos = m.end()
    clean += text[pos:]
    clean = re.sub(r"\s+", " ", clean).strip()
    return clean, cues


def read_palette(text):
    m = re.search(r"^#\s*palette:\s*(\w+)", text, re.M | re.I)
    return m.group(1).lower() if m else "sunrise"


def parse_script(text):
    """Scene header:  ## mood | BIG TEXT ON SCREEN | sound effect
       Lines under a header are what Professor says."""
    scenes, cur = [], None
    for raw in text.splitlines():
        line = raw.strip()
        if line.startswith("##"):
            if cur:
                scenes.append(cur)
            parts = [p.strip() for p in line[2:].split("|")]
            mood = parts[0].lower() if parts and parts[0] else "happy"
            if mood not in VALID_MOODS:
                print(f"  (mood '{mood}' not known, using 'happy')")
                mood = "happy"
            cur = {
                "mood": mood,
                "big": parts[1] if len(parts) > 1 else "",
                "sfx": (parts[2].lower() if len(parts) > 2 and parts[2] else "none"),
                "text": "",
            }
        elif line.startswith("#"):
            continue
        elif cur is not None and line:
            cur["text"] = (cur["text"] + " " + line).strip()
    if cur:
        scenes.append(cur)
    return [s for s in scenes if s["text"]]


def split_chunks(text, limit=250):
    sentences = re.split(r"(?<=[.!?])\s+", text)
    chunks, cur = [], ""
    for s in sentences:
        if len(cur) + len(s) < limit:
            cur = (cur + " " + s).strip()
        else:
            if cur:
                chunks.append(cur)
            cur = s
    if cur:
        chunks.append(cur)
    return chunks


def word_timings(text, duration):
    """Approximate start time of each word (spread by word length)."""
    words = text.split()
    total = sum(len(w) + 1 for w in words) or 1
    t, out = 0.0, []
    speech = max(duration - PAD_AT_END, 0.1)
    for w in words:
        out.append({"w": w, "t": round(t, 3)})
        t += speech * (len(w) + 1) / total
    return out


def main():
    text = open(SCRIPT, encoding="utf-8").read()
    palette = read_palette(text)
    scenes = parse_script(text)
    if not scenes:
        print("No scenes found. Each scene must start with a line like:  ## happy | BIG TEXT | pop")
        return
    os.makedirs(AUDIO_DIR, exist_ok=True)

    old = {}
    if os.path.exists(JSON_PATH):
        try:
            for s in json.load(open(JSON_PATH, encoding="utf-8"))["scenes"]:
                old[s["audio"]] = s
        except Exception:
            old = {}

    model = None
    start = time.time()
    result = []
    for i, sc in enumerate(scenes, 1):
        sc["text"], sc["cues"] = extract_cues(sc["text"])
        audio_rel = f"audio/scene{i:02d}.wav"
        audio_path = os.path.join(PUBLIC, audio_rel)
        h = hashlib.md5(sc["text"].encode("utf-8")).hexdigest()
        prev = old.get(audio_rel)
        if prev and prev.get("hash") == h and os.path.exists(audio_path):
            print(f"Scene {i}/{len(scenes)}: unchanged, skipping")
            duration = prev["duration"]
        else:
            if model is None:
                import torch, torchaudio as ta
                from chatterbox.tts import ChatterboxTTS
                device = "cuda" if torch.cuda.is_available() else "cpu"
                print("Device:", device)
                model = ChatterboxTTS.from_pretrained(device=device)
            import torch, torchaudio as ta
            print(f"Scene {i}/{len(scenes)}: making voice...")
            pieces = []
            pause = torch.zeros(1, int(model.sr * PAUSE_BETWEEN_CHUNKS))
            for c in split_chunks(sc["text"]):
                wav = model.generate(c, audio_prompt_path=VOICE).cpu()
                pieces.append(wav)
                pieces.append(pause)
            pieces.append(torch.zeros(1, int(model.sr * PAD_AT_END)))
            out = torch.cat(pieces, dim=1)
            ta.save(audio_path, out, model.sr)
            duration = round(out.shape[1] / model.sr, 3)
        result.append({
            "id": i,
            "mood": sc["mood"],
            "big": sc["big"],
            "sfx": sc["sfx"],
            "text": sc["text"],
            "audio": audio_rel,
            "duration": duration,
            "hash": h,
            "words": word_timings(sc["text"], duration),
            "cues": sc["cues"],
        })

    data = {"fps": 30, "palette": palette, "scenes": result}
    with open(JSON_PATH, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    total = sum(s["duration"] for s in result)
    print(f"Done! {len(result)} scenes, video length about {total:.0f} sec, "
          f"time taken: {(time.time() - start) / 60:.1f} min")
    print("Now making lip-sync and word timings...")
    import make_mouth
    make_mouth.main()


if __name__ == "__main__":
    main()
