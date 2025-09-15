import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Heart } from "lucide-react";
import { toggleFavorite, selectIsFavorite } from "../../store/favoritesSlice";

export default function FavButton({ movie, className = "", size = 40 }) {
    const dispatch = useDispatch();
    const isFav = useSelector(selectIsFavorite(movie.id));
    return (
        <button
            type="button"
            className={`icon-btn ${isFav ? "active" : ""} ${className}`}
            style={{ width: size, height: size }}
            onClick={(e) => { e.stopPropagation(); dispatch(toggleFavorite(movie)); }}
            aria-label={isFav ? "Remove Favorite" : "Add Favorite"}
            title={isFav ? "Remove Favorite" : "Add Favorite"}
        >
            <Heart size={18} fill={isFav ? "currentColor" : "none"} />
        </button>
    );
}
