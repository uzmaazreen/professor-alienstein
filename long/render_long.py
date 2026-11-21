"""Draw every frame, add small sound effects, join with the voice-over -> shorts/out/long.mp4
Usage: python shorts/render_short.py <topic_id> [--workers N] [--silent]"""
import json, os, subprocess, sys, shutil, math
import numpy as np
from scipy.io import wavfile
from scipy.signal import butter, lfilter
from multiprocessing import Pool
import common_long
from common_shorts import *

HTML = "file://" + os.path.join(SHORTS, "engine", "engine.html")


def render_range(args):
    topic, a, b = args
    from playwright.sync_api import sync_playwright
    fdir = os.path.join(WORK, "frames")
    with sync_playwright() as p:
        br = p.chromium.launch()
        pg = br.new_page(viewport={"width": 1920, "height": 1080})
        errs = []
        pg.on("pageerror", lambda e: errs.append(str(e)))
        pg.goto(f"{HTML}?topic={topic}")
        pg.wait_for_timeout(800)
        if errs:
            print("PAGE ERROR:", errs[:3]); sys.exit(1)
        for f in range(a, b):
            pg.evaluate(f"render({f / FPS})")
            pg.screenshot(path=os.path.join(fdir, f"{f:05d}.jpg"), type="jpeg", quality=88)
        br.close()
    return b - a


def get_meta(topic):
    from playwright.sync_api import sync_playwright
    with sync_playwright() as p:
        br = p.chromium.launch(); pg = br.new_page(viewport={"width": 1920, "height": 1080})
        errs = []; pg.on("pageerror", lambda e: errs.append(str(e)))
        pg.goto(f"{HTML}?topic={topic}"); pg.wait_for_timeout(800)
        if errs:
            raise RuntimeError("Engine error: " + errs[0])
        m = pg.evaluate("window.META"); br.close()
    return m


def make_sfx(meta, dur, path):
    SR = 44100; N = int(dur * SR); mixb = np.zeros(N); rng = np.random.default_rng(3)
    tt = lambda d: np.arange(int(d * SR)) / SR
    def put(t, x, g=1.0):
        if t < 0: return
        i = int(t * SR); j = min(N, i + len(x))
        if i < N: mixb[i:j] += x[:j - i] * g
    pop = lambda: np.sin(2 * np.pi * np.cumsum(900 - 5000 * tt(.12)) / SR) * np.exp(-tt(.12) * 35) * .7
    thud = lambda: np.sin(2 * np.pi * (120 - 200 * tt(.25)) * tt(.25)) * np.exp(-tt(.25) * 18) * .9
    ding = lambda: (np.sin(2 * np.pi * 1320 * tt(.9)) + .4 * np.sin(2 * np.pi * 2640 * tt(.9))) * np.exp(-tt(.9) * 5) * .35
    def whoosh(d=.9):
        t = tt(d); n = rng.standard_normal(len(t)); env = np.sin(np.pi * t / d) ** 2; out = np.zeros_like(n)
        for k in range(0, len(t), 2048):
            fc = 400 + 3500 * (k / len(t)); b_, a_ = butter(2, [fc / (SR / 2), min(.99, fc * 1.8 / (SR / 2))], 'band'); out[k:k + 2048] = lfilter(b_, a_, n[k:k + 2048])
        return out * env * .9
    def hum(d):
        t = tt(d); return (np.sin(2 * np.pi * 55 * t) + .5 * np.sin(2 * np.pi * 110 * t)) * .12 * np.minimum(1, t * 4) * np.minimum(1, (d - t) * 4)
    for k in meta["cam"][1:]: put(k - 1.3, whoosh(1.3), .35)
    for it in meta["items"]: put(it["t0"], thud() if it["kind"] == "stamp" else pop(), .6)
    for e in meta.get("extra", []):
        if e["type"] == "hum": put(e["t"], hum(e.get("d", 4)), 1.0)
        if e["type"] == "ding": put(e["t"], ding(), .8)
    put(meta["SC"][-1]["s"] + 1.4, ding(), .8)
    mixb = mixb / max(1, np.abs(mixb).max()) * .85
    wavfile.write(path, SR, (mixb * 32767).astype(np.int16))


def make_music(dur, path):
    SR = 44100; N = int(dur * SR); out = np.zeros(N)
    t = np.arange(N) / SR
    chords = [[220.0, 261.63, 329.63], [174.61, 220.0, 261.63], [261.63, 329.63, 392.0], [196.0, 246.94, 293.66]]
    beat = 0.5; bar = 4 * beat * 2
    for i in range(int(dur / bar) + 1):
        ch = chords[i % 4]; a = int(i * bar * SR); L = int(bar * SR)
        if a >= N: break
        tt = np.arange(min(L, N - a)) / SR
        env = np.minimum(1, tt / 1.2) * np.minimum(1, (bar - tt) / 1.0)
        pad = sum(np.sin(2 * np.pi * f * tt) + 0.3 * np.sin(2 * np.pi * 2 * f * tt) for f in ch) * env * 0.12
        out[a:a + len(tt)] += pad
        for k in range(8):
            f = ch[[0, 1, 2, 1, 2, 1, 0, 2][k]] * 2; st = a + int(k * beat * SR)
            if st >= N: break
            n = min(int(0.45 * SR), N - st); x = np.arange(n) / SR
            out[st:st + n] += np.sin(2 * np.pi * f * x) * np.exp(-x * 7) * 0.10
        kick = int(a)
        for k in range(0, 8, 2):
            st = a + int(k * beat * SR)
            if st >= N: break
            n = min(int(0.3 * SR), N - st); x = np.arange(n) / SR
            out[st:st + n] += np.sin(2 * np.pi * (90 - 120 * x) * x) * np.exp(-x * 14) * 0.18
    out = out / max(1e-6, np.abs(out).max()) * 0.8
    wavfile.write(path, SR, (out * 32767).astype(np.int16))


def main():
    topic = sys.argv[1]
    workers = int(sys.argv[sys.argv.index("--workers") + 1]) if "--workers" in sys.argv else 3
    silent = "--silent" in sys.argv
    tm = json.load(open(os.path.join(WORK, "timings.json")))
    frames = int(tm["duration"] * FPS)
    fdir = os.path.join(WORK, "frames"); shutil.rmtree(fdir, ignore_errors=True); os.makedirs(fdir); os.makedirs(OUT, exist_ok=True)
    meta = get_meta(topic)
    sfx = os.path.join(WORK, "sfx.wav"); make_sfx(meta, tm["duration"], sfx)
    mus = os.path.join(WORK, "music.wav"); make_music(tm["duration"], mus)
    step = math.ceil(frames / workers)
    jobs = [(topic, i, min(frames, i + step)) for i in range(0, frames, step)]
    with Pool(len(jobs)) as pool:
        pool.map(render_range, jobs)
    out = os.path.join(OUT, "long.mp4")
    cmd = ["ffmpeg", "-v", "error", "-y", "-framerate", str(FPS), "-i", os.path.join(fdir, "%05d.jpg")]
    narr = os.path.join(WORK, "narration.wav")
    if os.path.exists(narr) and not silent:
        cmd += ["-i", narr, "-i", sfx, "-i", mus, "-filter_complex", "[1:a]apad[a1];[2:a]volume=0.35[s];[3:a]volume=0.07[m];[a1][s][m]amix=inputs=3:duration=longest:normalize=0,alimiter=limit=0.95[a]", "-map", "0:v", "-map", "[a]"]
    else:
        cmd += ["-i", sfx, "-map", "0:v", "-map", "1:a"]
    cmd += ["-c:v", "libx264", "-preset", "veryfast", "-crf", "26", "-pix_fmt", "yuv420p", "-c:a", "aac", "-b:a", "128k", "-t", str(tm["duration"]), "-movflags", "+faststart", out]
    subprocess.check_call(cmd)
    print("Long video ready:", out, f"{os.path.getsize(out) / 1e6:.1f} MB")


if __name__ == "__main__":
    main()
