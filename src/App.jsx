import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Analytics } from "@vercel/analytics/react";
import Home from "./pages/Home";
import Docs from "./pages/Docs";
import LoadingScreen from "./components/ui/LoadingScreen";

function AppContent() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  // Initial mount load
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setIsFirstLoad(false);
    }, 1500); // 1.5s for initial welcome screen
    return () => clearTimeout(timer);
  }, []);

  // Track page transitions (only trigger for Home page)
  useEffect(() => {
    if (isFirstLoad) return;

    // Only show transition loader when navigating to the Home page ('/')
    if (location.pathname !== "/") return;

    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 700); // 0.7s for page transitions

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <LoadingScreen isFirstLoad={isFirstLoad} key={location.pathname + (isFirstLoad ? "-first" : "-transition")} />
        )}
      </AnimatePresence>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/docs" element={<Navigate to="/docs/introduction" replace />} />
        <Route path="/docs/:docId" element={<Docs />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
      <Analytics />
    </BrowserRouter>
  );
}

export default App;