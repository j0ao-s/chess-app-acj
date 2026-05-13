# ♟️ Minimalist Chess Club

> Uma plataforma de xadrez premium, projetada com uma filosofia de design *Extreme Minimalist*. Uma experiência móvel focada em legibilidade, contraste e elegância, entregando apenas o que importa: o jogo e os jogadores.

---

## 📱 Visão Geral

O **Minimalist Chess Club** é uma aplicação React Native focada em oferecer uma interface de clube de xadrez moderno. Distanciando-se de plataformas poluídas, o aplicativo foi construído usando Design Tokens estritos com alto contraste (quase monocromático), fontes grossas (bold/black typography) e uma navegação fluida em abas (Bottom Navigation) no melhor estilo "Single Page Application".

---

## 🛠️ Stack Tecnológica & Justificativas

A escolha de cada tecnologia no projeto não foi por acaso. Aqui está o porquê de cada camada arquitetural:

### 1. **React Native & Expo**
Utilizamos **React Native** suportado pelo ecossistema **Expo**. 
- **Por quê?** O Expo permite uma iteração de desenvolvimento incrivelmente rápida e exportação universal. Com apenas um código-base, o aplicativo roda nativamente em iOS, Android e no Navegador (Web), dispensando configurações complexas de Xcode ou Android Studio.

### 2. **Expo Router (File-based Routing)**
A navegação tradicional do React Navigation foi substituída pela arquitetura moderna do Expo Router.
- **Por quê?** O Expo Router utiliza navegação baseada no sistema de arquivos (pasta `/app`), inspirada no Next.js. Isso elimina montanhas de código *boilerplate* de roteamento, melhora o suporte a *Deep Linking* e facilita a compreensão do fluxo: cada arquivo na raiz `/app` é automaticamente uma nova rota.

### 3. **TypeScript**
O projeto inteiro está tipado.
- **Por quê?** Para escalabilidade. Em um aplicativo com múltiplos estados de usuário (classificações de xadrez, dados de perfil, senhas), o TypeScript evita erros silenciosos em tempo de execução, garantindo que objetos e *props* passem exatamente o que a interface espera.

### 4. **Lucide React Native (Ícones SVG)**
Substituímos emojis e ícones padronizados por SVG nativos renderizados pela biblioteca Lucide.
- **Por quê?** O Lucide oferece vetores incrivelmente nítidos, leves e esteticamente consistentes. Eles se alinham perfeitamente à nossa diretriz de design *Minimalist*, garantindo que ícones como `<Crown />`, `<LayoutDashboard />` e `<Trophy />` carreguem classe e clareza.

### 5. **Custom Design System (Tokens)**
Nós removemos dependências de bibliotecas de UI pesadas (como NativeBase ou Gluestack) e implementamos um arquivo centralizado: `theme.js`.
- **Por quê?** Liberdade total de estilo. Nós armazenamos nossas *Design Tokens* (cores High-Contrast, tipografia Inter, espaçamentos consistentes). Se precisarmos mudar a identidade do clube no futuro, basta alterar um único arquivo em todo o projeto.

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
- Node.js (versão 18+)
- Conta no Expo (opcional, para visualização mobile)

### Passos
1. Instale as dependências:
   ```bash
   npm install
   ```

2. Para rodar no navegador web:
   ```bash
   npm run web
   ```

3. Para rodar diretamente no seu celular (via app *Expo Go*):
   ```bash
   npx expo start
   ```
   > Escaneie o QR Code gerado no terminal usando a câmera do iPhone ou o aplicativo Expo Go no Android.

---

## 🎨 Considerações de UI/UX

- **Persistência de Navegação:** Todas as páginas principais (Dashboard, Ranking, Settings) compartilham um menu inferior padronizado. Isso mantém a carga cognitiva do usuário baixa.
- **Zero "Gordura":** Tudo o que não agregava valor (hooks não utilizados do template Expo, arquivos de temas dinâmicos desnecessários) foi expurgado, diminuindo o tamanho do build e aumentando a legibilidade da base de código.

---
*Desenvolvido com 🖤 para os amantes de código e enxadristas.*
