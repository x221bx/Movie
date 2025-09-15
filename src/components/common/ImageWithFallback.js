import React, { useState } from "react";

const NO_IMAGE =
    "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='500' height='750'><rect width='100%25' height='100%25' fill='%23111'/><text x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='32' fill='%23aaa'>No Image</text></svg>";

export { NO_IMAGE };

export default function ImageWithFallback({ src, alt, ...props }) {
    const [err, setErr] = useState(false);
    const finalSrc = !src || err ? NO_IMAGE : src;
    return (
        <img
            src={finalSrc}
            alt={alt}
            onError={() => setErr(true)}
            loading="lazy"
            {...props}
        />
    );
}
