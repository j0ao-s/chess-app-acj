import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import theme from '../theme';
import { useAuth } from '../context/AuthContext';
import { api } from '../lib/api';
import { BottomNavigationBar } from '../components/BottomNavigationBar';

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

  const [points, setPoints] = useState('');
  const [scoreMsg, setScoreMsg] = useState<{ text: string; error: boolean } | null>(null);
  const [scoreLoading, setScoreLoading] = useState(false);

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

  const handleUpdateScore = async () => {
    const pointsNum = parseInt(points, 10);
    if (isNaN(pointsNum)) {
      setScoreMsg({ text: 'Por favor, insira um número válido.', error: true });
      return;
    }

    try {
      setScoreMsg(null);
      setScoreLoading(true);
      const res = await (api as any).patch(`/users/${user!.id}/score`, { points: pointsNum });
      updateUser({ ...user, score: res.score } as any);
      setScoreMsg({ text: `Pontuação atualizada! Novo score: ${res.score}`, error: false });
      setPoints('');
    } catch (err: any) {
      setScoreMsg({ text: err.message || 'Erro ao atualizar pontuação.', error: true });
    } finally {
      setScoreLoading(false);
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
        <TouchableOpacity style={styles.appBarBtn} onPress={() => router.push('/dashboard')}>
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

        {/* Sessão: Pontuação Manual */}
        <Text style={styles.sectionTitle}>Pontuação Manual</Text>
        <View style={styles.formContainer}>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>PONTOS A ADICIONAR/REMOVER (+/-)</Text>
            <TextInput 
              style={styles.input}
              placeholder="Ex: 10 ou -5"
              value={points}
              onChangeText={setPoints}
              keyboardType="numbers-and-punctuation"
              placeholderTextColor={theme.colors.surfaceDim}
            />
          </View>

          {scoreMsg && (
            <Text style={[styles.feedbackText, scoreMsg.error && styles.feedbackError]}>
              {scoreMsg.text}
            </Text>
          )}
          <View style={styles.actionsContainer}>
            <TouchableOpacity style={[styles.primaryBtn, scoreLoading && { opacity: 0.6 }]} onPress={handleUpdateScore} disabled={scoreLoading}>
              <Text style={styles.primaryBtnText}>{scoreLoading ? 'ATUALIZANDO...' : 'ATUALIZAR PONTUAÇÃO'}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.divider} />

        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Text style={styles.logoutBtnText}>SAIR DA CONTA</Text>
        </TouchableOpacity>

      </ScrollView>
      <BottomNavigationBar activeRoute="/settings" />
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
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
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