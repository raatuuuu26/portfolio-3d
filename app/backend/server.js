import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Path untuk penyimpanan pesan kontak lokal
const dataDir = path.join(__dirname, 'data');
const messagesFilePath = path.join(dataDir, 'messages.json');

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}
if (!fs.existsSync(messagesFilePath)) {
  fs.writeFileSync(messagesFilePath, JSON.stringify([], null, 2));
}

// 1. Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Portfolio Backend API is running smoothly',
    timestamp: new Date().toISOString()
  });
});

// 2. Profile Data Endpoint (sinkron dengan profil.md)
app.get('/api/profile', (req, res) => {
  res.json({
    name: "Ratu Maulani Maheswari",
    displayName: "Ratu",
    role: "Informatics Student & Aspiring Software Developer",
    tagline: "Exploring Technology & Building Digital Solutions",
    bio: "Saya adalah mahasiswa Teknik Informatika semester 5 yang memiliki ketertarikan pada teknologi informasi dan pengembangan solusi digital. Saya sedang mengembangkan kemampuan di bidang pemrograman, pengembangan aplikasi, dan teknologi komputer melalui perkuliahan serta proyek-proyek akademik.",
    location: "Karawang, Jawa Barat, Indonesia",
    status: "Open for Freelance / Project-based",
    stats: {
      experience: "2 Tahun",
      projectsCompleted: "5 Proyek",
      satisfaction: "85% / 8+ Repositori"
    },
    socials: {
      email: "ratu.maulani1@gmail.com",
      github: "https://github.com/raatuuuu26",
      linkedin: "https://linkedin.com/in/Ratu-Maulani-Maheswari",
      instagram: "https://instagram.com/_raatuuuu26"
    }
  });
});

// 3. Projects Showcase Endpoint
app.get('/api/projects', (req, res) => {
  res.json([
    {
      id: 1,
      title: "Aplikasi POS & Akuntansi Toko",
      category: "Mobile Computing & POS",
      description: "Aplikasi Point of Sale (POS) dan pembukuan akuntansi toko berbasis mobile untuk manajemen transaksi kasir, inventaris barang, dan pencatatan laporan keuangan.",
      tags: ["TypeScript", "Mobile Computing", "POS System", "Accounting"],
      githubUrl: "https://github.com/raatuuuu26/Tugas-aplikasi-pos-akuntansi-toko"
    },
    {
      id: 2,
      title: "Sistem Absensi Face Recognition",
      category: "AI & Computer Vision",
      description: "Sistem pencatatan absensi otomatis berbasis pengenalan wajah (Face Recognition) cerdas untuk presensi kehadiran yang akurat, cepat, dan modern.",
      tags: ["TypeScript", "Computer Vision", "Face Recognition", "AI"],
      githubUrl: "https://github.com/raatuuuu26/absensi-face-recognition"
    },
    {
      id: 3,
      title: "Academic Virtual Office",
      category: "AI Multi-Agent & Office Assistant",
      description: "Sistem asisten pintar otonom (AI Multi-Agent System) berbasis lokal yang dirancang khusus untuk memanajemen seluruh aktivitas perkuliahan mahasiswa secara otomatis.",
      tags: ["Node.js", "AI Multi-Agent", "HTML5", "CSS3 Grid"],
      githubUrl: "https://github.com/raatuuuu26/academic-virtual-office"
    },
    {
      id: 4,
      title: "GetKlip - Smart Speech & Media Search",
      category: "Mobile AI & Media Search",
      description: "Aplikasi pencarian cerdas untuk galeri foto dan video di perangkat mobile berbasis pengenalan suara (speech recognition) dan kata kunci terindeks.",
      tags: ["Mobile App", "Speech Search", "AI", "Node.js", "CSS3"],
      githubUrl: "https://github.com/raatuuuu26/GetKlip"
    }
  ]);
});

// 4. Skills & Tech Stack Endpoint (sinkron dengan teknologi.md)
app.get('/api/skills', (req, res) => {
  res.json({
    languages: ["C Language", "MySQL", "Python", "JavaScript"],
    frontend: ["React", "React Native", "Next.js", "HTML/CSS"],
    backend: ["Node.js", "MySQL Database", "RESTful API"],
    tools: ["Git", "GitHub", "Figma", "VS Code"]
  });
});

// 5. Contact Form Submission Endpoint
app.post('/api/contact', (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: "Harap isi nama, email, dan pesan."
      });
    }

    const newMessage = {
      id: Date.now(),
      name,
      email,
      message,
      createdAt: new Date().toISOString()
    };

    const currentMessages = JSON.parse(fs.readFileSync(messagesFilePath, 'utf8') || '[]');
    currentMessages.push(newMessage);
    fs.writeFileSync(messagesFilePath, JSON.stringify(currentMessages, null, 2));

    console.log(`[Pesan Masuk] Dari: ${name} (${email}) - ${message}`);

    return res.status(201).json({
      success: true,
      message: "Terima kasih! Pesan berhasil diterima oleh sistem."
    });
  } catch (error) {
    console.error("Error saving contact message:", error);
    return res.status(500).json({
      success: false,
      error: "Terjadi kesalahan internal server saat menyimpan pesan."
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Backend server is running at http://localhost:${PORT}`);
});
