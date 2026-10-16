import React, { useRef } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';

import Header from './src/components/Header';
import Hero from './src/components/Hero';
import About from './src/components/About';
import Skills from './src/components/Skills';
import Projects from './src/components/Projects';
import Contact from './src/components/Contact';
import Footer from './src/components/Footer';

export default function App() {
  const scrollRef = useRef(null);

  const scrollToTop = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ y: 0, animated: true });
    }
  };

  const scrollToContact = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollToEnd({ animated: true });
    }
  };

  const scrollToProjects = () => {
    if (scrollRef.current) {
      // Scroll proporsional ke section proyek
      scrollRef.current.scrollTo({ y: 880, animated: true });
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#0F172A" />
      <Header />
      <ScrollView
        ref={scrollRef}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Hero
          onScrollToContact={scrollToContact}
          onScrollToProjects={scrollToProjects}
        />
        <About />
        <Skills />
        <Projects />
        <Contact />
        <Footer onScrollToTop={scrollToTop} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  scrollContent: {
    paddingBottom: 20,
  },
});
