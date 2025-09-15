import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/axios";

export const fetchMovies = createAsyncThunk(
    "movies/fetchMovies",
    async ({ language, page=1, query="" }, { rejectWithValue }) => {
        try {
            const url = query ? "/search/movie" : "/movie/popular";
            const r = await api.get(url, { meta: { language, page }, params: query ? { query } : {} });
            return {
                results: r.data.results || [],
                total_pages: r.data.total_pages || 1,
                total_results: r.data.total_results || 0,
                page: r.data.page || page,
                query
            };
        } catch {
            return rejectWithValue({ message: "error" });
        }
    }
);

const moviesSlice = createSlice({
    name: "movies",
    initialState: { list: [], status: "idle", error: null, page: 1, totalPages: 1, totalResults: 0, query: "" },
    reducers: {},
    extraReducers: (b) => {
        b.addCase(fetchMovies.pending, (s) => { s.status = "loading"; s.error = null; });
        b.addCase(fetchMovies.fulfilled, (s, a) => {
            s.status = "succeeded";
            s.list = a.payload.results;
            s.page = a.payload.page;
            s.totalPages = Math.min(a.payload.total_pages, 500);
            s.totalResults = a.payload.total_results;
            s.query = a.payload.query || "";
        });
        b.addCase(fetchMovies.rejected, (s, a) => { s.status = "failed"; s.error = a.payload?.message || "failed"; });
    }
});

export const selectMovies = (s) => s.movies.list;
export const selectPage = (s) => s.movies.page;
export const selectTotalPages = (s) => s.movies.totalPages;
export const selectTotalResults = (s) => s.movies.totalResults;
export const selectQuery = (s) => s.movies.query;
export default moviesSlice.reducer;
