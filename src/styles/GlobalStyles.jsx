const GlobalStyles = ({ dark }) => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800;900&family=DM+Sans:wght@300;400;500;600&display=swap');

    *, *::before, *::after { box-sizing: border-box; }
    html { scroll-behavior: smooth; }

    :root {
      --bg: ${dark ? "#0a0a0f" : "#ffffff"};
      --surface: ${dark ? "#111118" : "#f8f8fc"};
      --surface-2: ${dark ? "#18181f" : "#f0f0f8"};
      --border: ${dark ? "#ffffff12" : "#e4e4f0"};
      --text: ${dark ? "#f0f0ff" : "#0a0a1a"};
      --muted: ${dark ? "#6b6b8a" : "#6b6b8a"};
      --accent: #7c3aed;
      --accent-bg: ${dark ? "#7c3aed15" : "#7c3aed10"};
      --accent-subtle: ${dark ? "#7c3aed35" : "#7c3aed30"};
      --nav-bg: ${dark ? "rgba(10,10,15,0.85)" : "rgba(255,255,255,0.85)"};
    }

    body {
      margin: 0;
      font-family: 'DM Sans', sans-serif;
      background: var(--bg);
      color: var(--text);
      transition: background 0.3s ease, color 0.3s ease;
    }

    ::selection { background: #7c3aed33; }
    ::-webkit-scrollbar { width: 6px; }
    ::-webkit-scrollbar-track { background: var(--bg); }
    ::-webkit-scrollbar-thumb { background: var(--border); border-radius: 3px; }
  `}</style>
);

export default GlobalStyles;