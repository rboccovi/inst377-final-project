// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import NavBar from "./components/navbar";
import HomePage from "./pages/home";
import EventsPage from "./pages/eventsPage.jsx";
import FavoritesPage from "./pages/favoritesPage.jsx";
import ChartPage from "./pages/ChartsPage.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/stats" element={<ChartPage />} />
       <Route path="*" element={<HomePage />} /> 
      </Routes>
    </BrowserRouter>
  );
}
