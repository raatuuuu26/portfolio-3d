import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Skills() {
  const categories = [
    {
      title: 'Bahasa Pemrograman',
      skills: ['C Language', 'MySQL', 'Python', 'JavaScript'],
      accent: '#38BDF8',
    },
    {
      title: 'Frontend Framework & Web',
      skills: ['React', 'React Native', 'Next.js', 'HTML / CSS'],
      accent: '#818CF8',
    },
    {
      title: 'Backend & Database',
      skills: ['Node.js', 'MySQL Database', 'RESTful API'],
      accent: '#34D399',
    },
    {
      title: 'Tools & Platform',
      skills: ['Git', 'GitHub', 'Figma', 'VS Code'],
      accent: '#F59E0B',
    },
  ];

  return (
    <View style={styles.section}>
      <View style={styles.sectionBadge}>
        <Text style={styles.sectionBadgeText}>KEAHLIAN</Text>
      </View>
      <Text style={styles.heading}>Tech Stack & Tools</Text>

      <View style={styles.grid}>
        {categories.map((cat, index) => (
          <View key={index} style={styles.card}>
            <View style={[styles.cardHeaderIndicator, { backgroundColor: cat.accent }]} />
            <Text style={styles.cardTitle}>{cat.title}</Text>
            <View style={styles.pillContainer}>
              {cat.skills.map((skill, sIdx) => (
                <View key={sIdx} style={[styles.pill, { borderColor: cat.accent }]}>
                  <Text style={[styles.pillText, { color: cat.accent }]}>{skill}</Text>
                </View>
              ))}
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
  grid: {
    width: '100%',
    maxWidth: 600,
    gap: 12,
  },
  card: {
    backgroundColor: '#1E293B',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: '#334155',
    position: 'relative',
    overflow: 'hidden',
  },
  cardHeaderIndicator: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 3,
  },
  cardTitle: {
    color: '#F8FAFC',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 2,
  },
  pillContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  pill: {
    backgroundColor: '#0F172A',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    borderWidth: 1,
  },
  pillText: {
    fontSize: 11,
    fontWeight: '600',
  },
});
