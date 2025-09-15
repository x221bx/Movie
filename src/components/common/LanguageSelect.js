import React from "react";
import { Form } from "react-bootstrap";
import { useLanguage } from "../../context/LanguageContext";

export default function LanguageSelect({ width = 200 }) {
    const { language, setLanguage } = useLanguage();
    return (
        <Form.Select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-body text-body border-secondary me-2"
            style={{ width }}
            aria-label="Language"
        >
            <option value="en-US">English</option>
            <option value="ar-EG">العربية</option>
            <option value="fr-FR">Français</option>
            <option value="de-DE">Deutsch</option>
            <option value="es-ES">Español</option>
            <option value="it-IT">Italiano</option>
            <option value="ja-JP">日本語</option>
            <option value="hi-IN">हिन्दी</option>
        </Form.Select>
    );
}
