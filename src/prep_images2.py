from PIL import Image, ImageOps
import os, json
SRC="uploads"; OUT="assets"
JOBS = [
    ("hero",  "WhatsApp Image 2026-07-25 at 15.18.47.jpg", 1500, 62),
    ("hero2", "WhatsApp Image 2026-07-25 at 18.00.39 (1).jpeg", 1200, 60),
    ("g01","WhatsApp Image 2026-07-27 at 13.23.22.jpeg", 820, 54),
    ("g02","WhatsApp Image 2026-07-27 at 13.30.42.jpg", 820, 54),
    ("g03","WhatsApp Image 2026-07-25 at 14.21.25 (1).jpeg", 720, 52),
    ("g04","WhatsApp Image 2026-07-25 at 14.21.35 (2).jpeg", 720, 52),
    ("g05","WhatsApp Image 2026-07-25 at 14.21.37 (1).jpeg", 720, 52),
    ("g06","WhatsApp Image 2026-07-25 at 14.21.37.jpeg", 720, 52),
    ("g07","WhatsApp Image 2026-07-25 at 14.21.45 (1).jpg", 860, 54),
    ("g08","WhatsApp Image 2026-07-25 at 15.18.47.jpg", 860, 54),
    ("g09","WhatsApp Image 2026-07-25 at 17.58.12.jpeg", 820, 54),
    ("g10","WhatsApp Image 2026-07-25 at 18.00.37.jpeg", 860, 54),
    ("g11","WhatsApp Image 2026-07-25 at 18.00.38 (1).jpeg", 780, 52),
    ("g12","WhatsApp Image 2026-07-25 at 18.00.38.jpeg", 860, 54),
    ("g13","WhatsApp Image 2026-07-25 at 18.00.39 (1).jpeg", 860, 54),
    ("g14","WhatsApp Image 2026-07-25 at 18.00.39 (2).jpeg", 860, 54),
    ("g15","WhatsApp Image 2026-07-25 at 18.00.39.jpg", 860, 54),
    ("g16","WhatsApp Image 2026-07-25 at 18.00.41 (1).jpg", 860, 54),
    ("g17","WhatsApp Image 2026-07-25 at 18.00.43 (1).jpeg", 740, 52),
    ("g18","WhatsApp Image 2026-07-25 at 18.00.43.jpeg", 860, 54),
    ("g19","tsd2.jpg", 960, 56),
]
meta={}; total=0
for key, fn, w, q in JOBS:
    im = ImageOps.exif_transpose(Image.open(os.path.join(SRC,fn)).convert("RGB"))
    if im.width > w:
        im = im.resize((w, round(im.height*w/im.width)), Image.LANCZOS)
    p=os.path.join(OUT,key+".webp"); im.save(p,"WEBP",quality=q,method=6)
    s=os.path.getsize(p); total+=s
    meta[key]={"file":p,"w":im.width,"h":im.height,"bytes":s,"src":fn}
    print(f"{key:6s} {im.width}x{im.height} {s/1024:6.1f} KB")
print(f"TOTAL {total/1024/1024:.2f} MB  base64≈{total*1.37/1024/1024:.2f} MB")
json.dump(meta, open("src/images.json","w"), indent=1)
