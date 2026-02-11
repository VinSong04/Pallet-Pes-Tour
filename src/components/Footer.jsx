import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer className="site-footer">
            <div className="footer-glow" />
            <p style={{ fontWeight: 700, fontSize: 15 }}>
                ⚽ Pallet Pes Tour © 2026
            </p>
            <p className="small">Built with passion for eFootball</p>
            <div className="footer-links">
                <Link to="/">Home</Link>
                <Link to="/standings">Standings</Link>
                <Link to="/matches">Matches</Link>
                <Link to="/knockout">Knockout</Link>
                <Link to="/admin">Admin</Link>
            </div>
        </footer>
    );
}
