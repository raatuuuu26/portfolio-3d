import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper untuk membangun PDF 1.4 binary murni
class SimplePDF {
  constructor() {
    this.objects = [];
    this.pageContent = [];
  }

  addObject(content) {
    this.objects.push(content);
    return this.objects.length; // 1-based object number
  }

  build() {
    const header = Buffer.from('%PDF-1.4\n%\xE2\xE3\xCF\xD3\n');
    const offsets = [];
    let currentOffset = header.length;
    const bodyBuffers = [header];

    for (let i = 0; i < this.objects.length; i++) {
      offsets.push(currentOffset);
      const objHeader = Buffer.from(`${i + 1} 0 obj\n`);
      const objFooter = Buffer.from('\nendobj\n');
      const objBody = Buffer.isBuffer(this.objects[i]) 
        ? this.objects[i] 
        : Buffer.from(this.objects[i]);

      bodyBuffers.push(objHeader, objBody, objFooter);
      currentOffset += objHeader.length + objBody.length + objFooter.length;
    }

    const startXref = currentOffset;
    let xref = `xref\n0 ${this.objects.length + 1}\n0000000000 65535 f \n`;
    for (const offset of offsets) {
      xref += String(offset).padStart(10, '0') + ' 00000 n \n';
    }

    const trailer = `trailer\n<<\n  /Size ${this.objects.length + 1}\n  /Root 1 0 R\n>>\nstartxref\n${startXref}\n%%EOF\n`;
    bodyBuffers.push(Buffer.from(xref), Buffer.from(trailer));

    return Buffer.concat(bodyBuffers);
  }
}

function escapePDF(str) {
  return str.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)');
}

function generate() {
  const pdf = new SimplePDF();

  // Obj 1: Catalog
  pdf.addObject('<< /Type /Catalog /Pages 2 0 R >>');

  // Obj 2: Pages
  pdf.addObject('<< /Type /Pages /Kids [3 0 R] /Count 1 >>');

  // Load JPEG photo
  const photoPath = path.join(__dirname, 'app', 'frontend', 'assets', 'profile.jpg');
  const photoBytes = fs.readFileSync(photoPath);

  // Obj 4: Photo XObject Image
  const imgObjNum = 4;
  const imgHeader = Buffer.from(`<<
  /Type /XObject
  /Subtype /Image
  /Width 432
  /Height 576
  /ColorSpace /DeviceRGB
  /BitsPerComponent 8
  /Filter /DCTDecode
  /Length ${photoBytes.length}
>>
stream
`);
  const imgFooter = Buffer.from('\nendstream');
  pdf.addObject(Buffer.concat([imgHeader, photoBytes, imgFooter]));

  // Obj 5: Font Helvetica
  pdf.addObject('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>');

  // Obj 6: Font Helvetica-Bold
  pdf.addObject('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>');

  // Obj 7: Font Helvetica-Oblique
  pdf.addObject('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Oblique >>');

  // Content Stream
  const streamLines = [];
  const add = (line) => streamLines.push(line);

  // Background white & Margins
  // Page size A4: 595.28 x 841.89
  const left = 45;
  const top = 800;

  // Header separator line (accent cyan/sky blue: #0284c7 -> 0.01, 0.52, 0.78)
  add('q 0.01 0.52 0.78 rg 45 700 505 2 re f Q');

  // Gambar foto profil di kiri atas
  // Posisi x=45, y=710, w=68, h=90 (proporsional 432x576)
  add('q 68 0 0 90 45 710 cm /Im1 Do Q');
  // Bingkai foto biru
  add('q 0.01 0.52 0.78 RG 1.5 w 45 710 68 90 re S Q');

  // Text Header
  add('BT /F2 20 Tf 0.06 0.09 0.16 rg 125 780 Td (' + escapePDF('Ratu Maulani Maheswari') + ') Tj ET');
  add('BT /F2 10.5 Tf 0.01 0.52 0.78 rg 125 764 Td (' + escapePDF('Informatics Student & Aspiring Software Developer') + ') Tj ET');
  
  // Kontak
  add('BT /F1 8.5 Tf 0.28 0.33 0.41 rg 125 746 Td (' + escapePDF('Email: ratu.maulani1@gmail.com   |   Lokasi: Karawang, Jawa Barat') + ') Tj ET');
  add('BT /F1 8.5 Tf 0.28 0.33 0.41 rg 125 733 Td (' + escapePDF('GitHub: github.com/raatuuuu26   |   LinkedIn: Ratu-Maulani-Maheswari') + ') Tj ET');
  add('BT /F2 8.5 Tf 0.01 0.52 0.78 rg 125 718 Td (' + escapePDF('Live Portfolio 3D: https://portfolio-3d-frontend.vercel.app') + ') Tj ET');

  let curY = 680;

  function renderSectionHeader(title) {
    add(`q 0.01 0.52 0.78 rg 45 ${curY - 1} 4 13 re f Q`);
    add(`BT /F2 11 Tf 0.06 0.09 0.16 rg 54 ${curY} Td (${escapePDF(title)}) Tj ET`);
    add(`q 0.88 0.91 0.94 RG 1 w 45 ${curY - 4} 505 0.5 re f Q`);
    curY -= 18;
  }

  // 1. Profil & Ringkasan
  renderSectionHeader('PROFIL & RINGKASAN');
  const bio1 = 'Mahasiswa S1 Teknik Informatika semester 5 yang memiliki minat dan dedikasi tinggi dalam bidang';
  const bio2 = 'rekayasa perangkat lunak, sistem cerdas (AI), dan pengembangan aplikasi modern. Terbiasa memadukan';
  const bio3 = 'logika pemrograman dengan arsitektur solutif (TypeScript, Python, Node.js, React Native, hingga sistem AI).';
  const bio4 = 'Berorientasi pada detail, teliti, adaptif, serta aktif berkontribusi melalui berbagai proyek akademik & open-source.';
  add(`BT /F1 9 Tf 0.2 0.25 0.33 rg 45 ${curY} Td (${escapePDF(bio1)}) Tj ET`); curY -= 13;
  add(`BT /F1 9 Tf 0.2 0.25 0.33 rg 45 ${curY} Td (${escapePDF(bio2)}) Tj ET`); curY -= 13;
  add(`BT /F1 9 Tf 0.2 0.25 0.33 rg 45 ${curY} Td (${escapePDF(bio3)}) Tj ET`); curY -= 13;
  add(`BT /F1 9 Tf 0.2 0.25 0.33 rg 45 ${curY} Td (${escapePDF(bio4)}) Tj ET`); curY -= 20;

  // 2. Keahlian Teknis
  renderSectionHeader('KEAHLIAN TEKNIS & TOOLS');
  
  // Box 1
  add(`q 0.97 0.98 0.99 rg 45 ${curY - 32} 248 38 re f Q`);
  add(`q 0.89 0.91 0.94 RG 0.8 w 45 ${curY - 32} 248 38 re S Q`);
  add(`BT /F2 8.5 Tf 0.01 0.52 0.78 rg 52 ${curY - 4} Td (${escapePDF('BAHASA PEMROGRAMAN & BASIS DATA')}) Tj ET`);
  add(`BT /F1 8.2 Tf 0.2 0.25 0.33 rg 52 ${curY - 17} Td (${escapePDF('TypeScript, JavaScript (ES6+), Python, C Language')}) Tj ET`);
  add(`BT /F1 8.2 Tf 0.2 0.25 0.33 rg 52 ${curY - 28} Td (${escapePDF('MySQL Database, RESTful API')}) Tj ET`);

  // Box 2
  add(`q 0.97 0.98 0.99 rg 302 ${curY - 32} 248 38 re f Q`);
  add(`q 0.89 0.91 0.94 RG 0.8 w 302 ${curY - 32} 248 38 re S Q`);
  add(`BT /F2 8.5 Tf 0.01 0.52 0.78 rg 309 ${curY - 4} Td (${escapePDF('FRAMEWORK & TEKNOLOGI MODERN')}) Tj ET`);
  add(`BT /F1 8.2 Tf 0.2 0.25 0.33 rg 309 ${curY - 17} Td (${escapePDF('React, React Native (Expo), Node.js, Next.js')}) Tj ET`);
  add(`BT /F1 8.2 Tf 0.2 0.25 0.33 rg 309 ${curY - 28} Td (${escapePDF('AI Multi-Agent, Mobile Computing, Three.js 3D')}) Tj ET`);
  curY -= 48;

  // 3. Proyek Unggulan
  renderSectionHeader('PROYEK UNGGULAN (FEATURED PROJECTS)');

  const projects = [
    {
      num: '1',
      title: 'Aplikasi POS & Akuntansi Toko',
      cat: 'Mobile Computing & POS',
      desc: 'Aplikasi Point of Sale (POS) dan pembukuan akuntansi toko berbasis mobile untuk manajemen transaksi kasir, inventaris barang, dan laporan keuangan secara terstruktur.',
      tech: 'TypeScript, Mobile Computing, POS System, Accounting',
      url: 'https://github.com/raatuuuu26/Tugas-aplikasi-pos-akuntansi-toko'
    },
    {
      num: '2',
      title: 'Sistem Absensi Face Recognition',
      cat: 'AI & Computer Vision',
      desc: 'Sistem pencatatan absensi otomatis berbasis pengenalan wajah (Face Recognition) cerdas untuk presensi kehadiran yang akurat, cepat, bebas kontak, dan minim kecurangan.',
      tech: 'TypeScript, Computer Vision, Face Recognition, AI',
      url: 'https://github.com/raatuuuu26/absensi-face-recognition'
    },
    {
      num: '3',
      title: 'Academic Virtual Office',
      cat: 'AI Multi-Agent & Office Assistant',
      desc: 'Sistem asisten pintar otonom (AI Multi-Agent System) berbasis lokal yang dirancang khusus untuk memanajemen seluruh aktivitas perkuliahan mahasiswa secara otomatis.',
      tech: 'Node.js, AI Multi-Agent, HTML5, CSS3 Grid',
      url: 'https://github.com/raatuuuu26/academic-virtual-office'
    },
    {
      num: '4',
      title: 'GetKlip - Smart Speech & Media Search',
      cat: 'Mobile AI & Media Search',
      desc: 'Aplikasi pencarian cerdas untuk galeri foto dan video di perangkat mobile berbasis pengenalan suara (speech recognition) dan kata kunci terindeks instan.',
      tech: 'Mobile App, Speech Search, AI, Node.js',
      url: 'https://github.com/raatuuuu26/GetKlip'
    }
  ];

  for (const proj of projects) {
    // Card background
    add(`q 1 1 1 rg 45 ${curY - 38} 505 44 re f Q`);
    add(`q 0.88 0.91 0.94 RG 0.8 w 45 ${curY - 38} 505 44 re S Q`);
    add(`q 0.01 0.52 0.78 rg 45 ${curY - 38} 3.5 44 re f Q`); // Blue left border

    // Title & Category
    add(`BT /F2 9.5 Tf 0.06 0.09 0.16 rg 54 ${curY - 3} Td (${escapePDF(proj.num + '. ' + proj.title)}) Tj ET`);
    add(`BT /F2 7.5 Tf 0.01 0.52 0.78 rg 410 ${curY - 3} Td (${escapePDF('[' + proj.cat + ']')}) Tj ET`);

    // Desc
    add(`BT /F1 8.2 Tf 0.2 0.25 0.33 rg 54 ${curY - 16} Td (${escapePDF(proj.desc)}) Tj ET`);

    // Tech & Link
    add(`BT /F1 7.5 Tf 0.38 0.44 0.53 rg 54 ${curY - 28} Td (${escapePDF('Tech: ' + proj.tech)}) Tj ET`);
    add(`BT /F2 7.5 Tf 0.01 0.52 0.78 rg 370 ${curY - 28} Td (${escapePDF(proj.url)}) Tj ET`);

    curY -= 50;
  }

  // 4. Pendidikan & Pencapaian
  renderSectionHeader('PENDIDIKAN & PENCAPAIAN');
  add(`q 0.97 0.98 0.99 rg 45 ${curY - 26} 505 32 re f Q`);
  add(`q 0.89 0.91 0.94 RG 0.8 w 45 ${curY - 26} 505 32 re S Q`);

  add(`BT /F2 9.5 Tf 0.06 0.09 0.16 rg 54 ${curY - 4} Td (${escapePDF('S1 Teknik Informatika - Aktif Semester 5')}) Tj ET`);
  add(`BT /F1 8.2 Tf 0.38 0.44 0.53 rg 54 ${curY - 18} Td (${escapePDF('Fokus: Rekayasa Perangkat Lunak, Pemrograman Mobile, dan Solusi Sistem Berbasis AI')}) Tj ET`);
  add(`BT /F2 8.5 Tf 0.01 0.52 0.78 rg 360 ${curY - 10} Td (${escapePDF('5+ Proyek Selesai  |  85% Kepuasan')}) Tj ET`);
  curY -= 40;

  // Banner Live Portfolio di bagian paling bawah
  add(`q 0.06 0.09 0.16 rg 45 ${curY - 16} 505 24 re f Q`);
  add(`BT /F2 8.5 Tf 1 1 1 rg 55 ${curY - 4} Td (${escapePDF('Kunjungi Versi Web Interaktif 3D 360: https://portfolio-3d-frontend.vercel.app')}) Tj ET`);

  const streamContent = streamLines.join('\n');
  const streamBuf = Buffer.from(streamContent);

  // Obj 8: Page Content Stream
  const streamObj = Buffer.concat([
    Buffer.from(`<< /Length ${streamBuf.length} >>\nstream\n`),
    streamBuf,
    Buffer.from('\nendstream')
  ]);
  pdf.addObject(streamObj);

  // Obj 3: Page Definition (references objects 4, 5, 6, 7, and stream 8)
  const pageObj = `<<
  /Type /Page
  /Parent 2 0 R
  /MediaBox [0 0 595.28 841.89]
  /Contents 8 0 R
  /Resources <<
    /XObject << /Im1 4 0 R >>
    /Font <<
      /F1 5 0 R
      /F2 6 0 R
      /F3 7 0 R
    >>
  >>
>>`;

  // We need Page at index 3 in objects array!
  // Currently objects array has:
  // 1: Catalog
  // 2: Pages
  // 3 will be Page!
  // But we pushed 4, 5, 6, 7, 8 after. Let's fix ordering cleanly:
}

// Let's create the clean ordered generator:
function generateCleanPDF() {
  const photoPath = path.join(__dirname, 'app', 'frontend', 'assets', 'profile.jpg');
  const photoBytes = fs.readFileSync(photoPath);

  // Prepare stream lines
  const streamLines = [];
  const add = (line) => streamLines.push(line);

  // Background white & Margins
  // Header accent line
  add('q 0.01 0.52 0.78 rg 45 700 505 2.5 re f Q');

  // Photo: x=45, y=710, w=68, h=90
  add('q 68 0 0 90 45 710 cm /Im1 Do Q');
  add('q 0.01 0.52 0.78 RG 2 w 45 710 68 90 re S Q');

  // Text Header
  add('BT /F2 19 Tf 0.06 0.09 0.16 rg 125 782 Td (' + escapePDF('Ratu Maulani Maheswari') + ') Tj ET');
  add('BT /F2 10.5 Tf 0.01 0.52 0.78 rg 125 766 Td (' + escapePDF('Informatics Student & Aspiring Software Developer') + ') Tj ET');
  
  // Kontak
  add('BT /F1 8.5 Tf 0.28 0.33 0.41 rg 125 748 Td (' + escapePDF('Email: ratu.maulani1@gmail.com   |   Lokasi: Karawang, Jawa Barat') + ') Tj ET');
  add('BT /F1 8.5 Tf 0.28 0.33 0.41 rg 125 735 Td (' + escapePDF('GitHub: github.com/raatuuuu26   |   LinkedIn: Ratu-Maulani-Maheswari') + ') Tj ET');
  add('BT /F2 8.5 Tf 0.01 0.52 0.78 rg 125 720 Td (' + escapePDF('Web Portofolio 3D: https://portfolio-3d-frontend.vercel.app') + ') Tj ET');

  let curY = 680;

  function renderSectionHeader(title) {
    add(`q 0.01 0.52 0.78 rg 45 ${curY - 1} 4 13 re f Q`);
    add(`BT /F2 10.5 Tf 0.06 0.09 0.16 rg 54 ${curY} Td (${escapePDF(title)}) Tj ET`);
    add(`q 0.88 0.91 0.94 RG 1 w 45 ${curY - 4} 505 0.5 re f Q`);
    curY -= 17;
  }

  // 1. Profil & Ringkasan
  renderSectionHeader('PROFIL & RINGKASAN');
  const bio1 = 'Mahasiswa S1 Teknik Informatika semester 5 yang memiliki minat dan dedikasi tinggi dalam bidang';
  const bio2 = 'rekayasa perangkat lunak, sistem cerdas (AI), dan pengembangan aplikasi modern. Terbiasa memadukan';
  const bio3 = 'logika pemrograman dengan arsitektur solutif (TypeScript, Python, Node.js, React Native, hingga sistem AI).';
  const bio4 = 'Berorientasi pada detail, teliti, adaptif, serta aktif berkontribusi melalui berbagai proyek akademik & open-source.';
  add(`BT /F1 8.8 Tf 0.2 0.25 0.33 rg 45 ${curY} Td (${escapePDF(bio1)}) Tj ET`); curY -= 12;
  add(`BT /F1 8.8 Tf 0.2 0.25 0.33 rg 45 ${curY} Td (${escapePDF(bio2)}) Tj ET`); curY -= 12;
  add(`BT /F1 8.8 Tf 0.2 0.25 0.33 rg 45 ${curY} Td (${escapePDF(bio3)}) Tj ET`); curY -= 12;
  add(`BT /F1 8.8 Tf 0.2 0.25 0.33 rg 45 ${curY} Td (${escapePDF(bio4)}) Tj ET`); curY -= 18;

  // 2. Keahlian Teknis
  renderSectionHeader('KEAHLIAN TEKNIS & TOOLS');
  
  // Box 1
  add(`q 0.97 0.98 0.99 rg 45 ${curY - 32} 248 38 re f Q`);
  add(`q 0.89 0.91 0.94 RG 0.8 w 45 ${curY - 32} 248 38 re S Q`);
  add(`BT /F2 8.5 Tf 0.01 0.52 0.78 rg 52 ${curY - 4} Td (${escapePDF('BAHASA PEMROGRAMAN & BASIS DATA')}) Tj ET`);
  add(`BT /F1 8.2 Tf 0.2 0.25 0.33 rg 52 ${curY - 17} Td (${escapePDF('TypeScript, JavaScript (ES6+), Python, C Language')}) Tj ET`);
  add(`BT /F1 8.2 Tf 0.2 0.25 0.33 rg 52 ${curY - 28} Td (${escapePDF('MySQL Database, RESTful API')}) Tj ET`);

  // Box 2
  add(`q 0.97 0.98 0.99 rg 302 ${curY - 32} 248 38 re f Q`);
  add(`q 0.89 0.91 0.94 RG 0.8 w 302 ${curY - 32} 248 38 re S Q`);
  add(`BT /F2 8.5 Tf 0.01 0.52 0.78 rg 309 ${curY - 4} Td (${escapePDF('FRAMEWORK & TEKNOLOGI MODERN')}) Tj ET`);
  add(`BT /F1 8.2 Tf 0.2 0.25 0.33 rg 309 ${curY - 17} Td (${escapePDF('React, React Native (Expo), Node.js, Next.js')}) Tj ET`);
  add(`BT /F1 8.2 Tf 0.2 0.25 0.33 rg 309 ${curY - 28} Td (${escapePDF('AI Multi-Agent, Mobile Computing, Three.js 3D')}) Tj ET`);
  curY -= 46;

  // 3. Proyek Unggulan
  renderSectionHeader('PROYEK UNGGULAN (FEATURED PROJECTS)');

  const projects = [
    {
      num: '1',
      title: 'Aplikasi POS & Akuntansi Toko',
      cat: 'Mobile Computing & POS',
      desc: 'Aplikasi Point of Sale (POS) dan pembukuan akuntansi toko berbasis mobile untuk manajemen transaksi kasir, inventaris barang, dan laporan keuangan toko secara terstruktur.',
      tech: 'TypeScript, Mobile Computing, POS System, Accounting',
      url: 'https://github.com/raatuuuu26/Tugas-aplikasi-pos-akuntansi-toko'
    },
    {
      num: '2',
      title: 'Sistem Absensi Face Recognition',
      cat: 'AI & Computer Vision',
      desc: 'Sistem pencatatan absensi otomatis berbasis pengenalan wajah (Face Recognition) cerdas untuk presensi kehadiran yang akurat, cepat, bebas kontak, dan minim kecurangan.',
      tech: 'TypeScript, Computer Vision, Face Recognition, AI',
      url: 'https://github.com/raatuuuu26/absensi-face-recognition'
    },
    {
      num: '3',
      title: 'Academic Virtual Office',
      cat: 'AI Multi-Agent & Office Assistant',
      desc: 'Sistem asisten pintar otonom (AI Multi-Agent System) berbasis lokal yang dirancang khusus untuk memanajemen seluruh aktivitas perkuliahan mahasiswa secara otomatis.',
      tech: 'Node.js, AI Multi-Agent, HTML5, CSS3 Grid',
      url: 'https://github.com/raatuuuu26/academic-virtual-office'
    },
    {
      num: '4',
      title: 'GetKlip - Smart Speech & Media Search',
      cat: 'Mobile AI & Media Search',
      desc: 'Aplikasi pencarian cerdas untuk galeri foto dan video di perangkat mobile berbasis pengenalan suara (speech recognition) dan kata kunci terindeks instan.',
      tech: 'Mobile App, Speech Search, AI, Node.js',
      url: 'https://github.com/raatuuuu26/GetKlip'
    }
  ];

  for (const proj of projects) {
    add(`q 1 1 1 rg 45 ${curY - 36} 505 42 re f Q`);
    add(`q 0.88 0.91 0.94 RG 0.8 w 45 ${curY - 36} 505 42 re S Q`);
    add(`q 0.01 0.52 0.78 rg 45 ${curY - 36} 3.5 42 re f Q`);

    add(`BT /F2 9.2 Tf 0.06 0.09 0.16 rg 54 ${curY - 3} Td (${escapePDF(proj.num + '. ' + proj.title)}) Tj ET`);
    add(`BT /F2 7.2 Tf 0.01 0.52 0.78 rg 410 ${curY - 3} Td (${escapePDF('[' + proj.cat + ']')}) Tj ET`);

    add(`BT /F1 8 Tf 0.2 0.25 0.33 rg 54 ${curY - 15} Td (${escapePDF(proj.desc)}) Tj ET`);

    add(`BT /F1 7.2 Tf 0.38 0.44 0.53 rg 54 ${curY - 26} Td (${escapePDF('Tech: ' + proj.tech)}) Tj ET`);
    add(`BT /F2 7.2 Tf 0.01 0.52 0.78 rg 370 ${curY - 26} Td (${escapePDF(proj.url)}) Tj ET`);

    curY -= 48;
  }

  // 4. Pendidikan & Pencapaian
  renderSectionHeader('PENDIDIKAN & PENCAPAIAN');
  add(`q 0.97 0.98 0.99 rg 45 ${curY - 26} 505 32 re f Q`);
  add(`q 0.89 0.91 0.94 RG 0.8 w 45 ${curY - 26} 505 32 re S Q`);

  add(`BT /F2 9.2 Tf 0.06 0.09 0.16 rg 54 ${curY - 4} Td (${escapePDF('S1 Teknik Informatika - Aktif Semester 5')}) Tj ET`);
  add(`BT /F1 8 Tf 0.38 0.44 0.53 rg 54 ${curY - 18} Td (${escapePDF('Fokus: Rekayasa Perangkat Lunak, Pemrograman Mobile, dan Solusi Sistem Berbasis AI')}) Tj ET`);
  add(`BT /F2 8.5 Tf 0.01 0.52 0.78 rg 360 ${curY - 10} Td (${escapePDF('5+ Proyek Selesai  |  85% Kepuasan')}) Tj ET`);
  curY -= 38;

  // Banner Live Portfolio di bagian bawah
  add(`q 0.06 0.09 0.16 rg 45 ${curY - 14} 505 22 re f Q`);
  add(`BT /F2 8.2 Tf 1 1 1 rg 55 ${curY - 3} Td (${escapePDF('Kunjungi Versi Web Interaktif 3D 360: https://portfolio-3d-frontend.vercel.app')}) Tj ET`);

  const streamContent = streamLines.join('\n');
  const streamBuf = Buffer.from(streamContent);

  const pdf = new SimplePDF();
  // 1: Catalog
  pdf.addObject('<< /Type /Catalog /Pages 2 0 R >>');
  // 2: Pages
  pdf.addObject('<< /Type /Pages /Kids [3 0 R] /Count 1 >>');
  // 3: Page
  pdf.addObject(`<<
  /Type /Page
  /Parent 2 0 R
  /MediaBox [0 0 595.28 841.89]
  /Contents 8 0 R
  /Resources <<
    /XObject << /Im1 4 0 R >>
    /Font <<
      /F1 5 0 R
      /F2 6 0 R
      /F3 7 0 R
    >>
  >>
>>`);
  // 4: Photo Image
  const imgHeader = Buffer.from(`<<
  /Type /XObject
  /Subtype /Image
  /Width 432
  /Height 576
  /ColorSpace /DeviceRGB
  /BitsPerComponent 8
  /Filter /DCTDecode
  /Length ${photoBytes.length}
>>
stream
`);
  const imgFooter = Buffer.from('\nendstream');
  pdf.addObject(Buffer.concat([imgHeader, photoBytes, imgFooter]));

  // 5: F1 Helvetica
  pdf.addObject('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>');
  // 6: F2 Helvetica-Bold
  pdf.addObject('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>');
  // 7: F3 Helvetica-Oblique
  pdf.addObject('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Oblique >>');

  // 8: Content stream
  pdf.addObject(Buffer.concat([
    Buffer.from(`<< /Length ${streamBuf.length} >>\nstream\n`),
    streamBuf,
    Buffer.from('\nendstream')
  ]));

  const pdfBuffer = pdf.build();
  const outputPath = path.join(__dirname, 'Portofolio_Ratu_Maulani_Maheswari.pdf');
  fs.writeFileSync(outputPath, pdfBuffer);

  // Copy juga ke folder frontend assets dan public agar bisa diunduh langsung lewat web
  const webAssetsPdfPath = path.join(__dirname, 'app', 'frontend', 'assets', 'Portofolio_Ratu_Maulani_Maheswari.pdf');
  fs.writeFileSync(webAssetsPdfPath, pdfBuffer);

  console.log(`✅ PDF successfully generated at: ${outputPath}`);
  console.log(`File size: ${(pdfBuffer.length / 1024).toFixed(1)} KB`);
}

generateCleanPDF();
