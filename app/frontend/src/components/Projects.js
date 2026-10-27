import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';

export default function Projects() {
  const projects = [
    {
      id: 1,
      title: 'Aplikasi POS & Akuntansi Toko',
      category: 'Mobile Computing & POS',
      description: 'Aplikasi Point of Sale (POS) dan pembukuan akuntansi toko berbasis mobile untuk manajemen transaksi kasir, inventaris barang, dan pencatatan laporan keuangan.',
      tags: ['TypeScript', 'Mobile Computing', 'POS System', 'Accounting'],
      githubUrl: 'https://github.com/raatuuuu26/Tugas-aplikasi-pos-akuntansi-toko',
    },
    {
      id: 2,
      title: 'Sistem Absensi Face Recognition',
      category: 'AI & Computer Vision',
      description: 'Sistem pencatatan absensi otomatis berbasis pengenalan wajah (Face Recognition) cerdas untuk presensi kehadiran yang akurat, cepat, dan modern.',
      tags: ['TypeScript', 'Computer Vision', 'Face Recognition', 'AI'],
      githubUrl: 'https://github.com/raatuuuu26/absensi-face-recognition',
    },
    {
      id: 3,
      title: 'Academic Virtual Office',
      category: 'AI Multi-Agent & Office Assistant',
      description: 'Sistem asisten pintar otonom (AI Multi-Agent System) berbasis lokal yang dirancang khusus untuk memanajemen seluruh aktivitas perkuliahan mahasiswa secara otomatis.',
      tags: ['Node.js', 'AI Multi-Agent', 'HTML5', 'CSS3 Grid'],
      githubUrl: 'https://github.com/raatuuuu26/academic-virtual-office',
    },
    {
      id: 4,
      title: 'GetKlip - Smart Speech & Media Search',
      category: 'Mobile AI & Media Search',
      description: 'Aplikasi pencarian cerdas untuk galeri foto dan video di perangkat mobile berbasis pengenalan suara (speech recognition) dan kata kunci terindeks.',
      tags: ['Mobile App', 'Speech Search', 'AI', 'Node.js', 'CSS3'],
      githubUrl: 'https://github.com/raatuuuu26/GetKlip',
    },
  ];

  return (
    <View style={styles.section}>
      <View style={styles.sectionBadge}>
        <Text style={styles.sectionBadgeText}>KARYA & PORTOFOLIO</Text>
      </View>
      <Text style={styles.heading}>Proyek Pilihan</Text>

      <View style={styles.projectList}>
        {projects.map((proj) => (
          <View key={proj.id} style={styles.projectCard}>
            <View style={styles.cardTop}>
              <Text style={styles.projectCategory}>{proj.category}</Text>
            </View>

            <Text style={styles.projectTitle}>{proj.title}</Text>
            <Text style={styles.projectDesc}>{proj.description}</Text>

            {/* Tag Stack */}
            <View style={styles.tagRow}>
              {proj.tags.map((tag, idx) => (
                <View key={idx} style={styles.tagPill}>
                  <Text style={styles.tagText}>{tag}</Text>
                </View>
              ))}
            </View>

            {/* Project Links */}
            <View style={styles.linkRow}>
              <TouchableOpacity
                style={styles.actionBtn}
                onPress={() => Linking.openURL(proj.githubUrl)}
                activeOpacity={0.8}
              >
                <Text style={styles.actionBtnText}>Lihat di GitHub ↗</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    paddingHorizontal: 16,
    paddingVertical: 28,
    backgroundColor: '#0F172A',
    alignItems: 'center',
  },
  sectionBadge: {
    backgroundColor: 'rgba(56, 189, 248, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.3)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
    marginBottom: 8,
  },
  sectionBadgeText: {
    color: '#38BDF8',
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#F8FAFC',
    textAlign: 'center',
    marginBottom: 16,
    fontFamily: 'serif',
  },
  projectList: {
    width: '100%',
    maxWidth: 600,
    gap: 14,
  },
  projectCard: {
    backgroundColor: '#1E293B',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: '#334155',
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  projectCategory: {
    color: '#38BDF8',
    fontSize: 11,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  projectTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#F8FAFC',
    marginBottom: 6,
    fontFamily: 'serif',
  },
  projectDesc: {
    fontSize: 12,
    color: '#CBD5E1',
    lineHeight: 18,
    marginBottom: 12,
  },
  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 14,
  },
  tagPill: {
    backgroundColor: '#0F172A',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#334155',
  },
  tagText: {
    color: '#94A3B8',
    fontSize: 10,
    fontWeight: '500',
  },
  linkRow: {
    flexDirection: 'row',
    gap: 8,
  },
  actionBtn: {
    backgroundColor: '#0F172A',
    borderWidth: 1,
    borderColor: '#38BDF8',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  actionBtnText: {
    color: '#38BDF8',
    fontSize: 12,
    fontWeight: 'bold',
  },
});
