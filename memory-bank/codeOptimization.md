# Code Optimization Rules

This file outlines the guidelines and best practices for optimizing application code, with a focus on rendering efficiency, image handling, memory management, network performance, and data fetching strategies.

---

## 1. Rendering Optimization

- **Minimize Unnecessary Re-renders**

  - Use `React.memo` (functional components) or `PureComponent` (class components) to prevent re-renders when inputs haven't changed.
  - Avoid passing new inline functions or objects as props—use `useCallback` or `useMemo` to memoize them.
  - Be cautious with deeply nested objects and arrays as props; use shallow equality and stable references.
  - Ensure components receive only the props they need—excess or unrelated props can trigger re-renders even if unused.

- **Efficient List Rendering**

  - Use `FlatList`, `SectionList`, or `FlashList` instead of `ScrollView` for long lists.
  - `FlashList` (from Shopify) is preferred for very large lists due to its view recycling strategy.

- **Lazy Load Non-Essential Components**

  - Use `React.lazy` to defer loading of infrequently used components.
  - Ideal for screen-level components not required at app startup.

- **Avoid Heavy Computation During Render**

  - Move expensive operations outside the render cycle.
  - Memoize computed values using `useMemo`.

- **Avoid Module Side Effects**
  - Ensure components or modules don't introduce side effects during import (e.g., global mutations or subscriptions).

---

## 2. Image Optimization

- **Resize Images Ahead of Time**

  - Include pre-scaled images to reduce runtime processing.

- **Use Efficient Formats**

  - Prefer `WebP` or `PNG` over `JPEG` for better compression and quality.

- **Enable Image Caching**

  - Use libraries like `react-native-fast-image` to leverage advanced caching.

- **Lazy Load Images**

  - Load images only when they enter the viewport.

- **Use Placeholders**
  - Display low-res placeholders while high-res images load.

---

## 3. Network Request Optimization

- **Batch Network Requests**

  - Combine related requests into a single payload where possible.

- **Cache Responses**

  - Implement caching to reduce redundant fetches.

- **Compress Payloads**
  - Apply compression, especially for large datasets or multimedia content.

---

## 4. React Query Best Practices

- **Use Query Keys Effectively**

  - Use structured, stable query keys (arrays with consistent identifiers) to enable reliable caching and invalidation.

- **Cache Strategically**

  - Set appropriate `staleTime` and `cacheTime` for queries based on how frequently data changes.

- **Pre-Fetch for Navigation**

  - Use `queryClient.prefetchQuery` to warm up data before navigating to a screen that depends on it.

- **Paginate and Infinite Scroll**

  - For large lists, use `useInfiniteQuery` instead of loading everything at once.

- **Disable Refetching When Unnecessary**

  - Use `enabled: false` to turn off queries that should only run conditionally.

- **Invalidate with Purpose**

  - Use `queryClient.invalidateQueries` precisely, targeting only affected queries to avoid unnecessary re-fetching.

- **Hydrate for SSR**

  - When using SSR or static generation, ensure query state is properly hydrated on the client.

- **Centralize Fetch Functions**
  - Keep fetch logic in dedicated modules to promote reusability and consistency.

---

## 5. Memory Management

- **Avoid Memory Leaks**
  - Clean up timers, subscriptions, and event listeners during component unmount.

---

## 6. State Management

- **Use Jotai for Global State**

  - Keep global state minimal and scoped via atoms where possible.

- **Return Only Necessary Data**
  - When exporting from custom hooks or modules, expose only what the consuming component needs.
  - Use named objects instead of arrays to improve clarity and future-proof interfaces.
