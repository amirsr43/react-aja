import React from "react";

export const installationDoc = {
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
        {`import ProfileCard from "./components/ui/components/ProfileCard";

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
};
