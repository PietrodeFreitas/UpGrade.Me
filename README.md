# UpGrade.Me 🚀

Formatação, backup seguro, limpeza e otimização de PC, celular e tablet.

## 📁 Estrutura do Projeto

```
UpGrade.Me/
├── public/              # Frontend (HTML/CSS/JS)
│   ├── index.html
│   ├── css/style.css
│   ├── js/main.js
│   └── assets/
│
├── api/                 # Backend Node.js
│   ├── src/
│   │   ├── server.js
│   │   ├── config.js
│   │   ├── routes/
│   │   ├── middleware/
│   │   ├── services/
│   │   └── utils/
│   ├── data/           # Banco de dados (orcamentos.json)
│   ├── .env
│   └── package.json
│
├── api.js              # Handler Vercel
├── vercel.json         # Config de deploy
└── package.json        # Root dependencies
```

## 🛠️ Setup Local

### Requisitos
- Node.js >= 18
- npm ou yarn

### Instalação

```bash
# Instalar dependências
npm install
cd api && npm install && cd ..

# Variáveis de ambiente (já configurado em api/.env)
# Editar conforme necessário
```

### Desenvolvimento

```bash
# Iniciar API (localhost:3333)
cd api
npm run dev

# Frontend está em public/ (abra index.html ou use live-server)
cd ../public
npx live-server
```

### Endpoints da API

- `GET /health` - Health check
- `GET /config` - Configuração pública (WhatsApp, Instagram, etc)
- `POST /orcamentos` - Criar novo orçamento
- `GET /orcamentos` - Listar orçamentos (requer `x-api-key`)

## 🌐 Variáveis de Ambiente

### Local (`api/.env`)
```env
PORT=3333
CORS_ORIGIN=*
WHATSAPP_NUMBER=5519992538677
INSTAGRAM_URL=https://instagram.com/uppgrade.me
WHATSAPP_GROUP_URL=https://whatsapp.com/channel/...
RECOMMENDATION_CHANNEL_URL=https://whatsapp.com/channel/...
ADMIN_API_KEY=seu-token-secreto
```

### Produção (Vercel)
Configure em **Project Settings → Environment Variables**:

```
PORT=3333
CORS_ORIGIN=https://seu-dominio.vercel.app
WHATSAPP_NUMBER=5519992538677
INSTAGRAM_URL=https://instagram.com/uppgrade.me
WHATSAPP_GROUP_URL=https://whatsapp.com/channel/...
RECOMMENDATION_CHANNEL_URL=https://whatsapp.com/channel/...
ADMIN_API_KEY=token-muito-seguro-aqui
```

## 🚀 Deploy

### Vercel (Recomendado)

1. **Conectar repositório**
   - Vá em [vercel.com/dashboard](https://vercel.com/dashboard)
   - Clique "Import Project"
   - Selecione o repositório `UpGrade.Me`

2. **Configurar ambiente**
   - Framework: Node.js (detectado automaticamente)
   - Build Command: `cd api && npm install`
   - Output Directory: `public`
   - Environment Variables: Configure conforme seção acima

3. **Deploy**
   - Clique "Deploy"
   - Aguarde conclusão
   - Site estará em `https://seu-projeto.vercel.app`

### Deploy Local (Testing)

```bash
npm install -g vercel
vercel login
vercel
```

## 📊 API Response Examples

### GET /config
```json
{
  "ok": true,
  "data": {
    "whatsappNumber": "5519992538677",
    "whatsappUrl": "https://wa.me/5519992538677",
    "instagramUrl": "https://instagram.com/uppgrade.me",
    "whatsappGroupUrl": "https://whatsapp.com/channel/...",
    "recommendationChannelUrl": "https://whatsapp.com/channel/...",
    "business": {
      "aceitaTablet": true,
      "naoFazHardware": true
    }
  }
}
```

### POST /orcamentos
```json
{
  "tipoServico": "formatacao",
  "dispositivo": "notebook",
  "descricao": "Notebook lento, com erro...",
  "nome": "João",
  "email": "joao@example.com",
  "whatsapp": "11999999999"
}
```

Response:
```json
{
  "ok": true,
  "message": "Orçamento recebido com sucesso.",
  "data": {
    "id": "orcamento_uuid",
    "status": "novo",
    "createdAt": "2026-07-17T..."
  }
}
```

## 🔒 Segurança

- CORS configurado para produção
- API Key para acesso a dados sensíveis
- LGPD compliant (veja `politica-de-privacidade.html`)
- Dados salvos em JSON (considerar DB em produção)

## 📝 Licença

Proprietário - UpGrade.Me

## 📧 Contato

- WhatsApp: +55 19 99253-8677
- Instagram: [@uppgrade.me](https://instagram.com/uppgrade.me)
- Email: (configurar em .env)

---

**Último update**: 2026-07-17
**Status**: ✅ Pronto para produção
