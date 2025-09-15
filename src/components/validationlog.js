import React, { useEffect, useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import FormInput from "./common/FormInput";
import { validateLogin } from "../utils/validators";

const LoginForm = () => {
    const history = useHistory();
    const [data, setData] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState({});
    const [msg, setMsg] = useState("");

    useEffect(() => {
        try {
            const auth = JSON.parse(localStorage.getItem("auth") || "null");
            if (auth && auth.email) history.replace("/");
        } catch {}
    }, [history]);

    const setField = (field, value) => {
        setData((p) => ({ ...p, [field]: value }));
        setErrors((p) => {
            const e = { ...p, ...validateLogin({ ...data, [field]: value }) };
            return e;
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setMsg("");
        const eAll = validateLogin(data);
        if (Object.keys(eAll).length) { setErrors(eAll); return; }

        let users = [];
        try { users = JSON.parse(localStorage.getItem("users") || "[]"); } catch {}
        const user = users.find((u) => u.email.toLowerCase() === data.email.toLowerCase() && u.password === data.password);
        if (!user) {
            setErrors((p)=>({ ...p, password: "Email or password is incorrect" }));
            return;
        }
        try { localStorage.setItem("auth", JSON.stringify({ email: user.email, name: user.name, username: user.username })); } catch {}
        setMsg("Logged in. Redirecting...");
        setTimeout(() => history.push("/"), 600);
    };

    return (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
            <Form onSubmit={handleSubmit} className="bg-body p-4 rounded-3 border" style={{ width: 420, borderColor: "var(--bs-border-color)" }}>
                <h2 className="text-center mb-3">Login</h2>
                {msg && <Alert variant="success">{msg}</Alert>}

                <FormInput
                    label="Email address"
                    type="email"
                    value={data.email}
                    onChange={(v)=>setField("email", v)}
                    error={errors.email}
                    autoComplete="email"
                />
                <FormInput
                    label="Password"
                    type="password"
                    value={data.password}
                    onChange={(v)=>setField("password", v)}
                    error={errors.password}
                    autoComplete="current-password"
                />

                <Button className="mt-2 w-100" variant="primary" type="submit">Login</Button>
            </Form>
        </div>
    );
};

export default LoginForm;
