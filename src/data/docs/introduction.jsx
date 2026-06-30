import React from "react";

export const introductionDoc = {
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
};
