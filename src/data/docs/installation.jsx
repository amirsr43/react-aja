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
        Choose a component, copy its source, and save it in your project. React and React DOM should already be installed in your app. Each component page lists the additional packages its copied source needs, along with an install command.
      </p>

      <h3 className="guide-subtitle">2. Install Component Dependencies</h3>
      <p className="guide-p">
        Install only the packages required by the components you use. Most animated examples use Framer Motion, and examples with icons use Lucide React. If you use examples that need both, run:
      </p>
      <CodeHighlight
        code="npm install framer-motion lucide-react"
        language="bash"
        className="code-pre-element p-3 bg-zinc-900 rounded-md text-xs"
      />
      <p className="guide-p">
        You do not need to install both for every component. Use the per-component install command shown beside its dependencies. Components with no dependencies need no additional package.
      </p>

      <h3 className="guide-subtitle">3. Set Up Tailwind CSS (Optional)</h3>
      <p className="guide-p">
        Use the Tailwind version of a component only if Tailwind CSS is configured in your app. For a Vite project with Tailwind CSS v4, install the Vite plugin:
      </p>
      <CodeHighlight
        code="npm install tailwindcss @tailwindcss/vite"
        language="bash"
        className="code-pre-element p-3 bg-zinc-900 rounded-md text-xs"
      />
      <p className="guide-p">
        Add the plugin to <code className="text-white bg-zinc-900 px-1 py-0.5 rounded text-xs">vite.config.js</code> and import Tailwind in the stylesheet already loaded by your app:
      </p>
      <CodeHighlight
        code={`import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
});`}
        language="javascript"
        className="code-pre-element p-3 bg-zinc-900 rounded-md text-xs"
      />
      <CodeHighlight
        code={`@import "tailwindcss";`}
        language="css"
        className="code-pre-element p-3 bg-zinc-900 rounded-md text-xs"
      />

      <h3 className="guide-subtitle">4. Import and Render</h3>
      <p className="guide-p">
        Save the copied source as a local component, then import it using its relative path:
      </p>
      <CodeHighlight
        code={`import ProfileCard from "./ProfileCard";

export default function App() {
  return (
    <ProfileCard />
  );
}`}
        language="jsx"
        className="code-pre-element p-3 bg-zinc-900 rounded-md text-xs"
      />
    </div>
  )
};
