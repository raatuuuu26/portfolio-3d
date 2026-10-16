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
      title: "Aplikasi Sistem Informasi Akademik",
      category: "Informatics & Web",
      description: "Platform manajemen data perkuliahan, nilai, dan jadwal mahasiswa berbasis web dengan antarmuka responsif dan database MySQL.",
      tags: ["React", "Node.js", "MySQL", "JavaScript"],
      githubUrl: "https://github.com/raatuuuu26"
    },
    {
      id: 2,
      title: "Eksperimen Algoritma & Struktur Data",
      category: "C Language & Algorithm",
      description: "Kumpulan implementasi algoritma pencarian, pengurutan, dan struktur data linked list menggunakan bahasa pemrograman C.",
      tags: ["C Language", "Algorithms", "Data Structures"],
      githubUrl: "https://github.com/raatuuuu26"
    },
    {
      id: 3,
      title: "Python Automation & Data Utility",
      category: "Python Scripting",
      description: "Script otomasi pengolahan berkas dan ekstraksi data sederhana berbasis Python untuk meningkatkan produktivitas pengerjaan tugas.",
      tags: ["Python", "Automation", "CLI"],
      githubUrl: "https://github.com/raatuuuu26"
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
