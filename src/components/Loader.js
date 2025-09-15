import { useSelector } from "react-redux";

export default function Loader() {
    const c = useSelector((s) => s.ui.loadingCount);
    if (c <= 0) return null;
    return (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.25)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 9999 }}>
            <div style={{ background: "#111", color: "#fff", padding: "10px 16px", borderRadius: 12 }}>Loading...</div>
        </div>
    );
}
