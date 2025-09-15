import { Container, Navbar as RBNavbar, Nav, Button, Dropdown } from "react-bootstrap";
import { NavLink, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchMovies } from "../store/moviesSlice";
import LanguageSelect from "./common/LanguageSelect";
import SearchBox from "./common/SearchBox";
import ThemeToggle from "./common/ThemeToggle";
import BadgeCount from "./common/BadgeCount";
import useAuth from "../hooks/useAuth";
import { useLanguage } from "../context/LanguageContext";

export default function Navbar() {
    const history = useHistory();
    const dispatch = useDispatch();
    const { auth, setAuth, logout } = useAuth();
    const { language } = useLanguage();

    const favCount = useSelector((s) => s.favorites.items.length);
    const wishCount = useSelector((s) => s.wishlist.items.length);

    useEffect(() => {}, [auth]);

    const onSearch = (query) => {
        dispatch(fetchMovies({ language, page: 1, query }));
    };

    return (
        <RBNavbar bg="dark" variant="dark" expand="lg" sticky="top">
            <Container>
                <RBNavbar.Brand className="fw-bold fs-3 text-danger" onClick={() => history.push("/")} style={{ cursor: "pointer" }}>
                    Movies
                </RBNavbar.Brand>
                <RBNavbar.Toggle />
                <RBNavbar.Collapse>
                    <Nav className="me-auto">
                        <Nav.Link as={NavLink} exact to="/" className="text-light">Home</Nav.Link>
                        <Nav.Link as={NavLink} to="/favorites" className="text-light">Favorites <BadgeCount value={favCount} /></Nav.Link>
                        <Nav.Link as={NavLink} to="/wishlist" className="text-light">Wish List <BadgeCount value={wishCount} /></Nav.Link>
                    </Nav>

                    <LanguageSelect />
                    <SearchBox onSearch={onSearch} />
                    <ThemeToggle />

                    {!auth ? (
                        <>
                            <Button as={NavLink} to="/login" variant="outline-secondary" className="ms-2">Login</Button>
                            <Button as={NavLink} to="/signup" variant="danger" className="ms-2">Register</Button>
                        </>
                    ) : (
                        <Dropdown align="end" className="ms-2">
                            <Dropdown.Toggle variant="outline-secondary">
                                {auth.name || auth.username || auth.email}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => history.push("/")}>Home</Dropdown.Item>
                                <Dropdown.Item onClick={() => history.push("/favorites")}>Favorites</Dropdown.Item>
                                <Dropdown.Item onClick={() => history.push("/wishlist")}>Wish List</Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item onClick={() => { logout(); setAuth(null); history.push("/login"); }}>
                                    Logout
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    )}
                </RBNavbar.Collapse>
            </Container>
        </RBNavbar>
    );
}
