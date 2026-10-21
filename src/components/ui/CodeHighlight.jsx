// src/components/ui/CodeHighlight.jsx
import { useState, useEffect } from "react";
import { createHighlighter } from "shiki";
import { createJavaScriptRegexEngine } from "shiki/engine/javascript";

let highlighterPromise = null;

// Singleton to ensure Shiki is initialized only once across all component mounts
function getHighlighter() {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: ["github-dark"],
      langs: ["javascript", "typescript", "css", "html", "jsx", "tsx", "bash"],
      engine: createJavaScriptRegexEngine(),
    });
  }
  return highlighterPromise;
}

// Simple HTML escaping fallback
function escapeHtml(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export default function CodeHighlight({ code, language, className = "", ...props }) {
  const [highlighted, setHighlighted] = useState(null);

  // Normalize shorthand languages used in components to Shiki identifiers
  const lang = (() => {
    if (!language) return "javascript";
    const l = language.toLowerCase().trim();
    if (l === "js" || l === "jsx") return "jsx";
    if (l === "ts" || l === "tsx") return "tsx";
    if (l === "css") return "css";
    if (l === "html") return "html";
    return l;
  })();
  const normalizedCode = code || "";
  const loading = !highlighted || highlighted.code !== normalizedCode || highlighted.lang !== lang;

  useEffect(() => {
    let active = true;

    getHighlighter()
      .then((highlighter) => {
        if (!active) return;
        try {
          const highlightedHtml = highlighter.codeToHtml(normalizedCode, {
            lang,
            theme: "github-dark",
          });
          setHighlighted({ code: normalizedCode, lang, html: highlightedHtml });
        } catch (err) {
          console.error("Shiki highlighting error:", err);
          // Fallback to simple unhighlighted pre/code block
          setHighlighted({
            code: normalizedCode,
            lang,
            html: `<pre class="code-pre-element"><code>${escapeHtml(normalizedCode)}</code></pre>`,
          });
        }
      })
      .catch((err) => {
        console.error("Failed to load Shiki highlighter:", err);
        if (active) {
          setHighlighted({
            code: normalizedCode,
            lang,
            html: `<pre class="code-pre-element"><code>${escapeHtml(normalizedCode)}</code></pre>`,
          });
        }
      });

    return () => {
      active = false;
    };
  }, [normalizedCode, lang]);

  if (loading) {
    return (
      <pre className={`code-pre-element loading-code-pre ${className}`} {...props}>
        <code>{normalizedCode}</code>
      </pre>
    );
  }

  return (
    <div
      className={`shiki-highlight-wrapper ${className}`}
      dangerouslySetInnerHTML={{ __html: highlighted.html }}
      {...props}
    />
  );
}
