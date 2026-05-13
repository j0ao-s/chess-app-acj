# 🧠 Contexto para Assistentes de IA (AI_CONTEXT.md)

> **ATENÇÃO IA:** Leia este documento antes de sugerir ou alterar qualquer código neste repositório. Ele contém as regras arquiteturais, a stack e o estado atual do projeto "Minimalist Chess Club".

## 🎯 Objetivo do Projeto
O **Minimalist Chess Club** é uma plataforma móvel (React Native/Expo) focada em jogadores de xadrez. O objetivo é manter um design *Extreme Minimalist*: altíssimo contraste (quase preto e branco), tipografia grossa/elegante, e nada de bibliotecas de UI inchadas.

---

## 🛠️ Stack Tecnológica
- **Framework Core:** React Native gerenciado pelo Expo.
- **Roteamento:** Expo Router v3+ (Navegação baseada em arquivos na pasta `app/`).
- **Linguagem:** TypeScript (TSX).
- **Ícones:** `lucide-react-native` (Ícones SVG extremamente limpos. **NUNCA** use emojis ou outras libs).
- **Estilização:** Vanilla React Native `StyleSheet`, consumindo os tokens do nosso arquivo `core/theme.js`.

---

## 📂 Arquitetura de Pastas (Separation of Concerns)
A pasta raiz do app é a `core/`. Trabalhamos com uma divisão estrita:

1. **`core/app/` (Expo Router):**
   Contém APENAS os pontos de entrada das rotas. Exemplo: `index.tsx`, `dashboard.tsx`, `settings.tsx`. Não escreva lógica visual complexa aqui. Esses arquivos apenas exportam as telas da pasta `screens/`.

2. **`core/screens/` (Visual & Lógica):**
   Aqui vivem os componentes reais (`LoginScreen.tsx`, `DashboardScreen.tsx`, etc.). É aqui que o JSX completo, o `StyleSheet` e o gerenciamento de estado (`useState`) devem ser implementados.

3. **`core/theme.js` (Design System):**
   A ÚNICA fonte da verdade para cores, fontes (`Inter`), `fontWeight`, e espaçamentos. Sempre importe `theme` e use-o no `StyleSheet`.

---

## 🚨 REGRAS CRÍTICAS PARA A IA (SOPs)

1. **PROIBIDO recriar `app/(tabs)` ou layouts padrão do Expo:**
   - Nós removemos os tabs nativos do Expo de propósito.
   - O menu inferior (Bottom Navigation) é desenhado manualmente no final de *cada* tela principal (Dashboard, Ranking, Settings) usando componentes normais (`View`, `TouchableOpacity`) para manter o visual perfeitamente minimalista e idêntico entre as páginas.

2. **Uso de Ícones:**
   - **NUNCA** adicione textos com emojis (ex: `♟` ou `👤`).
   - Sempre importe de `lucide-react-native`. Exemplo: `<Crown size={24} color={theme.colors.onSurface} />`.

3. **Tipagem e Erros Comuns (TypeScript):**
   - Ao puxar `fontWeight` do `theme.js` para um `StyleSheet`, você **deve** usar o cast `as any` (ex: `fontWeight: theme.typography.headlineMd.fontWeight as any,`). Isso evita o erro chato `TS2322` entre strings globais e o tipo restrito do React Native.

4. **Navegação (Expo Router):**
   - Use `const router = useRouter();` de `expo-router`.
   - Para ir ao dashboard: `router.push('/dashboard')` ou `router.replace('/dashboard')`.
   - Para voltar: `router.back()`.

---

## 🚧 Estado Atual (Onde Paramos)
- **UI/UX:** A camada visual baseada no design "Stitch MCP" está **100% pronta**. Telas como Login, Register, Dashboard (com Bento Grid de 3 cards), Ranking (com Pódio), e Settings estão criadas, linkadas e padronizadas.
- **Integração:** Os formulários têm `useState`, mas os dados e a lógica de login/update ainda estão *mockados* (apenas `console.log` e redirecionamento de tela simulado).
- **Próximos Passos (Backlog):**
  1. Integrar API ou serviço (Supabase/Firebase/Node) para autenticação.
  2. Popular o quadro de Classificação (`RankingScreen`) com dados de uma API externa (ex: Chess.com ou Lichess).
  3. Adicionar lógica de sessão global para que o usuário não precise relogar (Context API ou Zustand).

---
**Ao interagir com o usuário, mantenha um tom focado, profissional e vá direto ao código, respeitando estritamente o layout e os tokens de `theme.js`.**
