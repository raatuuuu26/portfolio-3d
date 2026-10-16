import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';

export default function Projects() {
  const projects = [
    {
      id: 1,
      title: 'Aplikasi Sistem Informasi Akademik',
      category: 'Informatics & Web',
      description: 'Platform manajemen data perkuliahan, nilai, dan jadwal mahasiswa berbasis web dengan antarmuka responsif dan database MySQL.',
      tags: ['React', 'Node.js', 'MySQL', 'JavaScript'],
      githubUrl: 'https://github.com/raatuuuu26',
    },
    {
      id: 2,
      title: 'Eksperimen Algoritma & Struktur Data',
      category: 'C Language & Algorithm',
      description: 'Kumpulan implementasi algoritma pencarian, pengurutan, dan struktur data linked list menggunakan bahasa pemrograman C.',
      tags: ['C Language', 'Algorithms', 'Data Structures'],
      githubUrl: 'https://github.com/raatuuuu26',
    },
    {
      id: 3,
      title: 'Python Automation & Data Utility',
      category: 'Python Scripting',
      description: 'Script otomasi pengolahan berkas dan ekstraksi data sederhana berbasis Python untuk meningkatkan produktivitas pengerjaan tugas.',
      tags: ['Python', 'Automation', 'CLI'],
      githubUrl: 'https://github.com/raatuuuu26',
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
