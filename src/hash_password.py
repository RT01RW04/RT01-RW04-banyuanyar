#!/usr/bin/env python3
"""Membuat hash kata sandi panel pengurus (dipakai di CONFIG.admin.hash)."""
import sys

SALT = "rt01-rw04-banyuanyar"
USER = "pengurus"


def hash_pass(user: str, password: str) -> str:
    s = f"{SALT}|{user.strip().lower()}|{password}".lower()
    h1, h2 = 5381, 52711
    for ch in s:
        c = ord(ch)
        h1 = (h1 * 33 + c) & 0xFFFFFFFF
        h2 = (h2 * 33 + c * 7) & 0xFFFFFFFF
    return f"{h1:08x}{h2:08x}"


if __name__ == "__main__":
    pwd = sys.argv[1] if len(sys.argv) > 1 else input("Kata sandi baru: ")
    user = sys.argv[2] if len(sys.argv) > 2 else USER
    print("\nSalin nilai berikut ke src/app.js → CONFIG.admin:")
    print(f'  user: "{user}",')
    print(f'  hash: "{hash_pass(user, pwd)}",')
