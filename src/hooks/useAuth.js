import { useEffect, useState } from "react";

export default function useAuth() {
    const [auth, setAuth] = useState(null);
    useEffect(() => {
        try { setAuth(JSON.parse(localStorage.getItem("auth") || "null")); } catch {}
    }, []);
    const logout = () => {
        try { localStorage.removeItem("auth"); } catch {}
        setAuth(null);
    };
    return { auth, setAuth, logout };
}
