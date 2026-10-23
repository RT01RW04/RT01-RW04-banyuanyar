# Website RT 01 / RW 04 — Margorejo, Banyuanyar, Banjarsari, Surakarta 57137

Website interaktif untuk warga RT 01 / RW 04. Seluruh isi berada dalam **satu berkas `index.html`** — foto, gaya, dan skrip sudah menyatu di dalamnya, jadi bisa dibuka langsung tanpa internet dan tanpa server.

---

## 1. Isi paket

| Berkas | Keterangan |
|---|---|
| `index.html` | **Website siap pakai** (2,2 MB, sudah termasuk 19 foto kegiatan). Buka dengan Chrome/Safari/Edge. |
| `README.md` | Panduan ini. |
| `src/app.js` | Kode interaktif + **data pengurus dan nomor WhatsApp** (untuk pengembangan). |
| `src/app.css` | Tampilan dasar (untuk pengembangan). |
| `src/elegant.css` | Tema elegan & profesional (huruf dasar 20px) + ilustrasi bak sampah. |
| `src/index.template.html` | Kerangka halaman (untuk pengembangan). |
| `src/prep_images2.py` | Skrip pengolah foto (kompresi + ubah ke WebP). |
| `src/build.py` | Skrip penggabung: template + CSS + JS + foto → `index.html`. |
| `assets/*.webp` | Foto kegiatan yang sudah dioptimalkan. |
| `uploads/` | Foto asli yang Anda kirimkan. |

---

## 2. Fitur website (tema elegan & profesional)

Tampilan memakai gaya **elegan–profesional**: palet emerald–emas–ivory, judul serif, kartu bertepi halus, pita slogan berjalan, dan animasi lembut (otomatis nonaktif bila pengguna memilih reduce-motion). Ukuran huruf dasar **20px (huruf sedang)** agar nyaman dibaca warga segala usia; otomatis menyesuaikan 19–18px di layar kecil. Slogan **“DARI WARGA UNTUK WARGA”** tampil di hero, pita berjalan, dan footer.

1. **Beranda** — sambutan, alamat lengkap, ringkasan angka, tombol cepat.
2. **Struktur pengurus** — 7 pengurus dengan **tombol gelembung WhatsApp**. Nomor pribadi **tidak ditampilkan** di halaman; tombol langsung membuka chat dengan pesan siap kirim.
2b. **Pengumuman warga** — papan kabar resmi pengurus: kategori (Kegiatan, Kesehatan, Keamanan, Iuran, Umum), tanggal, tanda **Disematkan** & **Baru**, dan tombol **Bagikan** ke WhatsApp. Diisi lewat panel **Kelola** (khusus pengurus, dengan nama pengguna + kata sandi).
2c. **Penilaian bintang 5** — warga memberi nilai 1–5 bintang beserta catatan singkat untuk **Ketua RT** dan **Ketua PKK** di halaman Pengurus; penilaian terkirim ke WhatsApp masing-masing pengurus.
3. **Keluhan Warga** → WhatsApp Ketua RT (Bp. Awan Prihanto, S.T.)
4. **Usulan & Surat** → WhatsApp Sekretaris I (Bp. Sardi, S.Pd.)
5. **Laporan Iuran Wajib** → WhatsApp Bendahara II (Bp. Wahyu Widodo)
6. **Laporan Jimpitan** → WhatsApp Bendahara Jimpitan (Bp. Ikhsan Jauhari)
   - Setiap formulir: validasi isian, pratinjau pesan, tombol **Salin pesan**, dan **riwayat laporan** di perangkat.
   - Format pesan otomatis, sehingga mudah dibaca dan diarsipkan pengurus.
   - Tombol kirim memakai **ikon gelembung chat**, bukan lagi logo WA.
7. **Himbauan pengelolaan sampah** — **ilustrasi 3 bak sampah (organik, anorganik, residu/B3)**, 4 langkah pemilahan, kuis interaktif 12 jenis sampah dengan **bak sampah bergambar**, dan daftar komitmen warga yang tersimpan otomatis.
8. **Galeri** — 19 foto dengan filter kategori dan penampil layar penuh (bisa digeser di ponsel).
9. **Tanya jawab** — iuran, jimpitan, pemilahan sampah, dan privasi data.
10. **Kontak & lokasi** — alamat, jam layanan, tombol Google Maps.
11. **Mode gelap/terang**, navigasi seluler, tombol aksi cepat di bawah layar, animasi halus, dan siap dicetak.

> Catatan privasi: tidak ada data yang dikirim ke server. Situs berjalan di perangkat warga; laporan baru terkirim setelah warga menekan tombol WhatsApp dan mengirim pesan.

---

## 3. Cara memakai

- **Dari komputer:** klik dua kali `index.html`.
- **Dari ponsel:** kirim `index.html` lewat WhatsApp/email ke ponsel, lalu buka dengan aplikasi Chrome/Files.
- **Gratis di internet** (agar bisa dibagikan sebagai tautan):
  1. Buka <https://app.netlify.com/drop> → seret berkas `index.html` → tautan langsung jadi (mis. `rt01-banyuanyar.netlify.app`).
  2. Alternatif: GitHub Pages, Cloudflare Pages, atau Vercel — unggah satu berkas yang sama.
  3. Buat **QR code** dari tautan tersebut, lalu tempel di Pos Kamling / grup WhatsApp warga.

### Unggah ke GitHub Pages (opsional)

1. Buat repo baru di <https://github.com/new> — pilih **Public**, tanpa README.
2. Klik **uploading an existing file**, seret **isi folder repo ini** (minimal `index.html`).
3. **Settings → Pages** → Source `Deploy from a branch` → Branch `main`, folder `/ (root)` → **Save**.
4. Tunggu 1–2 menit → situs live di `https://<akun>.github.io/<nama-repo>/`.

Panduan rinci: `panduan/UPLOAD-GITHUB.md`.

---

## 4. Mengubah data pengurus / nomor WhatsApp

**Cara cepat (tanpa alat tambahan):** buka `index.html` dengan Notepad/TextEdit, cari nomor lama (mis. `08126943924`), ganti, lalu simpan.

**Cara rapi (disarankan):**
1. Buka `src/app.js`, bagian **`const CONFIG`** di baris paling atas.
2. Ubah `pengurus` (nama, jabatan, nomor `wa`), `layanan`, atau alamat.
   - Nomor boleh ditulis `08xx…`; situs otomatis mengubahnya ke format WhatsApp `62xx…`.
   - Untuk pengurus tanpa nomor, cukup isi `wa: ""` → akan tampil "Nomor WA belum dicantumkan".
3. Jalankan pembangun ulang:
   ```bash
   python3 src/build.py
   ```
4. `index.html` otomatis diperbarui. Foto baru? Tambahkan ke `uploads/`, daftarkan di `src/prep_images2.py`, jalankan `python3 src/prep_images2.py` lalu `python3 src/build.py`.

---

## 5. Akun pengurus & pengumuman

Panel **Kelola** pada bagian Pengumuman memakai satu akun bersama untuk seluruh pengurus:

| Kolom | Nilai bawaan |
|---|---|
| Nama pengguna | `pengurus` |
| Kata sandi | `banyuanyar2026` |

> **Segera ganti kata sandi bawaan sebelum situs dibagikan ke warga.**

### Mengganti kata sandi
1. Buka terminal di folder proyek, jalankan:
   ```bash
   python3 src/hash_password.py "kata-sandi-baru"
   ```
2. Salin nilai `hash` yang muncul ke `src/app.js` pada bagian `CONFIG.admin`:
   ```js
   admin: {
     salt: "rt01-rw04-banyuanyar",
     user: "pengurus",          // boleh diganti
     hash: "…………"               // hasil dari skrip di atas
   }
   ```
3. Jalankan `python3 src/build.py`, lalu unggah `index.html` yang baru.

### Cara pengurus mengisi pengumuman
1. Buka situs → bagian **Pengumuman** → tombol **Kelola**.
2. Masuk dengan nama pengguna dan kata sandi.
3. Isi **Judul**, **Kategori**, **Tanggal**, **Isi**, dan centang **Sematkan** bila perlu.
4. Tekan **Terbitkan**. Pengumuman langsung tampil; gunakan **Edit / Lepas / Hapus** pada daftar di bawah formulir.
5. Tekan **Bagikan** pada kartu pengumuman untuk meneruskannya ke grup WhatsApp warga.

### Batasan penting (situs statis)
- Pengumuman **tersimpan di peramban perangkat tempat ia dibuat** (localStorage) — belum ada server, jadi pengumuman **tidak otomatis muncul** di perangkat warga lain.
- Untuk menyebarkannya ke warga, gunakan tombol **Bagikan ke WhatsApp** (atau tempel teks pengumuman ke grup).
- Login bersifat penghalang ringan (hash di dalam berkas), bukan sistem keamanan penuh. Jangan menaruh data sensitif.
- Sesi login bertahan sampai tab ditutup (sessionStorage).

### Penilaian bintang
- Nilai disimpan di perangkat warga (agar tampil kembali saat dibuka), lalu **dikirim ke WhatsApp** Ketua RT atau Ketua PKK beserta catatan.
- Belum ada rekap rata-rata di halaman karena tidak ada server — rekap diterima pengurus lewat WhatsApp.

## 6. Usulan pengembangan lanjutan (opsional)

- Nomor WhatsApp untuk Ketua PKK, Sekretaris I–II, dan Bendahara I dapat ditambahkan kapan saja (sekarang belum tercantum, jadi tombolnya belum muncul).
- Nominal iuran wajib & jadwal jimpitan dapat ditulis permanen setelah disepakati musyawarah warga.
- Bisa ditambah: struktur RW, jadwal ronda per rumah, dan rekap kas bulanan (butuh pembaruan berkala oleh bendahara).

---

## 7. Kontak pengurus (nomor disembunyikan)

| Jabatan | Nama | Kontak di situs |
|---|---|---|
| Ketua RT | Awan Prihanto, S.T. | Tombol gelembung WhatsApp |
| Ketua PKK | Handayani, S.E. | Tombol gelembung WhatsApp |
| Sekretaris I | Sardi, S.Pd. | Tombol gelembung WhatsApp |
| Sekretaris II | Tri Widagdo | Tombol gelembung WhatsApp |
| Bendahara I | Wiryanto (Antok Comal) | Tombol gelembung WhatsApp |
| Bendahara II | Wahyu Widodo | Tombol gelembung WhatsApp |
| Bendahara Jimpitan | Ikhsan Jauhari | Tombol gelembung WhatsApp |

**Nomor tidak ditampilkan di halaman** (permintaan pengurus): kartu pengurus dan panel “Nomor penting” hanya menampilkan **ikon gelembung WhatsApp** yang langsung membuka chat. Nomor tetap tersimpan di `CONFIG.pengurus` pada `src/app.js` (format `08…`, otomatis diubah ke `62…` saat membuat tautan `wa.me`) dan dipakai tombol kirim formulir.

> Catatan teknis: karena situs statis, tautan WhatsApp tetap memuat nomor di dalam alamat `wa.me` — angka hanya **tidak terlihat** oleh warga di halaman. Untuk benar-benar menutup nomor, gunakan tautan pengalihan (link shortener/redirect) di server sendiri.

## 8. Data ringkas

- **Alamat:** Margorejo, RT 01 / RW 04, Banyuanyar, Banjarsari, Surakarta, Jawa Tengah **57137**
- **Ketua RT:** Awan Prihanto, S.T.
- **Ketua PKK:** Handayani, S.E.
- **Sekretaris I / II:** Sardi, S.Pd. / Tri Widagdo
- **Bendahara I / II:** Wiryanto (Antok Comal) / Wahyu Widodo
- **Bendahara Jimpitan:** Ikhsan Jauhari
- **Kontak warga:** semua lewat tombol WhatsApp di halaman (nomor tidak ditampilkan)

*Selamat mengelola lingkungan, semoga RT 01 / RW 04 makin guyub dan sejahtera.* 🌿
