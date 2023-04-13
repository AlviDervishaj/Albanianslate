#!/bin/bash

# Get video id from command line arguments
VIDEO_ID=$1


[ -z "$VIDEO_ID" ] && echo "ERROR: No VIDEO_ID specified  !" && exit 1
yt-dlp "https://www.youtube.com/watch?v=$VIDEO_ID" --format m4a -o "./downloaded_audio/%(id)s.%(ext)s" 2>&1
