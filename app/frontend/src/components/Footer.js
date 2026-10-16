import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, Image } from 'react-native';

export default function Footer({ onScrollToTop }) {
  return (
    <View style={styles.footer}>
      <View style={styles.container}>
        <View style={styles.brandRow}>
          <View style={styles.avatarMini}>
            <Image
              source={require('../../assets/profile.jpg')}
              style={styles.avatarMiniImage}
              resizeMode="cover"
            />
          </View>
          <Text style={styles.footerTitle}>Ratu Maulani Maheswari</Text>
        </View>

        <Text style={styles.footerSubtitle}>
          Teknik Informatika | 3D Interactive Portfolio
        </Text>

        {/* Social Badges */}
        <View style={styles.socialRow}>
          <TouchableOpacity
            style={styles.socialBtn}
            onPress={() => Linking.openURL('https://github.com/raatuuuu26')}
          >
            <Text style={styles.socialBtnText}>GitHub</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.socialBtn}
            onPress={() => Linking.openURL('https://linkedin.com/in/Ratu-Maulani-Maheswari')}
          >
            <Text style={styles.socialBtnText}>LinkedIn</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.socialBtn}
            onPress={() => Linking.openURL('https://instagram.com/_raatuuuu26')}
          >
            <Text style={styles.socialBtnText}>Instagram</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.bottomRow}>
          <Text style={styles.copyright}>
            © {new Date().getFullYear()} Built with React Native & 3D Touch 360°
          </Text>
          <TouchableOpacity onPress={onScrollToTop} style={styles.topBtn}>
            <Text style={styles.topBtnText}>↑ Ke Atas</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    backgroundColor: '#020617',
    borderTopWidth: 1,
    borderTopColor: '#1E293B',
    paddingVertical: 28,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  container: {
    width: '100%',
    maxWidth: 600,
    alignItems: 'center',
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  avatarMini: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 1.5,
    borderColor: '#38BDF8',
    overflow: 'hidden',
    backgroundColor: '#1E293B',
  },
  avatarMiniImage: {
    width: '100%',
    height: '100%',
  },
  footerTitle: {
    color: '#F8FAFC',
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'serif',
  },
  footerSubtitle: {
    color: '#64748B',
    fontSize: 11,
    marginTop: 4,
    marginBottom: 14,
  },
  socialRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  socialBtn: {
    backgroundColor: '#1E293B',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#334155',
  },
  socialBtnText: {
    color: '#38BDF8',
    fontSize: 11,
    fontWeight: '600',
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    borderTopWidth: 1,
    borderTopColor: '#1E293B',
    paddingTop: 16,
  },
  copyright: {
    color: '#475569',
    fontSize: 10,
  },
  topBtn: {
    backgroundColor: '#0F172A',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#334155',
  },
  topBtnText: {
    color: '#94A3B8',
    fontSize: 10,
    fontWeight: 'bold',
  },
});
