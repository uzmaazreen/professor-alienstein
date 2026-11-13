"""Write title / tags / description for a long video.  python long/prepare_long.py <topic_id>"""
import common_long, json, os, sys
from common_shorts import *
t = load_topics()[sys.argv[1]]
os.makedirs(WORK, exist_ok=True)
meta = {"title": t["title"][:95], "tags": t.get("tags", []) + ["science", "Professor Alienstein"], "comment": t.get("comment", "")}
json.dump(meta, open(os.path.join(WORK, "meta.json"), "w", encoding="utf-8"), indent=2, ensure_ascii=False)
desc = (t["description"] + "\n\nSimple science explained by Professor Alienstein.\n\n"
        "About this video: the voice is an AI voice trained on the creator's own voice, and the pictures are computer-made animation. "
        "This video is general information, not medical advice.\n\n#science #explained #ProfessorAlienstein")
open(os.path.join(WORK, "description.txt"), "w", encoding="utf-8").write(desc)
print("meta ready")
