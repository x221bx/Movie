import { startLoading, stopLoading } from "./uiSlice";

const loadingMiddleware = () => (next) => (action) => {
    if (action.type.endsWith("/pending")) next(startLoading());
    if (action.type.endsWith("/fulfilled") || action.type.endsWith("/rejected")) next(stopLoading());
    return next(action);
};

export default loadingMiddleware;
