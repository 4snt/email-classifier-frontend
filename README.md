# Email Classifier — Frontend (Next.js + Tailwind)

Frontend do MVP para **classificação automática de e-mails**.  
Interface simples em **Next.js 15 + TypeScript + Tailwind**, conectada ao backend FastAPI.

---

## ✨ Features

- Formulário para:
  - Classificação de texto direto
  - Upload de `.pdf` / `.txt`
  - Upload de `.eml`
- Painel de logs → histórico de classificações
- Integração com backend (`/classify`, `/logs`)
- Conexão via **IMAP (Gmail)**:
  - Configuração com host/usuário/senha de app
  - Botões para **iniciar/parar serviço**
  - Status em tempo real
- Toasts de feedback (`sonner`)
- Estilização com **TailwindCSS + shadcn/ui**

---

## 📁 Estrutura de Pastas

```
email-classifier-frontend/
├─ public/               # assets estáticos
├─ src/
│  ├─ app/               # rotas Next.js
│  ├─ components/        # componentes UI (Button, Forms, Navbar, etc.)
│  ├─ lib/               # api.ts (fetch para backend)
│  └─ data/              # perfis de classificação (profiles.json)
├─ .env.example
├─ package.json
└─ README.md
```

---

## ▶️ Como Rodar (Local)

```bash
pnpm install
pnpm dev
```

Acesse:

- Frontend: `http://localhost:3000`
- Backend (FastAPI): `http://localhost:8000`

---

## 🔌 Integração com Backend

Defina no `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

Endpoints usados:

- `POST /classify`
- `GET /logs`
- `POST /imap/config`
- `POST /imap/stop`
- `GET /imap/status`

---

## 📜 Licença

Uso livre para este desafio técnico. Se for publicar, considere **MIT**.
