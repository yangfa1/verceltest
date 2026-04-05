# API Reference

Base URL: `https://verceltest-umber.vercel.app`

All API routes return JSON. POST requests accept `Content-Type: application/json`.

---

## Public Endpoints

### `POST /api/subscribe`

Subscribe an email to one or more newsletters.

**Request:**
```json
{
  "email": "user@example.com",
  "newsletters": ["weekly-financial-report", "market-forecast"]
}
```

> `newsletters` values must match `folder_name` values in the `newsletter_types` table.

**Success Response `200`:**
```json
{
  "message": "We've sent a verification link to user@example.com. Please check your inbox!"
}
```

**Error Responses:**
```json
{ "error": "Email and at least one newsletter required." }   // 400
{ "error": "Something went wrong. Please try again." }       // 500
```

---

### `POST /api/unsubscribe`

Unsubscribe an email from all newsletters.

**Request:**
```json
{ "email": "user@example.com" }
```

**Success Response `200`:**
```json
{ "message": "You've been unsubscribed from all Wise Win newsletters." }
```

---

### `GET /api/verify?token=<uuid>`

Verify a subscriber's email via token from verification email.

- Redirects to `/verify?success=1` on success
- Redirects to `/verify?error=invalid` if token is invalid/expired

---

### `GET /api/unsubscribe-link?token=<uuid>`

One-click unsubscribe from a newsletter email footer link.

- Redirects to `/?unsubscribe=success` on success
- Redirects to `/?unsubscribe=notfound` if not found

---

### `GET /api/newsletter-types`

Get all active newsletter types (used by the subscribe form).

**Response `200`:**
```json
{
  "types": [
    {
      "id": "uuid",
      "friendly_name": "Weekly Financial Report",
      "folder_name": "weekly-financial-report",
      "description": "Comprehensive market analysis every Monday morning"
    }
  ]
}
```

---

## Send Newsletter Endpoint

### `POST /api/send-newsletter`

Triggered by GitHub Actions to send a newsletter to all active subscribers.

**Auth:** `Authorization: Bearer <NEWSLETTER_SEND_TOKEN>`

**Request:**
```json
{
  "folder_name": "market-forecast",
  "date": "2026-04-07",
  "html": "<full email HTML string>"
}
```

**Success Response `200`:**
```json
{
  "message": "Newsletter sent successfully.",
  "subject": "Market Forecast — Apr 7, 2026",
  "sent": 42,
  "failed": 0
}
```

**Error Responses:**
```json
{ "error": "Unauthorized" }                                          // 401
{ "error": "folder_name, date, and html are required." }            // 400
{ "error": "Newsletter type \"market-forecast\" not found." }       // 404
```

---

## Admin Endpoints

All admin endpoints require a valid `ww_admin_session` JWT cookie.

### `POST /api/admin/login`
Request admin magic link. Always returns neutral message.

### `GET /api/admin/verify?token=<uuid>`
Validate magic link, set session cookie, redirect to `/admin`.

### `GET /api/admin/stats`
Subscriber statistics + 10 most recent subscribers.

### `GET /api/admin/subscribers?status=all&page=1`
Paginated subscriber list. Status: `all`, `active`, `pending`, `inactive`.

### `GET /api/admin/newsletter-types`
List all newsletter types (including inactive).

### `POST /api/admin/newsletter-types`
Create a new newsletter type.

**Request:**
```json
{
  "friendly_name": "Crypto Watch",
  "folder_name": "crypto-watch",
  "description": "Weekly crypto market overview"
}
```

### `PATCH /api/admin/newsletter-types/:id`
Update friendly_name, description, or active status.

### `DELETE /api/admin/newsletter-types/:id`
Delete a newsletter type.
