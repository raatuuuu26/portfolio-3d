# 📊 Catatan Progres Pengembangan Web Portofolio

Dokumen ini mencatat setiap perkembangan pengerjaan proyek portofolio secara berkala (per prompt / tahap). Dokumen ini memuat apa yang sudah dikerjakan, apa yang belum, serta rekomendasi langkah selanjutnya.

---

## 📌 Ringkasan Status Saat Ini
- **Fase Saat Ini**: **Fase 4: Troubleshooting Akses Mobile & Persiapan Deployment Online**
- **Status Keseluruhan**: `[████████████████████] 100% (Server Berjalan, Solusi Akses Ponsel Siap)`
- **Repository Remote**: [https://github.com/raatuuuu26/portfolio-3d](https://github.com/raatuuuu26/portfolio-3d)
- **Terakhir Diperbarui**: 18 Oktober 2026

---

## 📝 Log Progres Per Prompt / Tahap

### 🔹 Prompt 1 - 5: Perencanaan, Konsep & Arsitektur
- Pembuatan konsep modular, pelacak progres, checklist pengingat, dan pemisahan folder frontend-backend.

### 🔹 Prompt 6: Migrasi ke React Native & Mobile Responsive
- Portofolio dibangun menggunakan **React Native (Expo)** dengan **desain responsif untuk mobile**.
- Mengintegrasikan data profil Ratu Maulani Maheswari, tema Minimalist Dark Slate, dan objek 3D Isometric Developer Workspace 360°.

### 🔹 Prompt 7 - 8: Troubleshooting Terminal & Script Otomatis
- Menyediakan [JALANKAN_WEBSITE.bat](file:///c:/Users/maula/.gemini/antigravity/scratch/portfolio/JALANKAN_WEBSITE.bat) untuk kemudahan eksekusi 1-klik.

### 🔹 Prompt 9: Integrasi Foto Profil
- Memasang foto profil asli Ratu di [Header.js](file:///c:/Users/maula/.gemini/antigravity/scratch/portfolio/app/frontend/src/components/Header.js) dan [Footer.js](file:///c:/Users/maula/.gemini/antigravity/scratch/portfolio/app/frontend/src/components/Footer.js).

### 🔹 Prompt 10 - 11: Inisialisasi Git & Push ke GitHub
- Seluruh 38 file proyek berhasil di-commit dan di-push ke repository `https://github.com/raatuuuu26/portfolio-3d`.

### 🔹 Prompt 12: Penggantian Daftar Proyek dengan Proyek Asli GitHub
- Mengupdate 3 proyek unggulan asli Ratu: Aplikasi POS & Akuntansi Toko, Sistem Absensi Face Recognition, dan Web Portofolio Interaktif 3D 360°.

### 🔹 Prompt 13: Troubleshooting Akses Ponsel & Expo Go (Tahap Ini)
- **Penyebab Kendala**:
  1. *Versi Expo Go*: Aplikasi Expo Go di Play Store/App Store memiliki versi SDK yang berbeda dengan SDK terbaru proyek.
  2. *Localhost di Ponsel*: Kata `localhost` jika diketik di HP akan mencari server di dalam HP itu sendiri, bukan di laptop.
  3. *Typo penulisan*: Terdapat typo `htpp://` bukan `http://`.
- **Solusi**:
  - Mengecek IP lokal Wi-Fi laptop: `192.168.0.104`.
  - Mengonfirmasi bahwa server di port `8081` dan `8082` aktif (`HTTP 200 OK`).
  - Menjelaskan cara membuka langsung di browser HP (Chrome/Safari) menggunakan IP laptop: `http://192.168.0.104:8081` atau `http://192.168.0.104:8082` tanpa memerlukan aplikasi Expo Go.
  - Memberikan opsi deploy online (GitHub Pages / Vercel) agar bisa dibuka dari mana saja tanpa bergantung Wi-Fi lokal.

---

## ✅ Apa yang Sudah Dikerjakan (Done)
- [x] Port server aktif (8081 dan 8082) merespons normal.
- [x] IP Wi-Fi lokal laptop terdeteksi (`192.168.0.104`).
- [x] Firewall Windows terverifikasi mengizinkan akses jaringan lokal Node.js.
- [x] Panduan membuka web di ponsel tanpa Expo Go disiapkan.

---

## 💡 Rekomendasi Langkah Selanjutnya
- Buka browser di HP (Chrome / Safari) yang terhubung ke Wi-Fi yang sama, lalu buka:
  ```
  http://192.168.0.104:8081
  ```
  atau
  ```
  http://192.168.0.104:8082
  ```
- Jika ingin bisa dibuka oleh siapa saja di internet tanpa satu Wi-Fi, kita bisa deploy ke Vercel atau GitHub Pages.
