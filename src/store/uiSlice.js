import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
    name: "ui",
    initialState: { loadingCount: 0 },
    reducers: {
        startLoading: (s) => { s.loadingCount += 1; },
        stopLoading: (s) => { s.loadingCount = Math.max(0, s.loadingCount - 1); }
    }
});

export const { startLoading, stopLoading } = uiSlice.actions;
export default uiSlice.reducer;
