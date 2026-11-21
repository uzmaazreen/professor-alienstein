"""Make a curiosity thumbnail (1280x720) from the video's own animation.  python long/make_thumb.py <topic_id>"""
import common_long, json, os, sys, math
from common_shorts import *
from playwright.sync_api import sync_playwright
from PIL import Image
tid = sys.argv[1]
t = load_topics()[tid]
th = t.get("thumb", {})

HEROES = {
"moon": """<svg viewBox="0 0 600 600" width="600" height="600" style="overflow:visible"><defs><radialGradient id="g" cx="40%" cy="35%"><stop offset="0" stop-color="#fffdf0"/><stop offset="1" stop-color="#cfc9a8"/></radialGradient><filter id="b" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="22"/></filter></defs>
<circle cx="300" cy="300" r="290" fill="#fff6c0" opacity=".45" filter="url(#b)"/>
<circle cx="300" cy="300" r="250" fill="url(#g)"/><circle cx="230" cy="230" r="46" fill="#b9b392"/><circle cx="380" cy="300" r="64" fill="#c2bc9c"/><circle cx="270" cy="400" r="36" fill="#b9b392"/><circle cx="390" cy="180" r="26" fill="#b9b392"/>
<circle cx="300" cy="300" r="262" fill="none" stroke="#ff3b3b" stroke-width="14" stroke-dasharray="34 22"/>
<text x="240" y="380" text-anchor="middle" font-family="Poppins" font-weight="900" font-size="330" fill="#ff3b3b" stroke="#000" stroke-width="16" paint-order="stroke" opacity=".95">?</text></svg>""",
"time": """<svg viewBox="0 0 600 600" width="600" height="600" style="overflow:visible"><defs><filter id="b" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="20"/></filter></defs>
<circle cx="300" cy="300" r="285" fill="#ffd23f" opacity=".35" filter="url(#b)"/>
<circle cx="300" cy="300" r="250" fill="#fffdf2" stroke="#000" stroke-width="18"/>
<g stroke="#000" stroke-width="12" stroke-linecap="round">""" + "".join(f'<line x1="{300+215*__import__("math").sin(i*0.5236):.0f}" y1="{300-215*__import__("math").cos(i*0.5236):.0f}" x2="{300+235*__import__("math").sin(i*0.5236):.0f}" y2="{300-235*__import__("math").cos(i*0.5236):.0f}"/>' for i in range(12)) + """</g>
<line x1="300" y1="300" x2="300" y2="130" stroke="#000" stroke-width="22" stroke-linecap="round"/><line x1="300" y1="300" x2="420" y2="360" stroke="#d9232a" stroke-width="16" stroke-linecap="round"/><circle cx="300" cy="300" r="22" fill="#000"/>
<g stroke="#ff3b3b" stroke-width="16" stroke-linecap="round" fill="none"><path d="M520 120 q60 80 0 160"/><path d="M555 90 q90 110 0 220"/></g>
<polygon points="545,300 505,255 505,345" fill="#ff3b3b" transform="translate(40 -8)"/></svg>""",
"sleep": """<svg viewBox="0 0 600 600" width="600" height="600" style="overflow:visible"><defs><filter id="b" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="20"/></filter></defs>
<circle cx="300" cy="300" r="270" fill="#8a6bff" opacity=".4" filter="url(#b)"/>
<path d="M360 60 a250 250 0 1 0 150 380 a200 200 0 1 1 -150 -380z" fill="#ffe27a" stroke="#000" stroke-width="14"/>
<g font-family="Poppins" font-weight="900" fill="#fff" stroke="#000" stroke-width="12" paint-order="stroke"><text x="330" y="250" font-size="150">Z</text><text x="420" y="170" font-size="110">z</text><text x="490" y="105" font-size="80">z</text></g></svg>""",
"lungs": """<svg viewBox="0 0 600 600" width="600" height="600" style="overflow:visible"><defs><filter id="b" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="22"/></filter></defs>
<circle cx="300" cy="300" r="270" fill="#9a9a9a" opacity=".5" filter="url(#b)"/>
<path d="M290 80 v230" stroke="#000" stroke-width="40" stroke-linecap="round"/><path d="M290 80 v230" stroke="#f5c0c8" stroke-width="22" stroke-linecap="round"/>
<path d="M270 190 C120 170 60 330 90 480 C110 540 230 530 270 440z" fill="#ff7a8a" stroke="#000" stroke-width="16"/><path d="M310 190 C460 170 520 330 490 480 C470 540 350 530 310 440z" fill="#ff7a8a" stroke="#000" stroke-width="16"/>
<g fill="#555" opacity=".92" stroke="#000" stroke-width="8"><circle cx="150" cy="130" r="70"/><circle cx="260" cy="60" r="60"/><circle cx="430" cy="110" r="75"/><circle cx="520" cy="230" r="55"/><circle cx="90" cy="250" r="50"/></g></svg>""",
"snow": """<svg viewBox="0 0 600 600" width="600" height="600" style="overflow:visible"><defs><filter id="b" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="22"/></filter></defs>
<circle cx="300" cy="300" r="270" fill="#8fe3ff" opacity=".5" filter="url(#b)"/>
<g stroke="#000" stroke-width="44" stroke-linecap="round">""" + "".join(f'<g transform="rotate({a} 300 300)"><path d="M300 300 V50"/><path d="M300 140 L240 90 M300 140 L360 90"/></g>' for a in range(0,360,60)) + """</g>
<g stroke="#e8f8ff" stroke-width="24" stroke-linecap="round">""" + "".join(f'<g transform="rotate({a} 300 300)"><path d="M300 300 V50"/><path d="M300 140 L240 90 M300 140 L360 90"/></g>' for a in range(0,360,60)) + """</g></svg>""",
"chat": """<svg viewBox="0 0 600 600" width="600" height="600" style="overflow:visible"><defs><filter id="b" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="22"/></filter></defs>
<circle cx="300" cy="300" r="270" fill="#4cc9ff" opacity=".45" filter="url(#b)"/>
<path d="M90 90 H510 Q560 90 560 140 V360 Q560 410 510 410 H300 L190 520 V410 H90 Q40 410 40 360 V140 Q40 90 90 90z" fill="#fff" stroke="#000" stroke-width="18"/>
<g fill="#2d7fd3" stroke="#000" stroke-width="8"><circle cx="170" cy="250" r="34"/><circle cx="300" cy="250" r="34"/><circle cx="430" cy="250" r="34"/></g>
<text x="470" y="170" text-anchor="middle" font-family="Poppins" font-weight="900" font-size="170" fill="#ff3b3b" stroke="#000" stroke-width="14" paint-order="stroke">?</text></svg>""",
"sun": """<svg viewBox="0 0 600 600" width="600" height="600" style="overflow:visible"><defs><filter id="b" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="26"/></filter></defs>
<circle cx="300" cy="300" r="290" fill="#ff9a00" opacity=".6" filter="url(#b)"/>""" + "".join(f'<path d="M{300+math.cos(a*0.4488)*235:.0f} {300+math.sin(a*0.4488)*235:.0f} L{300+math.cos(a*0.4488)*295:.0f} {300+math.sin(a*0.4488)*295:.0f}" stroke="#000" stroke-width="40" stroke-linecap="round"/><path d="M{300+math.cos(a*0.4488)*235:.0f} {300+math.sin(a*0.4488)*235:.0f} L{300+math.cos(a*0.4488)*295:.0f} {300+math.sin(a*0.4488)*295:.0f}" stroke="#ffd23f" stroke-width="22" stroke-linecap="round"/>' for a in range(14)) + """
<circle cx="300" cy="300" r="215" fill="#ffd23f" stroke="#000" stroke-width="16"/><circle cx="300" cy="300" r="232" fill="none" stroke="#ff3b3b" stroke-width="12" stroke-dasharray="30 20"/>
<text x="300" y="390" text-anchor="middle" font-family="Poppins" font-weight="900" font-size="300" fill="#ff3b3b" stroke="#000" stroke-width="14" paint-order="stroke">?</text></svg>""",
"ice": """<svg viewBox="0 0 600 600" width="600" height="600" style="overflow:visible"><defs><filter id="b" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="24"/></filter></defs>
<circle cx="300" cy="300" r="280" fill="#7fe0ff" opacity=".55" filter="url(#b)"/>
<path d="M120 460 L190 210 L300 120 L420 220 L480 460z" fill="#eaf9ff" stroke="#000" stroke-width="16" stroke-linejoin="round"/><path d="M190 210 L300 280 L420 220 M300 120 L300 280 L270 460" stroke="#8fd3ff" stroke-width="10" fill="none"/>
<path d="M60 470 Q180 430 300 470 T540 470 V560 H60z" fill="#2d7fd3" stroke="#000" stroke-width="14"/>
<g fill="#4aa3ff" stroke="#000" stroke-width="8"><path d="M470 180 q-30 50 0 70 q30 -20 0 -70z"/><path d="M130 160 q-24 40 0 56 q24 -16 0 -56z"/></g>
<text x="300" y="400" text-anchor="middle" font-family="Poppins" font-weight="900" font-size="260" fill="#ff3b3b" stroke="#000" stroke-width="14" paint-order="stroke">?</text></svg>""",
"earth": """<svg viewBox="0 0 600 600" width="600" height="600" style="overflow:visible"><defs><filter id="b" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="24"/></filter></defs>
<circle cx="300" cy="300" r="290" fill="#5aa8ff" opacity=".5" filter="url(#b)"/>
<circle cx="300" cy="300" r="240" fill="#2d7fd3" stroke="#000" stroke-width="16"/><path d="M170 240 q60 -80 120 -20 q20 70 -50 110 q-70 20 -70 -90z M330 330 q80 -30 90 40 q-20 70 -80 50z" fill="#4caf50" stroke="#000" stroke-width="8"/>
<path d="M300 20 a280 280 0 0 1 270 200" stroke="#ff3b3b" stroke-width="26" fill="none" stroke-linecap="round"/><polygon points="595,215 520,215 560,150" fill="#ff3b3b" stroke="#000" stroke-width="8"/>
<text x="300" y="400" text-anchor="middle" font-family="Poppins" font-weight="900" font-size="300" fill="#ff3b3b" stroke="#000" stroke-width="14" paint-order="stroke">?</text></svg>""",
"eye": """<svg viewBox="0 0 600 600" width="600" height="600" style="overflow:visible"><defs><filter id="b" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="22"/></filter></defs>
<circle cx="300" cy="300" r="270" fill="#ff4b6a" opacity=".4" filter="url(#b)"/>
<path d="M30 300 Q300 60 570 300 Q300 540 30 300Z" fill="#fff" stroke="#000" stroke-width="16"/>
<g stroke="#e0354f" stroke-width="7" fill="none" stroke-linecap="round"><path d="M70 300 q60 -20 100 -10"/><path d="M80 330 q50 -10 90 -30"/><path d="M530 300 q-60 -20 -100 -10"/><path d="M520 330 q-50 -10 -90 -30"/><path d="M110 270 q40 10 70 30"/><path d="M490 270 q-40 10 -70 30"/></g>
<circle cx="300" cy="300" r="120" fill="#2d7fd3" stroke="#000" stroke-width="12"/><circle cx="300" cy="300" r="55" fill="#000"/><circle cx="265" cy="265" r="22" fill="#fff"/>
<text x="480" y="130" font-family="Poppins" font-weight="900" font-size="110" fill="#ffd23f" stroke="#000" stroke-width="10" paint-order="stroke">Zzz</text>
<path d="M455 70 L545 190" stroke="#ff3b3b" stroke-width="22" stroke-linecap="round"/></svg>""",
"bh": """<svg viewBox="0 0 600 600" width="600" height="600" style="overflow:visible"><defs><filter id="b" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="26"/></filter></defs>
<circle cx="300" cy="300" r="280" fill="#ff9a2e" opacity=".55" filter="url(#b)"/>
<ellipse cx="300" cy="300" rx="285" ry="80" fill="none" stroke="#ffb84a" stroke-width="40" stroke-linecap="round"/>
<circle cx="300" cy="300" r="170" fill="#000" stroke="#ffd9a0" stroke-width="14"/>
<ellipse cx="300" cy="300" rx="285" ry="80" fill="none" stroke="#ff7a2e" stroke-width="24" stroke-dasharray="320 600" transform="rotate(-8 300 300)"/>
<text x="300" y="370" text-anchor="middle" font-family="Poppins" font-weight="900" font-size="240" fill="#ff3b3b" stroke="#000" stroke-width="14" paint-order="stroke">?</text></svg>""",
"bug": """<svg viewBox="0 0 600 600" width="600" height="600" style="overflow:visible"><defs><filter id="b" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="24"/></filter></defs>
<circle cx="300" cy="300" r="270" fill="#7aff5a" opacity=".4" filter="url(#b)"/>
<ellipse cx="170" cy="190" rx="130" ry="70" fill="#cfeeff" stroke="#000" stroke-width="12" transform="rotate(-25 170 190)"/><ellipse cx="430" cy="190" rx="130" ry="70" fill="#cfeeff" stroke="#000" stroke-width="12" transform="rotate(25 430 190)"/>
<ellipse cx="300" cy="360" rx="120" ry="170" fill="#ffd23f" stroke="#000" stroke-width="16"/><path d="M190 330 H410 M185 400 H415 M215 470 H385" stroke="#000" stroke-width="26"/>
<circle cx="300" cy="170" r="75" fill="#ffd23f" stroke="#000" stroke-width="16"/><circle cx="270" cy="160" r="20" fill="#fff" stroke="#000" stroke-width="8"/><circle cx="330" cy="160" r="20" fill="#fff" stroke="#000" stroke-width="8"/><circle cx="270" cy="162" r="8"/><circle cx="330" cy="162" r="8"/>
<path d="M265 110 Q230 50 190 60 M335 110 Q370 50 410 60" stroke="#000" stroke-width="12" fill="none" stroke-linecap="round"/>
<path d="M30 570 L570 30" stroke="#ff3b3b" stroke-width="34" stroke-linecap="round" opacity=".9"/></svg>""",
"drop": """<svg viewBox="0 0 600 600" width="600" height="600" style="overflow:visible"><defs><filter id="b" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="24"/></filter></defs>
<circle cx="300" cy="300" r="270" fill="#4ac8ff" opacity=".45" filter="url(#b)"/>
<path d="M300 40 C420 200 500 290 500 390 C500 500 410 570 300 570 C190 570 100 500 100 390 C100 290 180 200 300 40Z" fill="#3aa0ff" stroke="#000" stroke-width="18" stroke-linejoin="round"/>
<path d="M200 400 C200 460 240 500 290 510" stroke="#cfeeff" stroke-width="26" fill="none" stroke-linecap="round"/><ellipse cx="380" cy="300" rx="22" ry="40" fill="#fff" opacity=".6" transform="rotate(25 380 300)"/>
<path d="M60 560 L540 60" stroke="#ff3b3b" stroke-width="34" stroke-linecap="round" opacity=".9"/></svg>""",
"germ": """<svg viewBox="0 0 600 600" width="600" height="600" style="overflow:visible"><defs><filter id="b" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="24"/></filter></defs>
<circle cx="300" cy="300" r="270" fill="#7aff5a" opacity=".45" filter="url(#b)"/>
<g transform="rotate(-30 300 300)"><rect x="90" y="190" width="420" height="220" rx="110" fill="#7aff8a" stroke="#000" stroke-width="18"/><g stroke="#000" stroke-width="12" stroke-linecap="round"><path d="M90 300 H20 M510 300 H580 M150 190 L120 110 M450 190 L480 110 M150 410 L120 490 M450 410 L480 490"/></g></g>
<circle cx="250" cy="280" r="22" fill="#fff" stroke="#000" stroke-width="8"/><circle cx="350" cy="320" r="22" fill="#fff" stroke="#000" stroke-width="8"/><circle cx="256" cy="284" r="9" fill="#000"/><circle cx="356" cy="324" r="9" fill="#000"/>
<path d="M60 560 L540 60" stroke="#ff3b3b" stroke-width="34" stroke-linecap="round" opacity=".9"/></svg>""",
"noodle": """<svg viewBox="0 0 600 600" width="600" height="600" style="overflow:visible"><defs><filter id="b" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="24"/></filter></defs>
<circle cx="300" cy="300" r="270" fill="#ffb02e" opacity=".45" filter="url(#b)"/>
<g fill="none" stroke="#000" stroke-width="40" stroke-linecap="round"><path d="M110 250 Q180 130 250 250 T390 250 T500 250"/><path d="M120 310 Q190 190 260 310 T400 310 T490 310"/></g>
<g fill="none" stroke="#ffd23f" stroke-width="22" stroke-linecap="round"><path d="M110 250 Q180 130 250 250 T390 250 T500 250"/><path d="M120 310 Q190 190 260 310 T400 310 T490 310"/></g>
<path d="M70 330 H530 Q520 520 300 540 Q80 520 70 330Z" fill="#ff4b3a" stroke="#000" stroke-width="18" stroke-linejoin="round"/>
<path d="M170 100 Q150 60 180 30 M300 90 Q280 50 310 20 M420 100 Q400 60 430 30" stroke="#fff" stroke-width="14" fill="none" stroke-linecap="round" opacity=".7"/></svg>""",
"sugar": """<svg viewBox="0 0 600 600" width="600" height="600" style="overflow:visible"><defs><filter id="b" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="24"/></filter></defs>
<circle cx="300" cy="300" r="270" fill="#ff6ab0" opacity=".45" filter="url(#b)"/>
<g stroke="#000" stroke-width="14" stroke-linejoin="round"><rect x="120" y="160" width="170" height="170" rx="18" fill="#fff" transform="rotate(-14 205 245)"/><rect x="300" y="210" width="170" height="170" rx="18" fill="#fff" transform="rotate(12 385 295)"/><rect x="200" y="320" width="170" height="170" rx="18" fill="#fff" transform="rotate(-4 285 405)"/></g>
<g fill="#cfe3ff"><circle cx="190" cy="230" r="10"/><circle cx="245" cy="270" r="10"/><circle cx="380" cy="290" r="10"/><circle cx="430" cy="330" r="10"/><circle cx="260" cy="400" r="10"/></g>
<circle cx="300" cy="300" r="270" fill="none" stroke="#ff3b3b" stroke-width="34"/><path d="M110 110 L490 490" stroke="#ff3b3b" stroke-width="34" stroke-linecap="round"/></svg>""",
"phone": """<svg viewBox="0 0 600 600" width="600" height="600" style="overflow:visible"><defs><filter id="b" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="24"/></filter></defs>
<circle cx="300" cy="300" r="270" fill="#4aa8ff" opacity=".45" filter="url(#b)"/>
<rect x="170" y="40" width="260" height="520" rx="50" fill="#10131a" stroke="#000" stroke-width="18"/><rect x="190" y="90" width="220" height="420" rx="24" fill="#2a6fe0"/>
<circle cx="300" cy="300" r="90" fill="#fff" opacity=".95"/><circle cx="300" cy="300" r="64" fill="none" stroke="#ff3b3b" stroke-width="22"/><path d="M255 345 L345 255" stroke="#ff3b3b" stroke-width="22" stroke-linecap="round"/>
<rect x="260" y="56" width="80" height="14" rx="7" fill="#444"/></svg>""",
"wifi": """<svg viewBox="0 0 600 600" width="600" height="600" style="overflow:visible"><defs><filter id="b" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="24"/></filter></defs>
<circle cx="300" cy="300" r="270" fill="#4aa8ff" opacity=".5" filter="url(#b)"/>
<g fill="none" stroke="#000" stroke-width="64" stroke-linecap="round"><path d="M70 230 Q300 20 530 230"/><path d="M135 320 Q300 170 465 320"/><path d="M205 410 Q300 330 395 410"/></g>
<g fill="none" stroke="#fff" stroke-width="40" stroke-linecap="round"><path d="M70 230 Q300 20 530 230"/><path d="M135 320 Q300 170 465 320"/><path d="M205 410 Q300 330 395 410"/></g>
<circle cx="300" cy="480" r="42" fill="#fff" stroke="#000" stroke-width="16"/>
<path d="M90 90 L510 530" stroke="#ff3b3b" stroke-width="50" stroke-linecap="round"/></svg>""",
"immune": """<svg viewBox="0 0 600 600" width="600" height="600" style="overflow:visible"><defs><filter id="b" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="20"/></filter></defs>
<circle cx="300" cy="300" r="270" fill="#4cff9a" opacity=".3" filter="url(#b)"/>
<path d="M300 40 L520 120 V300 Q520 470 300 560 Q80 470 80 300 V120Z" fill="#2d7fd3" stroke="#000" stroke-width="16"/><path d="M300 100 L470 160 V300 Q470 430 300 505 Q130 430 130 300 V160Z" fill="#6fd0ff"/>
<path d="M300 180 V420 M190 300 H410" stroke="#fff" stroke-width="56" stroke-linecap="round"/>
<g fill="#ff3b6a" stroke="#000" stroke-width="8"><circle cx="70" cy="90" r="46"/><circle cx="545" cy="500" r="40"/><circle cx="560" cy="120" r="34"/></g></svg>""",
}

def hero_thumb(tid, th):
    HTML = "file://" + os.path.join(os.path.dirname(os.path.abspath(__file__)), "engine", "thumb_tmp.html")
    c1, c2 = th.get("bg", ["#0a1230", "#3a1a6a"])
    hero = HEROES.get(th["hero"], HEROES["moon"])
    badge = th.get("badge", "")
    l1, l2 = th.get("line1", ""), th.get("line2", "")
    page = f"""<!doctype html><meta charset=utf-8><style>
@font-face{{font-family:'Poppins';font-weight:100 599;src:url(assets/fonts/Poppins-Medium.ttf)}}
@font-face{{font-family:'Poppins';font-weight:600 900;src:url(assets/fonts/Poppins-Bold.ttf)}}
*{{margin:0;padding:0;box-sizing:border-box}}body{{width:1280px;height:720px;overflow:hidden;font-family:Poppins}}
#s{{position:relative;width:1280px;height:720px;background:radial-gradient(circle at 70% 50%,{c2} 0%,{c1} 75%);overflow:hidden;filter:saturate(1.35) contrast(1.06)}}
.r{{position:absolute;left:-300px;top:-700px;width:2400px;height:2400px;background:repeating-conic-gradient(from 0deg at 62% 50%,rgba(255,255,255,.17) 0deg 9deg,rgba(255,255,255,0) 9deg 22deg);transform:scale(.7);transform-origin:62% 50%;-webkit-mask-image:radial-gradient(circle at 62% 50%,#000 0,transparent 40%)}}
.glow{{position:absolute;right:20px;top:60px;width:700px;height:700px;border-radius:50%;background:radial-gradient(circle,rgba(255,255,255,.55) 0,rgba(255,255,255,0) 65%)}}
.t{{position:absolute;left:40px;top:70px;width:720px;font:900 190px/0.92 Poppins;color:#fff;-webkit-text-stroke:16px #000;paint-order:stroke fill;text-shadow:0 10px 0 #000;letter-spacing:-5px}}
.t div:nth-child(2){{color:#ffe14a}}
.b{{position:absolute;left:40px;bottom:36px;background:#e5202a;color:#fff;font:900 44px Poppins;padding:8px 28px;border-radius:18px;border:7px solid #000;box-shadow:0 7px 0 #000;transform:rotate(-2deg)}}
.h{{position:absolute;right:-20px;top:40px;transform:scale(1.02);transform-origin:70% 40%}}
.m{{position:absolute;right:-30px;bottom:-40px;height:440px;filter:drop-shadow(7px 0 0 #fff) drop-shadow(-7px 0 0 #fff) drop-shadow(0 7px 0 #fff) drop-shadow(0 -7px 0 #fff) drop-shadow(0 14px 18px rgba(0,0,0,.55));transform:rotate(-5deg)}}
.x{{position:absolute;right:30px;bottom:440px;font:900 120px Poppins;color:#ff3b3b;-webkit-text-stroke:10px #000;paint-order:stroke fill;transform:rotate(-14deg)}}
.v{{position:absolute;inset:0;box-shadow:inset 0 0 140px rgba(0,0,0,.5)}}
</style><div id=s>{''.join(f'<i style="position:absolute;left:{(i*977)%1280}px;top:{(i*613)%720}px;width:{2+i%3}px;height:{2+i%3}px;border-radius:50%;background:#fff;opacity:.{4+i%5}"></i>' for i in range(50))}
<div class=r></div><div class=glow></div><div class=h>{hero}</div><div class=v></div><div class=t><div>{l1}</div><div>{l2}</div></div>{f'<div class=b>{badge}</div>' if badge else ''}<img class=m src="assets/mascot.png"><div class=x>!?</div></div>"""
    tmp = os.path.join(os.path.dirname(os.path.abspath(__file__)), "engine", "thumb_tmp.html")
    open(tmp, "w", encoding="utf-8").write(page)
    os.makedirs(OUT, exist_ok=True)
    out = os.path.join(OUT, "thumb.jpg")
    with sync_playwright() as p:
        b = p.chromium.launch(); pg = b.new_page(viewport={"width": 1280, "height": 720})
        pg.goto(HTML); pg.wait_for_timeout(900)
        pg.screenshot(path=out, type="jpeg", quality=90); b.close()
    os.remove(tmp)
    print("thumbnail ready:", out, os.path.getsize(out) // 1000, "KB")

if th.get("hero"):
    hero_thumb(tid, th); sys.exit(0)
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
