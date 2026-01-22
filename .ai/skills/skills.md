# SKILLS – AI Vibe Coding Guide

This file defines what AI SHOULD and SHOULD NOT do while coding.

---

## 1. Architectural Skills

AI SHOULD:

- Follow screen-based workflow strictly
- Respect mobile-first design
- Prefer explicit logic over abstraction
- Keep business logic readable

AI MUST NOT:

- Introduce new auth flows
- Add refresh token logic
- Share logic with admin source
- Optimize prematurely

---

## 2. State Management Skills

AI SHOULD:

- Use Zustand for:
  - Auth state
  - UI state
- Keep store flat and simple

AI MUST NOT:

- Use Redux or Context-heavy patterns
- Store sensitive data (PIN)

---

## 3. API Handling Skills

AI SHOULD:

- Call APIs explicitly
- Handle 401 globally → logout
- Retry failed requests up to 3 times

AI MUST NOT:

- Swallow API errors
- Retry infinitely

---

## 4. Form & Validation Skills

AI SHOULD:

- Use react-hook-form + Zod
- Validate inputs before API calls
- Show inline validation errors

AI MUST NOT:

- Rely only on backend validation
- Allow submitting invalid forms

---

## 5. PIN Handling Skills (CRITICAL)

AI MUST:

- Treat PIN as one-time input
- Never store PIN in state or storage
- Clear PIN on modal close
- Always send PIN with Store context implicitly

AI MUST NOT:

- Cache PIN
- Reuse PIN across actions

---

## 6. UI & UX Skills

AI SHOULD:

- Use shadcn Dialog for modals
- Limit modal stacking
- Use card UI for mobile
- Use table UI only for tablet

AI MUST NOT:

- Render desktop-only layouts
- Hide errors silently

---

## 7. Navigation Skills

AI SHOULD:

- Hide unauthorized tabs
- Redirect immediately on auth change

AI MUST NOT:

- Show disabled tabs
- Allow access then block later

---

## 8. Error & Offline Skills

AI SHOULD:

- Show empty UI when no data
- Show offline dialog after retries fail

AI MUST NOT:

- Crash on network errors
- Leave user without feedback

---

## 9. Dashboard Skills

AI SHOULD:

- Always fetch fresh data on filter change
- Render charts from API response only

AI MUST NOT:

- Aggregate or fake dashboard data

---

## 10. Coding Style Skills

AI SHOULD:

- Keep components small
- Use descriptive names
- Write predictable JSX

AI MUST NOT:

- Create generic base components
- Overuse custom hooks unnecessarily

---

END OF SKILLS
