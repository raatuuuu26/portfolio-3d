import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function About() {
  const stats = [
    { label: 'Tahun Pengalaman', value: '2 Tahun' },
    { label: 'Proyek Selesai', value: '5 Proyek' },
    { label: 'Kepuasan / Repositori', value: '85% / 8+' },
  ];

  return (
    <View style={styles.section}>
      <View style={styles.sectionBadge}>
        <Text style={styles.sectionBadgeText}>TENTANG SAYA</Text>
      </View>
      <Text style={styles.heading}>Perjalanan & Dedikasi di Dunia Informatika</Text>

      {/* Bio Paragraph */}
      <View style={styles.bioCard}>
        <Text style={styles.bioText}>
          Saya adalah mahasiswa Teknik Informatika semester 5 yang memiliki ketertarikan pada teknologi informasi dan pengembangan solusi digital.
        </Text>
        <Text style={[styles.bioText, { marginTop: 10 }]}>
          Saya sedang mengembangkan kemampuan di bidang pemrograman, pengembangan aplikasi, dan teknologi komputer melalui perkuliahan serta proyek-proyek akademik.
        </Text>
        <Text style={styles.locationText}>📍 Lokasi: Karawang, Jawa Barat, Indonesia</Text>
      </View>

      {/* Statistics Cards */}
      <View style={styles.statsContainer}>
        {stats.map((item, index) => (
          <View key={index} style={styles.statCard}>
            <Text style={styles.statValue}>{item.value}</Text>
            <Text style={styles.statLabel}>{item.label}</Text>
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
  bioCard: {
    backgroundColor: '#1E293B',
    borderRadius: 14,
    padding: 18,
    borderWidth: 1,
    borderColor: '#334155',
    width: '100%',
    maxWidth: 600,
  },
  bioText: {
    color: '#CBD5E1',
    fontSize: 13,
    lineHeight: 20,
  },
  locationText: {
    color: '#38BDF8',
    fontSize: 12,
    fontWeight: '600',
    marginTop: 14,
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 16,
    width: '100%',
    maxWidth: 600,
    justifyContent: 'space-between',
  },
  statCard: {
    flex: 1,
    minWidth: 90,
    backgroundColor: '#1E293B',
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#334155',
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#38BDF8',
  },
  statLabel: {
    fontSize: 10,
    color: '#94A3B8',
    marginTop: 4,
    textAlign: 'center',
  },
});
