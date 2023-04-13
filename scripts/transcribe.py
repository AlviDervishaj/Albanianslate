import os
import openai
import sys

openai.api_key = os.getenv("OPEN_API_KEY")
video_id: str = sys.argv[1]
audio_file_path:str  = os.path.join(
    os.getcwd(), 'downloaded_audio', video_id + '.m4a'
)


audio_file = open(audio_file_path, 'rb')
transcript = openai.Audio.transcribe(
    file=audio_file,
    model='whisper-1',
    response_format='srt',
)
print(transcript)
