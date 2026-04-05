# 慧盈财富 · Wise Win Financial Newsletter

A subscription platform for weekly financial reports and stock market forecasts. Built with Next.js 14, Neon Postgres, Resend, and Vercel.

🌐 **Live Site:** https://verceltest-umber.vercel.app  
📁 **Payload Repo:** https://github.com/yangfa1/wisewin-newsletters

---

## 📚 Documentation

| Document | Description |
|---|---|
| [Features](docs/FEATURES.md) | Full feature list and architecture overview |
| [Environment Configuration](docs/ENV_CONFIG.md) | All environment variables and setup |
| [API Reference](docs/API.md) | API endpoints, request/response formats |
| [End User Guide](docs/USER_GUIDE.md) | How to subscribe, verify, and unsubscribe |
| [Admin Guide](docs/ADMIN_GUIDE.md) | Admin login, dashboard, and subscriber management |
| [Deployment Guide](docs/DEPLOYMENT.md) | How to deploy and configure from scratch |
| [Development Guide](docs/DEVELOPMENT.md) | Local development setup |

---

## 🚀 Quick Start (Development)

```bash
git clone git@github.com:yangfa1/verceltest.git
cd verceltest
npm install
cp .env.example .env.local   # fill in your values
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Database | Neon Serverless Postgres |
| Email | Resend |
| Styling | Tailwind CSS |
| Auth | JWT (jose) + Magic Links |
| Deployment | Vercel |
| Newsletter Delivery | GitHub Actions → Vercel API |

---

## 📁 Project Structure

```
verceltest/
├── app/
│   ├── page.tsx                  # Public subscription page
│   ├── verify/                   # Email verification page
│   ├── admin/                    # Admin panel (protected)
│   │   ├── page.tsx              # Dashboard
│   │   ├── login/                # Magic link login
│   │   ├── verify/               # Session creation
│   │   └── newsletter-types/     # Manage newsletter types
│   └── api/
│       ├── subscribe/            # Subscribe API
│       ├── unsubscribe/          # Unsubscribe API
│       ├── unsubscribe-link/     # One-click unsubscribe from email
│       ├── verify/               # Email verification API
│       ├── newsletter-types/     # Public newsletter types list
│       ├── send-newsletter/      # Triggered by GitHub Actions
│       └── admin/                # Admin APIs
│           ├── login/
│           ├── verify/
│           ├── stats/
│           ├── subscribers/
│           └── newsletter-types/ # CRUD for newsletter types
├── components/
│   ├── Header.tsx
│   ├── Footer.tsx
│   └── SubscribeForm.tsx         # Dynamic, loads from DB
├── lib/
│   ├── db.ts                     # Neon database client + migrations
│   ├── email.ts                  # Resend email templates
│   └── auth.ts                   # JWT + admin auth
└── docs/                         # Documentation
```

---

## 📧 Newsletter Sending Pipeline

```
Push HTML file to wisewin-newsletters repo
  → GitHub Actions detects new .html file
  → POST /api/send-newsletter (authenticated with NEWSLETTER_SEND_TOKEN)
  → Vercel looks up newsletter type in DB
  → Fetches all active subscribers
  → Sends via Resend in batches of 50
  → Unsubscribe link injected per subscriber
```

See the [payload repo](https://github.com/yangfa1/wisewin-newsletters) for how to drop newsletter files.

---

## 🗄️ Database Tables

| Table | Purpose |
|---|---|
| `subscribers` | Email addresses, status, subscribed newsletters |
| `admin_sessions` | Magic link tokens for admin login |
| `newsletter_types` | Dynamic list of newsletter types |

---

## 🔒 Security

- No passwords stored — magic link auth for admins, email verification for subscribers
- JWT sessions: httpOnly, secure, sameSite cookies
- Send endpoint protected by bearer token (`NEWSLETTER_SEND_TOKEN`)
- All SQL queries parameterized (injection safe)
- Admin email whitelist via env var
