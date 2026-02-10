import React from "react";
import { NavLink, Route, Routes } from "react-router-dom";
import StandingsPage from "./pages/Standings";
import MatchesPage from "./pages/Matches";
import KnockoutPage from "./pages/Knockout";
import AdminPage from "./pages/Admin";

export default function App() {
  return (
    <>
      <div className="nav">
        <div className="brand">⚽ eFootball Dashboard</div>
        <div className="navlinks">
          <NavLink to="/" className={({isActive}) => "pill" + (isActive ? " active" : "")}>Standings</NavLink>
          <NavLink to="/matches" className={({isActive}) => "pill" + (isActive ? " active" : "")}>Matches</NavLink>
          <NavLink to="/knockout" className={({isActive}) => "pill" + (isActive ? " active" : "")}>Knockout</NavLink>
          <NavLink to="/admin" className={({isActive}) => "pill" + (isActive ? " active" : "")}>Admin</NavLink>
        </div>
      </div>

      <Routes>
        <Route path="/" element={<StandingsPage />} />
        <Route path="/matches" element={<MatchesPage />} />
        <Route path="/knockout" element={<KnockoutPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </>
  );
}
