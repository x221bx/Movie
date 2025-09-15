import { createContext, useContext, useEffect, useMemo, useState } from "react";

const ThemeContext = createContext({ theme: "dark", toggleTheme: () => {} });
export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
    const getInitial = () => {
        const saved = localStorage.getItem("theme");
        if (saved === "light" || saved === "dark") return saved;
        if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) return "dark";
        return "light";
    };
    const [theme, setTheme] = useState(getInitial);

    useEffect(() => {
        localStorage.setItem("theme", theme);
        document.documentElement.setAttribute("data-bs-theme", theme);
        document.body.classList.remove("bg-black","text-light","bg-white","text-dark");
        if (theme === "dark") document.body.classList.add("bg-black","text-light");
        else document.body.classList.add("bg-white","text-dark");
    }, [theme]);

    const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));
    const value = useMemo(() => ({ theme, toggleTheme }), [theme]);

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
