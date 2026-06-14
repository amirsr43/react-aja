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
      --radial-1:      rgba(42, 107, 242, 0.05);
      --radial-2:      rgba(74, 120, 238, 0.04);
    }

    [data-theme='dark'] {
      --bg:            #0b0f19;
      --surface:       #111827;
      --surface-2:     #172033;
      --surface-3:     #1e293b;
      --border:        #1e293b;
      --border-glow:   rgba(99, 102, 241, 0.15);
      --text:          #f8fafc;
      --muted:         #94a3b8;
      --accent:        #3d7fff;
      --accent-2:      #6366f1;
      --accent-bg:     rgba(99, 102, 241, 0.08);
      --accent-subtle: rgba(99, 102, 241, 0.12);
      --glow-blue:     rgba(99, 102, 241, 0.08);
      --glow-indigo:   rgba(139, 92, 246, 0.06);
      --nav-bg:        rgba(11, 15, 25, 0.8);
      --card-bg:       rgba(17, 24, 39, 0.8);
      --gradient-hero: linear-gradient(180deg, #111827 0%, #0b0f19 100%);
      --radial-1:      rgba(99, 102, 241, 0.08);
      --radial-2:      rgba(139, 92, 246, 0.06);
    }

    body {
      margin: 0;
      font-family: 'Inter', 'DM Sans', sans-serif;
      background: var(--bg);
      color: var(--text);
      transition: background 0.3s ease, color 0.3s ease;
      background-image: radial-gradient(ellipse at 15% 15%, var(--radial-1) 0%, transparent 45%),
                        radial-gradient(ellipse at 85% 75%, var(--radial-2) 0%, transparent 45%);
    }

    ::selection { background: rgba(42, 107, 242, 0.15); }
    ::-webkit-scrollbar { width: 6px; }
    ::-webkit-scrollbar-track { background: var(--bg); }
    ::-webkit-scrollbar-thumb { background: rgba(42, 107, 242, 0.12); border-radius: 3px; }
    ::-webkit-scrollbar-thumb:hover { background: rgba(42, 107, 242, 0.25); }
  `}</style>
);

export default GlobalStyles;