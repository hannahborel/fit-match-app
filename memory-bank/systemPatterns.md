# System Patterns

This file documents recurring patterns and technical standards used in the Fluent project.

## Stack

- React Native (with Expo)
- Next.js 15 (App Router)
- React 19
- React Query (TanStack Query v5)
- Jotai for global state
- React Hook Form
- React Native Paper (theming and UI components)
- Clerk (authentication)
- Drizzle ORM for schema definition and database access

---

## Architectural Principles

- **Modular Structure:** Code is organized into clearly scoped domains: `components/`, `hooks/`, `features/`, `atoms/`, and `screens/`.
- **Minimal Global State:** Global state is scoped and managed using Jotai atoms, with preference for colocated state where possible.
- **Data Fetching:** Use React Query for all server interactions, with caching, loading, and error management handled via query status.
- **Forms:** Use React Hook Form for all form inputs. Validation logic should be declared inline or using custom validators where appropriate.
- **Custom Hooks:** Encapsulate business logic in reusable hooks (`useCampaignStatus`, `useImpersonation`, etc.). Hooks should return clearly named values or objects.
- **Navigation:** Use `expo-router` for organizing screens and navigation in React Native.

---

## React Query Patterns

- Always define your queries in a central place (`lib/queries` or `hooks/queries`) using descriptive keys.
- Use `queryClient.invalidateQueries` after mutations to keep cache in sync.
- Use `enabled`, `select`, and `staleTime` for fine control over query execution and transformation.
- Handle optimistic updates in mutations via `onMutate` and `onError`.

---

## Custom Hook Patterns

- Name hooks clearly (e.g., `useCampaignState`, not `useData`).
- Return objects with named fields for flexibility and forward compatibility.
- Keep side effects minimal or isolated in `useEffect`.
- Co-locate hooks with the features that use them unless truly reusable.

---

## Jotai Patterns

- Define atoms in a flat structure under `atoms/`.
- Use derived atoms (via `atomFamily` or `selectAtom`) for scoped reads.
- Prefer primitive atoms and compose where needed.
- Never mutate atom values directly; always use the setter (`set(myAtom, updaterFn)`).

---

## Component Structure

- UI components go in `components/ui/`.
- Feature components live under `features/{domain}/`.
- Screens are organized in `screens/` or handled via routes in `app/`.
- Keep components focused: presentation and logic should be separated via container/presenter or hook/component pattern.

---

## Form Patterns

- Use React Hook Form for all form logic.
- Define default values and use `Controller` for controlled components.
- Use inline validation or shared helpers (e.g., `isEmailValid`, `isNonEmpty`).
- Display validation errors using `<HelperText>` from React Native Paper.

---

## API & Mutations

- Server mutations (e.g., contract updates, deliverable submissions) should:
  - Be abstracted into hooks like `useUpdateContract`.
  - Return a `{ success, error }` object.
  - Trigger query invalidation or local updates post-success.

---

## Refactor & Consistency Practices

- Keep hooks and form handlers consistent across feature types (e.g., contracts, deliverables).
- Always co-locate new logic unless it’s reused across multiple features.
- Avoid generic props like `data`, `item`, or `onAction`; prefer named, specific interfaces.
- Rename components/hooks/files when their purpose changes significantly.
