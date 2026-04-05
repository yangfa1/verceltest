# Deployment Guide

How to deploy the Wise Win Newsletter from scratch on Vercel.

---

## Prerequisites

- GitHub account with repos: `yangfa1/verceltest` and `yangfa1/wisewin-newsletters`
- Vercel account ([vercel.com](https://vercel.com))
- Resend account ([resend.com](https://resend.com))
- Neon account ([neon.tech](https://neon.tech)) — or use Vercel Marketplace integration
- Domain: `wisewin.ca` (for production email sending)

---

## Step 1: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) → **Add New Project**
2. Import `yangfa1/verceltest` from GitHub
3. Framework auto-detects as **Next.js**
4. Click **Deploy**

---

## Step 2: Create the Database (Neon)

1. Vercel → your project → **Storage** tab
2. **Create Database** → select **Neon Serverless Postgres** (under Marketplace)
3. Name it `wisewin-db` → complete setup
4. Vercel auto-injects `POSTGRES_URL` ✅

---

## Step 3: Create Database Tables

In **Vercel → Storage → wisewin-db → Query**, run:

```sql
CREATE TABLE IF NOT EXISTS subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'pending',
  newsletters TEXT[] NOT NULL DEFAULT '{}',
  token UUID UNIQUE DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  verified_at TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS admin_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) NOT NULL,
  token UUID UNIQUE DEFAULT gen_random_uuid(),
  expires_at TIMESTAMPTZ NOT NULL,
  used_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS newsletter_types (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  friendly_name VARCHAR(255) NOT NULL,
  folder_name VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

INSERT INTO newsletter_types (friendly_name, folder_name, description, active)
VALUES
  ('Weekly Financial Report', 'weekly-financial-report', 'Comprehensive market analysis every Monday morning', true),
  ('Market Forecast', 'market-forecast', 'Data-driven predictions for the week ahead, every Friday', true)
ON CONFLICT (folder_name) DO NOTHING;
```

---

## Step 4: Set Environment Variables

In **Vercel → Settings → Environment Variables**:

| Variable | Value |
|---|---|
| `RESEND_API_KEY` | Your Resend API key |
| `FROM_EMAIL` | `onboarding@resend.dev` (testing) or `newsletter@wisewin.ca` (production) |
| `NEXT_PUBLIC_BASE_URL` | `https://verceltest-umber.vercel.app` |
| `ADMIN_EMAILS` | Comma-separated admin emails |
| `ADMIN_JWT_SECRET` | Random string (`openssl rand -base64 32`) |
| `NEWSLETTER_SEND_TOKEN` | Shared secret for GitHub Actions auth |

---

## Step 5: Set GitHub Actions Secret

In **github.com/yangfa1/wisewin-newsletters → Settings → Secrets → Actions**:

| Secret | Value |
|---|---|
| `NEWSLETTER_SEND_TOKEN` | Same value as Vercel env var above |

---

## Step 6: Redeploy

Vercel → Deployments → **Redeploy** latest build.

---

## Step 7: Verify Domain (Production Email)

1. [resend.com/domains](https://resend.com/domains) → **Add Domain** → `wisewin.ca`
2. Add DNS records (SPF, DKIM, DMARC) to your DNS provider
3. Wait for verification (~30 min)
4. Update `FROM_EMAIL` → `newsletter@wisewin.ca` → Redeploy

---

## Step 8: Test End-to-End

```
✅ Subscribe at verceltest-umber.vercel.app
✅ Receive verification email → click link
✅ Log in to /admin/login → receive magic link → click link
✅ Push test HTML to wisewin-newsletters → check GitHub Actions → receive newsletter email
```

---

## Updating the App

All deployments trigger automatically on push to `main`:

```bash
git add .
git commit -m "your change"
git push origin main
```
