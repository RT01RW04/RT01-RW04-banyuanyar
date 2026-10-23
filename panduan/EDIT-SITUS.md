# 📝 Panduan Mengubah Isi Situs

Semua isi situs berasal dari **`src/`**, lalu digabung menjadi satu berkas `index.html` dengan perintah:

```bash
python3 src/build.py
```

> Jika tidak ingin memakai Python, Anda tetap bisa mengedit `index.html` langsung (cari teks yang ingin diganti, lalu simpan). Namun cara ini lebih rawan salah karena berkasnya besar.

---

## 1. Mengubah data pengurus & nomor WhatsApp

Buka **`src/app.js`**, cari bagian paling atas:

```js
const CONFIG = {
  pengurus: [
    { nama: "Awan Prihanto, S.T.", peran: "Ketua RT", wa: "08xxxxxxxxxx", lead: true, ket: "..." },
    { nama: "Handayani, S.E.",     peran: "Ketua PKK", wa: "08xxxxxxxxxx", ket: "..." },
    { nama: "Sardi, S.Pd.",        peran: "Sekretaris I", wa: "08xxxxxxxxxx", ket: "..." },
    ...
  ],
```

- Tulis nomor dengan awalan `08…` — situs otomatis mengubahnya ke format WhatsApp `62…`.
- **Nomor tidak tampil di halaman.** Kartu pengurus dan panel “Nomor penting” hanya menampilkan ikon gelembung WhatsApp; nomor dipakai di balik tombol (`wa.me/62…`).
- Ingin menyembunyikan nomor? Isi `wa: ""` → akan tampil “Nomor WA belum dicantumkan”.
- `peran` mengikuti urutan tampil di kartu pengurus.

---

## 2. Mengubah penerima laporan & isi pesan WhatsApp

Masih di `CONFIG`, bagian `layanan`:

```js
layanan: {
  keluhan:  { penerima: "Awan Prihanto, S.T.", wa: "08xxxxxxxxxx", template: [ ... ] },
  usulan:   { penerima: "Sardi, S.Pd.",        wa: "08xxxxxxxxxx",  template: [ ... ] },
  iuran:    { penerima: "Wahyu Widodo",        wa: "08xxxxxxxxxx", template: [ ... ] },
  jimpitan: { penerima: "Ikhsan Jauhari",      wa: "08xxxxxxxxxx", template: [ ... ] }
}
```

Di dalam `template` tersedia penanda otomatis:

| Penanda | Diganti menjadi |
|---|---|
| `{nama}` | nama pelapor |
| `{alamat}` | alamat/blok |
| `{hp}` | nomor HP pelapor |
| `{kategori}` | kategori laporan |
| `{isi}` | isi laporan/usulan |
| `{periode}` | periode iuran (mis. “Oktober 2026”) |
| `{nominal}` | nominal, otomatis diformat “Rp 25.000” |
| `{metode}` | metode pembayaran |
| `{catatan}` | catatan tambahan |
| `{waktu}` | tanggal & jam laporan dibuat (WIB) |

---

## 3. Mengubah alamat, kode pos, atau tautan peta

Masih di `CONFIG`:

```js
wilayah: "Margorejo, Banyuanyar, Banjarsari",
kota: "Surakarta",
provinsi: "Jawa Tengah",
kodepos: "57137",
alamatLengkap: "Margorejo, RT 01 / RW 04, Banyuanyar, Banjarsari, Surakarta, Jawa Tengah 57137",
maps: "https://www.google.com/maps/search/?api=1&query=Banyuanyar+Banjarsari+Surakarta",
```

---

## 4. Mengubah teks halaman (judul, sambutan, FAQ)

Edit **`src/index.template.html`**. Bagian penting:

| Bagian | Penanda di berkas |
|---|---|
| Sambutan besar beranda | `<h1 id="heroTitle">` |
| Paragraf pembuka | `class="hero__desc"` |
| Ringkasan “Satu RT, satu keluarga besar” | `id="tentang"` |
| Catatan pengurus | blok setelah `id="pengurusGrid"` |
| Langkah pemilahan sampah | `class="steps"` |
| Komitmen warga | `class="commit-list"` |
| Kegiatan (6 kartu) | `id="kegiatan"` |
| Tanya jawab | `id="faq"` → tag `<details>` |
| Footer | `<footer class="site-footer">` |

---

## 5. Menambah / mengganti foto galeri

1. Simpan foto baru di folder `uploads/`.
2. Buka `src/prep_images2.py`, tambahkan baris baru pada daftar `JOBS`:
   ```python
   ("g20", "nama-berkas-baru.jpg", 860, 54),
   ```
3. Jalankan:
   ```bash
   python3 src/prep_images2.py
   ```
4. Buka `src/app.js`, cari `const GALLERY = [` dan tambahkan:
   ```js
   { k: "g20", cat: "Kerja Bakti", cap: "Keterangan foto baru." },
   ```
   Kategori yang tersedia: `Kerja Bakti`, `PKK`, `Silaturahmi`, `Olahraga`, `Sosial`, `Keamanan`, `Kegiatan Warga`.
5. Bangun ulang: `python3 src/build.py`.

---

## 6. Mengubah warna & huruf

Semua warna dan ukuran huruf diatur di bagian atas **`src/elegant.css`**:

```css
:root{
  --emerald-800:#0a3a2c;   /* hijau utama */
  --gold-500:#c9a55c;      /* emas aksen */
  --ivory:#faf8f2;         /* latar krem */
  ...
}
html{font-size:20px}        /* ukuran huruf dasar */
```

Ubah satu nilai, jalankan `python3 src/build.py`, warna/huruf seluruh situs ikut berubah.

---

## 7. Kuis pemilahan sampah

Data kuis ada di `src/app.js` pada `const QUIZ = [...]`:

```js
{ emo: "🥬", nama: "Sisa sayur & buah", jawab: "organik", alasan: "Sampah basah ini cepat terurai…" }
```

Nilai `jawab` hanya boleh: `organik`, `anorganik`, atau `residu`.

---

## 7b. Akun pengurus & pengumuman

Pengumuman diisi lewat tombol **Kelola** pada bagian Pengumuman, memakai satu akun bersama:

- Nama pengguna: `pengurus`
- Kata sandi: lihat `CONFIG.admin` di `src/app.js` (hubungi Ketua RT bila lupa)

**Mengganti kata sandi:**

```bash
python3 src/hash_password.py "kata-sandi-baru"
```

Salin hasil `hash` ke `src/app.js` → `CONFIG.admin.hash`, lalu `python3 src/build.py`.

**Mengisi pengumuman:** Pengumuman → **Kelola** → masuk → isi Judul, Kategori, Tanggal, Isi → **Terbitkan**.
Gunakan **Edit / Sematkan / Hapus** pada daftar, dan **Bagikan** untuk meneruskan ke grup WhatsApp.

> Situs statis: pengumuman tersimpan di peramban perangkat yang mengisinya. Untuk warga lain, gunakan tombol **Bagikan**.

## 8. Menguji sebelum di-upload

Buka `index.html` di peramban (klik dua kali). Periksa:

- [ ] Semua nomor WhatsApp benar (klik tombolnya → cek nomor tujuan).
- [ ] Formulir bisa dikirim dan pesan rapi di WhatsApp.
- [ ] Galeri terbuka, filter berfungsi.
- [ ] Tampilan di ponsel tidak ada yang terpotong.

Setelah lolos, jalankan `python3 src/build.py` sekali lagi, lalu commit & push ke GitHub.
