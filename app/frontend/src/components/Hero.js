import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import IsometricWorkspace360 from './IsometricWorkspace360';

export default function Hero({ onScrollToContact, onScrollToProjects }) {
  return (
    <View style={styles.heroSection}>
      {/* Intro Badge */}
      <View style={styles.badge}>
        <Text style={styles.badgeText}>✨ Welcome to My 3D Portfolio</Text>
      </View>

      {/* Main Title */}
      <Text style={styles.greeting}>Halo, Saya</Text>
      <Text style={styles.fullName}>Ratu Maulani Maheswari</Text>
      <Text style={styles.role}>Informatics Student & Aspiring Software Developer</Text>

      {/* Tagline */}
      <Text style={styles.tagline}>
        "Exploring Technology & Building Digital Solutions"
      </Text>

      {/* 360-Degree Interactive 3D Workspace */}
      <IsometricWorkspace360 />

      {/* CTA Buttons */}
      <View style={styles.ctaGroup}>
        <TouchableOpacity
          style={styles.primaryBtn}
          onPress={onScrollToProjects}
          activeOpacity={0.8}
        >
          <Text style={styles.primaryBtnText}>Lihat Proyek Saya 🚀</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryBtn}
          onPress={onScrollToContact}
          activeOpacity={0.8}
        >
          <Text style={styles.secondaryBtnText}>Hubungi Saya ✉️</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  heroSection: {
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 32,
  },
  badge: {
    backgroundColor: '#1E293B',
    borderWidth: 1,
    borderColor: '#38BDF8',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 16,
  },
  badgeText: {
    color: '#38BDF8',
    fontSize: 12,
    fontWeight: '600',
  },
  greeting: {
    fontSize: 18,
    color: '#94A3B8',
    fontWeight: '500',
  },
  fullName: {
    fontSize: 26,
    color: '#F8FAFC',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 4,
    fontFamily: 'serif',
  },
  role: {
    fontSize: 13,
    color: '#818CF8',
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 6,
    paddingHorizontal: 12,
  },
  tagline: {
    fontSize: 13,
    color: '#94A3B8',
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 8,
    maxWidth: 320,
  },
  ctaGroup: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 18,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  primaryBtn: {
    backgroundColor: '#38BDF8',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    elevation: 4,
  },
  primaryBtnText: {
    color: '#0F172A',
    fontWeight: 'bold',
    fontSize: 13,
  },
  secondaryBtn: {
    backgroundColor: '#1E293B',
    borderWidth: 1,
    borderColor: '#334155',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
  },
  secondaryBtnText: {
    color: '#F8FAFC',
    fontWeight: '600',
    fontSize: 13,
  },
});
