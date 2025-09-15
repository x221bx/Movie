import { configureStore } from "@reduxjs/toolkit";
import movies from "./moviesSlice";
import favorites from "./favoritesSlice";
import wishlist from "./wishlistSlice";
import ui from "./uiSlice";
import loadingMiddleware from "./loadingMiddleware";

const store = configureStore({
    reducer: { movies, favorites, wishlist, ui },
    middleware: (gdm) => gdm().concat(loadingMiddleware)
});

export default store;
