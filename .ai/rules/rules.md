# RULES – Frontend Vibe Coding (Mobile POS)

## AUTO-APPLY INSTRUCTIONS
🚨 **AI AGENT: Apply these rules AUTOMATICALLY when:**
- Writing ANY React components
- Creating new pages or components  
- Reviewing existing code
- Optimizing performance
- Handling state management
- Designing UI/UX

**Always check against these rules before writing code.**

---

## 0. Goal

Build a **mobile-first Staff POS web app** for store employees (Cashier / Manager).

Principles:

- Fast delivery
- Clear rules > complex architecture
- Frontend-only scope
- Optimized for AI-assisted (vibe) coding
- No over-engineering
- Mobile web first (tablet compatible)

---

## 1. Fixed Tech Stack (DO NOT CHANGE)

- Framework: ReactJS + Vite
- Language: TypeScript
- Styling: TailwindCSS + shadcn/ui
- State management: Zustand
- Data fetching: Axios
- Form handling: react-hook-form
- Validation: Zod (or equivalent schema-based validation)
- Icons: shadcn icons (Hugeicons set)
- Modal system: shadcn Dialog
- QR Scan: external QR scanning library
- Testing: ❌ No unit tests required

AI MUST NOT introduce:

- Redux
- React Query / SWR
- Next.js
- i18n libraries
- Desktop-first layout

---

## 2. Device & Layout Rules

- Target device: **Mobile Web**
- Tablet supported
- Desktop layout NOT required
- Main layout: **Card-based UI**
- Transaction list MUST be card-style (not table)
- One-hand usage friendly
- Bottom navigation is always visible (when logged in)

---

## 3. Authentication Rules (CRITICAL)

### 3.1 Auth Mechanism

- Cookie-based session
- No token storage in localStorage
- Session lifecycle is fully managed by backend

### 3.2 Definition of Logged-in

User is considered **logged-in** ONLY when:

- Login API succeeded
- Backend created a valid session (cookie)
- Session is NOT expired
- Session is associated with a valid role

> Logged-in = valid backend session

---

### 3.3 App Load Flow

On **every app load**:

1. Call `GET /me`
2. Handle response:

| `/me` response | Behavior                                                        |
| -------------- | --------------------------------------------------------------- |
| 200            | Set global auth state (user, role) → redirect to allowed screen |
| 401            | Clear auth state → redirect to `/login`                         |

Rules:

- `/me` is ALWAYS called on app load
- No silent login
- No refresh session
- No refresh token flow

---

### 3.4 Session Expiry Handling

If **ANY API** returns `401` during app usage:

- Clear auth state
- Redirect to `/login`
- Optional toast: “Session expired, please login again”

---

### 3.5 Remember Me

- Only affects backend session duration
- Does NOT change frontend logic
- If session exists → `/me` returns 200
- If expired → `/me` returns 401 → login again

---

## 4. Role & Permission Rules

### 4.1 Role Source

- Role is retrieved from `GET /me`

### 4.2 Role Types

- Staff
- Manager

### 4.3 Permission Rules

| Feature          | Staff | Manager |
| ---------------- | ----- | ------- |
| Home             | ✅    | ✅      |
| Transaction list | ❌    | ✅      |
| Edit transaction | ❌    | ✅      |
| Void transaction | ❌    | ✅      |
| Dashboard        | ❌    | ✅      |

---

## 5. Navigation Rules

### 5.1 Bottom Navigation Tabs

- Home
- Transaction
- Dashboard

Rules:

- Tabs are **hidden** if user does not have permission
- No disabled tabs
- No navigation guard popups

---

## 6. Transaction Rules

### 6.1 Transaction List

- Card-based layout only
- Each card shows:
  - Staff name
  - Customer name
  - Email
  - Bill amount
  - Date
  - Status (Completed / Voided)

### 6.2 Search

- Search by customer name or email
- If no result → show Empty UI (not toast)

---

### 6.3 Edit Transaction

- Manager only
- One-step flow:
  - Enter PIN → call API
- Uses modal dialog
- Validation:
  - Frontend validation required
  - Backend validation assumed

---

### 6.4 Void Transaction

- Manager only
- One-step flow:
  - Enter PIN → call API
- After successful void:
  - Reload transaction list
- No optimistic update

---

## 7. PIN Rules (VERY IMPORTANT)

- PIN is **never stored**
- PIN is used **one-time per action**
- PIN is required for:
  - Edit transaction
  - Void transaction
  - Access manager-only areas

If PIN is revoked or changed by admin:

- Backend returns 401
- Frontend treats as session expired
- Force logout

---

## 8. Modal Rules

- Use shadcn Dialog
- Modal stacking is allowed but should be minimized
- Avoid more than 2 stacked modals
- Closing modal must NOT persist sensitive data (PIN)

---

## 9. Offline & Error Handling

### 9.1 Offline Handling

- Axios retry: **3 times**
- If still failing:
  - Show offline dialog
  - Allow manual retry

### 9.2 Error Display

- Validation errors: inline form messages
- API errors: toast or dialog (context-based)

---

## 10. Branding Rules

- Branding is loaded **before login**
- If branding data is missing:
  - Use FE mock
- If branding load fails:
  - Fallback to default Treubär logo
- Logo, favicon, primary color are runtime-configurable
- No hard-coded branding in components
- **Priority: ALWAYS use configured branding colors (brand-\*) defined in tailwind.config.js for all UI elements.** Avoid using arbitrary hex codes in components.

---

## 11. Validation Rules

- Frontend validation is REQUIRED
- Backend validation is assumed
- Use:
  - react-hook-form
  - Zod (or equivalent)

Frontend validation scope:

- Required fields
- Format validation
- Basic range checks

---

## 12. Data Fetching Rules

- Use Axios only
- No data-fetching abstraction layers
- API errors must be handled explicitly
- No silent failures

---

## 13. Scope Constraints

- Frontend-only
- No admin panel
- Manager source is deployed separately
- No shared routing or codebase with admin app
- No unit tests
- No i18n

---

## 14. Coding Style Rules (For AI)

- Prefer simple components over abstraction
- Avoid generic “BaseComponent” patterns
- Explicit is better than clever
- Keep files small and focused
- One component = one responsibility

---

## 15. Non-Goals

- Desktop optimization
- SEO
- Animations-heavy UI
- Complex caching strategies
- Offline-first architecture

---

END OF RULES
