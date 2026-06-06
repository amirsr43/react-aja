// src/components/CodePreview.jsx
import { useState, useEffect, useRef } from "react";
import { Terminal, Check } from "lucide-react";

const FILES = {
  "App.jsx": {
    lang: "JSX",
    editable: false,
    code: `import { useState } from "react";
import GlobalStyles from "./styles/GlobalStyles";
import Navbar from "./components/Navbar";
import CodePreview from "./components/CodePreview";
import TemplatesSection from "./components/TemplatesSection";

function App() {
  const [dark, setDark] = useState(true);

  return (
    <>
      <GlobalStyles dark={dark} />
      <Navbar
        dark={dark}
        toggleDark={() => setDark(!dark)}
      />
      <CodePreview />
      <TemplatesSection />
    </>
  );
}

export default App;`,
  },
  "GlobalStyles.js": {
    lang: "JS",
    editable: false,
    code: `const GlobalStyles = ({ dark }) => (
  <style>{\`
    :root {
      --bg: \${dark ? "#0a0a0f" : "#ffffff"};
      --surface: \${dark ? "#111118" : "#f8f8fc"};
      --border: \${dark ? "#ffffff12" : "#e4e4f0"};
      --text: \${dark ? "#f0f0ff" : "#0a0a1a"};
      --muted: \${dark ? "#6b6b8a" : "#6b6b8a"};
      --accent: #7c3aed;
    }
    body {
      margin: 0;
      font-family: 'DM Sans', sans-serif;
      background: var(--bg);
      color: var(--text);
    }
  \`}</style>
);

export default GlobalStyles;`,
  },
};

const COLORS = {
  cm: "#374151", kw: "#c084fc", fn: "#818cf8",
  tg: "#f472b6", at: "#fbbf24", st: "#86efac",
  op: "#67e8f9", nm: "#fb923c", pl: "#e0e0ff",
};

function esc(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function tokenize(code) {
  return code.split("\n").map((line) => {
    let html = "";
    let i = 0;
    const L = line.length;
    while (i < L) {
      if (line[i] === "/" && line[i + 1] === "/") {
        html += `<span style="color:${COLORS.cm}">${esc(line.slice(i))}</span>`;
        break;
      }
      const kws = ["import", "export", "default", "from", "const", "let", "var", "return", "function", "=>"];
      let matched = false;
      for (const kw of kws) {
        if (line.startsWith(kw, i) && !/\w/.test(line[i + kw.length] || "")) {
          html += `<span style="color:${COLORS.kw}">${kw}</span>`;
          i += kw.length;
          matched = true;
          break;
        }
      }
      if (matched) continue;
      if (line[i] === '"' || line[i] === "'" || line[i] === "`") {
        const q = line[i];
        let j = i + 1;
        while (j < L && line[j] !== q) j++;
        html += `<span style="color:${COLORS.st}">${esc(line.slice(i, j + 1))}</span>`;
        i = j + 1;
        continue;
      }
      if (line[i] === "<" && /[A-Za-z\/]/.test(line[i + 1] || "")) {
        let j = i + 1;
        while (j < L && line[j] !== ">" && line[j] !== " ") j++;
        html += `<span style="color:${COLORS.tg}">${esc(line.slice(i, j))}</span>`;
        i = j;
        continue;
      }
      if (/[0-9]/.test(line[i]) && (i === 0 || !/\w/.test(line[i - 1]))) {
        let j = i;
        while (j < L && /[0-9.]/.test(line[j])) j++;
        html += `<span style="color:${COLORS.nm}">${esc(line.slice(i, j))}</span>`;
        i = j;
        continue;
      }
      if (/[{}()\[\];,<>=+\-*\/|&!?:]/.test(line[i])) {
        html += `<span style="color:${COLORS.op}">${esc(line[i])}</span>`;
        i++;
        continue;
      }
      if (/[A-Z]/.test(line[i])) {
        let j = i;
        while (j < L && /\w/.test(line[j])) j++;
        html += `<span style="color:${COLORS.fn}">${esc(line.slice(i, j))}</span>`;
        i = j;
        continue;
      }
      html += `<span style="color:${COLORS.pl}">${esc(line[i])}</span>`;
      i++;
    }
    return html;
  });
}

const S = {
  wrapper: {
    maxWidth: "1000px",
    margin: "0 auto",
    padding: "0 24px",
    width: "100%",
    boxSizing: "border-box",
  },
  root: {
    borderRadius: "14px",
    border: "1px solid var(--border)",
    background: "var(--surface)",
    overflow: "hidden",
    boxShadow: "0 0 0 1px #7c3aed18, 0 32px 64px rgba(0,0,0,0.5)",
  },
  titlebar: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "10px 16px",
    borderBottom: "1px solid var(--border)",
    background: "var(--surface-2)",
    flexWrap: "wrap",
  },
  tabsContainer: {
    display: "flex",
    gap: "2px",
    marginLeft: "12px",
    flexWrap: "wrap",
    flex: 1,
  },
  tab: (active) => ({
    padding: "4px 13px",
    fontSize: 12,
    fontFamily: "monospace",
    borderRadius: "6px 6px 0 0",
    cursor: "pointer",
    color: active ? "var(--text)" : "var(--muted)",
    border: active ? "1px solid var(--border)" : "1px solid transparent",
    borderBottom: "none",
    background: active ? "var(--surface)" : "transparent",
    transition: "all .15s",
    whiteSpace: "nowrap",
  }),
  iconBtn: (copied) => ({
    background: "transparent",
    border: `1px solid ${copied ? "#4ade80" : "var(--border)"}`,
    borderRadius: "6px",
    padding: "4px 12px",
    color: copied ? "#4ade80" : "var(--muted)",
    cursor: "pointer",
    fontSize: 12,
    display: "flex",
    alignItems: "center",
    gap: 6,
    fontFamily: "monospace",
    transition: "all .15s",
    whiteSpace: "nowrap",
  }),
  codePane: {
    fontFamily: "monospace",
    fontSize: 12.5,
    lineHeight: 1.8,
    padding: "14px",
    overflow: "auto",
    maxHeight: "600px",
  },
  statusbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "5px 16px",
    background: "#0a0a0e",
    borderTop: "1px solid var(--border)",
    fontSize: 11,
    fontFamily: "monospace",
    color: "#3a3a60",
    flexWrap: "wrap",
    gap: "8px",
  },
  badge: {
    background: "#7c3aed15",
    color: "var(--accent)",
    padding: "2px 8px",
    borderRadius: 4,
    fontSize: 11,
    border: "1px solid #7c3aed30",
  },
};

export default function CodePreview() {
  const [currentFile, setCurrentFile] = useState("App.jsx");
  const [codes, setCodes] = useState(() =>
    Object.fromEntries(Object.entries(FILES).map(([k, v]) => [k, v.code]))
  );
  const [displayedCode, setDisplayedCode] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [copied, setCopied] = useState(false);
  const [lineCount, setLineCount] = useState(1);
  const typingRef = useRef(null);

  const file = FILES[currentFile];

  // Typing animation untuk semua file (read-only)
  useEffect(() => {
    if (typingRef.current) clearInterval(typingRef.current);
    const code = codes[currentFile];
    let idx = 0;
    setDisplayedCode("");
    setIsTyping(true);
    typingRef.current = setInterval(() => {
      idx++;
      setDisplayedCode(code.slice(0, idx));
      setLineCount(code.slice(0, idx).split("\n").length);
      if (idx >= code.length) {
        clearInterval(typingRef.current);
        setIsTyping(false);
      }
    }, 16);
    return () => clearInterval(typingRef.current);
  }, [currentFile]);

  function copyCode() {
    navigator.clipboard.writeText(codes[currentFile]).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  const tokenizedLines = tokenize(displayedCode);

  return (
    <div style={S.wrapper}>
      <div style={S.root}>
        {/* Titlebar */}
        <div style={S.titlebar}>
          <div style={{ display: "flex", gap: 6 }}>
            {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
              <span key={c} style={{ width: 11, height: 11, borderRadius: "50%", background: c, display: "inline-block" }} />
            ))}
          </div>
          <div style={S.tabsContainer}>
            {Object.keys(FILES).map((f) => (
              <button
                key={f}
                style={S.tab(f === currentFile)}
                onClick={() => setCurrentFile(f)}
                onMouseEnter={(e) => {
                  if (f !== currentFile) {
                    e.currentTarget.style.background = "var(--surface-3)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (f !== currentFile) {
                    e.currentTarget.style.background = "transparent";
                  }
                }}
              >
                {f}
              </button>
            ))}
          </div>
          <div>
            <button
              style={S.iconBtn(copied)}
              onClick={copyCode}
              onMouseEnter={(e) => {
                if (!copied) {
                  e.currentTarget.style.background = "var(--surface-3)";
                }
              }}
              onMouseLeave={(e) => {
                if (!copied) {
                  e.currentTarget.style.background = "transparent";
                }
              }}
            >
              {copied ? <Check size={12} /> : <Terminal size={12} />}
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>

        {/* Read-only code dengan typing animation */}
        <div style={S.codePane}>
          {tokenizedLines.map((toks, i) => (
            <div key={i} style={{ display: "flex", alignItems: "baseline", borderRadius: 3, padding: "0 3px" }}>
              <span style={{ minWidth: 26, color: "#3a3a55", fontSize: 11, userSelect: "none", textAlign: "right", marginRight: 14 }}>
                {i + 1}
              </span>
              <span dangerouslySetInnerHTML={{ __html: toks }} />
              {isTyping && i === tokenizedLines.length - 1 && (
                <span style={{
                  display: "inline-block", width: 2, height: "1em",
                  background: "var(--accent)", marginLeft: 1, verticalAlign: "text-bottom",
                  animation: "cursorBlink .8s infinite",
                }} />
              )}
            </div>
          ))}
          <style>{`@keyframes cursorBlink{0%,100%{opacity:1}50%{opacity:0}}`}</style>
        </div>

        {/* Statusbar */}
        <div style={S.statusbar}>
          <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
            <span style={S.badge}>{file.lang}</span>
            <span>Ln {lineCount}</span>
          </div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <span>UTF-8</span>
            <span>Prettier</span>
          </div>
        </div>
      </div>
    </div>
  );
}