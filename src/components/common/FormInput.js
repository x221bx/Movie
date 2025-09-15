import React from "react";
import { Form } from "react-bootstrap";

export default function FormInput({
                                      label,
                                      type = "text",
                                      value,
                                      onChange,
                                      placeholder,
                                      error,
                                      controlId,
                                      autoComplete,
                                  }) {
    return (
        <Form.Group className="mb-3" controlId={controlId}>
            <Form.Label>{label}</Form.Label>
            <Form.Control
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="bg-body text-body"
                autoComplete={autoComplete}
                style={{ borderColor: error ? "var(--bs-danger)" : "var(--bs-border-color)" }}
            />
            {error ? <div className="text-danger mt-1" style={{ fontSize: 13 }}>{error}</div> : null}
        </Form.Group>
    );
}
