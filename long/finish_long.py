import common_long, sys, datetime
from common_shorts import *
st = load_state(); st["used"].append({"id": sys.argv[1], "date": datetime.date.today().isoformat()}); save_state(st)
print("state_long.json updated")
