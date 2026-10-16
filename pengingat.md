# 🔔 Pengingat & Catatan Kunci (Checklist Penting)

Dokumen ini berfungsi sebagai papan pengingat (reminder) agar tidak ada hal krusial yang terlewatkan selama proses perencanaan, perancangan, pengembangan, hingga rilis online web portofolio ini.

---

## 🎯 1. Pengingat Fitur Animasi 360° (Core Feature)
- [ ] **Interaktivitas Bebas**: Pastikan kontrol gesture touch drag (mobile) dan cursor drag (web) bekerja mulus memutar 3D Workspace 360 derajat.
- [ ] **React Native Touch Gesture (PanResponder)**: Gunakan PanResponder yang responsif agar swipe horizontal memutar objek 360 derajat dengan animasi `rotateY` dan `perspective`.
- [ ] **Auto-Spin Saat Idle**: Objek 3D Workspace isometrik berputar perlahan otomatis saat tidak disentuh.
- [ ] **Indikator Sudut Rotasi 360°**: Berikan badge live degree (`0° - 360°`) agar pengunjung tahu mereka sedang berinteraksi di ruang 3D.
- [ ] **State Loading yang Halus**: Indikator loading yang rapi saat aplikasi React Native pertama kali terbuka.

---

## 📱 2. Pengingat Responsivitas & Performa Mobile
- [ ] **Jangan Mengunci Scroll di Layar HP**: Pada layar sentuh (smartphone), interaksi drag pada 3D jangan sampai membuat pengguna kesulitan men-scroll halaman ke bawah. Berikan area canvas yang proporsional.
- [ ] **Optimasi WebGL**: Batasi `dpr` (device pixel ratio) maksimal di angka `2` agar performa tetap 60 FPS dan tidak membuat baterai smartphone boros.
- [ ] **Fallback 2D Ringan**: Jika perangkat pengunjung sangat tua atau WebGL dinonaktifkan, sediakan tampilan gambar 2D/CSS fallback yang tetap keren.

---

## ✍️ 3. Pengingat Data & Konten Pribadi (Sebelum Publikasi)
- [ ] **Ganti Seluruh Tanda `[ ... ]`**: Pastikan tidak ada teks template atau placeholder yang tertinggal di file [profil.md](file:///c:/Users/maula/.gemini/antigravity/scratch/portfolio/profil.md) dan [proyek.md](file:///c:/Users/maula/.gemini/antigravity/scratch/portfolio/proyek.md).
- [ ] **Tautan Aktif (Valid Links)**:
  - Tautan akun GitHub & LinkedIn mengarah ke profil asli.
  - Tautan tombol "Download CV" sudah terhubung ke file PDF resume milikmu.
  - Tautan "Live Demo" pada setiap proyek berfungsi saat diklik.
- [ ] **Formulir Kontak**: Pastikan form kontak terhubung ke emailmu (bisa menggunakan integrasi gratis seperti *EmailJS* atau *Formspree*).

---

## 🎨 4. Pengingat Visual & Estetika (UI/UX)
- [ ] **Kontras Teks**: Pastikan teks mudah dibaca di atas latar belakang gelap (Dark Mode).
- [ ] **Konsistensi Warna Aksen**: Gunakan 1 atau 2 warna aksen utama yang konsisten (misal: warna Cyan Neon pada tombol, border hover, dan pencahayaan 3D).
- [ ] **Efek Hover Lembut**: Setiap tombol, tautan, dan kartu proyek wajib memiliki efek animasi hover yang responsif.

---

## 🚀 5. Pengingat Teknis & Deployment
- [ ] **Pengujian Build Lokal**: Selalu jalankan `npm run build` sebelum proses deploy untuk memastikan tidak ada error TypeScript/JSX.
- [ ] **Favicon & Meta Tag SEO**: Siapkan judul web (`<title>`) yang menarik dan favicon inisial namamu untuk tab browser.
- [ ] **Hosting Gratis Cepat**: Gunakan Vercel atau GitHub Pages untuk hosting gratis dengan domain custom atau domain bawaan `.vercel.app`.
