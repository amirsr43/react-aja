// src/data/docsData.jsx
import React from "react";
import ProfileCard from "../components/ui/ProfileCard";
import { profileCardCode } from "./codes/profileCard";

export const docsData = {
  "introduction": {
    id: "introduction",
    title: "Introduction",
    description: "Welcome to ReactAja. A collection of premium, copy-paste UI components and animation designs for React projects.",
    category: "Getting Started",
    isGuide: true,
    content: (
      <div className="guide-content">
        <p className="guide-p">
          ReactAja is a catalog of highly polished, responsive, and customizable user interface components and micro-animations built with <strong>React</strong>, <strong>Tailwind CSS</strong>, and <strong>Vanilla CSS</strong>.
        </p>
        <p className="guide-p">
          Simply copy the code templates, customize the presets directly in the documentation view, and paste them straight into your project's component tree.
        </p>
        
        <h3 className="guide-subtitle">Why Choose ReactAja?</h3>
        <ul className="guide-list">
          <li><strong>Zero Dependency Lock-in:</strong> Copy and paste components directly. No bloat in your <code className="text-white bg-zinc-900 px-1 py-0.5 rounded text-xs">node_modules</code>.</li>
          <li><strong>Tailwind & Vanilla CSS Options:</strong> Select your preferred styling framework with a single click.</li>
          <li><strong>Interactive Theme Customizer:</strong> Tweak colors and content directly on the documentation pages and export your tailored component code instantly.</li>
        </ul>
      </div>
    )
  },

  "installation": {
    id: "installation",
    title: "Installation",
    description: "How to add components directly to your React project.",
    category: "Getting Started",
    isGuide: true,
    content: (
      <div className="guide-content">
        <h3 className="guide-subtitle">1. Copy and Paste Components</h3>
        <p className="guide-p">
          All components in this library are copy-paste. You do not need to install an npm package! Simply select the code style you prefer (JS/TS, CSS/Tailwind) from the documentation, copy it, and paste it directly into your codebase.
        </p>

        <h3 className="guide-subtitle">2. Setup Tailwind CSS (Optional)</h3>
        <p className="guide-p">
          If you plan to use the Tailwind CSS version of the components, make sure Tailwind CSS is installed in your project and your content paths in <code className="text-white bg-zinc-900 px-1 py-0.5 rounded text-xs">tailwind.config.js</code> cover your source files:
        </p>
        <pre className="p-3 bg-zinc-900 rounded-md text-zinc-100 text-xs overflow-x-auto">
{`/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}`}
        </pre>

        <h3 className="guide-subtitle">3. Import and Render</h3>
        <p className="guide-p">
          Import the component locally using relative paths:
        </p>
        <pre className="p-3 bg-zinc-900 rounded-md text-zinc-100 text-xs overflow-x-auto">
{`import ProfileCard from "./components/ui/ProfileCard";

export default function App() {
  return (
    <div>
      <ProfileCard />
    </div>
  );
}`}
        </pre>
      </div>
    )
  },

  "profile-card": {
    id: "profile-card",
    title: "Profile Card",
    description: "A premium interactive profile card with a clean dark theme, smooth hover height transitions for the cover photo, and a reactive verified badge.",
    category: "UI Animations",
    isGuide: false,
    preview: (
      <div style={{ display: "flex", justifyContent: "center", padding: "20px 0" }}>
        <ProfileCard />
      </div>
    ),
    code: profileCardCode.code,
    css: profileCardCode.css
  }
};

export const docsCategories = [
  {
    title: "Getting Started",
    items: [
      { id: "introduction", name: "Introduction" },
      { id: "installation", name: "Installation" }
    ]
  },
  {
    title: "UI Components",
    items: [
      // Add your component items here
    ]
  },
  {
    title: "UI Animations",
    items: [
      { id: "profile-card", name: "Profile Card" }
    ]
  }
];
