import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { Menu, Search, Crown, LayoutDashboard, Trophy, User } from 'lucide-react-native';
import theme from '../theme';
import { api } from '../lib/api';

type Player = { rank: number; name: string; username: string; score: number };

function Avatar({ name, size }: { name: string; size: number }) {
  const initial = name?.charAt(0)?.toUpperCase() ?? '?';
  return (
    <View style={[styles.avatarPlaceholder, { width: size, height: size, borderRadius: size / 2 }]}>
      <Text style={[styles.avatarInitial, { fontSize: size * 0.38 }]}>{initial}</Text>
    </View>
  );
}

const RankingScreen: React.FC = () => {
  const router = useRouter();
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [offset, setOffset] = useState(0);
  const [total, setTotal] = useState(0);

  async function fetchRankings(currentOffset = 0) {
    try {
      const data = await api.get(`/rankings?limit=10&offset=${currentOffset}`);
      setPlayers(prev => currentOffset === 0 ? data.data : [...prev, ...data.data]);
      setTotal(data.total);
      setOffset(currentOffset + data.data.length);
    } catch {
      // mantém dados anteriores em caso de erro
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { fetchRankings(); }, []);

  const topPlayers = players.slice(0, 3);
  const listPlayers = players.slice(3);

  return (
    <SafeAreaView style={styles.safeArea}>
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
        <View style={styles.headerSection}>
          <Text style={styles.pageTitle}>Classificação</Text>
          <Text style={styles.pageSubtitle}>Top players in the global hierarchy.</Text>
        </View>

        {loading ? (
          <ActivityIndicator size="large" color={theme.colors.onSurface} style={{ marginTop: 48 }} />
        ) : (
          <>
            {topPlayers.length >= 3 && (
              <View style={styles.podiumContainer}>
                {/* 2nd Place */}
                <View style={[styles.podiumItem, styles.podiumItemSide]}>
                  <Avatar name={topPlayers[1].name} size={80} />
                  <View style={styles.podiumBadge}>
                    <Text style={styles.podiumBadgeText}>2</Text>
                  </View>
                  <Text style={styles.podiumName}>{topPlayers[1].name}</Text>
                  <Text style={styles.podiumScore}>{topPlayers[1].score}</Text>
                </View>

                {/* 1st Place */}
                <View style={[styles.podiumItem, styles.podiumItemCenter]}>
                  <Crown size={24} color={theme.colors.onSurface} strokeWidth={1.5} style={{ marginBottom: theme.spacing.xs }} />
                  <Avatar name={topPlayers[0].name} size={112} />
                  <View style={[styles.podiumBadge, styles.podiumBadgeFirst]}>
                    <Text style={styles.podiumBadgeTextFirst}>1</Text>
                  </View>
                  <Text style={[styles.podiumName, styles.podiumNameFirst]}>{topPlayers[0].name}</Text>
                  <Text style={styles.podiumScore}>{topPlayers[0].score}</Text>
                </View>

                {/* 3rd Place */}
                <View style={[styles.podiumItem, styles.podiumItemSide]}>
                  <Avatar name={topPlayers[2].name} size={80} />
                  <View style={styles.podiumBadge}>
                    <Text style={styles.podiumBadgeText}>3</Text>
                  </View>
                  <Text style={styles.podiumName}>{topPlayers[2].name}</Text>
                  <Text style={styles.podiumScore}>{topPlayers[2].score}</Text>
                </View>
              </View>
            )}

            <View style={styles.listContainer}>
              {listPlayers.map((player) => (
                <TouchableOpacity key={player.rank} style={styles.listItem}>
                  <View style={styles.listItemLeft}>
                    <Text style={styles.listItemRank}>{player.rank}</Text>
                    <Avatar name={player.name} size={40} />
                    <Text style={styles.listItemName}>{player.name}</Text>
                  </View>
                  <Text style={styles.listItemScore}>{player.score}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {offset < total && (
              <View style={styles.loadMoreContainer}>
                <TouchableOpacity style={styles.loadMoreBtn} onPress={() => fetchRankings(offset)}>
                  <Text style={styles.loadMoreText}>LOAD MORE</Text>
                </TouchableOpacity>
              </View>
            )}
          </>
        )}
      </ScrollView>

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
    height: 56,
    paddingHorizontal: 24,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
    zIndex: 40,
  },
  appBarBtn: {
    padding: 4,
  },
  appBarTitle: {
    fontFamily: 'Inter',
    fontSize: 18,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: -0.5,
    color: '#000000',
  },
  scrollContent: {
    paddingTop: 32,
    paddingBottom: 100,
    paddingHorizontal: theme.spacing.marginMobile,
  },
  headerSection: {
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
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
  avatarPlaceholder: {
    borderWidth: 1,
    borderColor: theme.colors.onSurface,
    backgroundColor: theme.colors.surfaceContainer,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarInitial: {
    fontFamily: theme.typography.labelSm.fontFamily,
    fontWeight: theme.typography.labelSm.fontWeight as any,
    color: theme.colors.onSurface,
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
    letterSpacing: 1,
    marginTop: theme.spacing.sm,
  },
  podiumNameFirst: {
    fontFamily: theme.typography.headlineMd.fontFamily,
    fontSize: theme.typography.headlineMd.fontSize,
    fontWeight: theme.typography.headlineMd.fontWeight as any,
    letterSpacing: -0.5,
  },
  podiumScore: {
    fontFamily: theme.typography.labelSm.fontFamily,
    fontSize: theme.typography.labelSm.fontSize,
    fontWeight: theme.typography.labelSm.fontWeight as any,
    color: theme.colors.secondary,
    marginTop: theme.spacing.xs,
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
  listItemName: {
    fontFamily: theme.typography.bodyLg.fontFamily,
    fontSize: theme.typography.bodyLg.fontSize,
    fontWeight: theme.typography.bodyLg.fontWeight as any,
    color: theme.colors.onSurface,
    letterSpacing: -0.5,
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
    letterSpacing: 1,
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
