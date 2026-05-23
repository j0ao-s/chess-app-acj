import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import theme from '../theme';
import { BottomNavigationBar } from '../components/BottomNavigationBar';

const CreditsScreen: React.FC = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header with back button */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color={theme.colors.onSurface} strokeWidth={1.5} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Créditos</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* University Logo */}
        <View style={styles.logoContainer}>
          <Image
            source={require('../assets/images/university-logo.png')}
            style={styles.universityLogo}
            resizeMode="contain"
          />
        </View>

        {/* Credits Section */}
        <View style={styles.creditsSection}>
          <Text style={styles.sectionTitle}>Desenvolvido por</Text>

          <View style={styles.developersList}>
            <View style={styles.developerCard}>
              <Text style={styles.developerName}>João Manoel</Text>
            </View>
            <View style={styles.developerCard}>
              <Text style={styles.developerName}>Calel Freitas</Text>
            </View>
            <View style={styles.developerCard}>
              <Text style={styles.developerName}>Alvaro Calado</Text>
            </View>
          </View>
        </View>

        {/* About Section */}
        <View style={styles.aboutSection}>
          <Text style={styles.aboutText}>
            Este aplicativo foi desenvolvido como uma solução para gerenciar e facilitar a experiência dos membros do clube de xadrez.
          </Text>
        </View>
      </ScrollView>

      <BottomNavigationBar activeRoute="/dashboard" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.surface,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 56,
    paddingHorizontal: 24,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#18181b',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontFamily: theme.typography.headlineLg.fontFamily,
    fontSize: theme.typography.headlineLg.fontSize,
    fontWeight: theme.typography.headlineLg.fontWeight as any,
    color: theme.colors.onSurface,
  },
  scrollContent: {
    paddingHorizontal: theme.spacing.marginMobile,
    paddingTop: 32,
    paddingBottom: 120,
    gap: 32,
  },
  logoContainer: {
    alignItems: 'center',
    paddingVertical: 32,
    backgroundColor: theme.colors.surfaceContainerLowest,
    borderWidth: 1,
    borderColor: theme.colors.onSurface,
    borderRadius: theme.rounded.default,
    padding: 32,
  },
  universityLogo: {
    width: 160,
    height: 160,
  },
  creditsSection: {
    gap: 24,
  },
  sectionTitle: {
    fontFamily: theme.typography.headlineMd.fontFamily,
    fontSize: theme.typography.headlineMd.fontSize,
    fontWeight: theme.typography.headlineMd.fontWeight as any,
    color: theme.colors.onSurface,
  },
  developersList: {
    gap: 12,
  },
  developerCard: {
    backgroundColor: theme.colors.surfaceContainerLowest,
    borderWidth: 1,
    borderColor: theme.colors.onSurface,
    borderRadius: theme.rounded.default,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  developerName: {
    fontFamily: theme.typography.bodyLg.fontFamily,
    fontSize: theme.typography.bodyLg.fontSize,
    fontWeight: '600' as any,
    color: theme.colors.onSurface,
  },
  aboutSection: {
    backgroundColor: theme.colors.surfaceContainerLowest,
    borderWidth: 1,
    borderColor: theme.colors.onSurface,
    borderRadius: theme.rounded.default,
    padding: 24,
  },
  aboutText: {
    fontFamily: theme.typography.bodyMd.fontFamily,
    fontSize: theme.typography.bodyMd.fontSize,
    fontWeight: theme.typography.bodyMd.fontWeight as any,
    lineHeight: 24,
    color: theme.colors.onSurfaceVariant,
    textAlign: 'center',
  },
});

export default CreditsScreen;
