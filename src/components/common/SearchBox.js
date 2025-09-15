import React, { useState } from "react";
import { InputGroup, Form, Button } from "react-bootstrap";
import { Search, Filter } from "lucide-react";

export default function SearchBox({ onSearch, width = 260 }) {
    const [q, setQ] = useState("");

    const submit = () => {
        const query = q.trim();
        onSearch?.(query);
    };

    return (
        <>
            <InputGroup style={{ width }}>
                <InputGroup.Text className="bg-body border-secondary text-body">
                    <Search size={16} />
                </InputGroup.Text>
                <Form.Control
                    placeholder="Search..."
                    className="bg-body border-secondary text-body"
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter") submit(); }}
                />
            </InputGroup>
            <Button variant="outline-secondary" className="ms-2" onClick={submit}>
                <Filter size={16} />
            </Button>
        </>
    );
}
