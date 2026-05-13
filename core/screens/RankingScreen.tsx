import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Menu, Search, Crown, LayoutDashboard, Trophy, User } from 'lucide-react-native';
import theme from '../theme';

const RankingScreen: React.FC = () => {
  const router = useRouter();
  const topPlayers = [
    { rank: 2, name: '@hikaru', score: '2810', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD2l7lf3dwvWGR9oxPxHNvGh-QZkwUJsQ4R1Wa1zGL0Se1xW48PSSc33FGXA3CY3XcyWycOCaFbl7ilr8tl3YEOxEdrSjM5sS8Hf2GlMhnMmCMxRZDhKV-pb1-jeYdp45DXvrTzhE0hkWoZbLr9f822NHAwCSvx6v-2YZ0tUJmN13trj8QnYPQ_6vIyX4gB1ttoqd32AtO73vDgh2jBTzS1cvIkX1f6MN3uxkTL7CMODpyifJPEWfjwCcCNzMFo4PeEElrSc9QWnFk' },
    { rank: 1, name: '@magnus_c', score: '2850', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDsqBUQXLLu9eO1rmHxvxa1qUF2yK6xihxPssArd9y8xzzgM_T6jcufrZPJicT7jeFbrdaqH-uYJQgZR0MZed4-DbKjk_TCJRG-6FVp0Fzh7e3IltT90fRT270VdG_-hn92SYjt84e-FR2CPiWwXynXdEdfutDnpPNfgfk0TQ1MCO7ImzgC14VgOfFPWoe-ZUaNFgak_6otqZzUYsEZakcrmlaOu_359Hy87AcxEVJ8YHz_USlisHKwaqJjUeBNdCtBNy5-BmFb20Q' },
    { rank: 3, name: '@fabi_c', score: '2795', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDOT5It6HysxT1OvIjtxsIxa2Ig8cgRfBEk7yQ1h1mbIHBLlWAx4p3Pode5ROpRphJRhWKmTu3nES-i0dNe8_GDQ7vgxD_uDhf4p0iedKDpXCRFsYy56orMuKwbRPKPwfKkqLlXcWUs4fzKk_Fj3bZjQGaXT7v0ETMmCXIEEZkGO7PYc8rm9WGXwAyNoV5WYVBbroIlWvPSo963MGucqa06ErnK7OA0f5IY-os-oO1Tt8PpAnR6EKwupbKek8TOFS7Mdt9nGt62MdQ' }
  ];

  const listPlayers = [
    { rank: 4, name: '@ding_liren', score: '2780', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC9nwvLhSkT0plRJPwpndsiIqNdVtdF6yY9WuPYShFMnQcbZblV7yHSUI_uFYcaK1H1UU136aACTcnBxCs_2YgINWnxwBTTaCNVITuHV9y0rUczkPO29Hi6ADuwQbfo3wqTAF8QbBu_t2xNMbimCKuFIyFMu3zr-WjYWGzRqFqp_kIJgc1nRpqYBKDEPp668NgKPr4e0nQB_u4i0P_mejB1ZcNqCqReTaBSA5Sv-BnNitELHhqR4UI11ofr2d_GLzaLpsWw2JVBu58' },
    { rank: 5, name: '@nepo_ian', score: '2771', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBAz5x2R8mOJQNF5sxw-Ws4DrIaqy2w0j0VyEcFUaN3ddQecMsjJJX6X0b5qTpeVsYuaCOYmQYY-D2AGZJ4NPGQrr-acdf3errOGePRHS4ci79fhywSbh0eIsvRMVdyffTDyTUNv40ME8POHn20yblCzCM0x5_cs9Dg1e0YRwAUrTquc46tnCylzsGdvgRoB9iM7IQu_UTFkjc2izC46CKIQCddUR110hCKWlWibdgADHkGyn5oGCTcGl3iqekznI6UDZsSHDw6Mfg' },
    { rank: 6, name: '@alireza_f', score: '2760', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC_fh9wZUMznYBe09TEOa0PY2yKbLqN86RVCUdVSH9TwXZCeFd9IxegE3_vZK3ZWYDmxWTl7lHf9-2aUqPfTP4qODNEUlr9ZSfLH0E3C0AntYsE8ow2n3SqU_sayPQQbYhGez3pWVXiJbkVHU5SW7P8Y1AEexoXLIIcfJ-pbRvIo14-fLAOBSHTtJv_hFkV0LfrnBr_Km8eNxS-pZfRwNiBpbWlwsyyy_DOkmIOBjV-xIfsb9E6McxzHFFl0sV_nXPn6-GJaGgrALc' },
    { rank: 7, name: '@wesley_so', score: '2757', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD3uY8fN7wsM2hBAd2zA6vwgPWNegBpzVX7KpToWTJVo6lo1jwErt14S43IJpDDcXPeYgiUY10PF6uCLMDqwXcRjdiNPCkKDGSga7VcORkKKBqZqtsCWbDbWrsdfyjs7NWugk9q1C2pADco58zoWNkX0-aYJ6655J9WogRsooyqpFhLwJnNqWpmzkzToDsjTzJOKvIhk14ZveBesJPIHTPWUAGdxKY-SxdQ7b0E0fBYOHlMOpEzGXlj6sogm_JA08lJxIFUGgW_Ts8' }
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* TopAppBar */}
      <View style={styles.appBar}>
        <TouchableOpacity style={styles.appBarBtn}>
          <Menu size={24} color="#000" strokeWidth={1.5} />
        </TouchableOpacity>
        <Text style={styles.appBarTitle}>RANKINGS</Text>
        <TouchableOpacity style={styles.appBarBtn}>
          <Search size={24} color="#000" strokeWidth={1.5} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Page Semantic Header */}
        <View style={styles.headerSection}>
          <Text style={styles.pageTitle}>Classificação</Text>
          <Text style={styles.pageSubtitle}>Top players in the global hierarchy.</Text>
        </View>

        {/* Podium */}
        <View style={styles.podiumContainer}>
          {/* 2nd Place */}
          <View style={[styles.podiumItem, styles.podiumItemSide]}>
            <Image source={{ uri: topPlayers[0].image }} style={styles.podiumImageSmall} />
            <View style={styles.podiumBadge}>
              <Text style={styles.podiumBadgeText}>2</Text>
            </View>
            <Text style={styles.podiumName}>{topPlayers[0].name}</Text>
            <Text style={styles.podiumScore}>{topPlayers[0].score}</Text>
          </View>

          {/* 1st Place */}
          <View style={[styles.podiumItem, styles.podiumItemCenter]}>
            <Crown size={24} color={theme.colors.onSurface} strokeWidth={1.5} style={{ marginBottom: theme.spacing.xs }} />
            <Image source={{ uri: topPlayers[1].image }} style={styles.podiumImageLarge} />
            <View style={[styles.podiumBadge, styles.podiumBadgeFirst]}>
              <Text style={styles.podiumBadgeTextFirst}>1</Text>
            </View>
            <Text style={[styles.podiumName, styles.podiumNameFirst]}>{topPlayers[1].name}</Text>
            <Text style={styles.podiumScore}>{topPlayers[1].score}</Text>
          </View>

          {/* 3rd Place */}
          <View style={[styles.podiumItem, styles.podiumItemSide]}>
            <Image source={{ uri: topPlayers[2].image }} style={styles.podiumImageSmall} />
            <View style={styles.podiumBadge}>
              <Text style={styles.podiumBadgeText}>3</Text>
            </View>
            <Text style={styles.podiumName}>{topPlayers[2].name}</Text>
            <Text style={styles.podiumScore}>{topPlayers[2].score}</Text>
          </View>
        </View>

        {/* List Section */}
        <View style={styles.listContainer}>
          {listPlayers.map((player) => (
            <TouchableOpacity key={player.rank} style={styles.listItem}>
              <View style={styles.listItemLeft}>
                <Text style={styles.listItemRank}>{player.rank}</Text>
                <Image source={{ uri: player.image }} style={styles.listItemImage} />
                <Text style={styles.listItemName}>{player.name}</Text>
              </View>
              <Text style={styles.listItemScore}>{player.score}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Load More */}
        <View style={styles.loadMoreContainer}>
          <TouchableOpacity style={styles.loadMoreBtn}>
            <Text style={styles.loadMoreText}>LOAD MORE MOVES</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* BottomNavBar */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/dashboard')}>
          <LayoutDashboard size={20} color="#a1a1aa" strokeWidth={1.5} />
          <Text style={styles.navLabel}>DASHBOARD</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={[styles.navItem, styles.navItemActive]} onPress={() => router.push('/ranking')}>
          <Trophy size={20} color="#000000" strokeWidth={1.5} />
          <Text style={styles.navLabelActive}>RANKING</Text>
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
    backgroundColor: theme.colors.surfaceContainerLowest,
  },
  appBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 56, // h-14
    paddingHorizontal: 24, // px-6
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#000000', // border-black
    zIndex: 40,
  },
  appBarBtn: {
    padding: 4,
  },
  materialIcon: {
    fontSize: 24,
    color: '#000000',
  },
  appBarTitle: {
    fontFamily: 'Inter',
    fontSize: 18,
    fontWeight: '900', // font-black
    textTransform: 'uppercase',
    letterSpacing: -0.5,
    color: '#000000',
  },
  scrollContent: {
    paddingTop: 32,
    paddingBottom: 100, // accommodate bottom nav
    paddingHorizontal: theme.spacing.marginMobile, // px-margin-mobile
  },
  headerSection: {
    alignItems: 'center',
    marginBottom: theme.spacing.xl, // mb-xl
  },
  pageTitle: {
    fontFamily: theme.typography.displayXl.fontFamily,
    fontSize: theme.typography.displayXl.fontSize,
    fontWeight: theme.typography.displayXl.fontWeight as any,
    lineHeight: theme.typography.displayXl.lineHeight,
    letterSpacing: theme.typography.displayXl.letterSpacing,
    color: theme.colors.onSurface,
  },
  pageSubtitle: {
    fontFamily: theme.typography.bodyMd.fontFamily,
    fontSize: theme.typography.bodyMd.fontSize,
    fontWeight: theme.typography.bodyMd.fontWeight as any,
    lineHeight: theme.typography.bodyMd.lineHeight,
    color: theme.colors.secondary,
    marginTop: theme.spacing.sm,
  },
  podiumContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    gap: theme.spacing.md,
    marginBottom: theme.spacing.xl,
    paddingTop: theme.spacing.lg,
  },
  podiumItem: {
    alignItems: 'center',
  },
  podiumItemSide: {
    paddingBottom: theme.spacing.md,
  },
  podiumItemCenter: {
    zIndex: 10,
  },
  podiumImageSmall: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: theme.colors.onSurface,
    backgroundColor: theme.colors.surfaceContainer,
  },
  podiumImageLarge: {
    width: 112, // 28 * 4
    height: 112,
    borderRadius: 56,
    borderWidth: 1,
    borderColor: theme.colors.onSurface,
    backgroundColor: theme.colors.surfaceContainer,
  },
  podiumBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: theme.colors.onSurface,
    backgroundColor: theme.colors.surfaceContainerLowest,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -12,
    zIndex: 10,
  },
  podiumBadgeFirst: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginTop: -16,
    backgroundColor: theme.colors.onSurface,
  },
  podiumBadgeText: {
    fontFamily: theme.typography.labelSm.fontFamily,
    fontSize: theme.typography.labelSm.fontSize,
    fontWeight: theme.typography.labelSm.fontWeight as any,
    color: theme.colors.onSurface,
  },
  podiumBadgeTextFirst: {
    fontFamily: theme.typography.headlineMd.fontFamily,
    fontSize: theme.typography.headlineMd.fontSize,
    fontWeight: theme.typography.headlineMd.fontWeight as any,
    color: theme.colors.onPrimary,
  },
  podiumName: {
    fontFamily: theme.typography.labelSm.fontFamily,
    fontSize: theme.typography.labelSm.fontSize,
    fontWeight: theme.typography.labelSm.fontWeight as any,
    color: theme.colors.onSurface,
    textTransform: 'uppercase',
    letterSpacing: 1, // tracking-widest
    marginTop: theme.spacing.sm,
  },
  podiumNameFirst: {
    fontFamily: theme.typography.headlineMd.fontFamily,
    fontSize: theme.typography.headlineMd.fontSize,
    fontWeight: theme.typography.headlineMd.fontWeight as any,
    letterSpacing: -0.5, // tracking-tight
  },
  podiumScore: {
    fontFamily: theme.typography.labelSm.fontFamily,
    fontSize: theme.typography.labelSm.fontSize,
    fontWeight: theme.typography.labelSm.fontWeight as any,
    color: theme.colors.secondary,
    marginTop: theme.spacing.xs,
  },
  crownIcon: {
    fontSize: 24,
    marginBottom: theme.spacing.xs,
  },
  listContainer: {
    borderTopWidth: 1,
    borderTopColor: theme.colors.secondaryFixed,
    marginTop: theme.spacing.xl,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.surfaceVariant,
  },
  listItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  listItemRank: {
    width: 32,
    textAlign: 'center',
    fontFamily: theme.typography.labelSm.fontFamily,
    fontSize: theme.typography.labelSm.fontSize,
    fontWeight: theme.typography.labelSm.fontWeight as any,
    color: theme.colors.secondary,
  },
  listItemImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: theme.colors.onSurface,
    backgroundColor: theme.colors.surfaceContainer,
  },
  listItemName: {
    fontFamily: theme.typography.bodyLg.fontFamily,
    fontSize: theme.typography.bodyLg.fontSize,
    fontWeight: theme.typography.bodyLg.fontWeight as any,
    color: theme.colors.onSurface,
    letterSpacing: -0.5, // tracking-tight
  },
  listItemScore: {
    fontFamily: theme.typography.labelSm.fontFamily,
    fontSize: theme.typography.labelSm.fontSize,
    fontWeight: theme.typography.labelSm.fontWeight as any,
    color: theme.colors.onSurface,
  },
  loadMoreContainer: {
    alignItems: 'center',
    marginTop: theme.spacing.xl,
    marginBottom: theme.spacing.xl,
  },
  loadMoreBtn: {
    backgroundColor: theme.colors.surfaceContainerLowest,
    borderWidth: 1,
    borderColor: theme.colors.onSurface,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
  },
  loadMoreText: {
    fontFamily: theme.typography.labelSm.fontFamily,
    fontSize: theme.typography.labelSm.fontSize,
    fontWeight: theme.typography.labelSm.fontWeight as any,
    color: theme.colors.onSurface,
    textTransform: 'uppercase',
    letterSpacing: 1, // tracking-widest
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

export default RankingScreen;
