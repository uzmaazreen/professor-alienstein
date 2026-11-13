"""Settings for the long (8-10 min) videos. Import this BEFORE the shorts scripts."""
import os, sys
LONG = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.join(os.path.dirname(LONG), "shorts"))
import common_shorts as cs
cs.SHORTS = LONG
cs.TOPICS = os.path.join(LONG, "topics")
cs.WORK = os.path.join(LONG, "work")
cs.OUT = os.path.join(LONG, "out")
cs.STATE = os.path.join(LONG, "state_long.json")
cs.PAD = 0.5
cs.OUTRO = {"mood": "laugh", "text": "Subscribe for more simple science!"}
