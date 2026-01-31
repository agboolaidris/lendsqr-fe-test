# 🏦 Lendsqr Frontend Engineering Assessment

A pixel-accurate frontend implementation of the **Lendsqr Admin Console assessment** built with **Next.js, React, TypeScript, and SCSS**.

This project reproduces the required Figma screens and implements authentication flow, dashboard views, user listing, and user details with persistent storage and unit testing.

---

# 🚀 Features

- ✅ Pixel-accurate UI based on provided Figma design
- ✅ Authentication flow (login + guarded routes)
- ✅ Dashboard layout and sidebar navigation
- ✅ Users listing table with sorting & UI states
- ✅ User details page with stored data retrieval
- ✅ Persistent browser storage support
- ✅ Reusable UI component system
- ✅ Schema-based form validation
- ✅ Unit tests with Vitest + Testing Library
- ✅ SCSS module styling
- ✅ Type-safe architecture

---

# 🧰 Tech Stack

- **Next.js (App Router)**
- **React**
- **TypeScript**
- **SCSS Modules**
- **Vitest**
- **React Testing Library**
- **React Hook Form**
- **Yup**
- **@tanstack/react-table**
- **clsx**

---

# 📂 Project Structure

```
src/
│
├── app/
│   ├── (auth)/
│   │   └── login/
│   │
│   ├── (dashboard)/
│   │   ├── users/
│   │   └── layout.tsx
│   │
│   ├── api/                # optional mock API routes
│   │   └── users/
│   │       ├── route.ts        → GET /api/users
│   │       └── [id]/route.ts   → GET /api/users/:id
│   │
│   └── layout.tsx
│
├── components/
│   ├── icons/
│   │
│   └── ui/
│       ├── Button/
│       │   ├── index.ts
│       │   ├── Button.tsx
│       │   ├── Button.test.tsx
│       │   └── Button.module.scss
│       │
│       └── TextField/
│           ├── index.ts
│           ├── TextField.tsx
│           ├── TextField.test.tsx
│           └── TextField.module.scss
│
├── context/
│   └── AuthContext.tsx
│
├── hooks/
├── services/
├── lib/
├── styles/
├── @types/
└── tests/
```

---

# 🏗 Architecture Notes

This project follows a **feature-driven + layered architecture** to ensure scalability, testability, and separation of concerns.

## 🔹 1. App Router Structure

Next.js App Router is used to separate major application areas:

- `(auth)` — authentication pages (login)
- `(dashboard)` — protected dashboard routes
- `api` — optional mock API endpoints

This keeps routing concerns clean and makes layout sharing easier.

---

## 🔹 2. Component Architecture

UI components are designed using a **design-system approach**:

```
components/ui → reusable, generic UI primitives
components/icons → icon-only components
```

Each UI component is self-contained:

```
Button/
  Button.tsx
  Button.module.scss
  Button.test.tsx
  index.ts
```

This provides:

- Encapsulation
- Test proximity
- Style isolation
- Easy reuse

---

## 🔹 3. Styling Strategy

- SCSS Modules used for **style isolation**
- No global CSS leakage
- Component-scoped styling
- Shared tokens placed in `/styles`
- Conditional styling handled with `clsx`

Why SCSS Modules:

- Matches assessment requirement
- Predictable scoping
- Easier maintenance at scale

---

## 🔹 4. State & Context

Global auth state is handled with:

```
context/AuthContext.tsx
```

Responsibilities:

- User session state
- Loading state
- Login/logout handlers
- Storage persistence

Protected routing handled via:

```
AuthGuard component
```

This ensures:

- Centralized auth logic
- Clean page components
- Testable guard behavior

---

## 🔹 5. Data Layer

A service abstraction layer is used:

```
services/
```

Responsibilities:

- Fetch users
- Fetch user by ID
- Transform API responses
- Mock fallback support

Optional Next.js API routes:

```
GET /api/users
GET /api/users/:id
```

This allows:

- Mock API simulation
- Local testing without external dependency
- Easy swap to real backend

---

## 🔹 6. Forms & Validation

Forms use:

- React Hook Form → performance & ergonomics
- Yup → schema validation

Benefits:

- Declarative validation
- Type-safe form schemas
- Minimal re-renders
- Clear error handling

---

## 🔹 7. Table System

Users table built with:

```
@tanstack/react-table
```

Reasons:

- Headless architecture
- Sorting support
- Custom cell rendering
- Flexible column definitions
- Testable logic layer

---

## 🔹 8. Type Safety

Types are centralized:

```
@types/
```

Includes:

- User types
- API response types
- Context types
- Component prop types

This avoids:

- Inline type duplication
- Unsafe mocks in tests
- Inconsistent shapes

---

## 🔹 9. Testing Strategy

Testing uses:

- Vitest
- React Testing Library

Coverage includes:

- UI components
- Guard behavior
- Positive scenarios
- Negative scenarios
- Loading states
- Redirect behavior

Tests live close to components to improve maintainability.

---

## 🔹 10. Performance Considerations

- App Router layouts reduce re-renders
- React Hook Form minimizes form renders
- Table logic separated from UI
- Memoized column definitions where needed
- SCSS modules avoid runtime style computation

---

# 🔐 Authentication

- Login form with validation
- AuthContext manages session
- AuthGuard protects dashboard routes
- Redirect on unauthenticated access
- Session stored in browser storage

---

# 👥 Users Module

## Users List

- Sortable table
- Status badges
- Custom render cells
- Responsive layout

## User Details

- Dedicated detail view
- Data persisted in storage
- Retrieved without refetch when available

---

# 🧪 Testing

Run tests:

```bash
npm run test
```

Includes:

- Component tests
- Guard tests
- Render tests
- Interaction tests

---

# 💾 Data Handling

Supports:

- Mock JSON dataset (500 records)
- Optional API routes
- localStorage persistence

---

# ▶️ Getting Started

Install:

```bash
npm install
```

Run dev:

```bash
npm run dev
```

Build:

```bash
npm run build
```

Start:

```bash
npm run start
```

---

# ✅ Assessment Goals Met

- Pixel fidelity
- Type safety
- SCSS usage
- Test coverage
- Clean architecture
- Component reuse
- Accessibility-conscious markup
- Responsive design
