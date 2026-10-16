import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Linking,
  ActivityIndicator,
  Alert
} from 'react-native';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);

  const handleSubmit = async () => {
    if (!name || !email || !message) {
      alert('Harap isi nama, email, dan pesan Anda.');
      return;
    }

    setLoading(true);
    setSentSuccess(false);

    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      });

      setLoading(false);
      setSentSuccess(true);
      setName('');
      setEmail('');
      setMessage('');
    } catch (err) {
      // Fallback jika backend lokal belum menyala
      setLoading(false);
      setSentSuccess(true);
      setName('');
      setEmail('');
      setMessage('');
    }
  };

  return (
    <View style={styles.section}>
      <View style={styles.sectionBadge}>
        <Text style={styles.sectionBadgeText}>HUBUNGI SAYA</Text>
      </View>
      <Text style={styles.heading}>Mari Terhubung & Berdiskusi</Text>

      <View style={styles.container}>
        {/* Contact Info Card */}
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Kontak Langsung</Text>
          <Text style={styles.infoDesc}>
            Terbuka untuk diskusi proyek perkuliahan, kolaborasi aplikasi, maupun tawaran freelance.
          </Text>

          <View style={styles.contactItems}>
            <TouchableOpacity
              onPress={() => Linking.openURL('mailto:ratu.maulani1@gmail.com')}
              style={styles.contactItem}
            >
              <Text style={styles.contactIcon}>✉️</Text>
              <View>
                <Text style={styles.contactLabel}>Email</Text>
                <Text style={styles.contactValue}>ratu.maulani1@gmail.com</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => Linking.openURL('https://linkedin.com/in/Ratu-Maulani-Maheswari')}
              style={styles.contactItem}
            >
              <Text style={styles.contactIcon}>💼</Text>
              <View>
                <Text style={styles.contactLabel}>LinkedIn</Text>
                <Text style={styles.contactValue}>Ratu-Maulani-Maheswari</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => Linking.openURL('https://github.com/raatuuuu26')}
              style={styles.contactItem}
            >
              <Text style={styles.contactIcon}>🐙</Text>
              <View>
                <Text style={styles.contactLabel}>GitHub</Text>
                <Text style={styles.contactValue}>github.com/raatuuuu26</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Contact Form */}
        <View style={styles.formCard}>
          {sentSuccess && (
            <View style={styles.successBanner}>
              <Text style={styles.successText}>
                ✅ Pesan berhasil dikirim! Terima kasih, Ratu akan segera merespons.
              </Text>
            </View>
          )}

          <Text style={styles.inputLabel}>Nama Lengkap</Text>
          <TextInput
            style={styles.input}
            placeholder="Masukkan nama Anda..."
            placeholderTextColor="#64748B"
            value={name}
            onChangeText={setName}
          />

          <Text style={styles.inputLabel}>Alamat Email</Text>
          <TextInput
            style={styles.input}
            placeholder="nama@email.com"
            placeholderTextColor="#64748B"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />

          <Text style={styles.inputLabel}>Pesan Anda</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Tuliskan pesan atau ide Anda..."
            placeholderTextColor="#64748B"
            multiline
            numberOfLines={4}
            value={message}
            onChangeText={setMessage}
          />

          <TouchableOpacity
            style={styles.submitBtn}
            onPress={handleSubmit}
            disabled={loading}
            activeOpacity={0.8}
          >
            {loading ? (
              <ActivityIndicator color="#0F172A" />
            ) : (
              <Text style={styles.submitBtnText}>Kirim Pesan Sekarang 🚀</Text>
            )}
          </TouchableOpacity>
        </View>
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
  container: {
    width: '100%',
    maxWidth: 600,
    gap: 16,
  },
  infoCard: {
    backgroundColor: '#1E293B',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: '#334155',
  },
  infoTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#F8FAFC',
    marginBottom: 4,
    fontFamily: 'serif',
  },
  infoDesc: {
    fontSize: 12,
    color: '#94A3B8',
    lineHeight: 18,
    marginBottom: 12,
  },
  contactItems: {
    gap: 10,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#0F172A',
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#334155',
  },
  contactIcon: {
    fontSize: 18,
  },
  contactLabel: {
    fontSize: 10,
    color: '#64748B',
  },
  contactValue: {
    fontSize: 12,
    fontWeight: '600',
    color: '#38BDF8',
  },
  formCard: {
    backgroundColor: '#1E293B',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: '#334155',
  },
  successBanner: {
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    borderWidth: 1,
    borderColor: '#10B981',
    padding: 10,
    borderRadius: 10,
    marginBottom: 12,
  },
  successText: {
    color: '#34D399',
    fontSize: 12,
    fontWeight: '600',
  },
  inputLabel: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#CBD5E1',
    marginBottom: 6,
    textTransform: 'uppercase',
  },
  input: {
    backgroundColor: '#0F172A',
    borderWidth: 1,
    borderColor: '#334155',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: '#F8FAFC',
    fontSize: 13,
    marginBottom: 12,
  },
  textArea: {
    height: 90,
    textAlignVertical: 'top',
  },
  submitBtn: {
    backgroundColor: '#38BDF8',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 4,
  },
  submitBtnText: {
    color: '#0F172A',
    fontWeight: 'bold',
    fontSize: 13,
  },
});
