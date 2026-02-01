# **Lendsqr Frontend Engineering Assessment**

A **pixel-accurate frontend implementation** of the Lendsqr Admin Console assessment built with **Next.js, React, TypeScript, and SCSS**.

This project reproduces the required Figma screens and implements authentication flow, dashboard views, user listing, and user details with persistent storage, API mocking, caching, and unit testing.

---

## **Live Demo**

🔗 **Deployed App:**
`https://<candidate-name>-lendsqr-fe-test.<platform-domain>`

---

## **Figma Design**

🎨 **Design Reference:**
[https://www.figma.com/file/ZKILoCoIoy1IESdBpq3GNC/FrontendTesting](https://www.figma.com/file/ZKILoCoIoy1IESdBpq3GNC/FrontendTesting)

---

## **Features Implemented**

### **Authentication**

- Login page with pixel-perfect UI
- Form validation using **react-hook-form + Yup**
- Responsive design (mobile, tablet, desktop)
- Auth protection using `AuthGuard`

### **Dashboard**

- Summary cards
- Sidebar navigation
- Fully responsive layout

### **Users Page**

- Fetches **500 mock user records**
- Table built with **@tanstack/react-table**
- Column sorting implemented
- Global search
- Column filters grouped inside a dropdown (instead of per-column filters for better UX)
- Pagination
- Status indicators

> 🔍 **Design decision:**
> The Figma design places filters in every column.
> I replaced this with:
>
> - Sorting on each column
> - A centralized **filter dropdown** beside the global search
>
> This improves usability, reduces visual clutter, and maintains functional parity.

### **User Details Page**

- Reads user data from **localStorage**
- Persistent across refresh
- Matches Figma layout and spacing
- Tabs for different user information sections

---

## **Mock API**

The project includes an **optional internal API layer** using Next.js route handlers.

### **Available Endpoints**

```http
GET /api/users
GET /api/users/:id
```

### **Implementation**

- Located in: `app/api/users`
- Returns mocked data based on Figma structure
- Supports individual user retrieval
- Used by React Query for caching and state management

---

## **Tech Stack**

### **Core**

- **Next.js (App Router)**
- **React**
- **TypeScript**

### **Styling**

- **SCSS Modules**
- BEM-style naming
- Fully responsive layouts

### **Forms & Validation**

- **react-hook-form**
- **Yup**

### **State & Data**

- **@tanstack/react-query** (data fetching & caching)
- **localStorage** for persistence

### **UI & Utilities**

- **@tanstack/react-table**
- **@radix-ui/react-dropdown-menu**
- **@radix-ui/react-slot**
- **clsx**

### **Testing**

- **Vitest**
- **@testing-library/react**
- Unit tests with positive & negative scenarios

---

## **Project Structure**

```txt
src/
├── app/
│   ├── (auth)/
│   ├── (dashboard)/
│   ├── api/
│   │   └── users/
│   └── layout.tsx
│
├── components/
│   ├── icons/
│   └── ui/
│       ├── Button/
│       │   ├── Button.tsx
│       │   ├── Button.test.tsx
│       │   ├── Button.module.scss
│       │   └── index.ts
│       ├── TextField/
│       ├── Table/
│       ├── Dropdown/
│       └── AuthGuard/
│
├── context/
│   └── AuthContext.tsx
│
├── hooks/
├── lib/
├── services/
├── styles/
├── @types/
└── tests/
```

---

## **Architecture Notes**

### **Why Next.js App Router**

- File-based routing for clarity
- Server-ready architecture
- API routes colocated with UI

### **UI Component Design**

- Components are **fully isolated**
- Each UI component contains:
  - Logic
  - Styles (SCSS Module)
  - Tests

### **State & Data Strategy**

- Server data handled via **React Query**
- Client state kept minimal
- Persistent data stored in localStorage

### **Scalability**

- Feature-based folder grouping
- Reusable UI primitives
- Predictable naming conventions

---

## **Testing Strategy**

- Unit tests for:
  - UI components
  - Auth guard behavior
  - Table sorting and rendering

- Positive and negative test cases
- Mocked Next.js router and context providers
- Designed to mirror production-ready testing patterns

---

## **Video Review (Required)**

🎥 **Loom Video (≤ 3 minutes)**

In the video:

- I compare the Figma design directly with the implemented UI
- I explain architectural and UX decisions
- I demonstrate responsiveness
- I show the Users table, filters, and data persistence
- My face is visible throughout the recording, including during screen sharing

🔗 **Loom video link**

---

## **Submission Checklist**

✅ Pixel-perfect UI
✅ TypeScript used throughout
✅ SCSS Modules
✅ Mock API implementation
✅ Unit tests (positive & negative)
✅ Clean Git history
✅ Public repository (`lendsqr-fe-test`)
✅ Deployed application
✅ Loom video walkthrough
