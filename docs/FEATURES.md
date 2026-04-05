# Features

## Overview

The Wise Win Financial Newsletter platform allows public users to subscribe to weekly financial newsletters via email verification — no password required. An admin panel provides subscriber management and newsletter type configuration. A GitHub Actions pipeline automates newsletter delivery.

---

## 🌐 Public Features

### Subscription Form
- **Dynamic newsletter selection** — checkboxes loaded from the database, always up to date
- **Email input** — no password, no account creation
- **Subscribe / Unsubscribe toggle** — same form handles both flows
- Fully responsive, mobile-friendly UI

### Email Verification Flow
- After subscribing, a unique verification link is emailed to the user
- Clicking the link activates the subscription
- Links are single-use and expire after 24 hours
- Prevents fake/bot subscriptions

### Unsubscribe Flow
- User enters email on website → instant deactivation
- One-click unsubscribe link in every newsletter email (`{{UNSUBSCRIBE_URL}}` placeholder)
- Confirmation email sent on unsubscribe

---

## 🔐 Admin Features

### Magic Link Authentication
- No password stored — admin logs in via email magic link
- Magic links expire after 15 minutes and are single-use
- Admin emails whitelisted via `ADMIN_EMAILS` environment variable
- JWT session cookie lasts 24 hours

### Admin Dashboard (`/admin`)
- **Stats overview:** Total / Active / Pending / Inactive subscriber counts
- **Subscriber table:** Paginated list with status filter
- **Link to newsletter types management**

### Newsletter Types Management (`/admin/newsletter-types`)
- Add new newsletter types (friendly name + folder name + description)
- Activate / deactivate newsletters (hides from subscribe form)
- Delete newsletter types
- Folder name auto-generated from friendly name
- Live view of required GitHub repo folder structure

---

## 📧 Newsletter Sending Pipeline

```
Push HTML file → GitHub Actions → POST /api/send-newsletter → Resend → Subscribers
```

1. Admin pushes `YYYY-MM-DD.html` to the [wisewin-newsletters](https://github.com/yangfa1/wisewin-newsletters) repo
2. GitHub Actions detects the new file, extracts folder name and date
3. Calls `POST /api/send-newsletter` with bearer token auth
4. API looks up newsletter type in `newsletter_types` table
5. Fetches all active subscribers for that newsletter
6. Injects personalized unsubscribe URL into each email
7. Sends in batches of 50 via Resend
8. Returns `{ sent, failed }` summary to GitHub Actions log

### Subject Auto-Generation
Filename `2026-04-07.html` + type `Weekly Financial Report` → `Weekly Financial Report — Apr 7, 2026`

---

## 🗄️ Database Schema

### `subscribers`
| Column | Type | Description |
|---|---|---|
| `id` | UUID | Primary key |
| `email` | VARCHAR(255) | Unique email address |
| `status` | VARCHAR(20) | `pending`, `active`, `inactive` |
| `newsletters` | TEXT[] | Array of subscribed folder_names |
| `token` | UUID | Token for verify/unsubscribe links |
| `created_at` | TIMESTAMPTZ | Subscription date |
| `updated_at` | TIMESTAMPTZ | Last update |
| `verified_at` | TIMESTAMPTZ | Email verification date |

### `admin_sessions`
| Column | Type | Description |
|---|---|---|
| `id` | UUID | Primary key |
| `email` | VARCHAR(255) | Admin email |
| `token` | UUID | Magic link token |
| `expires_at` | TIMESTAMPTZ | Expiry (15 min from creation) |
| `used_at` | TIMESTAMPTZ | When used (null = unused) |
| `created_at` | TIMESTAMPTZ | Creation time |

### `newsletter_types`
| Column | Type | Description |
|---|---|---|
| `id` | UUID | Primary key |
| `friendly_name` | VARCHAR(255) | Display name e.g. "Weekly Financial Report" |
| `folder_name` | VARCHAR(100) | GitHub folder name e.g. "weekly-financial-report" |
| `description` | TEXT | Short description shown on subscribe form |
| `active` | BOOLEAN | If false, hidden from subscribe form |
| `created_at` | TIMESTAMPTZ | Creation time |

---

## 🔒 Security

- No passwords stored anywhere
- Tokens are UUIDs (cryptographically random)
- Admin emails whitelisted — unknown emails get neutral response (no info leak)
- JWT admin sessions are httpOnly, secure, sameSite=lax
- Magic link tokens are single-use and time-limited
- Send endpoint protected by `NEWSLETTER_SEND_TOKEN` bearer auth
- All DB queries use parameterized statements (SQL injection safe)
