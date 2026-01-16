# pip install google-genai python-dotenv

import os
from pathlib import Path
from typing import Optional

from dotenv import load_dotenv
from google import genai
from google.genai import types

# Auto-load .env file from project directory
load_dotenv(Path(__file__).parent / ".env")

_client: Optional[genai.Client] = None


def configure_nano_banana(api_key: Optional[str] = None) -> None:
    """
    Configure the Nano Banana Pro API key.

    Args:
        api_key: API key string. If not provided, reads from NANO_BANANA_API_KEY env var.
    """
    global _client
    key = api_key or os.getenv("NANO_BANANA_API_KEY")
    if not key:
        raise ValueError(
            "API key required. Either pass it directly or set NANO_BANANA_API_KEY environment variable."
        )
    _client = genai.Client(api_key=key)


def generate_image(
    prompt: str,
    temperature: float = 0.7,
    output_path: Optional[str] = None,
) -> Optional[bytes]:
    """
    Generate an image using Nano Banana Pro (Gemini 2.0 Flash).

    Args:
        prompt: Text description of the image to generate.
        temperature: Creativity level (0.0-1.0). Higher = more creative.
        output_path: Optional file path to save the image.

    Returns:
        Image bytes if successful, None otherwise.
    """
    global _client
    if _client is None:
        configure_nano_banana()

    response = _client.models.generate_content(
        model="gemini-2.5-flash-image",
        contents=[prompt],
        config=types.GenerateContentConfig(
            temperature=temperature,
            response_modalities=["TEXT", "IMAGE"],
        ),
    )

    for part in response.parts:
        if part.inline_data is not None:
            img_data = part.inline_data.data

            if output_path:
                Path(output_path).write_bytes(img_data)
                print(f"Image saved to {output_path}")

            return img_data

    print("No image generated.")
    return None


def display_image(img_data: bytes) -> None:
    """Display image in Jupyter/IPython environment."""
    try:
        from IPython.display import Image, display
        display(Image(data=img_data))
    except ImportError:
        print("IPython not available. Use output_path to save the image instead.")
