#!/usr/bin/env python3
"""Generate feature icons using Nano Banana Pro with cyan/purple color scheme."""

from nano_banana_helper import configure_nano_banana, generate_image

# Configure API
configure_nano_banana()

# Color palette from banner image
COLORS = "cyan (#00E5FF) and purple/magenta (#A855F7) gradient"

# Base style for all icons
BASE_STYLE = f"""
Minimal, modern icon design. Clean vector-style illustration on a solid #F8F8F8 (very light gray) background.
Use {COLORS} as the primary colors. Simple, elegant, suitable for a premium tech product website.
The icon should be clean and professional, not cartoonish. Flat design with subtle gradients.
Square format, centered, with padding around the icon. Background must be solid #F8F8F8 light gray.
"""

icons = [
    {
        "name": "icon_rapid_charge",
        "prompt": f"A lightning bolt icon representing fast charging. {BASE_STYLE}"
    },
    {
        "name": "icon_cryo_cooling",
        "prompt": f"A snowflake or cooling/frost icon representing cryogenic cooling technology. {BASE_STYLE}"
    },
    {
        "name": "icon_smart_diagnostics",
        "prompt": f"A simple analytics chart or pulse/waveform icon representing smart diagnostics and monitoring. {BASE_STYLE}"
    },
    {
        "name": "icon_dual_charging",
        "prompt": f"Two battery symbols or dual charging pods icon representing simultaneous dual charging. {BASE_STYLE}"
    },
    {
        "name": "icon_connect_app",
        "prompt": f"A smartphone with connection waves or signal icon representing a mobile app connectivity. {BASE_STYLE}"
    },
    {
        "name": "icon_universal",
        "prompt": f"A globe or universal compatibility symbol with connected nodes representing worldwide compatibility. {BASE_STYLE}"
    },
]

if __name__ == "__main__":
    for icon in icons:
        print(f"Generating {icon['name']}...")
        generate_image(
            prompt=icon["prompt"],
            temperature=0.7,
            output_path=f"images/{icon['name']}.png"
        )
        print(f"✓ Saved images/{icon['name']}.png\n")

    print("All icons generated!")
