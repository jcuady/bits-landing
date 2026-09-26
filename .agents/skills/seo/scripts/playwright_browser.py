"""Launch Playwright Chromium with a system-Chrome fallback on Windows.

Bundled Playwright Chromium downloads from cdn.playwright.dev often time out
on restricted networks. Google Chrome is already installed on this machine and
works via Playwright's channel='chrome' API.
"""

from __future__ import annotations

import os
from typing import Any


def launch_chromium(playwright: Any, **kwargs: Any):
    """Return a Playwright browser. Prefer bundled Chromium, then Chrome channel."""
    headless = kwargs.pop("headless", True)
    preferred = os.environ.get("CLAUDE_SEO_BROWSER_CHANNEL", "").strip().lower()
    channels: list[str | None]
    if preferred in {"chrome", "msedge", "chromium", "chrome-beta"}:
        channels = [preferred, None]
    else:
        channels = [None, "chrome", "msedge"]

    last_error: Exception | None = None
    for channel in channels:
        try:
            if channel:
                return playwright.chromium.launch(
                    headless=headless, channel=channel, **kwargs
                )
            return playwright.chromium.launch(headless=headless, **kwargs)
        except Exception as exc:  # noqa: BLE001 - try next channel
            last_error = exc
            continue
    if last_error is not None:
        raise last_error
    raise RuntimeError("Unable to launch a Chromium-compatible browser.")
