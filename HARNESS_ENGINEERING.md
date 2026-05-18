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

## ✅ TAREFA 4: Implementar Jogo de Xadrez (Stockfish)

**Status:** 🟠 **COMPLEXO**  
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

**Tokens Claude Total:** ~4300  
**Tempo:** 4-6 horas  
**Prioridade:** 🟠 ALTA (feature core)

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
