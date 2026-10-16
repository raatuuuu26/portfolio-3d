import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

export default function Header({ onNavigate }) {
  return (
    <View style={styles.header}>
      {/* Brand Logo with Profile Photo */}
      <View style={styles.brand}>
        <View style={styles.avatarContainer}>
          <Image
            source={require('../../assets/profile.jpg')}
            style={styles.avatarImage}
            resizeMode="cover"
          />
        </View>
        <View>
          <Text style={styles.brandName}>RATU</Text>
          <Text style={styles.brandRole}>Informatics Dev</Text>
        </View>
      </View>

      {/* Status Badge */}
      <View style={styles.statusBadge}>
        <View style={styles.onlineDot} />
        <Text style={styles.statusText}>Open for Freelance</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#0F172A',
    borderBottomWidth: 1,
    borderBottomColor: '#1E293B',
    position: 'sticky',
    top: 0,
    zIndex: 50,
  },
  brand: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#38BDF8',
    overflow: 'hidden',
    backgroundColor: '#1E293B',
    elevation: 5,
    shadowColor: '#38BDF8',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  brandName: {
    color: '#F8FAFC',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
    fontFamily: 'serif',
  },
  brandRole: {
    color: '#94A3B8',
    fontSize: 10,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.3)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  onlineDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#10B981',
  },
  statusText: {
    color: '#10B981',
    fontSize: 11,
    fontWeight: '600',
  },
});
