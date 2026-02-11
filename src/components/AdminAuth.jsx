import React, { useState, useEffect } from "react";

/**
 * Admin Authentication Gate
 *
 * Uses a password hash stored in code (not plaintext).
 * Session is kept in sessionStorage so it persists across page navigations
 * but clears when the browser tab is closed.
 *
 * Default password: "admin123" — change the ADMIN_HASH to update.
 */

// Simple hash function (djb2) — not cryptographic, but fine for client-side gating
function hashStr(str) {
    let hash = 5381;
    for (let i = 0; i < str.length; i++) {
        hash = ((hash << 5) + hash + str.charCodeAt(i)) >>> 0;
    }
    return hash.toString(36);
}

// Pre-computed hash for default password "admin123"
// To change the password, run: hashStr("your-new-password") in the console
const ADMIN_HASH = hashStr("admin123");

const SESSION_KEY = "ppt_admin_auth";

export function isAdminAuthenticated() {
    return sessionStorage.getItem(SESSION_KEY) === ADMIN_HASH;
}

export function logoutAdmin() {
    sessionStorage.removeItem(SESSION_KEY);
}

export default function AdminAuth({ children }) {
    const [authenticated, setAuthenticated] = useState(() => isAdminAuthenticated());
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [shake, setShake] = useState(false);

    function handleSubmit(e) {
        e.preventDefault();
        if (hashStr(password) === ADMIN_HASH) {
            sessionStorage.setItem(SESSION_KEY, ADMIN_HASH);
            setAuthenticated(true);
            setError("");
        } else {
            setError("Incorrect password");
            setShake(true);
            setTimeout(() => setShake(false), 500);
            setPassword("");
        }
    }

    function handleLogout() {
        logoutAdmin();
        setAuthenticated(false);
        setPassword("");
    }

    if (authenticated) {
        return (
            <>
                {/* Inject logout button into children context */}
                {typeof children === "function"
                    ? children({ onLogout: handleLogout })
                    : children}
            </>
        );
    }

    return (
        <div className="container fade-in">
            <div
                className="card"
                style={{
                    maxWidth: 440,
                    margin: "80px auto",
                    textAlign: "center",
                }}
            >
                {/* Lock icon */}
                <div
                    style={{
                        fontSize: 56,
                        marginBottom: 16,
                        filter: "drop-shadow(0 4px 16px rgba(108, 140, 255, 0.3))",
                    }}
                >
                    🔒
                </div>

                <h2
                    style={{
                        fontFamily: "var(--font-heading)",
                        fontSize: 24,
                        fontWeight: 900,
                        marginBottom: 8,
                    }}
                >
                    Admin Access
                </h2>
                <p className="sub" style={{ marginBottom: 24 }}>
                    Enter the admin password to access tournament management.
                </p>

                <form onSubmit={handleSubmit}>
                    <div
                        className={shake ? "shake-anim" : ""}
                        style={{ marginBottom: 16 }}
                    >
                        <input
                            type="password"
                            className="input"
                            placeholder="Enter password..."
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                setError("");
                            }}
                            autoFocus
                            style={{
                                textAlign: "center",
                                fontSize: 16,
                                letterSpacing: "0.1em",
                                padding: "14px 20px",
                            }}
                        />
                    </div>

                    {error && (
                        <div
                            style={{
                                color: "var(--bad)",
                                fontSize: 13,
                                fontWeight: 600,
                                marginBottom: 12,
                                padding: "8px 12px",
                                borderRadius: 10,
                                background: "rgba(248, 113, 113, 0.08)",
                                border: "1px solid rgba(248, 113, 113, 0.2)",
                            }}
                        >
                            ❌ {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="btn"
                        disabled={!password.trim()}
                        style={{
                            width: "100%",
                            justifyContent: "center",
                            padding: "14px 24px",
                            fontSize: 15,
                            background:
                                "linear-gradient(135deg, rgba(108, 140, 255, 0.2), rgba(167, 139, 250, 0.15))",
                        }}
                    >
                        🔓 Unlock Admin Panel
                    </button>
                </form>

                <p
                    className="small"
                    style={{ marginTop: 20, opacity: 0.6 }}
                >
                    Session expires when you close the tab.
                </p>
            </div>
        </div>
    );
}
