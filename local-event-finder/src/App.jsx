// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar.jsx";
import HomePage from "./pages/HomePage.jsx";
import EventsPage from "./pages/EventsPage.jsx";
import FavoritesPage from "./pages/FavoritesPage.jsx";
import ChartPage from "./pages/ChartPage.jsx";

export default function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/insights" element={<ChartPage />} />
      </Routes>
    </>
  );
}
