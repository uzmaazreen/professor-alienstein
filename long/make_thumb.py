"""Make a curiosity thumbnail (1280x720) from the video's own animation.  python long/make_thumb.py <topic_id>"""
import common_long, json, os, sys
from common_shorts import *
from playwright.sync_api import sync_playwright
from PIL import Image
tid = sys.argv[1]
t = load_topics()[tid]
th = t.get("thumb", {})
tm = json.load(open(os.path.join(WORK, "timings.json")))
at = tm["scenes"][th.get("scene", 0)]["e"] - th.get("before_end", 2.0)
os.makedirs(OUT, exist_ok=True)
raw = os.path.join(OUT, "thumb_raw.png")
HTML = "file://" + os.path.join(os.path.dirname(os.path.abspath(__file__)), "engine", "engine.html")
line1 = th.get("line1", "WHY"); line2 = th.get("line2", ""); line3 = th.get("line3", "")
with sync_playwright() as p:
    b = p.chromium.launch(); pg = b.new_page(viewport={"width": 1920, "height": 1080})
    pg.goto(f"{HTML}?topic={tid}"); pg.wait_for_timeout(1200)
    pg.evaluate(f"render({at})")
    pg.evaluate("""([l1,l2,l3])=>{
      for(const id of ['cap','hud','endv','mascot','light'])document.getElementById(id).style.display='none';
      const st=document.getElementById('stage');
      const d=document.createElement('div');
      d.style.cssText='position:absolute;inset:0;background:linear-gradient(90deg,rgba(0,0,0,.72) 0%,rgba(0,0,0,.35) 55%,rgba(0,0,0,0) 80%)';
      st.appendChild(d);
      const x=document.createElement('div');
      x.style.cssText="position:absolute;left:70px;top:110px;width:1150px;font:900 190px/0.95 Poppins;color:#fff;-webkit-text-stroke:16px #000;paint-order:stroke fill;text-shadow:0 10px 0 #000;letter-spacing:-4px";
      x.innerHTML=`<div>${l1}</div><div style='color:#ffd23f'>${l2}</div><div style='color:#ff3b3b'>${l3}</div>`;
      st.appendChild(x);
      const m=document.createElement('img');m.src='assets/mascot.png';
      m.style.cssText='position:absolute;right:20px;bottom:-40px;height:800px;filter:drop-shadow(8px 0 0 #fff) drop-shadow(-8px 0 0 #fff) drop-shadow(0 8px 0 #fff) drop-shadow(0 -8px 0 #fff) drop-shadow(0 14px 18px rgba(0,0,0,.5))';
      st.appendChild(m);
    }""", [line1, line2, line3])
    pg.wait_for_timeout(500)
    pg.screenshot(path=raw); b.close()
im = Image.open(raw).convert("RGB").crop((36, 40, 1884, 1080)).resize((1280, 720), Image.LANCZOS)
out = os.path.join(OUT, "thumb.jpg"); q = 92
while True:
    im.save(out, quality=q)
    if os.path.getsize(out) < 1.8e6 or q < 60: break
    q -= 8
os.remove(raw); print("thumbnail ready:", out, os.path.getsize(out) // 1000, "KB")
