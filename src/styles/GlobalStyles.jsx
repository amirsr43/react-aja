// src/styles/GlobalStyles.jsx
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=DM+Sans:wght@300;400;500;600&display=swap');

    *, *::before, *::after { box-sizing: border-box; }
    html { scroll-behavior: smooth; }

    :root {
      --bg:            #f8fafc;
      --surface:       #ffffff;
      --surface-2:     #f1f5f9;
      --surface-3:     #e2e8f0;
      --border:        #e2e8f0;
      --border-glow:   rgba(42, 107, 242, 0.08);
      --text:          #0f172a;
      --muted:         #64748b;
      --accent:        #2a6bf2;
      --accent-2:      #4a78ee;
      --accent-bg:     rgba(42, 107, 242, 0.05);
      --accent-subtle: rgba(42, 107, 242, 0.08);
      --glow-blue:     rgba(42, 107, 242, 0.06);
      --glow-indigo:   rgba(74, 120, 238, 0.04);
      --nav-bg:        rgba(248, 250, 252, 0.8);
      --card-bg:       rgba(255, 255, 255, 0.8);
      --gradient-hero: linear-gradient(180deg, #f1f5f9 0%, #f8fafc 100%);
    }

    body {
      margin: 0;
      font-family: 'Inter', 'DM Sans', sans-serif;
      background: var(--bg);
      color: var(--text);
      transition: background 0.3s ease, color 0.3s ease;
      background-image: radial-gradient(ellipse at 15% 15%, rgba(42, 107, 242, 0.05) 0%, transparent 45%),
                        radial-gradient(ellipse at 85% 75%, rgba(74, 120, 238, 0.04) 0%, transparent 45%);
    }

    ::selection { background: rgba(42, 107, 242, 0.15); }
    ::-webkit-scrollbar { width: 6px; }
    ::-webkit-scrollbar-track { background: var(--bg); }
    ::-webkit-scrollbar-thumb { background: rgba(42, 107, 242, 0.12); border-radius: 3px; }
    ::-webkit-scrollbar-thumb:hover { background: rgba(42, 107, 242, 0.25); }
  `}</style>
);

export default GlobalStyles;