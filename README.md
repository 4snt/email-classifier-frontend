# 📧 Email Classifier — Frontend (Next.js + Tailwind)

Frontend do **MVP do Desafio Técnico da AutoU** — interface web para o sistema de classificação automática de e-mails.  
Permite configurar acesso IMAP (via Gmail), classificar mensagens recebidas como **Produtivas** ou **Improdutivas**, e visualizar logs de classificações.

🔗 **Site publicado:** [autou.flipafile.com](https://autou.flipafile.com/)  
👤 **Autor:** [@4snt](https://github.com/4snt)

---

## ✨ Features

- Formulário para conectar via **IMAP (Gmail + senha de app)**
- Seleção de **perfil de classificação**
- Iniciar e parar serviço IMAP diretamente da interface
- Upload de arquivos (`.pdf`, `.txt`) para classificação manual
- Classificação direta via texto colado
- Visualização de resultados e logs
- Feedback de status via notificações (Sonner)

---

## 🏗️ Stack

- **Next.js 15** + App Router
- **React 18**
- **TailwindCSS**
- **Sonner** (notificações)
- **TypeScript**
- **API Backend**: FastAPI (hexagonal + DDD-lite)

---

## 📂 Estrutura Simplificada

```
email-classifier-frontend/
├─ src/
│  ├─ components/
│  │   ├─ ImapForm.tsx        # Formulário IMAP (iniciar/parar serviço)
│  │   ├─ ClassifierForm.tsx  # Upload de arquivo ou texto para classificar
│  │   └─ ui/                 # Botões, inputs e elementos de UI
│  ├─ lib/
│  │   └─ api.ts              # Integração com backend FastAPI
│  ├─ data/
│  │   └─ profiles.json       # Perfis de classificação
│  └─ app/
│      └─ page.tsx            # Home com abas: Gmail / Upload / Demo
├─ public/
│  └─ images/logo-autou.webp
├─ package.json
├─ tailwind.config.ts
├─ README.md
└─ .env.example
```

---

## ▶️ Como rodar localmente

```bash
# Instale dependências
pnpm install   # ou npm install

# Configure variáveis
cp .env.example .env

# Rode em dev
pnpm dev       # ou npm run dev
```

Acesse: `http://localhost:3000`

---

## 🌐 Integração com Backend

- `NEXT_PUBLIC_API_URL` deve apontar para o backend FastAPI rodando (ex: `http://localhost:8000` ou URL no Coolify).
- Frontend consome rotas:
  - `POST /imap/config` → inicia serviço IMAP
  - `POST /imap/stop` → para serviço IMAP
  - `GET /imap/status` → status atual
  - `POST /classify` → classificação de texto/arquivo
  - `GET /logs` → últimos logs

---

## 📍 Próximos passos

- Dashboard com estatísticas de classificação
- Melhorar responsividade mobile
- Autenticação multiusuário

---

## 📜 Licença

Uso livre neste desafio técnico **AutoU**.

---

### ⚡ Repositório & Deploy

- Repositório: [github.com/4snt/email-classifier-frontend](https://github.com/4snt/email-classifier-frontend)
- Deploy: [autou.flipafile.com](https://autou.flipafile.com/)
