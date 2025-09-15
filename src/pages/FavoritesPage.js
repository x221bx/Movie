import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { selectFavorites, removeFavorite } from "../store/favoritesSlice";
import { Star } from "lucide-react";

export default function FavoritesPage() {
    const items = useSelector(selectFavorites);
    const dispatch = useDispatch();
    if (items.length === 0) return <div className="text-center mt-5">No favorites yet.</div>;
    return (
        <Container className="my-5">
            <h2 className="mb-4">Favorites</h2>
            <Row>
                {items.map((m) => (
                    <Col key={m.id} xs={6} md={4} lg={3} className="mb-4">
                        <Card className="h-100 bg-dark text-white">
                            {m.poster_path ? <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w500${m.poster_path}`} /> : null}
                            <Card.Body className="d-flex flex-column">
                                <Card.Title>{m.title}</Card.Title>
                                <div className="small text-muted mb-2">{m.release_date}</div>
                                <div className="d-flex align-items-center mb-3">
                                    <Star size={16} className="text-warning me-1" fill="currentColor" />
                                    <span className="fw-bold text-warning">{Number(m.vote_average || 0).toFixed(1)}</span>
                                </div>
                                <Button onClick={() => dispatch(removeFavorite(m.id))} variant="outline-light" className="mt-auto">Remove</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}
