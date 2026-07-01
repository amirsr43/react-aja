// src/styles/GlobalStyles.jsx
const GlobalStyles = () => (
  <style>{`
    *, *::before, *::after { box-sizing: border-box; }
    html { scroll-behavior: smooth; }

    :root {
      --bg:            #000000;
      --surface:       #0a0a0a;
      --surface-2:     #121212;
      --surface-3:     #1a1a1a;
      --border:        rgba(255, 255, 255, 0.08);
      --border-glow:   rgba(255, 255, 255, 0.12);
      --text:          #ffffff;
      --muted:         #8e8e93;
      --accent:        #ffffff;
      --accent-2:      #a1a1aa;
      --accent-bg:     rgba(255, 255, 255, 0.08);
      --accent-subtle: rgba(255, 255, 255, 0.05);
      --glow-blue:     rgba(255, 255, 255, 0.03);
      --glow-indigo:   rgba(255, 255, 255, 0.02);
      --nav-bg:        rgba(0, 0, 0, 0.75);
      --card-bg:       rgba(10, 10, 10, 0.7);
      --gradient-hero: radial-gradient(circle at top, #121212 0%, #000000 100%);
      --radial-1:      rgba(255, 255, 255, 0.04);
      --radial-2:      rgba(255, 255, 255, 0.02);
    }

    body {
      margin: 0;
      font-family: 'Inter', 'Space Grotesk', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: var(--bg);
      color: var(--text);
      transition: background 0.3s ease, color 0.3s ease;
      position: relative;
      overflow-x: hidden;
    }

    /* Accessible keyboard focus ring — visible only when using keyboard */
    :focus-visible {
      outline: 2px solid rgba(167, 139, 250, 0.8);
      outline-offset: 2px;
      border-radius: 4px;
    }

    /* Remove focus ring for mouse users */
    :focus:not(:focus-visible) {
      outline: none;
    }

    /* Radial glow background */
    body::before {
      content: '';
      position: fixed;
      inset: 0;
      background-image:
        radial-gradient(circle at 50% -20%, rgba(255, 255, 255, 0.06) 0%, transparent 60%),
        radial-gradient(circle at 15% 15%, var(--radial-1) 0%, transparent 45%),
        radial-gradient(circle at 85% 75%, var(--radial-2) 0%, transparent 45%);
      pointer-events: none;
      z-index: 0;
    }

    /* Modern subtle grid pattern */
    body::after {
      content: '';
      position: fixed;
      inset: 0;
      background-image: 
        linear-gradient(to right, rgba(255, 255, 255, 0.02) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
      background-size: 48px 48px;
      pointer-events: none;
      z-index: 0;
    }

    #root { position: relative; z-index: 1; }

    ::selection { background: rgba(255, 255, 255, 0.2); color: #ffffff; }
    ::-webkit-scrollbar { width: 6px; }
    ::-webkit-scrollbar-track { background: var(--bg); }
    ::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.15); border-radius: 3px; }
    ::-webkit-scrollbar-thumb:hover { background: rgba(255, 255, 255, 0.3); }
  `}</style>
);

export default GlobalStyles;