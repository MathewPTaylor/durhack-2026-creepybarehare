import os
import json
from google import genai

client = (
    genai.Client(api_key=os.getenv("GEMINI_API_KEY"))
    if os.getenv("GEMINI_API_KEY")
    else None
)


def analyse_report(report: str):
    if client is None:
        return {
            "incident": report,
            "severity": 5,
            "location": "unknown",
            "resources_required": ["investigation"],
            "confidence": "low",
            "source": "fallback"
        }

    prompt = f"""
    Analyse this emergency report.

    Return JSON with:
    location, incident, severity (1-10),
    resources_required, missing_information,
    confidence.

    You MUST NOT invent missing information.
    Report: {report}
    """

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt
    )

    return {
        **json.loads(response.text),
        "source": "gemini"
    }