# UANGKU - Aplikasi Manajemen Keuangan Mahasiswa 💸

UANGKU (Tema: **HematMahasiswa**) adalah sebuah purwarupa (*prototype*) aplikasi antarmuka berbasis *web* yang dirancang khusus untuk membantu mahasiswa melacak pengeluaran, memantau *budget* harian agar tidak boros, dan mencapai target tabungan impian mereka. 

Proyek ini dibangun sebagai pemenuhan Tugas Akhir Mata Kuliah **Interaksi Manusia dan Komputer (IMK)** di **Universitas Teknologi Digital Indonesia (UTDI)**.

## ✨ Fitur Utama (Berdasarkan Feature Mapping)

Sistem aplikasi ini berjalan menggunakan memori *browser* (`localStorage`) berkat integrasi JavaScript, sehingga UI purwarupa ini dapat berfungsi secara interaktif layaknya aplikasi sungguhan:

* **📊 Kalkulasi Saldo Otomatis:** Saldo utama di Beranda akan bertambah atau berkurang secara otomatis ketika ada input transaksi baru.
* **⚠️ Indikator & Notifikasi Budget Harian:** Memantau limit pengeluaran harian (maks. Rp70.000). *Progress bar* akan berubah menjadi merah jika pengeluaran sudah mendekati atau melebihi batas.
* **🎯 Target Tabungan (Saving Goals):** Fitur untuk mengunci dan memantau persentase dana yang disisihkan untuk target tertentu (terletak di menu Profil).
* **🗺️ Peta Makan Hemat:** Rekomendasi titik lokasi warung makan ramah kantong mahasiswa (Burjo, Warteg, Angkringan) yang terintegrasi di dalam aplikasi.
* **📝 Pencatatan Cerdas:** Kategori pengeluaran/pemasukan yang sudah disesuaikan dengan gaya hidup mahasiswa (Makanan, Transportasi, Nongkrong, Belanja).
* **📉 Laporan Visual Interaktif:** Analisis pengeluaran dalam bentuk *Doughnut Chart* untuk laporan bulanan dan *Bar Chart* untuk fluktuasi laporan mingguan.

## 🛠️ Teknologi yang Digunakan

* **Front-End:** HTML5, Tailwind CSS (via CDN), Vanilla JavaScript.
* **Back-End (Routing):** Python (Flask Framework).
* **Database (Prototype):** Web Storage API (`localStorage`).
* **Aset Desain & Ikon:** Font Awesome, Google Fonts (Plus Jakarta Sans).

## 🚀 Cara Instalasi & Menjalankan Aplikasi

Pastikan Python sudah terinstal di komputermu. Ikuti langkah berikut untuk menjalankan aplikasi secara lokal:

1. Clone repositori ini:

```bash
git clone https://github.com/Emzyjeppp/Uangku-HematMahasiswa.git
```

2. Masuk ke direktori proyek:

```bash
cd Uangku-HematMahasiswa/Proyek_IMK_Uangku
```

3. Instal pustaka Flask (jika belum ada):

```bash
pip install flask
```

4. Jalankan mesin aplikasi:

```bash
python app.py
```

5. Akses di Browser:

Buka peramban (*browser*) dan kunjungi tautan lokal berikut:

```txt
http://127.0.0.1:5000
```

## 📁 Struktur Direktori

```plaintext
Proyek_IMK_Uangku/
│── app.py                 # File utama routing web (Flask)
│── static/                # Folder aset statis
│   ├── css/style.css      # Kustomisasi CSS & penyesuaian scrollbar
│   └── js/script.js       # Otak aplikasi (Logika Kalkulasi & LocalStorage)
└── templates/             # Folder UI (User Interface) HTML
    ├── index.html         # Halaman Beranda Utama
    ├── tambah_pengeluaran.html
    ├── tambah_pemasukan.html
    ├── transaksi.html
    ├── laporan.html
    ├── laporan_mingguan.html
    ├── profil.html
    ├── target_tabungan.html
    ├── notifikasi.html
    └── warung_murah.html
```

## 👥 Tim Pengembang

- **Muhammad Jepri** *(NIM: 255410014)*
- **Fidelia Ping** *(NIM: 245410012)*
- **MELIA FRANSISKA SUNG** *(NIM: 245410036)*
- **WENSESLAUS KOPAQ WARAQRATU** *(NIM: 245410029)*
---

Didesain dan dikembangkan dengan ❤️ untuk membantu mahasiswa lebih melek finansial.
