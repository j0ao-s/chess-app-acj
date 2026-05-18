import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, LayoutDashboard, Trophy, User } from 'lucide-react-native';
import theme from '../theme';
import { useAuth } from '../context/AuthContext';
import { api } from '../lib/api';

const SettingsScreen: React.FC = () => {
  const router = useRouter();
  const { user, logout, updateUser } = useAuth();

  const [name, setName] = useState(user?.name ?? '');
  const [username, setUsername] = useState(user?.username ?? '');
  const [email, setEmail] = useState(user?.email ?? '');
  const [profileMsg, setProfileMsg] = useState<{ text: string; error: boolean } | null>(null);
  const [profileLoading, setProfileLoading] = useState(false);

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMsg, setPasswordMsg] = useState<{ text: string; error: boolean } | null>(null);
  const [passwordLoading, setPasswordLoading] = useState(false);

  const handleUpdateProfile = async () => {
    try {
      setProfileMsg(null);
      setProfileLoading(true);
      const updated = await api.put(`/users/${user!.id}`, { name, username, email });
      updateUser(updated);
      setProfileMsg({ text: 'Dados atualizados com sucesso.', error: false });
    } catch (err: any) {
      setProfileMsg({ text: err.message || 'Erro ao salvar.', error: true });
    } finally {
      setProfileLoading(false);
    }
  };

  const handleUpdatePassword = async () => {
    if (newPassword !== confirmPassword) {
      setPasswordMsg({ text: 'As senhas não coincidem.', error: true });
      return;
    }
    try {
      setPasswordMsg(null);
      setPasswordLoading(true);
      await api.put(`/users/${user!.id}/password`, { currentPassword, newPassword });
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setPasswordMsg({ text: 'Senha alterada com sucesso.', error: false });
    } catch (err: any) {
      setPasswordMsg({ text: err.message || 'Erro ao alterar senha.', error: true });
    } finally {
      setPasswordLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    router.replace('/');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* TopAppBar */}
      <View style={styles.appBar}>
        <TouchableOpacity style={styles.appBarBtn} onPress={() => router.back()}>
          <ArrowLeft size={24} color={theme.colors.onSurface} strokeWidth={1.5} />
        </TouchableOpacity>
        <Text style={styles.appBarTitle}>CONFIGURAÇÕES</Text>
        <View style={styles.appBarPlaceholder} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Sessão: Alterar Dados */}
        <Text style={styles.sectionTitle}>Alterar Dados</Text>
        <View style={styles.formContainer}>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>NOME</Text>
            <TextInput 
              style={styles.input}
              placeholder="Seu nome"
              value={name}
              onChangeText={setName}
              placeholderTextColor={theme.colors.surfaceDim}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>USERNAME</Text>
            <TextInput 
              style={styles.input}
              placeholder="Username"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
              placeholderTextColor={theme.colors.surfaceDim}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>E-MAIL</Text>
            <TextInput 
              style={styles.input}
              placeholder="E-mail"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor={theme.colors.surfaceDim}
            />
          </View>

          {profileMsg && (
            <Text style={[styles.feedbackText, profileMsg.error && styles.feedbackError]}>
              {profileMsg.text}
            </Text>
          )}
          <View style={styles.actionsContainer}>
            <TouchableOpacity style={[styles.primaryBtn, profileLoading && { opacity: 0.6 }]} onPress={handleUpdateProfile} disabled={profileLoading}>
              <Text style={styles.primaryBtnText}>{profileLoading ? 'SALVANDO...' : 'SALVAR ALTERAÇÕES'}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.divider} />

        {/* Sessão: Alterar Senha */}
        <Text style={styles.sectionTitle}>Alterar Senha</Text>
        <View style={styles.formContainer}>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>SENHA ATUAL</Text>
            <TextInput 
              style={styles.input}
              placeholder="••••••••"
              value={currentPassword}
              onChangeText={setCurrentPassword}
              secureTextEntry
              placeholderTextColor={theme.colors.surfaceDim}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>NOVA SENHA</Text>
            <TextInput 
              style={styles.input}
              placeholder="••••••••••••"
              value={newPassword}
              onChangeText={setNewPassword}
              secureTextEntry
              placeholderTextColor={theme.colors.surfaceDim}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>CONFIRMAR NOVA SENHA</Text>
            <TextInput 
              style={styles.input}
              placeholder="••••••••••••"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              placeholderTextColor={theme.colors.surfaceDim}
            />
          </View>

          {passwordMsg && (
            <Text style={[styles.feedbackText, passwordMsg.error && styles.feedbackError]}>
              {passwordMsg.text}
            </Text>
          )}
          <View style={styles.actionsContainer}>
            <TouchableOpacity style={[styles.primaryBtn, passwordLoading && { opacity: 0.6 }]} onPress={handleUpdatePassword} disabled={passwordLoading}>
              <Text style={styles.primaryBtnText}>{passwordLoading ? 'ALTERANDO...' : 'ALTERAR SENHA'}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.divider} />

        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Text style={styles.logoutBtnText}>SAIR DA CONTA</Text>
        </TouchableOpacity>

      </ScrollView>

      {/* BottomNavBar */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/dashboard')}>
          <LayoutDashboard size={20} color="#a1a1aa" strokeWidth={1.5} />
          <Text style={styles.navLabel}>DASHBOARD</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/ranking')}>
          <Trophy size={20} color="#a1a1aa" strokeWidth={1.5} />
          <Text style={styles.navLabel}>RANKING</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.navItem, styles.navItemActive]} onPress={() => router.push('/settings')}>
          <User size={20} color="#000000" strokeWidth={1.5} />
          <Text style={styles.navLabelActive}>PERFIL</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.surfaceContainerLowest, // bg-white
  },
  appBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 64,
    paddingHorizontal: theme.spacing.lg,
    backgroundColor: theme.colors.surfaceContainerLowest,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.onSurface,
    zIndex: 10,
  },
  appBarBtn: {
    padding: theme.spacing.sm,
    marginLeft: -theme.spacing.sm,
  },
  materialIcon: {
    fontSize: 24,
    color: theme.colors.onSurface,
  },
  appBarTitle: {
    fontFamily: theme.typography.headlineMd.fontFamily,
    fontSize: theme.typography.headlineMd.fontSize,
    fontWeight: theme.typography.headlineMd.fontWeight as any,
    color: theme.colors.onSurface,
    textTransform: 'uppercase',
    letterSpacing: -0.5,
  },
  appBarPlaceholder: {
    width: 40, // balancing empty space
  },
  scrollContent: {
    paddingHorizontal: theme.spacing.marginMobile,
    paddingTop: theme.spacing.xl,
    paddingBottom: 100,
  },
  sectionTitle: {
    fontFamily: theme.typography.headlineLg.fontFamily,
    fontSize: theme.typography.headlineLg.fontSize,
    fontWeight: theme.typography.headlineLg.fontWeight as any,
    color: theme.colors.onSurface,
    marginBottom: theme.spacing.lg,
  },
  formContainer: {
    flexDirection: 'column',
    gap: theme.spacing.xl,
  },
  inputGroup: {
    flexDirection: 'column',
    marginBottom: theme.spacing.md,
  },
  inputLabel: {
    fontFamily: theme.typography.labelSm.fontFamily,
    fontSize: theme.typography.labelSm.fontSize,
    fontWeight: theme.typography.labelSm.fontWeight as any,
    color: theme.colors.onSurfaceVariant,
    textTransform: 'uppercase',
    marginBottom: theme.spacing.xs,
  },
  input: {
    fontFamily: theme.typography.bodyLg.fontFamily,
    fontSize: theme.typography.bodyLg.fontSize,
    color: theme.colors.onSurface,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: 0,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.outline,
    backgroundColor: 'transparent',
  },
  actionsContainer: {
    flexDirection: 'column',
    gap: theme.spacing.md,
    marginTop: theme.spacing.sm,
  },
  primaryBtn: {
    backgroundColor: theme.colors.onSurface,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: 2, // Minimalist border radius
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
  },
  primaryBtnText: {
    fontFamily: theme.typography.labelSm.fontFamily,
    fontSize: theme.typography.labelSm.fontSize,
    fontWeight: theme.typography.labelSm.fontWeight as any,
    color: theme.colors.surfaceContainerLowest,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  secondaryBtn: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: theme.colors.onSurface,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: 2,
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
  },
  secondaryBtnText: {
    fontFamily: theme.typography.labelSm.fontFamily,
    fontSize: theme.typography.labelSm.fontSize,
    fontWeight: theme.typography.labelSm.fontWeight as any,
    color: theme.colors.onSurface,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.surfaceVariant,
    marginVertical: theme.spacing.xl,
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
  feedbackText: {
    fontFamily: theme.typography.labelSm.fontFamily,
    fontSize: theme.typography.labelSm.fontSize,
    fontWeight: theme.typography.labelSm.fontWeight as any,
    color: theme.colors.primary,
    marginBottom: theme.spacing.sm,
  },
  feedbackError: {
    color: theme.colors.error,
  },
  logoutBtn: {
    borderWidth: 1,
    borderColor: theme.colors.error,
    paddingVertical: theme.spacing.md,
    borderRadius: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.xl,
  },
  logoutBtnText: {
    fontFamily: theme.typography.labelSm.fontFamily,
    fontSize: theme.typography.labelSm.fontSize,
    fontWeight: theme.typography.labelSm.fontWeight as any,
    color: theme.colors.error,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});

export default SettingsScreen;
