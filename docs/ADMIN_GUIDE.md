# Admin Guide

This guide covers admin authentication, the dashboard, subscriber management, and newsletter type configuration.

---

## 🔐 Logging In

The admin panel uses **magic link authentication** — no password required.

1. Go to: **[verceltest-umber.vercel.app/admin/login](https://verceltest-umber.vercel.app/admin/login)**
2. Enter your authorized admin email address
3. Click **Send Magic Link**
4. Check your inbox for subject: **"🔐 Wise Win Admin Login Link"**
5. Click **Log In to Admin** — session lasts **24 hours**

> ⚠️ Magic links expire in **15 minutes** and are single-use. Request a new one if it expires.

---

## 📊 Dashboard (`/admin`)

### Stats Cards
| Card | Description |
|---|---|
| **Total** | All subscribers ever |
| **Active** | Verified and receiving emails |
| **Pending** | Subscribed but not yet verified |
| **Inactive** | Unsubscribed |

### Subscriber Table
- Email, status, newsletters, join date, verified date
- Filter by: **All / Active / Pending / Inactive**
- Paginated (20 per page)

### Navigation
- **Newsletters** link → Newsletter Types management
- **← Site** link → Back to public site

---

## 📋 Newsletter Types (`/admin/newsletter-types`)

Manage which newsletters appear on the public subscribe form.

### Adding a Newsletter Type
1. Click **+ Add Newsletter**
2. Fill in:
   - **Friendly Name** — displayed on the subscribe form (e.g. `Crypto Watch`)
   - **Folder Name** — must match the GitHub folder exactly (e.g. `crypto-watch`) — auto-generated from name
   - **Description** — shown under the checkbox (e.g. `Weekly crypto overview, every Wednesday`)
3. Click **Create Newsletter Type**

> After adding, create the matching folder in the [wisewin-newsletters](https://github.com/yangfa1/wisewin-newsletters) repo.

### Activating / Deactivating
- **Active** = shown on subscribe form, GitHub Actions sends to subscribers
- **Inactive** = hidden from subscribe form, no sends triggered
- Click **Deactivate** / **Activate** to toggle

### Deleting
- Click **Delete** → confirm prompt
- ⚠️ Existing subscriber preferences referencing this folder_name are not automatically cleaned up

---

## 📤 Sending a Newsletter

Newsletters are sent by pushing an HTML file to the [wisewin-newsletters](https://github.com/yangfa1/wisewin-newsletters) repo.

1. Write your newsletter as an HTML file
2. Name it: `YYYY-MM-DD.html` (e.g. `2026-04-07.html`)
3. Place in the correct folder matching the newsletter type's folder_name:
   ```
   weekly-financial-report/2026-04-07.html
   market-forecast/2026-04-07.html
   ```
4. Commit and push to `main`
5. GitHub Actions sends the emails automatically

**Subject line** is auto-generated:
- `weekly-financial-report` + `2026-04-07.html` → `Weekly Financial Report — Apr 7, 2026`

**Unsubscribe link** is injected automatically — include `{{UNSUBSCRIBE_URL}}` in your HTML footer:
```html
<a href="{{UNSUBSCRIBE_URL}}">Unsubscribe</a>
```

Check **GitHub Actions** (github.com/yangfa1/wisewin-newsletters → Actions tab) to monitor send status and logs.

---

## 👥 Managing Subscribers

Currently managed via the subscriber table in the dashboard. Direct DB access available via Neon dashboard for bulk operations.

**Useful queries:**
```sql
-- Get all active subscribers for a newsletter
SELECT email FROM subscribers
WHERE status = 'active'
AND 'weekly-financial-report' = ANY(newsletters);

-- Count by newsletter type
SELECT unnest(newsletters) as newsletter, COUNT(*) as count
FROM subscribers WHERE status = 'active'
GROUP BY newsletter;
```

---

## 🔧 Adding More Admins

1. Go to **Vercel → Settings → Environment Variables**
2. Update `ADMIN_EMAILS`:
   ```
   yangfan@hotmail.com,colleague@wisewin.ca
   ```
3. **Redeploy**

---

## 🚪 Logging Out

Sessions expire automatically after 24 hours. To force logout, clear browser cookies for the site domain.
