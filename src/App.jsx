import { useState, useEffect, lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import LoadingScreen from "./components/ui/animations/LoadingScreen";

// Lazy load pages — these are code-split into separate chunks at build time
const Home = lazy(() => import("./pages/Home"));
const Docs = lazy(() => import("./pages/Docs"));

// Minimal fallback shown while lazy chunks are downloading
function PageFallback() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#000000",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      aria-hidden="true"
    />
  );
}

function AppContent() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  // Initial mount load — 600ms agar tidak terlalu lama block LCP
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setIsFirstLoad(false);
    }, 600);
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
    }, 400);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <LoadingScreen
            isFirstLoad={isFirstLoad}
            key={location.pathname + (isFirstLoad ? "-first" : "-transition")}
          />
        )}
      </AnimatePresence>

      <Suspense fallback={<PageFallback />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/docs" element={<Navigate to="/docs/introduction" replace />} />
          <Route path="/docs/:docId" element={<Docs />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
      <Analytics />
      <SpeedInsights />
    </BrowserRouter>
  );
}

export default App;