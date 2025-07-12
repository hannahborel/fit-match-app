# Memory Bank Usage Rules

This document outlines how and when to use each file within the `memory-bank`.

---

### 1. `codeOptimization.md`

**Purpose:** To establish best practices for performance optimization across rendering, image handling, memory usage, and network communication.

**When to use:**

- **Before optimizing a feature or screen:** Reference this file to guide improvements that reduce re-renders, improve image and network efficiency, and manage memory properly.
- **During code reviews:** Use as a checklist to catch common anti-patterns that impact performance.
- **When troubleshooting:** If a component or screen is slow, revisit this file to ensure it follows key optimization strategies.

---

### 1. `productContext.md`

**Purpose:** To provide a high-level overview of the project, its goals, and the product vision.

**When to use:**

- **Before starting any new task:** Consult this file first to understand the overall business goals, brand voice, and key features.
- **When making strategic decisions:** Use this file to ensure your work aligns with the core product vision.
- **To understand the "why":** This file explains the reasoning behind the project's existence and objectives.

---

---

### 2. `systemPatterns.md`

**Purpose:** To document the technical standards, architecture, and recurring coding patterns for the project.

**When to use:**

- **Before writing any code:** Always check this file for established patterns, preferred libraries, and architectural principles (e.g., server actions, component structure).
- **During implementation:** Refer to this file to ensure consistency in coding style, form handling, schema definitions, and state management.
- **To understand the "how":** This file provides the technical blueprint for building the application correctly and consistently.
