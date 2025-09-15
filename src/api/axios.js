import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_MOVIES_API_URL || "https://api.themoviedb.org/3";
const API_KEY = process.env.REACT_APP_MOVIES_API_KEY || "29cf44b93ca83bf48d9356395476f7ad";

const api = axios.create({ baseURL: API_BASE_URL, timeout: 15000 });

api.interceptors.request.use(
    (config) => {
        config.params = config.params || {};
        if (!config.params.api_key) config.params.api_key = API_KEY;
        if (config.meta && config.meta.language) config.params.language = config.meta.language;
        if (config.meta && config.meta.page) config.params.page = config.meta.page;
        return config;
    },
    (e) => Promise.reject(e)
);

api.interceptors.response.use(
    (r) => r,
    (e) => Promise.reject(e)
);

export default api;
