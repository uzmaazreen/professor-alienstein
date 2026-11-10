"""Step 1: pick today's topic from free science news feeds, and read the article."""
import json, re, sys
import xml.etree.ElementTree as ET
from html.parser import HTMLParser
import requests
from common import load_state, ensure_work, WORK

FEEDS = [
    ("NASA", "https://www.nasa.gov/feed/"),
    ("ScienceDaily", "https://www.sciencedaily.com/rss/top/science.xml"),
    ("Live Science", "https://www.livescience.com/feeds/all"),
    ("Phys.org", "https://phys.org/rss-feed/"),
]
BLOCK = ["cancer", "covid", "vaccine", "diet", "weight loss", "cure", "treatment", "therapy", "dies", "death", "killed",
         "war", "attack", "election", "trump", "biden", "suicide", "murder", "stock", "crypto", "invest", "lawsuit"]
UA = {"User-Agent": "Mozilla/5.0 (ProfessorAlienstein educational bot)"}


class TextGrabber(HTMLParser):
    def __init__(self):
        super().__init__()
        self.skip = 0
        self.in_p = False
        self.parts = []

    def handle_starttag(self, tag, attrs):
        if tag in ("script", "style", "nav", "footer", "header", "aside", "form"):
            self.skip += 1
        if tag == "p":
            self.in_p = True

    def handle_endtag(self, tag):
        if tag in ("script", "style", "nav", "footer", "header", "aside", "form") and self.skip:
            self.skip -= 1
        if tag == "p":
            self.in_p = False
            self.parts.append("\n")

    def handle_data(self, data):
        if self.in_p and not self.skip:
            self.parts.append(data)


def article_text(html):
    g = TextGrabber()
    g.feed(html)
    text = re.sub(r"[ \t]+", " ", "".join(g.parts))
    paras = [p.strip() for p in text.split("\n") if len(p.strip()) > 60]
    return "\n".join(paras)


def parse_feed(xml_text, source):
    items = []
    try:
        root = ET.fromstring(xml_text)
    except ET.ParseError:
        return items
    for it in root.iter():
        tag = it.tag.split("}")[-1]
        if tag not in ("item", "entry"):
            continue
        title = link = summary = ""
        for ch in it:
            t = ch.tag.split("}")[-1]
            if t == "title":
                title = (ch.text or "").strip()
            elif t == "link":
                link = (ch.text or ch.attrib.get("href") or "").strip()
            elif t in ("description", "summary"):
                summary = re.sub(r"<[^>]+>", "", ch.text or "").strip()
        if title and link:
            items.append({"title": title, "link": link, "summary": summary, "source": source})
    return items


def main():
    ensure_work()
    state = load_state()
    used_links = {u.get("link") for u in state.get("used", [])}
    used_titles = {u.get("title", "").lower() for u in state.get("used", [])}
    pools = []
    for source, url in FEEDS:
        try:
            r = requests.get(url, headers=UA, timeout=30)
            r.raise_for_status()
            items = parse_feed(r.text, source)
            print(f"{source}: {len(items)} items")
            pools.append(items)
        except Exception as e:
            print(f"{source}: skipped ({e})")
    # round-robin so one site does not dominate
    order = []
    for i in range(30):
        for p in pools:
            if i < len(p):
                order.append(p[i])
    for it in order:
        low = it["title"].lower()
        if it["link"] in used_links or low in used_titles:
            continue
        if any(b in low for b in BLOCK):
            continue
        try:
            r = requests.get(it["link"], headers=UA, timeout=30)
            text = article_text(r.text)
        except Exception as e:
            print("could not read", it["link"], e)
            continue
        if len(text) < 900:
            print("too little text, skipping:", it["title"])
            continue
        it["text"] = text[:7000]
        json.dump(it, open(f"{WORK}/topic.json", "w", encoding="utf-8"), ensure_ascii=False, indent=2)
        print("TOPIC:", it["title"], "|", it["source"], "|", len(text), "characters read")
        return
    print("No usable topic found today.")
    sys.exit(1)


if __name__ == "__main__":
    main()
