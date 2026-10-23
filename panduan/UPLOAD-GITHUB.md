# 🚀 Panduan Upload Situs ke GitHub + Aktifkan GitHub Pages

Repo di folder **`rt01-banyuanyar/`** sudah **ter-commit** (branch `main`, 1 commit siap push).
Pilih **satu** dari tiga cara di bawah — cara A paling mudah.

---

## ✅ Cara A — Upload lewat peramban (tanpa install apa pun)

1. Masuk ke <https://github.com> → klik **+** kanan atas → **New repository**.
2. Isi:
   - **Repository name**: `rt01-banyuanyar`
   - **Description**: `Situs warga RT 01 / RW 04 Margorejo, Banyuanyar, Banjarsari, Surakarta`
   - Pilih **Public** (wajib bila ingin GitHub Pages gratis)
   - ❌ **Jangan** centang "Add a README file" (kita sudah punya)
3. Klik **Create repository**.
4. Pada halaman repo kosong, klik tautan **uploading an existing file**
   (atau buka langsung `https://github.com/<akun>/rt01-banyuanyar/upload/main`).
5. Seret **isi** folder `rt01-banyuanyar/` (bukan foldernya) ke halaman itu:
   ```
   index.html
   README.md
   LICENSE
   .nojekyll
   .gitignore
   panduan/
   src/
   assets/
   uploads/
   ```
   > File `.nojekyll` kadang tidak terlihat di Windows Explorer.
   > Alternatif termudah: gunakan **`rt01-github-repo.zip`** yang saya siapkan → ekstrak → seret isinya.
6. Di kotak **Commit changes**, tulis: `Situs RT 01 / RW 04 — versi awal` → **Commit changes**.

### Aktifkan GitHub Pages
7. Tab **Settings** → menu kiri **Pages**.
8. **Source**: `Deploy from a branch` → **Branch**: `main` + folder `/ (root)` → **Save**.
9. Tunggu ±1–2 menit, muat ulang halaman → muncul tautan:

```
https://<nama-akun>.github.io/rt01-banyuanyar/
```

10. Buat **QR code** dari tautan itu (mis. pakai qr-code-generator.com), tempel di Pos Kamling & grup WhatsApp warga.

---

## 💻 Cara B — GitHub Desktop (mudah, tanpa terminal)

1. Install **GitHub Desktop** → <https://desktop.github.com>
2. Login akun GitHub.
3. **File → Add local repository…** → pilih folder `rt01-banyuanyar`
   (folder ini sudah berisi `.git`, jadi langsung terdeteksi).
4. Klik **Publish repository** → nama `rt01-banyuanyar`, **uncheck** "Keep this code private" → **Publish**.
5. Aktifkan GitHub Pages seperti langkah 7–9 di Cara A.

> Untuk pembaruan berikutnya: ubah berkas → GitHub Desktop otomatis menampilkan perubahan → tulis ringkasan → **Commit to main** → **Push origin**.

---

## ⌨️ Cara C — Terminal / Git CLI (paling rapi)

```bash
cd rt01-banyuanyar          # folder repo yang sudah siap

# 1. buat repo kosong dulu di github.com (New repository, tanpa README)
#    lalu hubungkan:
git remote add origin https://github.com/<nama-akun>/rt01-banyuanyar.git

# 2. ganti nama branch bila perlu
git branch -M main

# 3. kirim
git push -u origin main
```

Bila diminta kata sandi, gunakan **Personal Access Token** (bukan password akun):

1. GitHub → **Settings** → **Developer settings** → **Personal access tokens** → **Tokens (classic)**
2. **Generate new token (classic)** → centang scope **`repo`** → **Generate**
3. Salin token, lalu saat `git push`:
   - Username: `<nama-akun>`
   - Password: **tempel token**

Setelah itu aktifkan Pages (langkah 7–9 Cara A).

### Pembaruan berikutnya (Cara C)

```bash
python3 src/build.py                # bangun ulang index.html setelah mengubah src/
git add -A
git commit -m "Perbarui nomor pengurus"
git push
```

Dalam ±1 menit situs otomatis ter-update.

---

## 🔧 Bila ada masalah

| Gejala | Penyebab & solusi |
|---|---|
| Halaman 404 | Pages belum selesai build. Cek tab **Actions**; tunggu 1–2 menit lalu muat ulang. Pastikan branch `main` dan folder `/ (root)`. |
| Tampil kode/README, bukan situs | `index.html` belum ada di root repo. Pastikan letaknya sejajar dengan `README.md`. |
| Foto tidak muncul | Berkas `index.html` terpotong saat upload (harus utuh ±2,3 MB). Upload ulang lewat GitHub Desktop/CLI. |
| Halaman kosong / gaya hilang | File `.nojekyll` belum terunggah. Tambahkan berkas kosong bernama `.nojekyll` di root. |
| Ingin alamat sendiri (mis. `rt01banyuanyar.id`) | Beli domain → **Settings → Pages → Custom domain** → isi domain → aktifkan **Enforce HTTPS** → arahkan DNS `CNAME` ke `<akun>.github.io`. |

---

## 🔒 Catatan keamanan

- Repo ini **tidak menyimpan kata sandi, token, atau data pribadi warga**.
- Nomor WhatsApp pengurus memang ditampilkan karena situs ini untuk warga — pastikan semua pengurus setuju sebelum repo dijadikan **Public**.
- Bila ingin lebih tertutup, gunakan repo **Private** + hosting gratis lain (Netlify/Vercel) yang tetap bisa menerbitkan situs.
- Jangan pernah menempelkan Personal Access Token di dalam kode atau commit.

---

## 📌 Setelah terpasang

- [ ] Tautan GitHub Pages dibuka di ponsel & desktop
- [ ] Tombol WhatsApp diuji (nomor tujuan benar)
- [ ] Formulir laporan dikirim & pesan rapi
- [ ] Galeri, kuis sampah, mode gelap berfungsi
- [ ] QR code dibuat & dibagikan ke warga
- [ ] Pengurus diberi tahu cara memperbarui (`panduan/EDIT-SITUS.md`)
