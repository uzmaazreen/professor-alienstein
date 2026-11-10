"""Step 7: upload the finished video to YouTube (only when upload is switched on)."""
import json, os, sys
from google.oauth2.credentials import Credentials
from google.auth.transport.requests import Request
from googleapiclient.discovery import build
from googleapiclient.http import MediaFileUpload

WORK = "work"


def main():
    video = sys.argv[1] if len(sys.argv) > 1 else "my-video/out/long.mp4"
    thumb = sys.argv[2] if len(sys.argv) > 2 else ""
    privacy = os.environ.get("PRIVACY", "private")
    meta = json.load(open(f"{WORK}/meta.json", encoding="utf-8"))
    desc = open(f"{WORK}/description.txt", encoding="utf-8").read()
    creds = Credentials(
        None,
        refresh_token=os.environ["YT_REFRESH_TOKEN"],
        token_uri="https://oauth2.googleapis.com/token",
        client_id=os.environ["YT_CLIENT_ID"],
        client_secret=os.environ["YT_CLIENT_SECRET"],
        scopes=["https://www.googleapis.com/auth/youtube.upload", "https://www.googleapis.com/auth/youtube.force-ssl"],
    )
    creds.refresh(Request())
    yt = build("youtube", "v3", credentials=creds, cache_discovery=False)
    body = {
        "snippet": {
            "title": meta["title"][:100],
            "description": desc[:4900],
            "tags": meta.get("tags", []),
            "categoryId": "27",
            "defaultLanguage": "en",
            "defaultAudioLanguage": "en",
        },
        "status": {
            "privacyStatus": privacy,
            "selfDeclaredMadeForKids": False,
            "containsSyntheticMedia": True,
        },
    }
    req = yt.videos().insert(part="snippet,status", body=body, media_body=MediaFileUpload(video, chunksize=8 * 1024 * 1024, resumable=True))
    response = None
    while response is None:
        status, response = req.next_chunk()
        if status:
            print(f"uploaded {int(status.progress() * 100)}%")
    vid = response["id"]
    print("UPLOADED video id:", vid, "privacy:", privacy)
    result = {"id": vid, "privacy": privacy}
    if thumb and os.path.exists(thumb):
        try:
            yt.thumbnails().set(videoId=vid, media_body=MediaFileUpload(thumb)).execute()
            print("thumbnail set")
        except Exception as e:
            print("thumbnail not set:", e)
    comment = meta.get("comment", "")
    if comment:
        try:
            yt.commentThreads().insert(part="snippet", body={"snippet": {"videoId": vid, "topLevelComment": {"snippet": {"textOriginal": comment}}}}).execute()
            print("first comment posted")
        except Exception as e:
            print("comment not posted:", e)
    json.dump(result, open(f"{WORK}/upload_result.json", "w"))


if __name__ == "__main__":
    main()
