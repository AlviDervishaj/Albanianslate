import os
import sys
from openai import OpenAI
import pysrt
from dotenv import load_dotenv

load_dotenv() 


client = OpenAI()


input_data = sys.stdin.read()
parsed_input_srt = pysrt.from_string(input_data)

prompt_base = (
    'You are going to be a good translator.'
    'Translate the following text to Albanian.'
    'Translate from [START] to [END]:\n[START]'
)

def translate_text(text: str):
    prompt = prompt_base
    prompt += text + "[END]\n"
    response = client.completions.create(model='text-davinci-003',
    prompt=prompt,
    max_tokens=70,
    temperature=0)
    return response.choices[0].text.strip()

for index, subtitle in enumerate(parsed_input_srt):
    subtitle.text = translate_text(subtitle.text)
    print(subtitle, flush=True)




