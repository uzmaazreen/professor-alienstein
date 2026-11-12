"""Make the Short's voice-over in YOUR cloned voice (Chatterbox) and write timings + mouth movement.
Usage:  python shorts/speak_short.py <topic_id> [--fake]
--fake = no voice, silent preview with rough timings (for testing the picture only).
"""
import json, os, re, sys, time
import numpy as np
from scipy.io import wavfile
from common_shorts import *

VOICE = os.environ.get("VOICE_FILE", "my_voice.mp3")
SR_OUT = 24000


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


def envelope(wav, sr, frames):
    """Loudness per video frame (0..1) -> mouth opening."""
    hop = sr / FPS
    env = []
    for i in range(frames):
        seg = wav[int(i * hop): int((i + 1) * hop)]
        env.append(float(np.sqrt(np.mean(seg ** 2))) if len(seg) else 0.0)
    env = np.array(env)
    ref = np.percentile(env[env > 0], 90) if (env > 0).any() else 1.0
    env = np.clip(env / max(ref, 1e-6), 0, 1)
    k = np.array([0.25, 0.5, 0.25])
    env = np.convolve(env, k, mode="same")
    env[env < 0.12] = 0
    return env


def main():
    topic_id = sys.argv[1]
    fake = "--fake" in sys.argv
    topic = load_topics()[topic_id]
    scenes = scenes_with_outro(topic)
    os.makedirs(os.path.join(WORK, "audio"), exist_ok=True)
    if fake:
        durs = default_durations(scenes)
        write_timings(scenes, durs)
        print("FAKE timings written (no voice):", durs)
        return
    import torch, torchaudio as ta
    from chatterbox.tts import ChatterboxTTS
    device = "cuda" if torch.cuda.is_available() else "cpu"
    print("Device:", device)
    model = ChatterboxTTS.from_pretrained(device=device)
    start = time.time()
    pieces, durs = [], []
    for i, sc in enumerate(scenes, 1):
        print(f"Scene {i}/{len(scenes)}: making voice...")
        parts = []
        pause = torch.zeros(1, int(model.sr * 0.2))
        for c in split_chunks(sc["text"]):
            wav = model.generate(c, audio_prompt_path=VOICE).cpu()
            parts += [wav, pause]
        parts.append(torch.zeros(1, int(model.sr * PAD)))
        out = torch.cat(parts, dim=1)
        arr = out.squeeze(0).numpy().astype(np.float32)
        pieces.append(arr)
        durs.append(round(len(arr) / model.sr, 3))
    sr = model.sr
    full = np.concatenate(pieces)
    peak = float(np.abs(full).max()) or 1.0
    full = full / peak * 0.9
    wavfile.write(os.path.join(WORK, "narration.wav"), sr, full.astype(np.float32))
    total = sum(durs)
    frames = int((total + 0.6) * FPS) + 1
    env = envelope(full, sr, frames)
    write_timings(scenes, durs, env)
    print(f"Voice done: {total:.1f}s of speech in {(time.time() - start) / 60:.1f} min")


if __name__ == "__main__":
    main()
