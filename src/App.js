// src/App.js
import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import store from "./store";
import { LanguageProvider } from "./context/LanguageContext";
import Loader from "./components/Loader";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import FavoritesPage from "./pages/FavoritesPage";
import WishlistPage from "./pages/WishlistPage";

import LoginForm from "./components/validationlog";
import RegisterPage from "./components/register";

function App() {
    return (
        <Provider store={store}>
            <Router>
                <LanguageProvider>
                    <Loader />
                    <Navbar />
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path="/favorites" component={FavoritesPage} />
                        <Route path="/wishlist" component={WishlistPage} />
                        <Route path="/login" component={LoginForm} />
                        <Route path="/signup" component={RegisterPage} />
                    </Switch>
                </LanguageProvider>
            </Router>
        </Provider>
    );
}

export default App;
