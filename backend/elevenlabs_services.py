from dotenv import load_dotenv
from elevenlabs.client import ElevenLabs
import os

load_dotenv()

elevenlabs = ElevenLabs(
  api_key=os.getenv("ELEVENLABS_API_KEY"),
)

def generate_speech(text):
    audio = elevenlabs.text_to_speech.convert(
        text=text,
        voice_id="GpOshR6AeCDz0A9MCHKJ", 
        model_id="eleven_v4",
        output_format="mp3_44100_128",
)

    return b"".join(audio)

