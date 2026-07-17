# UpGrade.Me — Guia de Deploy no Vercel 🚀

## Pré-requisitos

✅ Repositório GitHub: `PietrodeFreitas/UpGrade.Me`  
✅ Estrutura correta: `api/` e `public/`  
✅ Variáveis de ambiente configuradas  

## Passo 1: Criar conta no Vercel

1. Vá em [vercel.com](https://vercel.com)
2. Clique "Sign Up"
3. Autentique com GitHub

## Passo 2: Importar Projeto

1. No dashboard, clique **"Add New..."** → **"Project"**
2. Clique **"Import Git Repository"**
3. Selecione `PietrodeFreitas/UpGrade.Me`
4. Clique **"Import"**

## Passo 3: Configurar Build

Na tela de configuração do projeto:

| Campo | Valor |
|-------|-------|
| **Framework Preset** | Node.js |
| **Build Command** | `cd api && npm install` |
| **Output Directory** | `public` |
| **Install Command** | `npm install && cd api && npm install` |
| **Development Command** | `cd api && npm run dev` |

## Passo 4: Configurar Environment Variables

1. Clique na aba **"Environment Variables"**
2. Adicione cada variável:

```env
PORT=3333
CORS_ORIGIN=https://seu-projeto.vercel.app
WHATSAPP_NUMBER=5519992538677
INSTAGRAM_URL=https://instagram.com/uppgrade.me
WHATSAPP_GROUP_URL=https://whatsapp.com/channel/0029Vb8auZnHAdNOqE20Fb3d
RECOMMENDATION_CHANNEL_URL=https://whatsapp.com/channel/0029Vb8auZnHAdNOqE20Fb3d
ADMIN_API_KEY=sua-chave-segura-aqui
```

> ⚠️ **IMPORTANTE**: Nunca commitar `.env.production` com valores reais!

## Passo 5: Deploy

1. Clique **"Deploy"**
2. Aguarde ~5-10 minutos
3. Seu site estará em `https://seu-projeto.vercel.app`

## ✅ Validar Deploy

### Testar Endpoints

```bash
# Health
curl https://seu-projeto.vercel.app/api/health

# Config
curl https://seu-projeto.vercel.app/api/config

# Frontend
curl https://seu-projeto.vercel.app/
```

### Verificar Logs

1. Vá em **"Deployments"** no dashboard
2. Clique no deploy mais recente
3. Vá em **"Functions"** para ver logs da API
4. Vá em **"Logs"** para ver build logs

## 🔄 Atualizar Site

### Novo Deploy Automático

Toda vez que você fazer push para `main`:

```bash
git add .
git commit -m "feat: nova feature"
git push origin main
```

Vercel fará deploy automático! ✨

### Deploy Manual

No dashboard Vercel:
1. Vá em **"Deployments"**
2. Clique nos 3 pontinhos (⋯)
3. Selecione **"Redeploy"**

## 🐛 Troubleshooting

### API retornando erro 500

1. Verifique variáveis de ambiente em Settings → Environment Variables
2. Veja os logs: Deployments → última versão → Logs
3. Verifique se `api/data/` existe

### CORS error

Atualize `CORS_ORIGIN` em Environment Variables com seu domínio Vercel:
```env
CORS_ORIGIN=https://seu-projeto.vercel.app
```

### Função de API não iniciando

1. Verifique `api/package.json`
2. Certifique-se que `api/src/server.js` existe
3. Veja: **Deployments → Logs → Build Logs**

## 📊 Performance

- **Frontend**: CDN global do Vercel ⚡
- **Backend**: Serverless Functions (cold starts ~1s)
- **Cache**: Configurado automaticamente

## 🔒 Segurança

- ✅ HTTPS automático
- ✅ Environment variables criptografadas
- ✅ Rate limiting automático
- ✅ DDoS protection

## 📞 Suporte

- **Docs**: https://vercel.com/docs
- **Status**: https://vercel-status.com
- **Email**: support@vercel.com

---

**Seu site estará 🚀 no ar em minutos!**

Dúvidas? Veja os logs em Vercel Dashboard ou leia os docs!
