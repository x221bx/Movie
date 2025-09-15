import { useEffect, useMemo, useState } from "react";
import { Container, Row, Col, Modal, Button, ButtonGroup, Badge, Spinner } from "react-bootstrap";
import { Play, Grid, List, Star } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies, selectMovies, selectPage, selectTotalPages, selectTotalResults, selectQuery } from "../store/moviesSlice";
import { useLanguage } from "../context/LanguageContext";
import PaginationLite from "../components/common/PaginationLite";
import ImageWithFallback, { NO_IMAGE } from "../components/common/ImageWithFallback";
import FavButton from "../components/common/FavButton";
import WishButton from "../components/common/WishButton";
import MovieTile from "../components/common/MovieTile";


export default function Home() {
    const dispatch = useDispatch();
    const { language } = useLanguage();
    const movies = useSelector(selectMovies);
    const currentPage = useSelector(selectPage);
    const totalPages = useSelector(selectTotalPages);
    const totalResults = useSelector(selectTotalResults);
    const query = useSelector(selectQuery);
    const status = useSelector((s) => s.movies.status);

    const [viewMode, setViewMode] = useState("grid");
    const [selectedMovie, setSelectedMovie] = useState(null);

    useEffect(() => { dispatch(fetchMovies({ language, page: 1, query: "" })); }, [language, dispatch]);

    const featured = useMemo(() => {
        if (!movies || movies.length === 0) return null;
        return movies[Math.floor(Math.random() * movies.length)];
    }, [movies]);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages && page !== currentPage) {
            dispatch(fetchMovies({ language, page, query }));
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    if (status === "loading")
        return (
            <div className="text-center mt-5">
                <Spinner animation="border" variant="light" />
                <p className="mt-3 text-secondary">Loading movies...</p>
            </div>
        );

    const heroBg = featured && featured.backdrop_path ? `https://image.tmdb.org/t/p/original${featured.backdrop_path}` : "";

    const ListRow = ({ movie }) => {
        const img = movie.poster_path ? `https://image.tmdb.org/t/p/w185${movie.poster_path}` : NO_IMAGE;
        const rating = Number(movie.vote_average || 0).toFixed(1);
        return (
            <div className="list-row" onClick={() => setSelectedMovie(movie)} role="button" tabIndex={0} onKeyDown={(e)=> e.key==="Enter" && setSelectedMovie(movie)}>
                <ImageWithFallback src={img} alt={movie.title} />
                <div style={{ flex:1 }}>
                    <div className="title">{movie.title}</div>
                    <div className="meta">{movie.release_date}</div>
                    <div className="d-flex align-items-center gap-2">
                        <div className="d-flex align-items-center me-2">
                            <Star size={16} className="text-warning me-1" fill="currentColor" />
                            <span className="fw-bold text-warning">{rating}</span>
                        </div>
                        <FavButton movie={movie} className="ms-1" size={36} />
                        <WishButton movie={movie} className="ms-1" size={36} />
                    </div>
                </div>
            </div>
        );
    };

    return (
        <>
            <div className="hero">
                <div className="hero-bg" style={{ backgroundImage: heroBg ? `url(${heroBg})` : "none" }} />
                <div className="hero-overlay" />
                <div className="hero-content">
                    <h1 className="hero-title">Discover Amazing <span className="text-danger">Movies</span></h1>
                    <Button variant="light" size="lg" className="d-flex align-items-center mx-auto mt-3" onClick={() => featured && setSelectedMovie(featured)}>
                        <Play size={20} className="me-2" /> Start Watching
                    </Button>
                </div>
            </div>

            <Container className="my-5">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <div>
                        <h2>{query ? `Results for "${query}"` : "Popular Movies"}</h2>
                        <p className="mb-0 text-secondary">Showing {movies.length} movies from page {currentPage}</p>
                    </div>
                    <ButtonGroup>
                        <Button variant={viewMode === "grid" ? "danger" : "outline-secondary"} onClick={() => setViewMode("grid")} title="Grid View"><Grid size={18} /></Button>
                        <Button variant={viewMode === "list" ? "danger" : "outline-secondary"} onClick={() => setViewMode("list")} title="List View"><List size={18} /></Button>
                    </ButtonGroup>
                </div>

                {viewMode === "grid" ? (
                    <Row>
                        {movies.map((movie) => (
                            <Col key={movie.id} xs={6} md={4} lg={3} className="mb-4">
                                <MovieTile movie={movie} onClick={() => setSelectedMovie(movie)} />
                            </Col>
                        ))}
                    </Row>
                ) : (
                    <div className="d-flex flex-column gap-3">
                        {movies.map((movie) => <ListRow key={movie.id} movie={movie} />)}
                    </div>
                )}

                <PaginationLite
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onChange={handlePageChange}
                    totalResults={totalResults}
                />
            </Container>

            <Modal show={!!selectedMovie} onHide={() => setSelectedMovie(null)} centered size="lg">
                {selectedMovie && (
                    <>
                        <Modal.Header closeButton className="bg-dark text-light">
                            <Modal.Title>{selectedMovie.title}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body className="bg-dark text-light">
                            <div className="row">
                                <div className="col-md-4">
                                    <ImageWithFallback
                                        src={selectedMovie.poster_path ? `https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}` : NO_IMAGE}
                                        alt={selectedMovie.title}
                                        className="img-fluid rounded"
                                    />
                                </div>
                                <div className="col-md-8">
                                    <div className="mb-3 d-flex align-items-center">
                                        <Star size={16} className="text-warning me-1" fill="currentColor" />
                                        <span className="fw-bold text-warning me-3">{Number(selectedMovie.vote_average || 0).toFixed(1)}/10</span>
                                        <Badge bg="secondary">{selectedMovie.release_date}</Badge>
                                    </div>
                                    <p className="text-light">{selectedMovie.overview || "No overview available."}</p>
                                </div>
                            </div>
                        </Modal.Body>
                    </>
                )}
            </Modal>
        </>
    );
}
