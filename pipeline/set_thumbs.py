"""Replace the thumbnail of already uploaded long videos with the new curiosity design.
Usage (in Actions): python pipeline/set_thumbs.py smog winter-body ai-chatbot"""
import glob, json, os, subprocess, sys
from google.oauth2.credentials import Credentials
from google.auth.transport.requests import Request
from googleapiclient.discovery import build
from googleapiclient.http import MediaFileUpload

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
creds = Credentials(None, refresh_token=os.environ["YT_REFRESH_TOKEN"], token_uri="https://oauth2.googleapis.com/token",
                    client_id=os.environ["YT_CLIENT_ID"], client_secret=os.environ["YT_CLIENT_SECRET"],
                    scopes=["https://www.googleapis.com/auth/youtube.force-ssl"])
creds.refresh(Request())
yt = build("youtube", "v3", credentials=creds, cache_discovery=False)
up = yt.channels().list(part="contentDetails", mine=True).execute()["items"][0]["contentDetails"]["relatedPlaylists"]["uploads"]
vids = []
tok = None
while True:
    r = yt.playlistItems().list(part="snippet", playlistId=up, maxResults=50, pageToken=tok).execute()
    vids += [(i["snippet"]["resourceId"]["videoId"], i["snippet"]["title"]) for i in r["items"]]
    tok = r.get("nextPageToken")
    if not tok or len(vids) > 300:
        break
for tid in sys.argv[1:]:
    t = json.load(open(os.path.join(ROOT, "long", "topics", tid + ".json"), encoding="utf-8"))
    want = t["title"][:60].lower()
    hit = [v for v in vids if v[1].lower().startswith(want)]
    if not hit:
        print(f"{tid}: video not found on the channel (title starts '{want}')"); continue
    vid = hit[0][0]
    subprocess.run([sys.executable, os.path.join(ROOT, "long", "make_thumb.py"), tid], check=True, cwd=ROOT)
    yt.thumbnails().set(videoId=vid, media_body=MediaFileUpload(os.path.join(ROOT, "long", "out", "thumb.jpg"))).execute()
    print(f"{tid}: thumbnail updated on https://youtu.be/{vid}")
