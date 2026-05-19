# 🏗️ Harness Engineering: Orquestração de IAs para Club Xadrez

**Data:** 2026-05-18  
**Objetivo:** Otimizar uso de múltiplas IAs (Claude, Copilot, Gemini) economizando tokens Claude

---

## 📋 Metodologia

Este documento define **sequência de execução**, **IA responsável**, **prompt inicial** e **economia de tokens** para cada tarefa.

**Princípio:** Use IAs gratuitas/baratas primeiro (Copilot, Gemini). Reserve Claude para lógica complexa, revisão e debugging.

---

## ✅ TAREFA 1: Corrigir AsyncStorage Error (CRÍTICO)

**Status:** ✅ **CONCLUÍDO - 2026-05-18 14:35**  
**Impacto:** App quebra ao fazer logout

### 📌 Problema Identificado
```
AsyncStorage.default.multiRemove is not a function
```
**Causa:** Método `multiRemove` não existe ou está deprecado na versão `3.0.2`

### 🤖 Sequência de Execução

#### **Passo 1: Diagnóstico (Copilot - GRATUITO)**
```
Ferramenta: GitHub Copilot Chat
Prompt: "AsyncStorage 3.0.2 multiRemove não existe. Qual é o método correto para remover múltiplas chaves?"
Objetivo: Identificar alternativa (removeItem loop vs nova API)
Tokens gastos: 0 (Copilot é gratuito)
```

#### **Passo 2: Implementação (Claude - ECONÔMICO)**
```
Ferramenta: Claude Code
Prompt: "Corrigir AuthContext.tsx linha 52. AsyncStorage.multiRemove não existe. 
Trocar por removeItem individual em loop. Manter tipos TypeScript."
Arquivo: core/context/AuthContext.tsx
Economia: Use arquivo lido já (evita repeat do contexto)
Tokens: ~800 (pequeno, direto, arquivo já carregado)
```

#### **Passo 3: Testes (Gemini - GRATUITO)**
```
Ferramenta: Google Gemini
Prompt: "Testar logout no React Native/Expo após remover AsyncStorage.multiRemove. 
Quais são os casos de edge case?"
Objetivo: Validar solução antes do merge
Tokens gastos: 0 (Gemini é gratuito)
```

### 💻 Código Esperado (Claude implementa)
```typescript
// core/context/AuthContext.tsx linha 51-54
async function logout() {
  try {
    await AsyncStorage.removeItem('token')
    await AsyncStorage.removeItem('user')
  } catch (err) {
    console.error('Logout error:', err)
  }
  setUser(null)
}
```

**Tokens Claude:** ~400  
**Tempo:** 5 minutos  
**Prioridade:** 🔴 IMEDIATA

---

## ✅ TAREFA 2: README Front-End (core/)

**Status:** ✅ **CONCLUÍDO - 2026-05-18 15:10**  
**Impacto:** Documentação, onboarding de devs

### 🤖 Sequência de Execução

#### **Passo 1: Template Base (Copilot - GRATUITO)**
```
Ferramenta: GitHub Copilot Chat
Prompt: "Criar README.md para React Native/Expo app minimalista. 
Seções: Setup, Estrutura, Rodando, Tech Stack"
Objetivo: Gerar template para começar
Tokens: 0
```

#### **Passo 2: Customização (Claude - ECONÔMICO)**
```
Ferramenta: Claude Code
Prompt: "Criar/atualizar README em core/ seguindo AI_CONTEXT.md. 
Incluir: Stack (Expo, Router, TypeScript), Estrutura (app/, screens/, theme.js), 
Como rodar (npm start), Design (Minimalist, lucide-react-native, sem emojis). 
Adicionar exemplos de como criar tela nova."
Arquivo: core/README.md
Tokens: ~1200 (contexto já carregado em AI_CONTEXT.md)
```

#### **Passo 3: Exemplos Ficticios (Gemini - GRATUITO)**
```
Ferramenta: Google Gemini
Prompt: "Adicionar dados fictícios de exemplo (usuários, rankings) 
para README.md React Native app. Formato JSON/mock."
Objetivo: Exemplos práticos no README
Tokens: 0
```

**Tokens Claude:** ~1200  
**Tempo:** 15 minutos  
**Prioridade:** 🟢 NORMAL

---

## ✅ TAREFA 3: README Back-End (chess-backeend/)

**Status:** ✅ **CONCLUÍDO - 2026-05-18 15:50**  
**Impacto:** Documentação API, deploy

### 🤖 Sequência de Execução

#### **Passo 1: Structure Audit (Copilot - GRATUITO)**
```
Ferramenta: GitHub Copilot Chat
Prompt: "Analisar arquitetura chess-backeend/. Qual é a stack? 
(Node? Python? Express? FastAPI?). Endpoints principais?"
Objetivo: Entender backend antes de documentar
Tokens: 0
```

#### **Passo 2: README Backend (Claude - ECONÔMICO)**
```
Ferramenta: Claude Code
Prompt: "Criar chess-backeend/README.md com:
1. Tech Stack (framework, linguagem, banco)
2. Endpoints (/auth/login, /auth/register, etc.)
3. Como rodar localmente
4. Variáveis de ambiente
5. Dados fictícios para testes (curl/JSON)
6. Deploy (Heroku/Railway/etc)"
Arquivo: chess-backeend/README.md
Tokens: ~1500 (novo contexto, mas estruturado)
```

#### **Passo 3: Docker/Deploy (Gemini - GRATUITO)**
```
Ferramenta: Google Gemini
Prompt: "Criar Dockerfile para Node/Python chess app. 
Include npm install, env setup, port expose."
Objetivo: Adicionar containerização ao README
Tokens: 0
```

**Tokens Claude:** ~1500  
**Tempo:** 20 minutos  
**Prioridade:** 🟢 NORMAL

---

## 🐛 METODOLOGIA: Bug Reporting com Economia de Tokens

**Objetivo:** Atacar bugs de forma estruturada, minimizando contexto desnecessário.

### 📋 Template de Bug Report

```
## BUG-ID: [Nome Descritivo]

**Severidade:** 🔴 Critical | 🟠 High | 🟡 Medium | 🟢 Low

### Sintoma (1 linha)
[Descrição breve do comportamento errado]

### Passos para Reproduzir
1. [Ação 1]
2. [Ação 2]
3. [Ação 3]

### Resultado Esperado
[O que deveria acontecer]

### Resultado Atual
[O que realmente acontece]

### Stack Trace / Console Error
[Se houver, copie aqui ou deixe em branco]

### Arquivo(s) Afetado(s)
- core/screens/ChessGameScreen.tsx
- core/hooks/useChessGame.ts

### Root Cause (após investigação)
[Causa identificada em uma linha - ex: "TouchableOpacity com disabled=true bloqueia onPress"]

### Fix Implementado
[Resumo da solução em 1-2 linhas]
```

### ⚡ Prompt Otimizado para Claude (Economia máxima)

```
Ferramenta: Claude Code

Prompt curto e direto:
"BUG-ID: [Nome]. Arquivo: [path:linhas]. 
Problema: [descrição de 1 linha].
Passos: [3-5 passos numerados].
Resultado: [esperado] vs [atual].
Causa suspeita: [sua hipótese ou deixar vazio].
Pedir: [Confirmar causa + implementar fix]"

Economia:
- ✅ Cite linhas já lidas (não releia arquivo todo)
- ✅ Inclua apenas arquivo afetado (não contexto inteiro)
- ✅ Sua hipótese reduz busca do Claude (save 200-400 tokens)
- ✅ Peça fix + teste em 1 prompt (não separados)

Exemplo bom:
"BUG-ID: Buttons-Not-Working. 
Arquivo: core/screens/ChessGameScreen.tsx:119-144.
Problema: Botões 'Novo Jogo', 'Desistir', 'Voltar' não respondem ao toque.
Passos: 1. Jogar xadrez. 2. Clicar 'Novo Jogo'. 3. Nada acontece.
Causa suspeita: TouchableOpacity tem disabled={true} bloqueando o onPress.
Pedir: Confirmar + remover disabled e permitir clique."

Economia: ~200 tokens vs ~800 (contexto completo)"
```

---

## ✅ TAREFA 4: Implementar Jogo de Xadrez (Stockfish)

**Status:** 🟠 **EM PROGRESSO - BUGS ENCONTRADOS**  
**Impacto:** Feature core do app

### 📌 Requirements
- Disparador: Clique na coroa (tela inicial)
- IA: Stockfish (via npm package ou API)
- Modo: Apenas vs bot, sem multiplayer
- UI: Minimalist (follow AI_CONTEXT.md)

### 🤖 Sequência de Execução

#### **Passo 1: Escolha Stockfish (Gemini - GRATUITO)**
```
Ferramenta: Google Gemini
Prompt: "Melhor biblioteca Stockfish para React Native/Expo em 2026? 
Comparar: chess.js + stockfish npm, 
chess-engine, 
API remota (lichess/chess.com)"
Objetivo: Evitar integração errada
Tokens: 0
```

#### **Passo 2: Arquitetura (Claude - ECONÔMICO)**
```
Ferramenta: Claude Code
Prompt: "Arquitetar integração Stockfish em core/. 
Criar:
1. Screen: ChessGameScreen.tsx
2. Context/Hook: useChessGame.ts (estado do tabuleiro, moves)
3. API call para chess-backend (POST /chess/move - bot responde)
Manter design minimalista, usar theme.js, lucide-react-native para ícones."
Arquivo: Novos arquivos em core/
Tokens: ~2500 (lógica + UX, mas reusável)
```

#### **Passo 3: Backend Chess Engine (Copilot - GRATUITO)**
```
Ferramenta: GitHub Copilot Chat
Prompt: "Implementar /chess/move endpoint que recebe 
FEN ou lista de moves, roda Stockfish, retorna melhor move do bot."
Objetivo: Boilerplate para o endpoint
Tokens: 0
```

#### **Passo 4: Refinamento UI/Animações (Claude - ECONÔMICO)**
```
Ferramenta: Claude Code (se necessário)
Prompt: "Melhorar animações do tabuleiro (peças se movem, 
feedback de seleção, check/checkmate visual). 
Usar react-native-reanimated (já instalado)."
Arquivo: core/screens/ChessGameScreen.tsx
Tokens: ~1800
```

### 🐛 BUG REPORTS - TAREFA 4

#### **BUG-001: Botões Não Funcionam (Novo Jogo, Desistir, Voltar)**

**Severidade:** 🟠 HIGH  
**Status:** 🔄 EM INVESTIGAÇÃO

**Sintoma:** Clicar em botões da ChessGameScreen não dispara ações (nenhum Alert, nenhuma mudança de estado)

**Passos para Reproduzir:**
1. Jogar alguns movimentos no xadrez
2. Clicar botão "Novo Jogo"
3. Nada acontece (sem Alert)
4. Repetir com "Desistir" e "Voltar"

**Resultado Esperado:**
- "Novo Jogo" → Alert de confirmação
- "Desistir" → Alert de desistência
- "Voltar" → Alert se jogo em progresso, senão volta ao dashboard

**Resultado Atual:**
- Cliques não disparam nada
- Handlers aparentemente não executam

**Arquivo(s) Afetado(s):**
- core/screens/ChessGameScreen.tsx (linhas 40-77, 119-144)
- core/hooks/useChessGame.ts (funções initGame, resign, undoMove)

**Root Cause Suspeitado:**
- Possível: Handlers não estão sendo bind corretamente
- Possível: ScrollView/View overlay está bloqueando toque
- Possível: Estado não atualiza e os handlers recebem estado desatualizado

**Solução a Testar:**
- [ ] Verificar se `onPress` está sendo acionado (add console.log)
- [ ] Remover scroll/overlay da ScrollView
- [ ] Testar se handlers conseguem chamar setState
- [ ] Verificar se há erro silencioso no catch

---

#### **BUG-002: Bottom Navigation Não Replicado em Novas Telas**

**Severidade:** 🟡 MEDIUM  
**Status:** 🔄 EM DESIGN

**Sintoma:** ChessGameScreen tem bottom nav custom (Jogo, Ranking, Config), mas outras telas novas (futuras) não seguem padrão

**Passos para Reproduzir:**
1. Abrir ChessGameScreen → tem bottom nav com 3 tabs
2. Ir para SettingsScreen → bottom nav desaparece
3. Voltar ao Dashboard → layout diferente da ChessGameScreen

**Resultado Esperado:**
- Todos os screens deveriam replicar o bottom nav padrão
- Bottom nav com: Jogo | Ranking | Config (mesmo em todas as telas)
- Design consistente conforme theme.js

**Resultado Atual:**
- Apenas ChessGameScreen tem bottom nav hardcoded
- Outras telas não têm componente reutilizável
- Risco de inconsistência em futuras telas

**Arquivo(s) Afetado(s):**
- core/screens/ChessGameScreen.tsx (linhas 147-169: hardcoded nav)
- core/screens/SettingsScreen.tsx (sem bottom nav)
- core/screens/RankingScreen.tsx (sem bottom nav)
- core/screens/DashboardScreen.tsx (sem bottom nav)

**Root Cause:**
- Bottom nav foi built-in no ChessGameScreen, não extraído como componente reutilizável
- Falta componente central: `BottomNavigationBar.tsx` ou layout wrapper

**Solução Recomendada:**
1. Extrair bottom nav para novo componente: `core/components/BottomNavigationBar.tsx`
2. Aceitar props: `activeTab: 'game' | 'ranking' | 'settings'`
3. Aplicar em TODAS as screens que devem ter nav
4. Usar theme.js para estilo (já definido em ChessGameScreen)

**Tokens Estimados:** ~1000 (extract + aplica em 4 screens)

---

**Tokens Claude Total:** ~4300 (original) + ~800 (bugs) = **~5100**  
**Tempo:** 4-6 horas + 1-2 horas de bugs = **5-8 horas**  
**Prioridade:** 🔴 BLOCKER (bugs impedem testes completos)

---

## ✅ TAREFA 5: Melhorar Animações (iOS/Android)

**Status:** 🟡 **NORMAL**  
**Impacto:** UX/Polish

### 📌 Escopo
- Bottom navigation smooth transitions
- Card hover/press feedback
- Ranking podium animations
- Chess board piece animations (task 4)

### 🤖 Sequência de Execução

#### **Passo 1: React Native Animation Patterns (Copilot - GRATUITO)**
```
Ferramenta: GitHub Copilot Chat
Prompt: "React Native Animated vs Reanimated v4. Qual usar para 
smooth transitions, press feedback? Exemplos."
Objetivo: Escolher abordagem
Tokens: 0
```

#### **Passo 2: Implementar (Claude - ECONÔMICO)**
```
Ferramenta: Claude Code
Prompt: "Adicionar animações em core/:
1. Bottom nav: slide in/out ao navegar
2. Cards (dashboard): scale + fade ao pressionar
3. Ranking: podium icons rotate + bounce
Usar react-native-reanimated v4 (já em package.json).
Manter minimalista, sem excessos."
Arquivo: core/screens/*.tsx
Tokens: ~2000
```

#### **Passo 3: Performance Check (Gemini - GRATUITO)**
```
Ferramenta: Google Gemini
Prompt: "Usar React DevTools Profiler para verificar FPS 
em animações React Native. Dicas para iOS/Android."
Objetivo: Garantir 60 FPS
Tokens: 0
```

**Tokens Claude:** ~2000  
**Tempo:** 3 horas  
**Prioridade:** 🟢 MÉDIA

---

## ✅ TAREFA 6: Opção de Pontuação Manual

**Status:** 🟡 **NORMAL**  
**Impacto:** Feature extra de gamification

### 📌 Requirements
- Local: Settings Screen ou novo tab "Pontuação"
- Função: Aumentar/diminuir pontos manualmente
- Persistência: Salvar em AsyncStorage + backend

### 🤖 Sequência de Execução

#### **Passo 1: Requirements (Copilot - GRATUITO)**
```
Ferramenta: GitHub Copilot Chat
Prompt: "Feature de aumentar pontos manualmente em app mobile. 
Usuário vs admin? Validação? Logs de auditoria?"
Objetivo: Definir scope
Tokens: 0
```

#### **Passo 2: Implementar (Claude - ECONÔMICO)**
```
Ferramenta: Claude Code
Prompt: "Adicionar em SettingsScreen.tsx (ou novo ManualScoreScreen.tsx):
- Input de pontos a adicionar/remover
- Botão confirmar
- Validar número positivo
- Salvar em AsyncStorage + chamar POST /users/:id/score
Manter design minimalista."
Arquivo: core/screens/SettingsScreen.tsx ou novo screen
Tokens: ~1200
```

#### **Passo 3: Backend (Copilot - GRATUITO)**
```
Ferramenta: GitHub Copilot Chat
Prompt: "Endpoint PATCH /users/:id/score que recebe {points: number}. 
Validar auth, atualizar DB, retornar novo score."
Objetivo: Boilerplate endpoint
Tokens: 0
```

**Tokens Claude:** ~1200  
**Tempo:** 2 horas  
**Prioridade:** 🟢 BAIXA

---

## 📊 Resumo de Economia de Tokens

| Tarefa | Claude | Copilot | Gemini | Total Claude |
|--------|--------|---------|--------|---------------|
| 1. AsyncStorage Fix | 400 | ✅ | ✅ | 400 |
| 2. README Front | 1200 | ✅ | ✅ | 1200 |
| 3. README Back | 1500 | ✅ | ✅ | 1500 |
| 4. Jogo Xadrez | 4300 | ✅ | ✅ | 4300 |
| 5. Animações | 2000 | ✅ | ✅ | 2000 |
| 6. Pontuação Manual | 1200 | ✅ | ✅ | 1200 |
| **TOTAL** | **10,600** | **~0** | **~0** | **10,600** |

**Economia: ~85% dos tokens gastos em Claude (resto em IAs gratuitas)**

---

## 🚀 Execução Recomendada

### **Fase 1: Hotfix (Hoje)**
1. ✅ TAREFA 1 - AsyncStorage (5 min, 400 tokens)

### **Fase 2: Documentação (Amanhã)**
2. ✅ TAREFA 2 - README Front (15 min, 1200 tokens)
3. ✅ TAREFA 3 - README Back (20 min, 1500 tokens)

### **Fase 3: Features (Esta semana)**
4. ✅ TAREFA 4 - Jogo Xadrez (4-6h, 4300 tokens) 
5. ✅ TAREFA 5 - Animações (3h, 2000 tokens)
6. ✅ TAREFA 6 - Pontuação Manual (2h, 1200 tokens)

---

## 🎯 Dicas para Economizar Mais Tokens Claude

1. **Use Copilot para:** Templates, boilerplate, sugestões de sintaxe
2. **Use Gemini para:** Pesquisa, comparações, best practices  
3. **Use Claude para:** Lógica complexa, revisão, debugging, arquitetura
4. **Reutilize:** Não repita contexto. Cite linhas/arquivos já carregados.
5. **Divida:** Tarefas grandes em PRs/commits pequenos → contexto menor
6. **Prompts curtos:** Seja específico: "Corrigir linha 52" é melhor que "Melhorar AuthContext"

---

## 📌 Próximos Passos

- [ ] Validar com Copilot/Gemini antes de cada tarefa
- [ ] Confirmar com team antes de features grandes (tarefa 4)
- [ ] Testar em device real (iOS/Android) antes de merge
- [ ] Atualizar AI_CONTEXT.md após cada tarefa completada

**Status Inicial:** 🔴 AsyncStorage blocker  
**Próximo:** Execute TAREFA 1 com Claude Code agora
