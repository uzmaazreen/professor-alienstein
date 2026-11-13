"""Pick the next long-video topic that is fully drawn (has .json + .js) and not made yet.
Prints topic_id (empty = nothing new). Usage: python long/pick_long_topic.py [forced_id]"""
import common_long, os, sys
from common_shorts import *
lib = load_topics()
used = {u["id"] for u in load_state()["used"]}
ready = [i for i in lib if os.path.exists(os.path.join(TOPICS, i + ".js"))]
forced = sys.argv[1] if len(sys.argv) > 1 and sys.argv[1] else None
if forced and forced in ready:
    tid = forced
else:
    left = [i for i in ready if i not in used]
    order = {"smog": 0, "winter-body": 1, "ai-chatbot": 2, "sleep": 3}
    left.sort(key=lambda i: (order.get(i, 99), i))
    tid = left[0] if left else ""
print("TOPIC:", tid or "(none new - nothing to make)")
gh = os.environ.get("GITHUB_OUTPUT")
if gh:
    open(gh, "a").write(f"topic_id={tid}\n")
