"""Shared helpers for the Professor Alienstein pipeline."""
import json, os, re, time
import requests

STATE_PATH = "state.json"
WORK = "work"
API = "https://generativelanguage.googleapis.com/v1beta"

ICONS = ["sun", "cloud", "eye", "rainbow", "bulb", "clock", "magnifier", "globe", "heart",
         "flask", "book", "gear", "rocket", "drop", "question", "star", "sunset"]
MOODS = ["happy", "shock", "think", "laugh"]
SFX = ["pop", "whoosh", "ding", "boing", "none"]
CUE_TYPES = ["strip", "date", "icon", "count", "bars", "flow", "compare", "word", "note", "circle"]


def load_state():
    if os.path.exists(STATE_PATH):
        try:
            return json.load(open(STATE_PATH, encoding="utf-8"))
        except Exception:
            pass
    return {"used": [], "last_style": ""}


def save_state(state):
    with open(STATE_PATH, "w", encoding="utf-8") as f:
        json.dump(state, f, ensure_ascii=False, indent=2)


def ensure_work():
    os.makedirs(WORK, exist_ok=True)


def list_models(key):
    """Ask Google which Gemini models this key can use, newest 'flash' models first."""
    r = requests.get(f"{API}/models?pageSize=200", headers={"x-goog-api-key": key}, timeout=60)
    r.raise_for_status()
    found = []
    for m in r.json().get("models", []):
        name = m.get("name", "")
        if "generateContent" not in m.get("supportedGenerationMethods", []):
            continue
        low = name.lower()
        if "flash" not in low:
            continue
        if any(bad in low for bad in ["image", "tts", "embed", "live", "audio", "robot", "vision", "exp", "learnlm", "computer"]):
            continue
        ver = re.search(r"gemini-(\d+(?:\.\d+)?)", low)
        v = float(ver.group(1)) if ver else 0.0
        found.append((0 if "lite" in low else 1, v, name))
    found.sort(reverse=True)  # regular flash before lite, higher version first
    return [n for _, _, n in found][:6]


def call_gemini(prompt, key, json_mode=False, temperature=0.8, max_tokens=8192, log=print):
    """Try each model, retry on 429/503 with waiting, move to the next model when one fails."""
    models = list_models(key)
    if not models:
        raise RuntimeError("No Gemini models found for this key")
    log("Gemini models to try:", models)
    cfg = {"temperature": temperature, "maxOutputTokens": max_tokens}
    if json_mode:
        cfg["responseMimeType"] = "application/json"
    body = {"contents": [{"role": "user", "parts": [{"text": prompt}]}], "generationConfig": cfg}
    last = ""
    for name in models:
        for attempt in range(4):
            try:
                r = requests.post(f"{API}/{name}:generateContent", headers={"x-goog-api-key": key, "Content-Type": "application/json"}, json=body, timeout=240)
            except requests.RequestException as e:
                last = str(e)
                time.sleep(10 * (attempt + 1))
                continue
            if r.status_code == 200:
                data = r.json()
                try:
                    parts = data["candidates"][0]["content"]["parts"]
                    text = "".join(p.get("text", "") for p in parts).strip()
                    if text:
                        log(f"Gemini answered using {name}")
                        return text
                    last = "empty answer"
                except (KeyError, IndexError):
                    last = "unexpected answer: " + json.dumps(data)[:200]
                break
            last = f"{r.status_code}: {r.text[:200]}"
            if r.status_code in (429, 500, 503):
                wait = 20 * (attempt + 1)
                log(f"{name} busy ({r.status_code}), waiting {wait}s")
                time.sleep(wait)
                continue
            break  # 400/403/404: try the next model
        log(f"Giving up on {name}: {last}")
    raise RuntimeError("All Gemini models failed. Last problem: " + last)
