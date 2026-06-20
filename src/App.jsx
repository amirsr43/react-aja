import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Docs from "./pages/Docs";
import Maintenance from "./pages/Maintenance";
import { IS_MAINTENANCE, BYPASS_KEY } from "./config";

function App() {
  const [bypassed, setBypassed] = useState(() => {
    return localStorage.getItem("maintenance_bypass") === "true";
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const bypassParam = params.get("bypass");
    const lockParam = params.get("lock");

    if (bypassParam === BYPASS_KEY) {
      localStorage.setItem("maintenance_bypass", "true");
      setBypassed(true);
      // Clean url parameter to keep it neat
      window.history.replaceState({}, document.title, window.location.pathname);
    } else if (lockParam === "true") {
      localStorage.removeItem("maintenance_bypass");
      setBypassed(false);
      // Clean url parameter
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  if (IS_MAINTENANCE && !bypassed) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Maintenance />} />
        </Routes>
      </BrowserRouter>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/docs" element={<Navigate to="/docs/introduction" replace />} />
        <Route path="/docs/:docId" element={<Docs />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;