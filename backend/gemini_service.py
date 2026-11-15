import os
import json
from concurrent.futures import ThreadPoolExecutor, TimeoutError as FuturesTimeout
from dotenv import load_dotenv
from google import genai
from google.genai import types

load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")
client = (
    genai.Client(api_key=api_key, http_options={"timeout": 10000})
    if api_key
    else None
)

_executor = ThreadPoolExecutor(max_workers=2)


def _call_model(model_name: str, prompt: str) -> dict:
    response = client.models.generate_content(
        model=model_name,
        contents=prompt,
        config=types.GenerateContentConfig(
            response_mime_type="application/json"
        ),
    )
    return json.loads(response.text)


def analyse_report(report: str) -> dict:
    fallback = {
        "incident": report,
        "severity": 5,
        "location": "unknown",
        "resources_required": ["investigation"],
        "missing_information": [],
        "confidence": "low",
        "source": "fallback",
    }

    if client is None:
        print("[Gemini] No API key found, using fallback.", flush=True)
        return fallback

    prompt = f"""
    Analyse this emergency report.

    Return JSON with:
    - location (string or "unknown")
    - incident (string)
    - severity (integer 1-10)
    - resources_required (list of strings)
    - missing_information (list of strings)
    - confidence ("low", "medium", or "high")

    You MUST NOT invent missing information with the ONLY exception being resources
    required whereby you can make REASONABLE assumption .
    Report: {report}
    """

    for model_name in ["gemini-3.5-flash-lite"]:
        try:
            future = _executor.submit(_call_model, model_name, prompt)
            data = future.result(timeout=11.0)
            return {
                **fallback,
                **data,
                "source": model_name,
            }
        except FuturesTimeout:
            print(f"[Gemini Timeout] {model_name} took >11s, skipping...", flush=True)
        except Exception as e:
            print(f"[Gemini Error on {model_name}] {e}", flush=True)

    return fallback