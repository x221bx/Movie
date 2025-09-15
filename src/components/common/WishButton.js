import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { toggleWish, selectIsWished } from "../../store/wishlistSlice";

export default function WishButton({ movie, className = "", size = 40 }) {
    const dispatch = useDispatch();
    const isWish = useSelector(selectIsWished(movie.id));
    return (
        <button
            type="button"
            className={`icon-btn ${isWish ? "active" : ""} ${className}`}
            style={{ width: size, height: size }}
            onClick={(e) => { e.stopPropagation(); dispatch(toggleWish(movie)); }}
            aria-label={isWish ? "Remove Wish" : "Add Wish"}
            title={isWish ? "Remove Wish" : "Add Wish"}
        >
            {isWish ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}
        </button>
    );
}
