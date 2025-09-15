import React from "react";
import { Button } from "react-bootstrap";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();
    const isDark = theme === "dark";
    return (
        <Button
            variant="outline-secondary"
            className="ms-2 d-flex align-items-center justify-content-center"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            title="Toggle theme"
            style={{ width: 40, height: 40, borderRadius: 10 }}
        >
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
        </Button>
    );
}
