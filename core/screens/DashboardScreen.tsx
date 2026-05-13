import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Bell, User, Key, Trophy, Crown, LayoutDashboard } from 'lucide-react-native';
import theme from '../theme';

const DashboardScreen: React.FC = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* TopAppBar */}
      <View style={styles.appBar}>
        <View style={styles.userInfo}>
          <Image 
            source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDcyuNx4Op8mIygkWZR1hoPdNm5rI1H1ijBAAZFUZysBMt1_N-Q2GwfbGTq2FwW22O-F2WIVG7kmeRrupZqaloSwf1mT8Sz5Ded6m_9VtI8t1d0rBIuGUGJHXwnpF-nq0SLLSAlyA7NFKqU2Zf0QB-yyDsfO_-B5tZDwA-0zyImVWnEQPgkHv2AqQDtOcepSIqEE2ayg76bSUVTtDl9sQt4WCLnLCPM86cqZn1hbukU-MA5qcUf9wcNLDws0IIvpHA-oQzIv6IPz28' }}
            style={styles.profileImage}
          />
          <Text style={styles.userName}>G. KASPAROV</Text>
        </View>
        <TouchableOpacity style={styles.notificationBtn}>
          <Bell size={24} color={theme.colors.onSurface} strokeWidth={1.5} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Contextual Header */}
        <View style={styles.headerSection}>
          <Text style={styles.greeting}>Olá, G. Kasparov</Text>
          <Text style={styles.subtitle}>O tabuleiro está montado. Qual será o seu próximo movimento no clube hoje?</Text>
        </View>

        {/* Minimalist Bento Grid */}
        <View style={styles.grid}>
          {/* Card 1 - Full Width */}
          <TouchableOpacity style={[styles.card, styles.cardFull]} onPress={() => router.push('/settings')}>
            <View style={styles.cardIconBox}>
              <User size={24} color={theme.colors.onSurface} strokeWidth={1.5} />
            </View>
            <View>
              <Text style={styles.cardTitle}>Configurações{'\n'}do Perfil</Text>
              <View style={styles.cardHoverLine} />
            </View>
          </TouchableOpacity>

          {/* Card 3 */}
          <TouchableOpacity style={styles.card} onPress={() => router.push('/ranking')}>
            <View style={styles.cardIconBox}>
              <Trophy size={24} color={theme.colors.onSurface} strokeWidth={1.5} />
            </View>
            <View>
              <Text style={styles.cardTitle}>Classificação</Text>
              <View style={styles.cardHoverLine} />
            </View>
          </TouchableOpacity>

          {/* Card 4 - Decorative */}
          <View style={[styles.card, styles.cardDecorative]}>
            <View style={styles.decorativeIconBox}>
              <Crown size={40} color={theme.colors.surfaceContainerLowest} strokeWidth={1.5} />
            </View>
          </View>
        </View>
      </ScrollView>

      {/* BottomNavBar */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={[styles.navItem, styles.navItemActive]} onPress={() => router.push('/dashboard')}>
          <LayoutDashboard size={20} color="#09090b" strokeWidth={1.5} />
          <Text style={styles.navLabelActive}>DASHBOARD</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/ranking')}>
          <Trophy size={20} color="#a1a1aa" strokeWidth={1.5} />
          <Text style={styles.navLabel}>RANKING</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/settings')}>
          <User size={20} color="#a1a1aa" strokeWidth={1.5} />
          <Text style={styles.navLabel}>PERFIL</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.surface,
  },
  appBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 64,
    paddingHorizontal: 24,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#18181b', // zinc-900 roughly
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  profileImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#18181b',
    backgroundColor: theme.colors.surfaceContainerHigh,
  },
  userName: {
    fontSize: 14,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: '#18181b',
  },
  notificationBtn: {
    padding: 8,
  },
  scrollContent: {
    paddingTop: 32,
    paddingBottom: 100, // accommodate bottom nav
    paddingHorizontal: theme.spacing.marginMobile,
    gap: theme.spacing.xl,
  },
  headerSection: {
    gap: theme.spacing.xs,
  },
  greeting: {
    fontFamily: theme.typography.displayXl.fontFamily,
    fontSize: theme.typography.displayXl.fontSize,
    fontWeight: theme.typography.displayXl.fontWeight as any,
    lineHeight: theme.typography.displayXl.lineHeight,
    letterSpacing: theme.typography.displayXl.letterSpacing,
    color: theme.colors.onSurface,
  },
  subtitle: {
    fontFamily: theme.typography.bodyLg.fontFamily,
    fontSize: theme.typography.bodyLg.fontSize,
    fontWeight: theme.typography.bodyLg.fontWeight as any,
    lineHeight: theme.typography.bodyLg.lineHeight,
    color: theme.colors.onSurfaceVariant,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.xs,
    justifyContent: 'space-between',
  },
  card: {
    width: '48%', // Approx half with gap
    aspectRatio: 1,
    backgroundColor: theme.colors.surfaceContainerLowest,
    borderWidth: 1,
    borderColor: theme.colors.onSurface,
    padding: theme.spacing.lg,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  cardFull: {
    width: '100%',
    aspectRatio: 2.1, // So it's not a giant square
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: theme.spacing.lg,
  },
  cardIconBox: {
    padding: theme.spacing.xs,
    borderWidth: 1,
    borderColor: theme.colors.onSurface,
    borderRadius: theme.rounded.default,
    backgroundColor: theme.colors.surfaceContainerLowest,
    alignItems: 'center',
    justifyContent: 'center',
  },
  materialIcon: {
    fontSize: 24,
    color: theme.colors.onSurface,
  },
  cardTitle: {
    fontFamily: theme.typography.headlineMd.fontFamily,
    fontSize: theme.typography.headlineMd.fontSize,
    fontWeight: theme.typography.headlineMd.fontWeight as any,
    lineHeight: theme.typography.headlineMd.lineHeight,
    letterSpacing: theme.typography.headlineMd.letterSpacing,
    color: theme.colors.onSurface,
  },
  cardHoverLine: {
    height: 1,
    width: '100%',
    backgroundColor: theme.colors.onSurface,
    marginTop: theme.spacing.sm,
    opacity: 0,
  },
  cardDecorative: {
    backgroundColor: theme.colors.onSurface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  decorativeIconBox: {
    width: 64,
    height: 64,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  decorativeIcon: {
    fontSize: 40,
    color: theme.colors.surfaceContainerLowest,
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#18181b',
    paddingHorizontal: 16,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: 'transparent',
  },
  navItemActive: {
    borderTopColor: '#09090b',
  },
  navIcon: {
    fontSize: 20,
    color: '#a1a1aa',
  },
  navIconActive: {
    fontSize: 20,
    color: '#09090b',
  },
  navLabel: {
    fontFamily: 'Inter',
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: -0.5,
    marginTop: 4,
    color: '#a1a1aa',
  },
  navLabelActive: {
    fontFamily: 'Inter',
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: -0.5,
    marginTop: 4,
    color: '#09090b',
  },
});

export default DashboardScreen;
