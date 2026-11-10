"""
Professor Alienstein - lip-sync maker.
Reads each scene's voice file and writes a mouth shape for every video frame
into my-video/public/scenes.json  (field: "mouth").
Mouth codes: 0 closed, 1 small, 2 medium, 3 round (oo), 4 wide (aa/ee)
It also finds the exact start time of every word group (using the silent gaps
between voice chunks) and the time of every on-screen visual tag.
speak_scenes.py runs this automatically.
"""
import json, os
import numpy as np
from scipy.io import wavfile

PUBLIC = os.path.join("my-video", "public")
JSON_PATH = os.path.join(PUBLIC, "scenes.json")


def load_mono(path):
    sr, data = wavfile.read(path)
    if data.ndim > 1:
        data = data.mean(axis=1)
    if data.dtype == np.int16:
        data = data.astype(np.float32) / 32768.0
    elif data.dtype == np.int32:
        data = data.astype(np.float32) / 2147483648.0
    else:
        data = data.astype(np.float32)
    return sr, data


def median3(a):
    out = a.copy()
    for i in range(1, len(a) - 1):
        out[i] = int(np.median(a[i - 1:i + 2]))
    return out


def mouth_track(path, fps):
    sr, y = load_mono(path)
    hop = sr / fps
    n = int(len(y) / hop) + 1
    rms = np.zeros(n)
    cent = np.zeros(n)
    for i in range(n):
        a = int(i * hop)
        b = int((i + 1.5) * hop)
        seg = y[a:b]
        if len(seg) < 64:
            continue
        rms[i] = np.sqrt(np.mean(seg ** 2))
        spec = np.abs(np.fft.rfft(seg * np.hanning(len(seg))))
        freqs = np.fft.rfftfreq(len(seg), 1.0 / sr)
        cent[i] = (spec * freqs).sum() / (spec.sum() + 1e-9)
    # smooth loudness a little
    k = np.array([0.25, 0.5, 0.25])
    rms = np.convolve(rms, k, mode="same")
    loud = rms[rms > 1e-4]
    ref = np.percentile(loud, 90) if len(loud) else 1.0
    level = rms / (ref + 1e-9)
    shapes = np.zeros(n, dtype=int)
    for i in range(n):
        L = level[i]
        if L < 0.12:
            s = 0
        elif L < 0.32:
            s = 1
        elif L < 0.6:
            s = 2
        else:
            s = 3 if cent[i] < 1500 else 4
        shapes[i] = s
    shapes = median3(shapes)
    return [int(x) for x in shapes]


def find_pauses(path, min_len=0.2):
    """Exact-silence gaps (the 0.25 s pauses speak_scenes puts between chunks)."""
    sr, y = load_mono(path)
    quiet = np.abs(y) < 1e-5
    runs, start = [], None
    for i, q in enumerate(quiet):
        if q and start is None:
            start = i
        elif not q and start is not None:
            if (i - start) / sr >= min_len:
                runs.append((start / sr, i / sr))
            start = None
    if start is not None and (len(y) - start) / sr >= min_len:
        runs.append((start / sr, len(y) / sr))
    return runs, len(y) / sr


def better_word_times(sc, path):
    """Word start times from the real chunk boundaries (more exact than guessing)."""
    try:
        from speak_scenes import split_chunks
        chunks = split_chunks(sc["text"])
        runs, total = find_pauses(path)
        if len(runs) != len(chunks):
            return False
        words, out, wi = sc["text"].split(), [], 0
        start = 0.0
        for k, chunk in enumerate(chunks):
            end = runs[k][0]
            cw = chunk.split()
            tot = sum(len(w) + 1 for w in cw) or 1
            t = start
            for w in cw:
                out.append({"w": w, "t": round(t, 3)})
                t += (end - start) * (len(w) + 1) / tot
            start = runs[k][1]
        if len(out) != len(words):
            return False
        sc["words"] = out
        return True
    except Exception as e:
        print("  (word timing fallback:", e, ")")
        return False


def main():
    data = json.load(open(JSON_PATH, encoding="utf-8"))
    fps = data.get("fps", 30)
    for sc in data["scenes"]:
        path = os.path.join(PUBLIC, sc["audio"])
        sc["mouth"] = mouth_track(path, fps)
        exact = better_word_times(sc, path)
        for cue in sc.get("cues", []):
            w = sc.get("words", [])
            if w:
                cue["t"] = round(max(0.0, w[min(cue["word"], len(w) - 1)]["t"] - 0.12), 3)
            else:
                cue["t"] = 0.0
        print(f"  word timing: {'exact' if exact else 'estimated'}, visual cues: {len(sc.get('cues', []))}")
        counts = [sc["mouth"].count(i) for i in range(5)]
        print(f"Scene {sc['id']}: {len(sc['mouth'])} frames  (closed/small/mid/round/wide = {counts})")
    with open(JSON_PATH, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    print("Done! Lip-sync data saved.")


if __name__ == "__main__":
    main()
