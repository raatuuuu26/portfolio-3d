import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  PanResponder,
  Animated,
  TouchableOpacity,
  Dimensions
} from 'react-native';

const { width } = Dimensions.get('window');
const isSmallDevice = width < 768;

export default function IsometricWorkspace360() {
  const [rotationDeg, setRotationDeg] = useState(0);
  const [isAutoSpin, setIsAutoSpin] = useState(true);
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const currentRotationRef = useRef(0);
  const autoSpinAnimRef = useRef(null);

  // Listener untuk mengupdate angka derajat di badge secara real-time
  useEffect(() => {
    const listenerId = rotateAnim.addListener(({ value }) => {
      currentRotationRef.current = value;
      const normalized = Math.round(((value % 360) + 360) % 360);
      setRotationDeg(normalized);
    });
    return () => rotateAnim.removeListener(listenerId);
  }, []);

  // Loop putaran otomatis (Auto-spin saat idle)
  useEffect(() => {
    if (isAutoSpin) {
      startAutoSpin();
    } else {
      if (autoSpinAnimRef.current) {
        autoSpinAnimRef.current.stop();
      }
    }
    return () => {
      if (autoSpinAnimRef.current) autoSpinAnimRef.current.stop();
    };
  }, [isAutoSpin]);

  const startAutoSpin = () => {
    rotateAnim.setValue(currentRotationRef.current);
    autoSpinAnimRef.current = Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: currentRotationRef.current + 360,
        duration: 16000,
        useNativeDriver: true,
      })
    );
    autoSpinAnimRef.current.start();
  };

  // PanResponder untuk interaksi sentuhan layar / drag mouse 360 derajat
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        if (autoSpinAnimRef.current) {
          autoSpinAnimRef.current.stop();
        }
      },
      onPanResponderMove: (evt, gestureState) => {
        // Sensitivitas drag: 1 piksel geser = 0.8 derajat rotasi
        const newAngle = currentRotationRef.current + gestureState.dx * 0.8;
        rotateAnim.setValue(newAngle);
      },
      onPanResponderRelease: () => {
        if (isAutoSpin) {
          startAutoSpin();
        }
      },
    })
  ).current;

  // Interpolasi rotasi ke string derajat
  const spinY = rotateAnim.interpolate({
    inputRange: [0, 360],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      {/* 3D Stage Area dengan PanResponder Gestures */}
      <View style={styles.stage} {...panResponder.panHandlers}>
        <Animated.View
          style={[
            styles.scene3D,
            {
              transform: [
                { perspective: 1000 },
                { rotateX: '22deg' },
                { rotateY: spinY },
              ],
            },
          ]}
        >
          {/* 1. Meja Kerja Isometrik (Isometric Desk Base) */}
          <View style={styles.deskSurface}>
            <View style={styles.deskTopGlow} />

            {/* Monitor Utama dengan Code Editor */}
            <View style={styles.monitorStand}>
              <View style={styles.monitorBezel}>
                <View style={styles.monitorScreen}>
                  <View style={styles.codeHeader}>
                    <View style={[styles.codeDot, { backgroundColor: '#EF4444' }]} />
                    <View style={[styles.codeDot, { backgroundColor: '#F59E0B' }]} />
                    <View style={[styles.codeDot, { backgroundColor: '#10B981' }]} />
                  </View>
                  <Text style={styles.codeLineCyan}>const dev = "Ratu";</Text>
                  <Text style={styles.codeLineBlue}>role = "Informatics";</Text>
                  <Text style={styles.codeLineGreen}>status = "360_Ready";</Text>
                </View>
              </View>
            </View>

            {/* Laptop Tambahan di Samping */}
            <View style={styles.laptop}>
              <View style={styles.laptopScreen}>
                <Text style={styles.laptopText}>⚡ React Native</Text>
              </View>
              <View style={styles.laptopKeyboard} />
            </View>

            {/* Keyboard Mechanical dengan Backlight */}
            <View style={styles.keyboard}>
              <View style={styles.keyRow}>
                {[...Array(6)].map((_, i) => (
                  <View key={i} style={styles.keyCap} />
                ))}
              </View>
            </View>

            {/* Lampu Meja Neon (Desk Lamp Glow) */}
            <View style={styles.lamp}>
              <View style={styles.lampHead} />
              <View style={styles.lampGlowAura} />
            </View>

            {/* Cangkir Kopi / Mug */}
            <View style={styles.coffeeCup}>
              <View style={styles.coffeeSteam} />
            </View>

            {/* Tanaman Meja Miniatur (Succulent Plant) */}
            <View style={styles.plantPot}>
              <View style={styles.plantLeaf1} />
              <View style={styles.plantLeaf2} />
            </View>
          </View>

          {/* Bayangan Meja 3D (Shadow Pedestal) */}
          <View style={styles.deskShadow} />

          {/* Floating Badges Orbit di Sekeliling Meja */}
          <View style={[styles.orbitBadge, { top: -25, left: -20 }]}>
            <Text style={styles.orbitBadgeText}>⚡ Python</Text>
          </View>
          <View style={[styles.orbitBadge, { bottom: -20, right: -25 }]}>
            <Text style={styles.orbitBadgeText}>⚛️ React Native</Text>
          </View>
          <View style={[styles.orbitBadge, { top: 30, right: -30 }]}>
            <Text style={styles.orbitBadgeText}>💻 C Lang</Text>
          </View>
        </Animated.View>
      </View>

      {/* Kontrol dan Indikator Derajat Rotasi 360° */}
      <View style={styles.badgeBar}>
        <View style={styles.statusIndicator}>
          <View style={styles.pulsingDot} />
          <Text style={styles.badgeText}>
            🔄 {rotationDeg}° / 360° Rotasi Aktif (Geser Layar)
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => setIsAutoSpin(!isAutoSpin)}
          style={[styles.toggleBtn, isAutoSpin && styles.toggleBtnActive]}
          activeOpacity={0.8}
        >
          <Text style={styles.toggleBtnText}>
            {isAutoSpin ? '⏸ Pause' : '▶ Putar Auto'}
          </Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.gestureHint}>
        👆 Sentuh & geser ke kiri/kanan untuk memutar ruang kerja 360 derajat
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 16,
    width: '100%',
  },
  stage: {
    width: isSmallDevice ? 320 : 420,
    height: isSmallDevice ? 320 : 380,
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'grab',
  },
  scene3D: {
    width: 250,
    height: 250,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Permukaan Meja Isometrik
  deskSurface: {
    width: 210,
    height: 150,
    backgroundColor: '#1E293B',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#38BDF8',
    elevation: 12,
    shadowColor: '#38BDF8',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 18,
    position: 'relative',
    padding: 10,
    transform: [{ rotateZ: '-12deg' }],
  },
  deskTopGlow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 4,
    backgroundColor: '#38BDF8',
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
  },
  // Monitor
  monitorStand: {
    position: 'absolute',
    top: 14,
    left: 35,
    alignItems: 'center',
  },
  monitorBezel: {
    width: 120,
    height: 72,
    backgroundColor: '#0F172A',
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: '#38BDF8',
    padding: 5,
    elevation: 8,
  },
  monitorScreen: {
    flex: 1,
    backgroundColor: '#020617',
    borderRadius: 4,
    padding: 4,
    justifyContent: 'space-around',
  },
  codeHeader: {
    flexDirection: 'row',
    gap: 3,
    marginBottom: 3,
  },
  codeDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
  },
  codeLineCyan: {
    fontSize: 7.5,
    color: '#38BDF8',
    fontFamily: 'monospace',
    fontWeight: 'bold',
  },
  codeLineBlue: {
    fontSize: 7.5,
    color: '#818CF8',
    fontFamily: 'monospace',
  },
  codeLineGreen: {
    fontSize: 7.5,
    color: '#34D399',
    fontFamily: 'monospace',
  },
  // Laptop
  laptop: {
    position: 'absolute',
    top: 45,
    right: 12,
    width: 50,
    height: 38,
    transform: [{ rotate: '-18deg' }],
  },
  laptopScreen: {
    width: 46,
    height: 28,
    backgroundColor: '#0F172A',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#818CF8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  laptopText: {
    fontSize: 5.5,
    color: '#38BDF8',
    fontWeight: 'bold',
  },
  laptopKeyboard: {
    width: 48,
    height: 8,
    backgroundColor: '#334155',
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3,
  },
  // Keyboard
  keyboard: {
    position: 'absolute',
    bottom: 22,
    left: 45,
    width: 85,
    height: 26,
    backgroundColor: '#0F172A',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#475569',
    padding: 3,
    justifyContent: 'center',
  },
  keyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  keyCap: {
    width: 9,
    height: 9,
    backgroundColor: '#38BDF8',
    borderRadius: 2,
    opacity: 0.8,
  },
  // Lampu Neon
  lamp: {
    position: 'absolute',
    top: 15,
    left: 12,
  },
  lampHead: {
    width: 14,
    height: 8,
    backgroundColor: '#38BDF8',
    borderRadius: 3,
  },
  lampGlowAura: {
    position: 'absolute',
    top: -4,
    left: -4,
    width: 22,
    height: 16,
    backgroundColor: 'rgba(56, 189, 248, 0.4)',
    borderRadius: 8,
  },
  // Cangkir Kopi
  coffeeCup: {
    position: 'absolute',
    bottom: 26,
    right: 18,
    width: 13,
    height: 14,
    backgroundColor: '#F8FAFC',
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#CBD5E1',
  },
  coffeeSteam: {
    position: 'absolute',
    top: -5,
    left: 3,
    width: 7,
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 3,
  },
  // Tanaman Pot Mini
  plantPot: {
    position: 'absolute',
    top: 78,
    left: 14,
    width: 14,
    height: 12,
    backgroundColor: '#D97706',
    borderRadius: 3,
  },
  plantLeaf1: {
    position: 'absolute',
    top: -6,
    left: 1,
    width: 6,
    height: 7,
    backgroundColor: '#10B981',
    borderRadius: 3,
    transform: [{ rotate: '-25deg' }],
  },
  plantLeaf2: {
    position: 'absolute',
    top: -6,
    right: 1,
    width: 6,
    height: 7,
    backgroundColor: '#34D399',
    borderRadius: 3,
    transform: [{ rotate: '25deg' }],
  },
  // Bayangan Meja Bawah
  deskShadow: {
    position: 'absolute',
    bottom: -15,
    width: 190,
    height: 40,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    borderRadius: 80,
    transform: [{ rotateZ: '-12deg' }],
    zIndex: -1,
  },
  // Orbit Badges
  orbitBadge: {
    position: 'absolute',
    backgroundColor: '#1E293B',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#38BDF8',
    elevation: 4,
  },
  orbitBadgeText: {
    fontSize: 10,
    color: '#F8FAFC',
    fontWeight: 'bold',
  },
  // Badge Indikator Bar
  badgeBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#1E293B',
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#334155',
    marginTop: 10,
  },
  statusIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  pulsingDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#38BDF8',
  },
  badgeText: {
    color: '#38BDF8',
    fontSize: 12,
    fontWeight: '600',
  },
  toggleBtn: {
    backgroundColor: '#0F172A',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#475569',
  },
  toggleBtnActive: {
    borderColor: '#38BDF8',
    backgroundColor: 'rgba(56, 189, 248, 0.15)',
  },
  toggleBtnText: {
    color: '#F8FAFC',
    fontSize: 11,
    fontWeight: '600',
  },
  gestureHint: {
    color: '#94A3B8',
    fontSize: 11,
    marginTop: 6,
    textAlign: 'center',
  },
});
