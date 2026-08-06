import React from "react";
import CodeHighlight from "../../components/ui/CodeHighlight";

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
      <CodeHighlight
        code={`/** @type {import('tailwindcss').Config} */
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
        language="javascript"
        className="code-pre-element p-3 bg-zinc-900 rounded-md text-xs"
      />

      <h3 className="guide-subtitle">3. Import and Render</h3>
      <p className="guide-p">
        Import the component locally using relative paths:
      </p>
      <CodeHighlight
        code={`import ProfileCard from "./components/ui/components/ProfileCard";

export default function App() {
  return (
    <div>
      <ProfileCard />
    </div>
  );
}`}
        language="jsx"
        className="code-pre-element p-3 bg-zinc-900 rounded-md text-xs"
      />
    </div>
  )
};
