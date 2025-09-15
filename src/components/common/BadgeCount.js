import React from "react";
import { Badge } from "react-bootstrap";

export default function BadgeCount({ value }) {
    return <Badge bg="secondary" className="badge-count">{value}</Badge>;
}
