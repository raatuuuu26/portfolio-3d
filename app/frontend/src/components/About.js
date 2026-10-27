import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Linking } from 'react-native';

export default function About() {
  const stats = [
    { label: 'Tahun Pengalaman', value: '2 Tahun' },
    { label: 'Proyek Selesai', value: '5+ Proyek' },
    { label: 'Kepuasan / Repositori', value: '85% / 8+' },
  ];

  return (
    <View style={styles.section}>
      <View style={styles.sectionBadge}>
        <Text style={styles.sectionBadgeText}>TENTANG SAYA</Text>
      </View>
      <Text style={styles.heading}>Perjalanan & Dedikasi di Dunia Informatika</Text>

      {/* Foto Profil Utama Berukuran Besar */}
      <View style={styles.largeAvatarContainer}>
        <Image
          source={require('../../assets/profile.jpg')}
          style={styles.largeAvatarImage}
          resizeMode="cover"
        />
        <View style={styles.avatarGlowRing} />
        <View style={styles.onlineStatusBadge}>
          <Text style={styles.onlineStatusText}>✓</Text>
        </View>
      </View>

      {/* Bio Paragraph */}
      <View style={styles.bioCard}>
        <Text style={styles.bioNameTitle}>Ratu Maulani Maheswari</Text>
        <Text style={styles.bioSubTitle}>Informatics Student & Aspiring Software Developer</Text>
        
        <Text style={styles.bioText}>
          Saya adalah mahasiswa Teknik Informatika semester 5 yang memiliki ketertarikan pada teknologi informasi dan pengembangan solusi digital.
        </Text>
        <Text style={[styles.bioText, { marginTop: 10 }]}>
          Saya sedang mengembangkan kemampuan di bidang pemrograman, pengembangan aplikasi, dan teknologi komputer melalui perkuliahan serta proyek-proyek akademik.
        </Text>
        <Text style={styles.locationText}>📍 Lokasi: Karawang, Jawa Barat, Indonesia</Text>

        {/* Tombol Unduh PDF Dokumen */}
        <TouchableOpacity
          style={styles.downloadPdfBtn}
          onPress={() => Linking.openURL('https://portfolio-3d-frontend.vercel.app/Portofolio_Ratu_Maulani_Maheswari.pdf')}
          activeOpacity={0.8}
        >
          <Text style={styles.downloadPdfText}>📄 Unduh Portofolio Versi PDF</Text>
        </TouchableOpacity>
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
    paddingVertical: 32,
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
    marginBottom: 20,
    fontFamily: 'serif',
  },
  // Foto Profil Besar
  largeAvatarContainer: {
    width: 116,
    height: 116,
    borderRadius: 58,
    borderWidth: 3,
    borderColor: '#38BDF8',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    elevation: 10,
    shadowColor: '#38BDF8',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.45,
    shadowRadius: 12,
    backgroundColor: '#1E293B',
  },
  largeAvatarImage: {
    width: 110,
    height: 110,
    borderRadius: 55,
  },
  avatarGlowRing: {
    position: 'absolute',
    top: -5,
    left: -5,
    right: -5,
    bottom: -5,
    borderRadius: 63,
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.4)',
  },
  onlineStatusBadge: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#10B981',
    borderWidth: 2,
    borderColor: '#0F172A',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
  onlineStatusText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: 'bold',
  },
  // Bio Card
  bioCard: {
    backgroundColor: '#1E293B',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#334155',
    width: '100%',
    maxWidth: 600,
  },
  bioNameTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#F8FAFC',
    marginBottom: 2,
    fontFamily: 'serif',
  },
  bioSubTitle: {
    fontSize: 12,
    color: '#38BDF8',
    fontWeight: '600',
    marginBottom: 12,
  },
  bioText: {
    color: '#CBD5E1',
    fontSize: 13,
    lineHeight: 21,
  },
  locationText: {
    color: '#38BDF8',
    fontSize: 12,
    fontWeight: '600',
    marginTop: 14,
    marginBottom: 16,
  },
  downloadPdfBtn: {
    backgroundColor: '#0F172A',
    borderWidth: 1.5,
    borderColor: '#38BDF8',
    borderRadius: 12,
    paddingVertical: 11,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  downloadPdfText: {
    color: '#38BDF8',
    fontSize: 12,
    fontWeight: 'bold',
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
