import React from "react";
import { Star } from "lucide-react";
import { ImageWithFallback, NO_IMAGE, FavButton, WishButton } from ".";
export { NO_IMAGE } from ".";

export default function MovieTile({ movie, onClick }) {
    const img = movie?.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : NO_IMAGE;
    const rating = Number(movie?.vote_average || 0).toFixed(1);
    return (
        <div className="movie-tile" onClick={onClick} role="button" tabIndex={0} onKeyDown={(e)=> e.key==="Enter" && onClick?.()}>
            <ImageWithFallback src={img} alt={movie?.title} className="tile-img" />
            <div className="card-actions">
                <WishButton movie={movie} />
                <FavButton movie={movie} />
            </div>
            <div className="overlay-bottom">
                <div className="title">{movie?.title}</div>
                <div className="d-flex align-items-center justify-content-between">
                    <div className="meta">{movie?.release_date || ""}</div>
                    <div className="rating-pill">
                        <Star size={14} />
                        <span>{rating}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
