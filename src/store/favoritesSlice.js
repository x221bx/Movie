import { createSlice } from "@reduxjs/toolkit";

const load = () => { try { return JSON.parse(localStorage.getItem("favorites") || "[]"); } catch { return []; } };
const save = (arr) => { try { localStorage.setItem("favorites", JSON.stringify(arr)); } catch {} };

const favoritesSlice = createSlice({
    name: "favorites",
    initialState: { items: load() },
    reducers: {
        toggleFavorite: (state, action) => {
            const m = action.payload;
            const i = state.items.findIndex((x) => x.id === m.id);
            if (i >= 0) state.items.splice(i, 1); else state.items.push(m);
            save(state.items);
        },
        removeFavorite: (state, action) => {
            const id = action.payload;
            state.items = state.items.filter((x) => x.id !== id);
            save(state.items);
        }
    }
});

export const { toggleFavorite, removeFavorite } = favoritesSlice.actions;
export const selectFavorites = (s) => s.favorites.items;
export const selectIsFavorite = (id) => (s) => s.favorites.items.some((x) => x.id === id);
export default favoritesSlice.reducer;
