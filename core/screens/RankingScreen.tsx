import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { Menu, Plus, Crown } from 'lucide-react-native';
import theme from '../theme';
import { api } from '../lib/api';
import { BottomNavigationBar } from '../components/BottomNavigationBar';
import Animated, { FadeInDown, BounceInUp, BounceIn } from 'react-native-reanimated';

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
        <Text style={styles.appBarTitle}>CLASSIFICAÇÃO</Text>
        <TouchableOpacity style={styles.appBarBtn} onPress={() => router.push('/settings')}>
          <Plus size={24} color="#000" strokeWidth={1.5} />
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
                <Animated.View entering={BounceInUp.delay(200).springify()} style={[styles.podiumItem, styles.podiumItemSide]}>
                  <Avatar name={topPlayers[1].name} size={80} />
                  <View style={styles.podiumBadge}>
                    <Text style={styles.podiumBadgeText}>2</Text>
                  </View>
                  <Text style={styles.podiumName}>{topPlayers[1].name}</Text>
                  <Text style={styles.podiumScore}>{topPlayers[1].score}</Text>
                </Animated.View>

                {/* 1st Place */}
                <Animated.View entering={BounceInUp.delay(0).springify()} style={[styles.podiumItem, styles.podiumItemCenter]}>
                  <Animated.View entering={BounceIn.delay(600).springify()}>
                    <Crown size={24} color={theme.colors.onSurface} strokeWidth={1.5} style={{ marginBottom: theme.spacing.xs }} />
                  </Animated.View>
                  <Avatar name={topPlayers[0].name} size={112} />
                  <View style={[styles.podiumBadge, styles.podiumBadgeFirst]}>
                    <Text style={styles.podiumBadgeTextFirst}>1</Text>
                  </View>
                  <Text style={[styles.podiumName, styles.podiumNameFirst]}>{topPlayers[0].name}</Text>
                  <Text style={styles.podiumScore}>{topPlayers[0].score}</Text>
                </Animated.View>

                {/* 3rd Place */}
                <Animated.View entering={BounceInUp.delay(400).springify()} style={[styles.podiumItem, styles.podiumItemSide]}>
                  <Avatar name={topPlayers[2].name} size={80} />
                  <View style={styles.podiumBadge}>
                    <Text style={styles.podiumBadgeText}>3</Text>
                  </View>
                  <Text style={styles.podiumName}>{topPlayers[2].name}</Text>
                  <Text style={styles.podiumScore}>{topPlayers[2].score}</Text>
                </Animated.View>
              </View>
            )}

            <View style={styles.listContainer}>
              {listPlayers.map((player, index) => (
                <Animated.View key={player.rank} entering={FadeInDown.delay(600 + index * 100).springify()}>
                  <TouchableOpacity style={styles.listItem}>
                    <View style={styles.listItemLeft}>
                      <Text style={styles.listItemRank}>{player.rank}</Text>
                      <Avatar name={player.name} size={40} />
                      <Text style={styles.listItemName}>{player.name}</Text>
                    </View>
                    <Text style={styles.listItemScore}>{player.score}</Text>
                  </TouchableOpacity>
                </Animated.View>
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

      <BottomNavigationBar activeRoute="/ranking" />
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
});

export default RankingScreen;
