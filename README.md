# 🏡 Website RT 01 / RW 04 — Margorejo, Banyuanyar, Banjarsari, Surakarta

Situs resmi warga **RT 01 / RW 04**, Kelurahan Banyuanyar, Kecamatan Banjarsari, Kota Surakarta, Jawa Tengah **57137**.

> **DARI WARGA UNTUK WARGA**

Situs dibuat sebagai satu berkas `index.html` yang sudah memuat seluruh foto, gaya, dan skrip di dalamnya — jadi bisa dibuka langsung tanpa server, tanpa internet, dan tanpa database.

---

## 🌐 Lihat situsnya

Setelah GitHub Pages diaktifkan (lihat langkah di bawah), situs dapat diakses di:

```
https://<nama-akun-github>.github.io/rt01-banyuanyar/
```

---

## ✨ Fitur

| Bagian | Isi |
|---|---|
| **Beranda** | Sambutan, alamat lengkap, ringkasan angka, tombol cepat |
| **Struktur Pengurus** | 7 pengurus dengan tombol WhatsApp langsung |
| **Lapor** | 4 kanal: Keluhan Warga, Usulan & Surat, Iuran Wajib, Jimpitan |
| **Himbauan Sampah** | Ilustrasi 3 bak sampah, 4 langkah pemilahan, kuis 12 jenis sampah, komitmen warga |
| **Kegiatan & Galeri** | 6 program kegiatan, 19 foto dengan filter + penampil layar penuh |
| **Tanya Jawab & Kontak** | FAQ warga, alamat, jam layanan, tombol Google Maps |

- **Formulir → WhatsApp**: pesan tersusun otomatis (rapi & bernomor), ada pratinjau, tombol salin pesan, dan riwayat laporan di perangkat.
- **Mode gelap/terang**, ramah ponsel, tanpa geser horizontal, siap dicetak.
- **Ukuran huruf dasar 20px** (huruf sedang) agar nyaman dibaca warga segala usia.

---

## 👥 Pengurus & kontak WhatsApp

| Jabatan | Nama | WhatsApp |
|---|---|---|
| Ketua RT | Awan Prihanto, S.T. | 0812-6943-924 |
| Ketua PKK | Handayani, S.E. | 0821-3774-4787 |
| Sekretaris I | Sardi, S.Pd. | 0817-266-669 |
| Sekretaris II | Tri Widagdo | 0819-1232-9060 |
| Bendahara I | Wiryanto (Antok Comal) | 0813-2773-1313 |
| Bendahara II | Wahyu Widodo | 0882-3349-1027 |
| Bendahara Jimpitan | Ikhsan Jauhari | 0812-2629-9906 |

Penerima laporan: **Keluhan → Ketua RT**, **Usulan & Surat → Sekretaris I**, **Iuran Wajib → Bendahara II**, **Jimpitan → Bendahara Jimpitan**.

---

## 📁 Struktur repo

```
.
├── index.html          ← situs siap pakai (semua aset sudah di dalamnya)
├── .nojekyll           ← agar GitHub Pages tidak memproses situs dengan Jekyll
├── README.md
├── LICENSE
├── panduan/
│   └── EDIT-SITUS.md   ← cara mengubah nomor, teks, dan foto
├── src/                ← kode sumber (opsional, untuk pengembangan)
│   ├── index.template.html
│   ├── app.js          ← data pengurus, teks formulir, konfigurasi
│   ├── app.css
│   ├── elegant.css     ← tema elegan & profesional
│   ├── prep_images2.py ← optimasi foto → WebP
│   ├── build.py        ← gabung template + css + js + foto → index.html
│   └── images.json
├── uploads/            ← foto asli dari warga
└── assets/             ← foto yang sudah dioptimalkan
```

---

## 🚀 Mengaktifkan GitHub Pages

1. Buka repo ini di GitHub → tab **Settings**.
2. Menu kiri: **Pages**.
3. Bagian **Build and deployment** → *Source*: **Deploy from a branch**.
4. *Branch*: **main**, folder: **/ (root)** → **Save**.
5. Tunggu 1–2 menit, lalu buka tautan `https://<nama-akun>.github.io/rt01-banyuanyar/`.

> Berkas `index.html` otomatis menjadi halaman utama — tidak perlu konfigurasi tambahan.

---

## 🔄 Cara memperbarui situs

**Cara termudah (tanpa alat):**

1. Buka `index.html` di GitHub → ikon ✏️ (Edit).
2. Cari teks/nomor yang ingin diganti (mis. `08126943924`).
3. **Commit changes** → tunggu ±1 menit, situs otomatis diperbarui.

**Cara rapi (disarankan untuk perubahan besar):**

```bash
# 1. clone repo
git clone https://github.com/<nama-akun>/rt01-banyuanyar.git
cd rt01-banyuanyar

# 2. ubah data di src/app.js (pengurus, nomor WhatsApp, teks formulir)
#    atau src/index.template.html (teks halaman)

# 3. bangun ulang index.html
python3 src/build.py

# 4. kirim perubahan
git add -A
git commit -m "Perbarui data pengurus"
git push
```

---

## 🖼️ Menambah foto kegiatan

1. Taruh foto baru di `uploads/`.
2. Daftarkan nama berkasnya di `src/prep_images2.py` (bagian `JOBS`).
3. Jalankan:
   ```bash
   python3 src/prep_images2.py   # optimasi → assets/*.webp
   python3 src/build.py          # gabung ulang → index.html
   ```
4. Tambahkan keterangan foto pada `GALLERY` di `src/app.js`.

---

## 🔒 Privasi

Situs ini **statis**: tidak ada server, tidak ada database, dan tidak ada data warga yang dikirim ke mana pun. Riwayat laporan hanya tersimpan di penyimpanan lokal peramban (localStorage) milik masing-masing perangkat dan dapat dihapus kapan saja. Laporan baru terkirim setelah warga menekan tombol WhatsApp dan mengirim pesannya.

---

## 📄 Lisensi

- **Kode** situs: MIT (bebas dipakai & dimodifikasi untuk kepentingan warga).
- **Foto & dokumen kegiatan**: milik warga RT 01 / RW 04 Banyuanyar — mohon tidak dipakai ulang tanpa izin.

---

## 🤝 Kontribusi warga

Punya usulan tampilan, data kegiatan baru, atau koreksi nomor pengurus? Silakan buka **Issues** di repo ini atau hubungi Sekretaris RT.

---

**RT 01 / RW 04 — Margorejo, Banyuanyar, Banjarsari, Surakarta 57137**
*Guyub rukun, rukun agawe santosa.* 🌿
