"""Remember today's topic so it is not repeated too soon."""
import json, os, datetime
from common_shorts import *
t = json.load(open(os.path.join(WORK, "topic.json"), encoding="utf-8"))
st = load_state()
st["used"].append({"id": t["id"], "date": datetime.date.today().isoformat()})
st["used"] = st["used"][-300:]
save_state(st)
print("state_shorts.json updated")
