import { createSlice } from "@reduxjs/toolkit";

const load = () => { try { return JSON.parse(localStorage.getItem("wishlist") || "[]"); } catch { return []; } };
const save = (arr) => { try { localStorage.setItem("wishlist", JSON.stringify(arr)); } catch {} };

const wishlistSlice = createSlice({
    name: "wishlist",
    initialState: { items: load() },
    reducers: {
        toggleWish: (state, action) => {
            const m = action.payload;
            const i = state.items.findIndex((x) => x.id === m.id);
            if (i >= 0) state.items.splice(i, 1); else state.items.push(m);
            save(state.items);
        },
        removeWish: (state, action) => {
            const id = action.payload;
            state.items = state.items.filter((x) => x.id !== id);
            save(state.items);
        }
    }
});

export const { toggleWish, removeWish } = wishlistSlice.actions;
export const selectWishlist = (s) => s.wishlist.items;
export const selectIsWished = (id) => (s) => s.wishlist.items.some((x) => x.id === id);
export default wishlistSlice.reducer;
