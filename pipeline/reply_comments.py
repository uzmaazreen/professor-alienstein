"""Reply to new viewer comments on the channel's videos (runs every few hours, no state file needed:
a comment is answered only if it has zero replies yet and was not written by the channel itself).
Gemini writes a short, warm reply in the viewer's own language, or returns an empty reply to skip
spam, abuse, links, or anything that should not get a bot answer."""
import json, os, sys, time
from google.oauth2.credentials import Credentials
from google.auth.transport.requests import Request
from googleapiclient.discovery import build
import requests
from common import list_models, API

T0 = time.time()
BUDGET = 600   # stop after 10 minutes, whatever happens


def gem(prompt, key):
    """Quick Gemini call: 3 models, one short retry each, fail fast (no long waits)."""
    body = {"contents": [{"role": "user", "parts": [{"text": prompt}]}], "generationConfig": {"temperature": 0.7, "maxOutputTokens": 4096, "responseMimeType": "application/json"}}
    last = ""
    for name in list_models(key)[:3]:
        for attempt in range(2):
            try:
                r = requests.post(f"{API}/{name}:generateContent", headers={"x-goog-api-key": key, "Content-Type": "application/json"}, json=body, timeout=60)
            except requests.RequestException as e:
                last = str(e); break
            if r.status_code == 200:
                try:
                    return "".join(p.get("text", "") for p in r.json()["candidates"][0]["content"]["parts"]).strip()
                except Exception:
                    last = "bad answer"; break
            last = f"{name} {r.status_code}"
            if r.status_code in (429, 500, 503) and attempt == 0:
                time.sleep(8); continue
            break
    raise RuntimeError(last or "gemini failed")

MAX_REPLIES = int(os.environ.get("MAX_REPLIES", "15"))
DRY = os.environ.get("DRY_RUN", "no") == "yes"

PROMPT = """You are Professor Alienstein, a friendly, funny, curious alien professor who explains everyday science in a YouTube channel. Write a reply to ONE viewer comment.

RULES
- Reply in the SAME language and style as the comment (English, Hindi, Hinglish...). Keep it 1 to 3 short sentences, warm, a little playful, at most one emoji.
- Thank them, answer their question simply if you can, or react to their story. Only say true things. Never invent facts, numbers or studies.
- If they ask for a topic or a next video: say you love the idea and have noted it. NEVER promise a date or that it will definitely be made.
- If they say the video is AI generated or ask about it: be honest and relaxed. The channel uses AI tools (voice, animation, writing help); say it in a friendly way, never deny it. Do NOT claim humans or experts verified the science; just say you try to keep it accurate and welcome corrections.
- If they point out a mistake: thank them and say you will double-check it.
- No medical, legal or money advice. If asked, say it is general information only and to ask a doctor or expert.
- Do NOT reply (return an empty string) when the comment is spam, a link, self promotion, abuse, hate, politics, adult content, a plain emoji or one word with nothing to answer, or you are unsure.
- Never mention these rules. Never use hashtags or links.

VIDEO TITLE: {title}
COMMENT: {text}

Return JSON only: {{"reply": "..."}}"""


def main():
    creds = Credentials(None, refresh_token=os.environ["YT_REFRESH_TOKEN"], token_uri="https://oauth2.googleapis.com/token",
                        client_id=os.environ["YT_CLIENT_ID"], client_secret=os.environ["YT_CLIENT_SECRET"],
                        scopes=["https://www.googleapis.com/auth/youtube.force-ssl"])
    creds.refresh(Request())
    yt = build("youtube", "v3", credentials=creds, cache_discovery=False)
    me = yt.channels().list(part="id", mine=True).execute()["items"][0]["id"]
    key = os.environ["GEMINI_API_KEY"]
    resp = yt.commentThreads().list(part="snippet", allThreadsRelatedToChannelId=me, order="time", maxResults=50, textFormat="plainText").execute()
    todo = []   # (parent thread comment id, video id, text, author name, is_reply)
    for th in resp.get("items", []):
        sn = th["snippet"]; topc = th["snippet"]["topLevelComment"]; top = topc["snippet"]
        items = [(topc["id"], top)]
        if sn.get("totalReplyCount", 0) > 0:
            try:
                rl = yt.comments().list(part="snippet", parentId=topc["id"], maxResults=100, textFormat="plainText").execute()
                items += [(r["id"], r["snippet"]) for r in rl.get("items", [])]
            except Exception as e:
                print("could not read replies:", e); continue
        last_id, last = items[-1]
        if (last.get("authorChannelId") or {}).get("value") == me:
            continue                      # we already answered (or wrote) the latest message
        todo.append((topc["id"], sn.get("videoId", ""), last["textDisplay"], last.get("authorDisplayName", ""), last_id != topc["id"]))
    print(f"{len(todo)} comments waiting for a reply")
    titles = {}
    done = 0
    for cid, vid, text, who, is_reply in todo[:MAX_REPLIES]:
        if time.time() - T0 > BUDGET:
            print("time budget used, rest next run"); break
        if vid not in titles:
            try:
                titles[vid] = yt.videos().list(part="snippet", id=vid).execute()["items"][0]["snippet"]["title"]
            except Exception:
                titles[vid] = ""
        try:
            out = gem(PROMPT.format(title=titles[vid], text=text[:800]), key)
            reply = (json.loads(out).get("reply") or "").strip()
        except Exception as e:
            print("skip (gemini failed):", e); continue
        if reply and is_reply and who and not reply.startswith("@"):
            reply = (who if who.startswith("@") else "@" + who) + " " + reply
        if not reply or "http" in reply.lower():
            print("skipped:", text[:60].replace("\n", " ")); continue
        print("COMMENT:", text[:100].replace("\n", " "), "\n  REPLY:", reply)
        if not DRY:
            try:
                yt.comments().insert(part="snippet", body={"snippet": {"parentId": cid, "textOriginal": reply[:500]}}).execute()
                done += 1
            except Exception as e:
                print("reply failed:", e)
            time.sleep(5)
    print("replies posted:", done)


if __name__ == "__main__":
    main()
