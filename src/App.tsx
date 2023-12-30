import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { HomePage } from "./HomePage/Homepage";
import { Route, Routes } from "react-router-dom";
import { AnimeOverview } from "./AnimeDetails/Anime";
import { Watchlist } from "./WatchlistPage/Watchlist";
import { SignUp } from "./Signup/Signup";
import { Login } from "./Login/Login";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Anime/:id/:title" element={<AnimeOverview />} />
        {}
        <Route path="/watchlist" element={<Watchlist />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
