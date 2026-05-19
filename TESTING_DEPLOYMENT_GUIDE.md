# Manual de Testes e Deployment

## 📱 Parte 1: Testar no iPhone com Expo Go

### Pré-requisitos
- iPhone com iOS 13+
- WiFi conectada no mesmo provedor que o PC
- Expo Go instalado (baixar na App Store)

### Passo 1: Preparar o Ambiente Local
```bash
# Na pasta do projeto (c:\Users\joaao\club-xadrez)
npm install
```

### Passo 2: Iniciar o Servidor Expo
```bash
npm start
```

Ou usando Expo CLI diretamente:
```bash
npx expo start
```

Você verá algo assim no terminal:
```
> expo start
Android | iOS | Web

Q  Quit
A  Android
I  iOS (development build)
J  Switch to Expo Go
W  Web
```

### Passo 3: Conectar no iPhone
1. Pressione **J** no terminal para ativar Expo Go
2. Abre um QR Code no terminal
3. No iPhone:
   - Abra o **Expo Go** (app já instalado)
   - Clique em **Scan QR Code** (ícone de câmera)
   - Aponte para o QR Code no terminal do PC
   - Espera carregar (30-60 segundos na primeira vez)

### Passo 4: Testar a App
- A app abre automaticamente no Expo Go
- Faça login com suas credenciais
- Teste todas as funcionalidades:
  - ✅ Login
  - ✅ Dashboard
  - ✅ Jogar xadrez (escolher moves, bot responde)
  - ✅ Botões: Voltar, Novo Jogo, Desistir
  - ✅ Ranking
  - ✅ Configurações (alterar dados, senha)

### Passo 5: Recarregar Mudanças
Se você alterar código enquanto a app está aberta:
- **Reload rápido:** Aperte **R** no terminal
- **Clear cache:** Aperte **C** no terminal
- **Menu Expo:** Agite o iPhone ou abra o menu de controle no Expo Go

### Troubleshooting iPhone + Expo Go

| Problema | Solução |
|----------|---------|
| QR Code não aparece | Pressione `J` novamente no terminal |
| Expo Go abre mas app não carrega | Verifique conexão WiFi, pressione `C` e `R` |
| "Cannot find module" errors | Delete `node_modules`, rode `npm install` novamente |
| Backend não responde | Verifique se backend rodando em `http://localhost:3000` |
| iPhone pede senha do iCloud | Normal, é segurança do iOS, clique "Skip" |

---

## 🤖 Parte 2: Build APK para Android

### Pré-requisitos
- **Opção A (Recomendado):** Usar EAS Build (serviço Expo online)
- **Opção B:** Build local (requer Android SDK, Java SDK, etc)

### ⭐ Opção A: Build com EAS (Recomendado - Mais Fácil)

#### 2.1 Criar Conta Expo
1. Acesse [expo.dev](https://expo.dev)
2. Clique **Sign Up**
3. Use email: `nortelogic@gmail.com`
4. Confirme email

#### 2.2 Instalar EAS CLI
```bash
npm install -g eas-cli
```

#### 2.3 Login no EAS
```bash
eas login
```
Digite suas credenciais Expo

#### 2.4 Configurar eas.json
Na raiz do projeto (`c:\Users\joaao\club-xadrez`), crie arquivo `eas.json`:

```json
{
  "cli": {
    "version": ">= 5.0.0"
  },
  "build": {
    "preview": {
      "android": {
        "buildType": "apk"
      }
    },
    "preview2": {
      "android": {
        "buildType": "apk"
      }
    },
    "preview3": {
      "android": {
        "buildType": "apk"
      }
    },
    "production": {
      "android": {
        "buildType": "apk"
      }
    }
  }
}
```

#### 2.5 Iniciar Build
```bash
eas build --platform android --profile preview
```

Você verá:
```
✔ Making sure your git state is clean...
✔ Validating your project...
✔ Building for Android...
Build ID: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
Build started, you can watch it at:
https://expo.dev/accounts/seu_usuario/builds/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
```

#### 2.6 Aguardar Build Completar
- O build leva **5-15 minutos**
- Você pode fechar o terminal
- Visite o link para acompanhar progresso
- Quando terminar, clique **Download** para pegar o APK

#### 2.7 Instalar no Android
```bash
# Conecte seu Android via USB com Debug ativado
adb install caminho/para/arquivo.apk
```

Ou transfera o APK via pendrive/email e clique nele no Android para instalar.

---

### 🔧 Opção B: Build Local (Avançado)

> ⚠️ **Mais complexo.** Use apenas se EAS não funcionar.

#### 2.8 Pré-requisitos Locais
Você precisará ter instalado:
- **Java JDK 11+** - [Download](https://www.oracle.com/java/technologies/javase-jdk11-downloads.html)
- **Android SDK** - [Download](https://developer.android.com/studio)
- **Android NDK** - Instale via Android Studio SDK Manager

#### 2.9 Variáveis de Ambiente
```powershell
# Abra PowerShell como administrador
$env:JAVA_HOME = "C:\Program Files\Java\jdk-11.0.x"  # Ajuste versão
$env:ANDROID_SDK_ROOT = "C:\Users\seu_usuario\AppData\Local\Android\Sdk"
$env:ANDROID_HOME = "C:\Users\seu_usuario\AppData\Local\Android\Sdk"
```

#### 2.10 Build Local
```bash
eas build --platform android --local
```

Ou sem EAS (mais manual):
```bash
expo prebuild --platform android
cd android
./gradlew assembleRelease
```

O APK fica em:
```
android/app/build/outputs/apk/release/app-release.apk
```

---

## 📊 Comparação: Qual Método Usar?

| Aspecto | EAS Build | Build Local |
|---------|-----------|-------------|
| Tempo setup | 5 min | 30+ min |
| Primeiro build | 10-15 min | 15-30 min | 
| Builds seguintes | 5-10 min | 5-15 min |
| Conhecimento técnico | Mínimo | Intermediário+ |
| Suporte Expo | Completo | Limitado |
| **Recomendado para?** | **Quem quer rápido** | Quem já tem Android Studio |

---

## ✅ Checklist Pré-Deploy

Antes de fazer build de verdade, verifique:

- [ ] Login funciona
- [ ] Bot consegue jogar moves completos
- [ ] Botões funcionam (Voltar, Novo Jogo, Desistir)
- [ ] Ranking mostra dados
- [ ] Configurações salva alterações
- [ ] Logout funciona e volta para login
- [ ] Sem erros no console do Expo

---

## 🚀 Publicar no Play Store (Próxima Etapa)

Depois de testar o APK no seu Android:

```bash
eas submit --platform android
```

Isso envia direto para Google Play. Precisa:
1. Conta Google Play Developer ($25 - pagamento único)
2. Configurar app no Google Play Console
3. Certificado digital (EAS cria automaticamente)

---

## 📞 Troubleshooting Build

| Problema | Solução |
|----------|---------|
| "Build failed" no EAS | Verifique `app.json` sintaxe, limpe `node_modules` |
| APK muito grande | É normal (50-150MB com Expo) |
| App não abre após instalar | Verifique se backend rodando, limpe cache |
| "Cannot connect to API" | Backend não está rodando em `http://localhost:3000` |
| Erro CORS no Android | Verifique `API_URL` em `core/lib/api.ts` |

---

## 💾 Armazenar APK Compilado

Após fazer build, salve o APK em local seguro:
```
c:\Users\joaao\club-xadrez\builds\
├── v1.0.0_release.apk
├── v1.0.1_debug.apk
└── ...
```

Assim você tem histórico e pode voltar a versões antigas se preciso.

---

**Última atualização:** 2026-05-18
