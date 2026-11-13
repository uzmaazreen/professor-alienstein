"""Warn (via a GitHub issue = email to you) when the topic library is almost used up."""
import json, os, subprocess, sys
from common_shorts import *
lib = load_topics()
ready = [i for i in lib if os.path.exists(os.path.join(TOPICS, i + ".js"))]
used = {u["id"] for u in load_state()["used"]}
left = [i for i in ready if i not in used]
print(f"Short topics never used yet: {len(left)} of {len(ready)}")
if len(left) < 4:
    title = "Shorts library is running low - ask Claude for new topics"
    out = subprocess.run(["gh", "issue", "list", "--state", "open", "--search", title, "--json", "title"], capture_output=True, text=True).stdout
    if title not in out:
        body = f"Only {len(left)} new Short topics are left. Open Claude and write: 'naye topics' (the daily Shorts keep working by repeating older topics until then)."
        subprocess.run(["gh", "issue", "create", "--title", title, "--body", body])
