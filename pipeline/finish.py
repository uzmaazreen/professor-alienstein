"""Step 8: remember today's topic so it never repeats."""
import json, datetime
from common import load_state, save_state, WORK

topic = json.load(open(f"{WORK}/topic.json", encoding="utf-8"))
meta = json.load(open(f"{WORK}/meta.json", encoding="utf-8"))
state = load_state()
state["used"].append({"link": topic["link"], "title": topic["title"], "date": datetime.date.today().isoformat(), "style": meta.get("thumb", {}).get("style", "")})
state["used"] = state["used"][-300:]
state["last_style"] = meta.get("thumb", {}).get("style", "")
save_state(state)
print("state.json updated")
