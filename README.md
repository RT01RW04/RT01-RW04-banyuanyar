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

## 5. Usulan pengembangan lanjutan (opsional)

- Nomor WhatsApp untuk Ketua PKK, Sekretaris I–II, dan Bendahara I dapat ditambahkan kapan saja (sekarang belum tercantum, jadi tombolnya belum muncul).
- Nominal iuran wajib & jadwal jimpitan dapat ditulis permanen setelah disepakati musyawarah warga.
- Bisa ditambah: struktur RW, jadwal ronda per rumah, dan rekap kas bulanan (butuh pembaruan berkala oleh bendahara).

---

## 6. Kontak pengurus (nomor disembunyikan)

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

## 7. Data ringkas

- **Alamat:** Margorejo, RT 01 / RW 04, Banyuanyar, Banjarsari, Surakarta, Jawa Tengah **57137**
- **Ketua RT:** Awan Prihanto, S.T.
- **Ketua PKK:** Handayani, S.E.
- **Sekretaris I / II:** Sardi, S.Pd. / Tri Widagdo
- **Bendahara I / II:** Wiryanto (Antok Comal) / Wahyu Widodo
- **Bendahara Jimpitan:** Ikhsan Jauhari
- **Kontak warga:** semua lewat tombol WhatsApp di halaman (nomor tidak ditampilkan)

*Selamat mengelola lingkungan, semoga RT 01 / RW 04 makin guyub dan sejahtera.* 🌿
