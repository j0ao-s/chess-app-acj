# ♟️ Club Xadrez - Front-End (Core)

**Plataforma móvel minimalista para jogadores de xadrez** — React Native + Expo + TypeScript

> Design filosófico: Extremamente minimalista. Altíssimo contraste (preto/branco), tipografia elegante, zero bibliotecas UI inchadas. Uma experiência móvel focada em legibilidade, contraste e elegância, entregando apenas o que importa: o jogo e os jogadores.

---

## 📱 Visão Geral

O **Club Xadrez** é uma aplicação React Native focada em oferecer uma experiência de clube de xadrez moderno e sem distrações. Distanciando-se de plataformas poluídas, o aplicativo foi construído usando Design Tokens estritos com alto contraste (quase monocromático), fontes grossas (bold/black typography) e uma navegação fluida em abas (Bottom Navigation).

### ✨ Features

- ✅ **Autenticação:** Login/Register com persistência (AsyncStorage)
- ✅ **Dashboard:** Cards com estatísticas personalizadas
- ✅ **Ranking:** Pódio visual com top players
- ✅ **Perfil:** Editar dados, alterar senha
- ✅ **Jogo de Xadrez:** Minimalista vs bot Stockfish (planejado)
- ✅ **Pontuação Manual:** Adicionar/remover pontos (planejado)
- ✅ **Animações:** Transições suaves com Reanimated v4

---

## 📂 Estrutura de Pastas

```
core/
├── app/                      # 🔀 Expo Router (pontos de entrada)
│   ├── index.tsx             # Tela de login
│   ├── register.tsx          # Tela de cadastro
│   ├── dashboard.tsx         # Dashboard
│   ├── ranking.tsx           # Ranking
│   ├── settings.tsx          # Configurações
│   ├── chess.tsx             # Jogo de xadrez (future)
│   └── _layout.tsx           # Layout raiz
│
├── screens/                  # 🎨 Componentes visuais completos
│   ├── LoginScreen.tsx
│   ├── RegisterScreen.tsx
│   ├── DashboardScreen.tsx
│   ├── RankingScreen.tsx
│   ├── SettingsScreen.tsx
│   └── ChessGameScreen.tsx   # (future)
│
├── context/                  # 📦 Estado global
│   └── AuthContext.tsx       # Context de autenticação
│
├── lib/                      # 🔧 Utilitários
│   └── api.ts                # Cliente HTTP
│
├── theme.js                  # 🎨 DESIGN SYSTEM (cores, fontes, espaçamentos)
├── app.json                  # Configuração Expo
├── package.json
├── tsconfig.json
└── README.md                 # Este arquivo
```

### 📌 Convenção Importante

- **`app/`** = Apenas exporta screens (routing)
- **`screens/`** = Componentes visuais reais + lógica
- **`theme.js`** = Única fonte da verdade (design tokens)

---

## 🛠️ Stack Tecnológica

| Ferramenta | Versão | Uso |
|---|---|---|
| **Expo** | ~54.0 | Runtime mobile (iOS/Android/Web) |
| **Expo Router** | ~6.0 | Navegação baseada em arquivos |
| **React Native** | 0.81.5 | Engine UI |
| **TypeScript** | ~5.9 | Type safety |
| **React** | 19.1.0 | Componentes |
| **AsyncStorage** | ^3.0.2 | Persistência local |
| **Lucide React Native** | ^1.14.0 | Ícones SVG minimalistas |
| **React Native Reanimated** | ~4.1 | Animações suaves |

**Sem:** Redux, MobX, styled-components, NativeBase, React Native Paper, emojis.

### 💡 Por quê cada tecnologia?

1. **React Native & Expo:** Iteração rápida, código único para iOS/Android/Web
2. **Expo Router:** Navegação moderna baseada em arquivos (Next.js style)
3. **TypeScript:** Escalabilidade, type safety, menos bugs em runtime
4. **Lucide React Native:** Ícones SVG nítidos, minimalistas, sem peso
5. **Custom Design System:** Liberdade total de estilo, tokens centralizados

---

## 🗺️ Fluxo e Arquitetura

Para garantir modularidade e evitar a infame "sopa de componentes", o aplicativo foi dividido sob o padrão *Separation of Concerns*:

- 📁 **`app/`**: Camada de entrada. Hospeda apenas os apontamentos das rotas (`index.tsx` carrega o Login, `dashboard.tsx` carrega o Dashboard).
- 📁 **`screens/`**: O coração da interface. Telas completas que cuidam da lógica local e do visual.
  - `LoginScreen.tsx` & `RegisterScreen.tsx`: Portas de entrada. Autenticação e UX focada.
  - `DashboardScreen.tsx`: Interface em *Bento Grid*. Reúne atalhos (Configurações) e resumos num formato visual assíncrono.
  - `RankingScreen.tsx`: Pódio de classificação, utilizando mapas estáticos escaláveis.
  - `SettingsScreen.tsx`: Interface interativa para alteração de dados e atualização de senhas.
- 📄 **`theme.js`**: O maestro visual que rege o espaçamento e paleta de todos os componentes acima.

---

## 🚀 Como Executar Localmente

### Pré-requisitos
```bash
Node.js >= 18
npm ou yarn
Expo CLI: npm install -g expo-cli
```

### Setup Local
```bash
cd core
npm install
expo start
```

### Rodando em Diferentes Plataformas
```bash
# iOS (macOS + Xcode)
expo start --ios

# Android (Android Studio)
expo start --android

# Web (Navegador)
expo start --web
```

### Acessar o App
- **iOS:** Escanear QR code com Camera app
- **Android:** Escanear QR code com Expo Go app
- **Web:** Abrir http://localhost:8081

---

## 🎨 Design System (`theme.js`)

Todos os valores visuais vêm de **uma única fonte**: `theme.js`

```javascript
// theme.js (simplificado)
const theme = {
  colors: {
    surface: '#000000',      // Fundo preto
    onSurface: '#FFFFFF',    // Texto branco
    primary: '#FFFFFF',      // Destaque branco
    error: '#FF0000',        // Vermelho para erros
  },
  typography: {
    headlineLg: { fontSize: 32, fontWeight: 'bold', fontFamily: 'Inter' },
    headlineMd: { fontSize: 24, fontWeight: 'bold', fontFamily: 'Inter' },
    bodyMd: { fontSize: 14, fontWeight: 'normal', fontFamily: 'Inter' },
  },
  spacing: {
    xs: 4, sm: 8, md: 16, lg: 24, xl: 32,
  },
}
```

### ✅ Como Usar
```typescript
import { theme } from '../theme'
import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  title: {
    fontSize: theme.typography.headlineMd.fontSize,
    fontWeight: theme.typography.headlineMd.fontWeight as any,
    color: theme.colors.onSurface,
  },
})
```

---

## 🔐 Autenticação (AuthContext)

Estado global gerenciado por **AuthContext.tsx**:

```typescript
const { user, loading, login, register, logout, updateUser } = useAuth()
```

### Exemplo de Login
```typescript
// screens/LoginScreen.tsx
import { useAuth } from '../context/AuthContext'

export function LoginScreen() {
  const { login, user } = useAuth()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  
  const handleLogin = async () => {
    try {
      await login(username, password)
      // ✅ user agora está preenchido
      router.push('/dashboard')
    } catch (err) {
      // ❌ Mostrar erro ao usuário
      Alert.alert('Erro', 'Username ou senha incorretos')
    }
  }
  
  return (
    <TouchableOpacity onPress={handleLogin}>
      <Text>Login</Text>
    </TouchableOpacity>
  )
}
```

### Persistência
- Token + User salvos em **AsyncStorage**
- Carregados automaticamente no boot
- Removidos ao fazer logout (corrigido em TAREFA 1)

---

## 📡 API (`lib/api.ts`)

Cliente HTTP centralizado para comunicar com backend:

```typescript
import { api } from '../lib/api'

// POST /auth/login
const data = await api.post('/auth/login', { username, password })
// Retorna: { token, user: { id, name, email, score } }

// POST /auth/register
const data = await api.post('/auth/register', { name, username, email, password })

// GET /users/:id
const user = await api.get(`/users/${id}`)

// PATCH /users/:id
await api.patch(`/users/${id}`, { name: 'João' })

// POST /chess/move (Future: enviar move, bot responde)
const move = await api.post('/chess/move', { fen, moveUCI })
```

---

## 📊 Dados Fictícios (Para Testes)

### Usuário Exemplo
```json
{
  "id": "user_001",
  "name": "João Manoel",
  "username": "joao",
  "email": "joao@chess.com",
  "score": 2850,
  "wins": 42,
  "losses": 15,
  "draws": 8,
  "rating_elo": 1820,
  "createdAt": "2026-01-15T10:30:00Z"
}
```

### Rankings Fictícios (Top 5)
```json
[
  {
    "rank": 1,
    "name": "Magnus Carlsen",
    "username": "magnuscarlsen",
    "score": 5420,
    "wins": 156,
    "rating_elo": 2882
  },
  {
    "rank": 2,
    "name": "Fabiano Caruana",
    "username": "fabcaruana",
    "score": 4890,
    "wins": 142,
    "rating_elo": 2820
  },
  {
    "rank": 3,
    "name": "João Manoel",
    "username": "joao",
    "score": 2850,
    "wins": 42,
    "rating_elo": 1820
  }
]
```

### Jogo de Xadrez Exemplo
```json
{
  "gameId": "game_12345",
  "players": {
    "human": { "name": "João", "color": "white" },
    "bot": { "name": "Stockfish 15", "color": "black" }
  },
  "status": "in_progress",
  "moves": [
    { "notation": "e2e4", "timestamp": "2026-05-18T10:00:00Z" },
    { "notation": "e7e5", "timestamp": "2026-05-18T10:00:02Z" }
  ],
  "fen": "rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq e6 0 2",
  "result": null
}
```

---

## 🧩 Criando uma Nova Tela

### Passo 1: Criar em `screens/`
```typescript
// screens/MyNewScreen.tsx
import { View, Text, StyleSheet } from 'react-native'
import { theme } from '../theme'

export function MyNewScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Minha Tela</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.md,
  },
  title: {
    fontSize: theme.typography.headlineLg.fontSize,
    fontWeight: theme.typography.headlineLg.fontWeight as any,
    color: theme.colors.onSurface,
  },
})
```

### Passo 2: Registrar em `app/`
```typescript
// app/mynew.tsx
import { MyNewScreen } from '../screens/MyNewScreen'

export default MyNewScreen
```

### Passo 3: Navegar
```typescript
const router = useRouter()
router.push('/mynew')
```

---

## 🎬 Animações (Future)

Usando **React Native Reanimated v4** (já instalado):

```typescript
import Animated, { FadeIn, SlideInDown } from 'react-native-reanimated'

export function AnimatedCard() {
  return (
    <Animated.View entering={FadeIn.duration(500)}>
      <Text>Card com fade</Text>
    </Animated.View>
  )
}
```

Planejado para:
- ✅ Bottom nav slide-in/out
- ✅ Cards scale + fade no press
- ✅ Ranking podium bounce
- ✅ Tabuleiro de xadrez piece animations

---

## 🧪 Testando

```bash
# Linter
npm run lint

# Type check
npx tsc --noEmit

# Reset projeto (limpar cache)
npm run reset-project
```

---

## 🐛 Troubleshooting

### "AsyncStorage.multiRemove is not a function"
✅ **Corrigido** - Use `removeItem()` individual

### Tela não renderiza
1. Verificar imports em `app/`
2. Validar rota em Expo Router
3. Limpar cache: `npm run reset-project`

### Tipos TypeScript quebram
- Use `as any` para `fontWeight`: `fontWeight: theme.typography.headlineMd.fontWeight as any`

### Animações travando
- Reduzir complexidade de renders
- Usar `useMemo` para componentes pesados
- Profile com Reanimated profiler

---

## 📚 Links Úteis

- [Expo Docs](https://docs.expo.dev)
- [Expo Router](https://docs.expo.dev/routing/introduction)
- [React Native Docs](https://reactnative.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Lucide Icons](https://lucide.dev)
- [Reanimated Docs](https://docs.swmansion.com/react-native-reanimated)

---

## 📝 Convenções de Código

### Naming
- Componentes: PascalCase (`LoginScreen.tsx`)
- Functions: camelCase (`handleLogin`, `fetchUser`)
- Constants: UPPER_SNAKE_CASE (`API_TIMEOUT`)

### Estrutura de Componente
```typescript
// 1. Imports
import { View, Text } from 'react-native'
import { useAuth } from '../context/AuthContext'

// 2. Types (se houver)
interface Props {
  title: string
}

// 3. Component
export function MyComponent({ title }: Props) {
  const { user } = useAuth()
  const handlePress = () => {}
  return <View><Text>{title}</Text></View>
}

// 4. Styles
const styles = StyleSheet.create({})
```

---

## 🔄 Git Workflow

```bash
# Branch para feature
git checkout -b feat/chess-game

# Commit
git commit -m "feat: add chess game screen with Stockfish integration"

# Push
git push origin feat/chess-game
```

---

## 👥 Suporte

- **Issues:** GitHub Issues
- **Documentação:** Ver `AI_CONTEXT.md` para regras arquiteturais
- **Design:** Tokens em `theme.js`

---

---

*Desenvolvido com 🖤 para os amantes de código e enxadristas.*

**Última atualização:** 2026-05-18  
**Status:** ✅ Autenticação + 5 Telas Principais (Login, Register, Dashboard, Ranking, Settings)  
**Próximas tarefas:** Jogo de xadrez com Stockfish, animações melhoradas, pontuação manual
