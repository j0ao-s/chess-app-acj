import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { UserPlus } from 'lucide-react-native';
import theme from '../theme';

const RegisterScreen = () => {
  const router = useRouter();
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ username?: string; general?: string }>({});

  const handleRegister = async () => {
    try {
      setErrors({});
      // Simulate API call
      console.log('Registering with:', { name, username, email, password });
      router.replace('/dashboard');
    } catch (err) {
      setErrors({ general: 'Falha ao criar conta. Tente novamente.' });
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.main}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.iconContainer}>
              <UserPlus size={32} color={theme.colors.surfaceContainerLowest} strokeWidth={1.5} />
            </View>
            <Text style={styles.title}>CHESS CLUB</Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
            {/* Nome Field */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>NOME</Text>
              <TextInput
                style={styles.input}
                placeholder="Seu nome completo"
                placeholderTextColor={theme.colors.outlineVariant}
                value={name}
                onChangeText={setName}
              />
            </View>

            {/* Username Field */}
            <View style={styles.inputGroup}>
              <Text style={[styles.label, errors.username ? styles.errorText : null]}>USERNAME</Text>
              <TextInput
                style={[styles.input, errors.username ? styles.inputError : null]}
                placeholder="Seu nome de usuário"
                placeholderTextColor={theme.colors.outlineVariant}
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
              />
              {errors.username && <Text style={styles.errorSubtext}>{errors.username}</Text>}
            </View>

            {/* E-mail Field */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>E-MAIL</Text>
              <TextInput
                style={styles.input}
                placeholder="seu@email.com"
                keyboardType="email-address"
                placeholderTextColor={theme.colors.outlineVariant}
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
              />
            </View>

            {/* Senha Field */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>SENHA</Text>
              <TextInput
                style={styles.input}
                placeholder="••••••••"
                secureTextEntry
                placeholderTextColor={theme.colors.outlineVariant}
                value={password}
                onChangeText={setPassword}
              />
            </View>
            
            {errors.general && <Text style={styles.errorSubtext}>{errors.general}</Text>}

            {/* Action */}
            <TouchableOpacity style={styles.button} onPress={handleRegister}>
              <Text style={styles.buttonText}>CRIAR CONTA</Text>
            </TouchableOpacity>
          </View>

          {/* Secondary Action */}
          <View style={styles.secondaryActionContainer}>
            <TouchableOpacity onPress={() => router.push('/')}>
              <Text style={styles.linkText}>Já tem uma conta? Entre</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.gutter,
  },
  main: {
    width: '100%',
    maxWidth: 480,
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
    width: '100%',
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: theme.colors.onBackground,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.sm,
  },
  iconText: {
    color: theme.colors.surfaceContainerLowest,
    fontSize: 32,
  },
  title: {
    fontFamily: theme.typography.displayXl.fontFamily,
    fontSize: theme.typography.displayXl.fontSize,
    fontWeight: theme.typography.displayXl.fontWeight as any,
    lineHeight: theme.typography.displayXl.lineHeight,
    letterSpacing: theme.typography.displayXl.letterSpacing,
    color: theme.colors.onBackground,
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
    color: theme.colors.onSurfaceVariant,
    textTransform: 'uppercase',
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.outline,
    backgroundColor: 'transparent',
    paddingHorizontal: 0,
    paddingVertical: theme.spacing.sm,
    fontFamily: theme.typography.bodyLg.fontFamily,
    fontSize: theme.typography.bodyLg.fontSize,
    fontWeight: theme.typography.bodyLg.fontWeight as any,
    lineHeight: theme.typography.bodyLg.lineHeight,
    color: theme.colors.onBackground,
    width: '100%',
  },
  inputError: {
    borderBottomColor: theme.colors.error,
  },
  errorText: {
    color: theme.colors.error,
  },
  errorSubtext: {
    fontFamily: theme.typography.labelSm.fontFamily,
    fontSize: theme.typography.labelSm.fontSize,
    fontWeight: theme.typography.labelSm.fontWeight as any,
    lineHeight: theme.typography.labelSm.lineHeight,
    letterSpacing: theme.typography.labelSm.letterSpacing,
    color: theme.colors.error,
    marginTop: theme.spacing.xs,
  },
  button: {
    marginTop: theme.spacing.md,
    backgroundColor: theme.colors.onBackground,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.rounded.default,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  buttonText: {
    fontFamily: theme.typography.labelSm.fontFamily,
    fontSize: theme.typography.labelSm.fontSize,
    fontWeight: theme.typography.labelSm.fontWeight as any,
    lineHeight: theme.typography.labelSm.lineHeight,
    letterSpacing: theme.typography.labelSm.letterSpacing,
    color: theme.colors.surfaceContainerLowest,
    textTransform: 'uppercase',
  },
  secondaryActionContainer: {
    marginTop: theme.spacing.xl,
    width: '100%',
    alignItems: 'center',
  },
  linkText: {
    fontFamily: theme.typography.bodyMd.fontFamily,
    fontSize: theme.typography.bodyMd.fontSize,
    fontWeight: theme.typography.bodyMd.fontWeight as any,
    lineHeight: theme.typography.bodyMd.lineHeight,
    color: theme.colors.onSurfaceVariant,
    textDecorationLine: 'underline',
  },
});

export default RegisterScreen;
