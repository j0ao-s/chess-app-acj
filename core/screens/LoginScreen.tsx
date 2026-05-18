import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { Crown } from 'lucide-react-native';
import theme from '../theme';
import { useAuth } from '../context/AuthContext';

const LoginScreen: React.FC = () => {
  const router = useRouter();
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!username || !password) {
      setError('Preencha usuário e senha.');
      return;
    }
    try {
      setError(null);
      setLoading(true);
      await login(username, password);
      router.replace('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Falha ao fazer login. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.main}>
        <View style={styles.header}>
          <Crown size={48} color={theme.colors.onSurface} strokeWidth={1.5} />
          <Text style={styles.title}>CHESS CLUB</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Usuário</Text>
            <TextInput
              style={styles.input}
              placeholder="Seu nome de usuário"
              placeholderTextColor={theme.colors.secondaryFixedDim}
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Senha</Text>
            <TextInput
              style={[styles.input, error ? styles.inputError : null]}
              placeholder="Sua senha"
              placeholderTextColor={theme.colors.secondaryFixedDim}
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
            {error && <Text style={styles.errorText}>{error}</Text>}
          </View>

          <TouchableOpacity style={[styles.button, loading && { opacity: 0.6 }]} onPress={handleLogin} disabled={loading}>
            <Text style={styles.buttonText}>{loading ? 'Entrando...' : 'Entrar'}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.secondaryActions}>
          <TouchableOpacity>
            <Text style={styles.linkText}>Esqueci minha senha</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('/register')}>
            <Text style={styles.linkText}>Criar conta</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.surfaceContainerLowest,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  main: {
    width: '100%',
    maxWidth: 400,
    flexDirection: 'column',
    alignItems: 'center',
    gap: theme.spacing.xl,
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.sm,
  },
  logoIcon: {
    fontSize: 48,
    color: theme.colors.onSurface,
  },
  title: {
    fontFamily: theme.typography.displayXl.fontFamily,
    fontSize: theme.typography.displayXl.fontSize,
    fontWeight: theme.typography.displayXl.fontWeight as any,
    lineHeight: theme.typography.displayXl.lineHeight,
    letterSpacing: theme.typography.displayXl.letterSpacing,
    color: theme.colors.onSurface,
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  form: {
    width: '100%',
    gap: theme.spacing.lg,
  },
  inputGroup: {
    gap: theme.spacing.xs,
  },
  label: {
    fontFamily: theme.typography.labelSm.fontFamily,
    fontSize: theme.typography.labelSm.fontSize,
    fontWeight: theme.typography.labelSm.fontWeight as any,
    lineHeight: theme.typography.labelSm.lineHeight,
    letterSpacing: theme.typography.labelSm.letterSpacing,
    color: theme.colors.onSurface,
  },
  input: {
    width: '100%',
    backgroundColor: 'transparent',
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.onSurface,
    paddingHorizontal: 0,
    paddingVertical: theme.spacing.sm,
    fontFamily: theme.typography.bodyLg.fontFamily,
    fontSize: theme.typography.bodyLg.fontSize,
    fontWeight: theme.typography.bodyLg.fontWeight as any,
    lineHeight: theme.typography.bodyLg.lineHeight,
    color: theme.colors.onSurface,
  },
  inputError: {
    borderBottomColor: theme.colors.error,
  },
  errorText: {
    fontFamily: theme.typography.bodyMd.fontFamily,
    fontSize: theme.typography.bodyMd.fontSize,
    fontWeight: theme.typography.bodyMd.fontWeight as any,
    lineHeight: theme.typography.bodyMd.lineHeight,
    color: theme.colors.error,
    marginTop: theme.spacing.xs,
  },
  button: {
    marginTop: theme.spacing.md,
    width: '100%',
    backgroundColor: theme.colors.onSurface,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: theme.rounded.default,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: theme.colors.onSurface,
  },
  buttonText: {
    fontFamily: theme.typography.bodyLg.fontFamily,
    fontSize: theme.typography.bodyLg.fontSize,
    fontWeight: '500',
    lineHeight: theme.typography.bodyLg.lineHeight,
    color: theme.colors.onPrimary,
  },
  secondaryActions: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.md,
    marginTop: theme.spacing.sm,
  },
  linkText: {
    fontFamily: theme.typography.bodyMd.fontFamily,
    fontSize: theme.typography.bodyMd.fontSize,
    fontWeight: theme.typography.bodyMd.fontWeight as any,
    lineHeight: theme.typography.bodyMd.lineHeight,
    color: theme.colors.onSurface,
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;
