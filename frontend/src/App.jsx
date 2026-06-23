import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";

import CursorGlow from "./components/CursorGlow";
import ScrollProgress from "./components/ScrollProgress";
import PageTransition from "./components/PageTransition";
import Particles from "./components/Particles";
import AILoading from "./components/AILoading";

export default function App() {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  const prevPath = useRef(location.pathname);
  const isFirstLoad = useRef(true);

  useEffect(() => {
    // 🚫 skip first load (page refresh)
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      prevPath.current = location.pathname;
      return;
    }

    // 🚫 if same path (refresh edge cases), don't trigger
    if (prevPath.current === location.pathname) return;

    prevPath.current = location.pathname;

    setLoading(true);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <>
      <Particles />
      <CursorGlow />
      <ScrollProgress />

      {loading ? (
        <AILoading />
      ) : (
        <PageTransition key={location.pathname}>
          <Routes location={location}>
            <Route path="/" element={<Landing />} />
            <Route path="/app" element={<Dashboard />} />
          </Routes>
        </PageTransition>
      )}
    </>
  );
}