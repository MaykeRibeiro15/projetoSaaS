# Vitalle - Medical Concierge Platform

<div align="center">
  <h3>Plataforma SaaS Multi-Tenant para Gestão de Consultórios Médicos</h3>
  <p>Agenda inteligente | Prontuário digital | WhatsApp integrado | Cobrança automática</p>
</div>

---

## Stack Tecnológica

### Frontend
- **Next.js 14** (App Router)
- **TypeScript**
- **TailwindCSS**
- **React Query (TanStack)**
- **Zustand**
- **React Hook Form + Zod**
- **Shadcn/UI + Radix UI**
- **Lucide Icons**

### Backend
- **NestJS 10**
- **TypeScript**
- **Prisma ORM**
- **PostgreSQL** (Supabase)
- **JWT + Refresh Token**
- **Passport.js**
- **Swagger/OpenAPI**

### Infraestrutura
- **Docker + Docker Compose**
- **Google Cloud (Cloud Run, Secret Manager)**
- **Redis** (filas futuras)
- **Supabase Storage**

---

## Funcionalidades

### Plano Standard
- Agenda completa (diária, semanal, mensal)
- Gestão de pacientes (cadastro, histórico)
- Prontuário digital
- Anamnese
- Evolução clínica
- Lembretes automáticos
- Lista de aniversariantes

### Plano Plus
- Tudo do Standard +
- WhatsApp Business integrado (API Oficial Meta)
- Automações inteligentes
- Reagendamento automático por WhatsApp
- Cancelamento automático por WhatsApp
- Campanhas de WhatsApp
- Recuperação de pacientes inativos (90 dias)

---

## Arquitetura Multi-Tenant

- Cada entidade possui `tenant_id` obrigatório
- Isolamento total entre empresas via Row Level Security (RLS)
- Guards no backend validam tenant em toda requisição
- Nunca há compartilhamento de dados entre tenants

---

## Setup Local

### Pré-requisitos
- Node.js 20+
- Docker e Docker Compose
- npm ou yarn

### 1. Clone o repositório
```bash
git clone <repo-url>
cd Vitalle
```

### 2. Variáveis de Ambiente
```bash
cp .env.example .env
# Edite o .env com suas credenciais
```

### 3. Subir banco de dados
```bash
docker-compose -f docker-compose.dev.yml up -d
```

### 4. Backend
```bash
cd backend
npm install
npx prisma generate
npx prisma migrate dev
npm run start:dev
```

### 5. Frontend
```bash
cd frontend
npm install
npm run dev
```

### 6. Acessar
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001
- Swagger Docs: http://localhost:3001/api/docs

---

## Deploy Produção

### Docker Compose
```bash
docker-compose up -d --build
```

### Google Cloud Run
```bash
# Build e push images
gcloud builds submit --tag gcr.io/PROJECT_ID/vitalle-backend ./backend
gcloud builds submit --tag gcr.io/PROJECT_ID/vitalle-frontend ./frontend

# Deploy backend
gcloud run deploy vitalle-backend \
  --image gcr.io/PROJECT_ID/vitalle-backend \
  --platform managed \
  --region us-east1 \
  --allow-unauthenticated

# Deploy frontend
gcloud run deploy vitalle-frontend \
  --image gcr.io/PROJECT_ID/vitalle-frontend \
  --platform managed \
  --region us-east1 \
  --allow-unauthenticated
```

---

## Estrutura do Projeto

```
Vitalle/
├── frontend/                   # Next.js 14 Application
│   ├── src/
│   │   ├── app/               # App Router pages
│   │   │   ├── (auth)/        # Login, Register
│   │   │   └── (dashboard)/   # Dashboard pages
│   │   ├── components/        # React components
│   │   ├── hooks/             # Custom hooks
│   │   ├── lib/               # Utilities & API client
│   │   ├── services/          # API service layer
│   │   ├── store/             # Zustand stores
│   │   ├── types/             # TypeScript types
│   │   └── validators/        # Zod schemas
│   ├── public/                # Static assets
│   ├── tailwind.config.ts
│   └── package.json
│
├── backend/                    # NestJS Application
│   ├── src/
│   │   ├── modules/           # Feature modules
│   │   │   ├── auth/          # Authentication
│   │   │   ├── tenants/       # Tenant management
│   │   │   ├── users/         # User management
│   │   │   ├── doctors/       # Doctor profiles
│   │   │   ├── patients/      # Patient management
│   │   │   ├── appointments/  # Scheduling
│   │   │   ├── medical-records/ # Medical records
│   │   │   ├── anamnesis/     # Anamnesis
│   │   │   ├── evolution/     # Clinical evolution
│   │   │   ├── subscriptions/ # Plan subscriptions
│   │   │   ├── payments/      # PagBank integration
│   │   │   ├── invoices/      # NFe integration
│   │   │   ├── whatsapp/      # WhatsApp Business API
│   │   │   └── contracts/     # Digital contracts
│   │   ├── common/            # Guards, filters, interceptors
│   │   ├── providers/         # External services
│   │   └── config/            # Configuration
│   ├── prisma/                # Database schema & migrations
│   └── package.json
│
├── docker/                     # Dockerfiles
├── docs/                       # Documentation
├── docker-compose.yml          # Production compose
├── docker-compose.dev.yml      # Development compose
└── .env.example               # Environment template
```

---

## Segurança

- HTTPS obrigatório em produção
- JWT com refresh token e rotação
- MFA via e-mail
- Rate limiting global
- Helmet (headers de segurança)
- Validação e sanitização de inputs
- Proteção contra SQL Injection (Prisma ORM)
- Proteção XSS
- Row Level Security (RLS) no banco
- Audit logs para todas operações sensíveis
- Soft delete (nunca apaga dados)

---

## Integrações

| Serviço | Tipo | Uso |
|---------|------|-----|
| WhatsApp Business Cloud API | Oficial Meta | Lembretes, confirmações, automações |
| PagBank | Pagamentos | PIX, cartão tokenizado, webhooks |
| NFe.io / Focus NFe | Nota Fiscal | Emissão automática pós-pagamento |
| Supabase | BaaS | Auth, Storage, PostgreSQL |

---

## Fluxo de Assinatura

1. Cliente escolhe plano (Standard/Plus)
2. Registra conta (cria tenant + user + doctor)
3. Gera cobrança (PIX ou cartão)
4. Webhook confirma pagamento
5. Status → `PENDING_CONTRACT_ACCEPT`
6. Modal obrigatório de aceite contratual
7. Registra aceite (IP, user-agent, hash, versão)
8. Status → `ACTIVE`
9. Emite nota fiscal automaticamente
10. Envia NF por e-mail (PDF + XML)

---

## Paleta de Cores

| Cor | Hex | Uso |
|-----|-----|-----|
| Verde Escuro | `#406B5B` | Primary, sidebar ativa, botões |
| Verde Claro | `#91AE9E` | Secondary, fichas médicas, anamnese |
| Tan/Bege | `#B89D83` | Accent, badges, destaques |
| Creme | `#E4D5C3` | Background, borders, muted |

---

## Licença

Proprietário - Vitalle Medical Concierge Platform

---

## Contato

Para suporte ou dúvidas sobre a plataforma, entre em contato com a equipe Vitalle.
