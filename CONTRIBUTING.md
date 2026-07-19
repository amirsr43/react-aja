# Contributing Guide

Thank you for your interest in contributing to **ReactAja**! This project aims to provide high-quality UI components and animations for React that are ready to copy and paste directly into any project.

Follow the step-by-step guide below to get started.

---

## 1. Getting Started

### Step 1: Fork the Repository
Fork this repository to your own GitHub account by clicking the **Fork** button in the top-right corner of the main GitHub page.

### Step 2: Clone Locally
Open your terminal and clone the forked repository to your machine:
```bash
git clone https://github.com/USERNAME/react-aja.git
cd react-aja
```
*(Replace `USERNAME` with your GitHub username)*

### Step 3: Set Up Your Development Environment

You can run the development server using one of the two following methods:

#### Option A: Using Docker (Recommended)
If you have Docker installed, simply run the following command to install dependencies and start the server automatically:
```bash
docker compose up
```
The development website will be available at [http://localhost:5173](http://localhost:5173).

#### Option B: Using Local Node.js
If you prefer to run without Docker, make sure Node.js is installed, then run:
```bash
npm install
npm run dev
```

---

## 2. Git Workflow

1. Create a new branch from the `main` branch before writing any code. Use a descriptive and structured branch name:
   ```bash
   git checkout -b feat/component-name
   # or for bug fixes
   git checkout -b fix/bug-name
   ```
2. Always write clear and descriptive commit messages. Using the *Conventional Commits* format is recommended:
   - `feat(components): add modern button component`
   - `fix(docs): fix typo on the installation page`

---

## 3. Component & Animation Rules

All new components must be placed in the appropriate directory under `src/components/ui/`:

- **Static / Interactive UI Components**: Place in `src/components/ui/components/`
- **Animation Components**: Place in `src/components/ui/animations/`

### Component Code Requirements:
- Use modern functional React with Hooks.
- Code must be clean, modular, and have easily customizable props.
- If the component uses additional dependencies (such as `framer-motion` or `lucide-react`), ensure those dependencies are already listed in `package.json`.

---

## 4. Adding a Documentation Page

For your new component to appear in the documentation website's sidebar, you must register it:

### Step 1: Create the Documentation Data
Open the `src/data/docs/` folder:
- If it's a regular component, edit `src/data/docs/componentsData.jsx`.
- If it's an animation, edit `src/data/docs/animationsData.jsx`.

Add a new data entry for your component using the following object format:

```javascript
export const componentsDocs = {
  // ... existing entries
  "component-name": {
    id: "component-name",
    title: "Component Name",
    description: "A brief description of what your component does.",
    category: "UI Components",
    dependencies: [
      { name: "lucide-react", url: "https://lucide.dev" }
    ],
    // List the supported props to be displayed in the props table
    props: [
      { name: "text", type: "string", default: '"Click Me"', desc: "Button label text" },
      { name: "onClick", type: "function", default: "undefined", desc: "Click event handler" }
    ],
    // Provide JS/TS versions with CSS/Tailwind variants
    code: {
      js: {
        css: `// React component code (JavaScript) using CSS Stylesheet`,
        tailwind: `// React component code (JavaScript) using Tailwind CSS`
      },
      ts: {
        css: `// React component code (TypeScript) using CSS Stylesheet`,
        tailwind: `// React component code (TypeScript) using Tailwind CSS`
      }
    },
    // If using the CSS option, include the CSS stylesheet source here
    css: `.button-custom-style { ... }`
  }
};
```

### Step 2: Register in the Sidebar
Open the file `src/data/docsData.jsx`. Register your component's id into the `docsCategories` array under the appropriate category so its link automatically appears in the left navigation bar:

```javascript
export const docsCategories = [
  // ...
  {
    title: "UI Components",
    id: "ui-components",
    items: [
      // ...
      { id: "component-name", name: "New Component Name" } // Register here
    ]
  }
];
```

---

## 5. Testing & Verification

Before submitting your contribution, make sure:

1. The development server runs without any errors in the browser console.
2. The production build compiles successfully:
   ```bash
   npm run build
   ```

---

## 6. Submitting a Pull Request (PR)

1. Push your feature branch to your forked repository on GitHub:
   ```bash
   git push origin feat/component-name
   ```
2. Open the original **ReactAja** repository on GitHub. You will see a **Compare & pull request** pop-up button.
3. Create a new Pull Request and describe:
   - What the component does.
   - Why this component is useful for ReactAja users.
   - Attach a screenshot or GIF of the component if possible.
4. Our team will review your code and provide feedback before merging it into the main branch.
