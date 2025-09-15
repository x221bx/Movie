import React from "react";
import { Button } from "react-bootstrap";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function PaginationLite({ currentPage, totalPages, onChange, totalResults }) {
    const maxVisible = 5;
    const pages = [];
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);
    if (end - start + 1 < maxVisible) start = Math.max(1, end - maxVisible + 1);
    for (let i = start; i <= end; i++) pages.push(i);

    return (
        <div className="d-flex justify-content-center align-items-center my-5">
            <div className="d-flex align-items-center">
                <Button variant="outline-light" onClick={() => onChange(currentPage - 1)} disabled={currentPage === 1} className="me-2">
                    <ChevronLeft size={18} />
                </Button>

                {pages[0] > 1 && (
                    <>
                        <Button variant={currentPage === 1 ? "danger" : "outline-secondary"} onClick={() => onChange(1)} className="me-1">1</Button>
                        {pages[0] > 2 && <span className="text-secondary mx-2">...</span>}
                    </>
                )}

                {pages.map((p) => (
                    <Button key={p} variant={currentPage === p ? "danger" : "outline-secondary"} onClick={() => onChange(p)} className="me-1">
                        {p}
                    </Button>
                ))}

                {pages[pages.length - 1] < totalPages && (
                    <>
                        {pages[pages.length - 1] < totalPages - 1 && <span className="text-secondary mx-2">...</span>}
                        <Button variant={currentPage === totalPages ? "danger" : "outline-secondary"} onClick={() => onChange(totalPages)} className="me-2">
                            {totalPages}
                        </Button>
                    </>
                )}

                <Button variant="outline-light" onClick={() => onChange(currentPage + 1)} disabled={currentPage === totalPages}>
                    <ChevronRight size={18} />
                </Button>
            </div>

            {typeof totalResults === "number" && (
                <div className="ms-4 text-secondary small">
                    Page {currentPage} of {totalPages} ({totalResults.toLocaleString()} movies)
                </div>
            )}
        </div>
    );
}
