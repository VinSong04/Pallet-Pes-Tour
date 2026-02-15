import React, { useState, useEffect, useRef } from "react";
import { NavLink, Route, Routes, useLocation } from "react-router-dom";
import { useAppState } from "./state/AppState";
import HomePage from "./pages/Home";
import StandingsPage from "./pages/Standings";
import MatchesPage from "./pages/Matches";
import KnockoutPage from "./pages/Knockout";
import AdminPage from "./pages/Admin";
import palletLogo from "./assets/pallet.jpg";

const NAV_ITEMS = [
  { to: "/", label: "Home", icon: "🏠", end: true },
  { to: "/standings", label: "Standings", icon: "📊" },
  { to: "/matches", label: "Matches", icon: "🎮" },
  { to: "/knockout", label: "Knockout", icon: "🏆" },
  { to: "/admin", label: "Admin", icon: "⚙️" },
];

export default function App() {
  const { isLoading, usingFirebase } = useAppState();
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "dark");
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  // Close menu on outside click
  useEffect(() => {
    function handleClick(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    }
    if (menuOpen) {
      document.addEventListener("mousedown", handleClick);
      return () => document.removeEventListener("mousedown", handleClick);
    }
  }, [menuOpen]);

  // Lock body scroll when menu open on mobile
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return (
    <>
      <nav className="nav" role="navigation" aria-label="Main navigation" ref={menuRef}>
        <div className="brand">
          <img src={palletLogo} alt="Logo" className="brand-logo" />
          Pallet Pes Tour
        </div>

        {/* Hamburger Button (mobile only) */}
        <button
          className="hamburger"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
        >
          <span className={`hamburger-bar ${menuOpen ? "open" : ""}`} />
          <span className={`hamburger-bar ${menuOpen ? "open" : ""}`} />
          <span className={`hamburger-bar ${menuOpen ? "open" : ""}`} />
        </button>

        {/* Overlay for mobile */}
        {menuOpen && <div className="nav-overlay" onClick={() => setMenuOpen(false)} />}

        <div className={`navlinks ${menuOpen ? "navlinks-open" : ""}`}>
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) => "pill" + (isActive ? " active" : "")}
              onClick={() => setMenuOpen(false)}
            >
              <span className="nav-icon">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}

          {usingFirebase && (
            <div
              className="pill"
              style={{
                cursor: 'default',
                background: 'rgba(52, 211, 153, 0.1)',
                border: '1px solid var(--good)',
                color: 'var(--good)',
                fontSize: '11px',
                padding: '6px 10px'
              }}
              title="Real-time sync enabled via Firebase"
            >
              <span style={{ marginRight: 4 }}>🔥</span>
              Live Sync
            </div>
          )}

          <button
            className="pill theme-toggle"
            onClick={toggleTheme}
            title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            aria-label="Toggle theme"
          >
            <span className="theme-icon">{theme === "dark" ? "☀️" : "🌙"}</span>
          </button>
        </div>
      </nav>

      {isLoading && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          background: 'var(--accent)',
          color: 'white',
          padding: '8px',
          textAlign: 'center',
          fontSize: '13px',
          zIndex: 9999
        }}>
          🔥 Loading tournament data from Firebase...
        </div>
      )}

      <main className="page-transition" key={location.pathname}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/standings" element={<StandingsPage />} />
          <Route path="/matches" element={<MatchesPage />} />
          <Route path="/knockout" element={<KnockoutPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </main>
    </>
  );
}