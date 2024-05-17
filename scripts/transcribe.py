import os
from openai import OpenAI
import sys
from dotenv import load_dotenv

load_dotenv() 

client = OpenAI()

video_id: str = sys.argv[1]
audio_file_path:str  = os.path.join(
    os.getcwd(), 'downloaded_audio', video_id + '.m4a'
)


audio_file = open(audio_file_path, 'rb')
transcript = client.audio.transcriptions.create(file=audio_file,
model='whisper-1',
response_format='srt')
# save to file 
with open(f"./transcripts/{video_id}.srt", "w+") as f:
    f.write(transcript)
print(transcript)
