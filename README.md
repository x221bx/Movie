# Movies

A modern movies browser built with React, Redux Toolkit (Thunk), Axios interceptors, and Bootstrap theming (dark/light). It includes search, pagination, favorites, wishlist, language switch, and a polished, responsive UI.

**Live demo:** https://movie-23gr7i00t-x221bxs-projects.vercel.app/

> **AI-assisted:** UI polish and refactoring were guided by AI (prompt-driven). All code was reviewed and finalized by a human.

---

## Features
- TMDB integration via Axios + **interceptors** (API key injection & global loader)
- **Redux Toolkit + Thunk** for movies fetching, favorites, wishlist, and UI state
- **Search** and **language-aware** results (re-fetch on language change)
- **Dark/Light theme** toggle (Bootstrap variables)
- Responsive **Grid/List** views, movie modal with details
- Safe images with local fallback (no external placeholder host)
- Demo **Register/Login** via `localStorage` (for sample use only)

## Tech
React (CRA), React Router v5, Redux Toolkit, Axios, Bootstrap, Lucide icons

## Quick Start
```bash
npm install
cp .env.example .env      # add your TMDB key
npm start                 # http://localhost:3000
