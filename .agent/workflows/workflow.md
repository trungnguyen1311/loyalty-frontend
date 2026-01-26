# WORKFLOW – Staff POS Frontend (Mobile-first)

This document describes **screen-by-screen workflows** and **user journeys** for the Staff POS web app.

---

## 1. App Bootstrap Flow

### 1.1 App Load

1. App loads
2. Call `GET /me`
3. Handle response:
   - 200:
     - Set auth state (store info, role)
     - Load branding
     - Redirect to Home
   - 401:
     - Clear auth state
     - Redirect to `/login`

---

## 2. Store Login Flow

### 2.1 Store Login Screen

- User selects Store from active store list
- User enters Store password
- Validation:
  - Password ≥ 8 characters
  - Must contain letters + numbers

### 2.2 Login Success

- Backend creates cookie-based session
- Redirect directly to **Home**
- No staff selection at this step

### 2.3 Force Logout

- If admin changes store password OR triggers force logout:
  - Backend invalidates all sessions
  - Next API call returns 401
  - Frontend:
    - Clear auth
    - Redirect to `/login`

---

## 3. Home Flow (Customer Identification)

### 3.1 Entry Methods

Staff can start a transaction via:

- Manual input:
  - Email OR Voucher code (only one allowed)
- QR Scan

### 3.2 Manual Check-in Rules

- Only ONE field allowed:
  - Email OR Voucher
- If both filled → frontend validation error
- Button "Next" enabled only when input is valid

---

## 4. QR Scan Flow

1. Staff scans customer QR code
2. QR scan result:
   - Contains customer identification info
3. Frontend calls customer identify API if needed
4. If QR invalid / expired:
   - Show error toast
   - Stay on scan screen

---

## 5. Transaction Configuration Flow

### 5.1 Transaction Config Screen

Displays:

- Customer info
- Wallet points
- Available vouchers (only 1 selectable)
- Point slider

Rules:

- Only ONE voucher can be applied per transaction
- Max points are provided by backend response
- Slider cannot exceed backend-defined limit

Actions:

- Cancel → clear temp data → back to Home
- Next → open Bill & PIN modal

---

## 6. Bill Entry & Authentication

### 6.1 Bill & PIN Modal

Inputs:

- Bill amount
- Staff PIN (6 digits, numeric only)

PIN rules:

- PIN is unique per Store
- PIN is validated using composite key:
  - Store_ID (from session context)
  - PIN (user input)
- PIN is never stored on frontend

### 6.2 Next Action

- On Next:
  - Call `POST /transactions/calculate`
- If calculate fails:
  - Show error
  - Stay in modal

---

## 7. Confirmation Flow (Discount Calculator)

Displays:

- Voucher discount
- Points spent
- Total discount
- Net payable
- Earning forecast

Action:

- "Mark transaction as complete"

---

## 8. Transaction Completion Flow

1. Staff clicks "Mark transaction as complete"
2. Call `POST /transactions`
3. Backend performs:
   - Spend points
   - Redeem voucher
   - Earn new points
   - Record revenue
4. On success:
   - Show success message
   - Redirect to Home
5. If user cancels or navigates back:
   - No data is persisted

---

## 9. Transaction List Flow (Manager Only)

### 9.1 Access Control

- Manager only
- PIN required on first access

### 9.2 Layout by Device

- Mobile:
  - Card-based list
  - Infinite scroll
- Tablet:
  - Table layout
  - Pagination

### 9.3 View Transaction

- Click "eye" icon
- Open transaction detail in modal

---

## 10. Edit / Void Transaction Flow

### 10.1 Edit

- Manager only
- One-step flow:
  - Enter PIN → call API
- After success:
  - Reload transaction list

### 10.2 Void

- Manager only
- One-step flow:
  - Enter PIN → call API
- After success:
  - Reload transaction list

---

## 11. Dashboard Flow (Manager Only)

### 11.1 Access

- Manager only
- PIN required

### 11.2 Filters

- Daily / Weekly / Monthly / Yearly
- Date or date range

Rule:

- Every filter change → call API again
- No client-side aggregation

### 11.3 Charts

- Bar charts based on API response
- X-axis depends on selected range
- Y-axis scale adapts to max value

---

END OF WORKFLOW
