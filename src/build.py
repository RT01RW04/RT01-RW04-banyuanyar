#!/usr/bin/env python3
"""Membangun index.html mandiri (offline) dari template + aset gambar."""
import base64, json, os, pathlib, re

ROOT = pathlib.Path(__file__).resolve().parent.parent
SRC = ROOT / "src"
OUT = ROOT / "index.html"

template = (SRC / "index.template.html").read_text(encoding="utf-8")
css = (SRC / "app.css").read_text(encoding="utf-8")
css += "\n\n" + (SRC / "elegant.css").read_text(encoding="utf-8")
js = (SRC / "app.js").read_text(encoding="utf-8")

meta = json.loads((SRC / "images.json").read_text(encoding="utf-8"))

img_map = {}
dim_map = {}
total = 0
for key, info in meta.items():
    path = ROOT / info["file"]
    data = path.read_bytes()
    total += len(data)
    img_map[key] = "data:image/webp;base64," + base64.b64encode(data).decode("ascii")
    dim_map[key] = {"w": info["w"], "h": info["h"]}

img_script = (
    "window.__IMG__ = " + json.dumps(img_map) + ";\n"
    "window.__IMGDIM__ = " + json.dumps(dim_map) + ";"
)

html = template.replace("{{CSS}}", css).replace("{{JS}}", js).replace("{{IMGSCRIPT}}", img_script)
OUT.write_text(html, encoding="utf-8")

print(f"Gambar: {len(img_map)} berkas, {total/1024/1024:.2f} MB")
print(f"index.html: {OUT.stat().st_size/1024/1024:.2f} MB")
