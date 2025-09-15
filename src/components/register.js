import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import FormInput from "./common/FormInput";
import { validateRegister, isEmail, isStrongPassword, notEmpty, noSpaces } from "../utils/validators";

function RegisterPage() {
    const history = useHistory();
    const [data, setData] = useState({
        email: "",
        name: "",
        username: "",
        password: "",
        confirmPassword: "",
    });
    const [errors, setErrors] = useState({});
    const [msg, setMsg] = useState("");

    const getUsers = () => {
        try { return JSON.parse(localStorage.getItem("users") || "[]"); } catch { return []; }
    };
    const saveUsers = (arr) => {
        try { localStorage.setItem("users", JSON.stringify(arr)); } catch {}
    };

    const setField = (field, value) => {
        setData((p) => ({ ...p, [field]: value }));
        setErrors((p) => {
            const e = { ...p };
            if (field === "email") e.email = isEmail(value) ? undefined : "Invalid email";
            if (field === "name") e.name = notEmpty(value) ? undefined : "Name is required";
            if (field === "username") {
                e.username = notEmpty(value) ? undefined : "Username is required";
                if (!e.username && !noSpaces(value)) e.username = "Username cannot contain spaces";
            }
            if (field === "password") e.password = isStrongPassword(value) ? undefined : "Weak password";
            if (field === "confirmPassword") e.confirmPassword = value === data.password ? undefined : "Passwords do not match";
            return e;
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setMsg("");
        const eAll = validateRegister(data);
        if (Object.keys(eAll).length) { setErrors(eAll); return; }

        const users = getUsers();
        if (users.some(u => u.email.toLowerCase() === data.email.toLowerCase())) {
            setErrors((p)=>({ ...p, email: "Email is already registered" }));
            return;
        }
        if (users.some(u => u.username.toLowerCase() === data.username.toLowerCase())) {
            setErrors((p)=>({ ...p, username: "Username is already taken" }));
            return;
        }

        const newUser = { email: data.email, name: data.name, username: data.username, password: data.password };
        users.push(newUser);
        saveUsers(users);
        setMsg("Registered successfully. Redirecting to login...");
        setTimeout(()=> history.push("/login"), 800);
    };

    return (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
            <Form onSubmit={handleSubmit} className="bg-body p-4 rounded-3 border" style={{ width: 420, borderColor: "var(--bs-border-color)" }}>
                <h2 className="text-center mb-3">Register</h2>
                {msg && <Alert variant="success">{msg}</Alert>}

                <FormInput
                    label="Email"
                    type="email"
                    value={data.email}
                    onChange={(v)=>setField("email", v)}
                    error={errors.email}
                    autoComplete="email"
                />
                <FormInput
                    label="Name"
                    value={data.name}
                    onChange={(v)=>setField("name", v)}
                    error={errors.name}
                    autoComplete="name"
                />
                <FormInput
                    label="Username"
                    value={data.username}
                    onChange={(v)=>setField("username", v)}
                    error={errors.username}
                    autoComplete="username"
                />
                <FormInput
                    label="Password"
                    type="password"
                    value={data.password}
                    onChange={(v)=>setField("password", v)}
                    error={errors.password}
                    autoComplete="new-password"
                />
                <FormInput
                    label="Confirm Password"
                    type="password"
                    value={data.confirmPassword}
                    onChange={(v)=>setField("confirmPassword", v)}
                    error={errors.confirmPassword}
                    autoComplete="new-password"
                />

                <Button type="submit" className="w-100 mt-1">Create account</Button>
            </Form>
        </div>
    );
}

export default RegisterPage;
