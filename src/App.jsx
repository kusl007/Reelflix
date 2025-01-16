import React from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import Sidenav from "./components/Sidenav";
import Home from "./Pages/Home";
import Trending from "./Pages/Trending";
import Popular from "./Pages/Popular";
import Movies from "./Pages/Movies";
import TvShows from "./Pages/TvShow";
import People from "./Pages/People";
import MovieDetails from "./Pages/MovieDetails";
import TvDetails from "./Pages/TvDetails";
import PersonDetails from "./Pages/PersonDetails";
import Trailer from "./Pages/Trailer";

const App = () => {
  return (
    <div className="min-h-screen w-full flex bg-zinc-900  text-zinc-100">
      <Sidenav />
      <Outlet />
      <Routes>
        <Route path="/reelflix/" element={<Home />} />
        <Route path="/reelflix/trending" element={<Trending />} />
        <Route path="/reelflix/popular" element={<Popular />} />
        <Route path="/reelflix/movie" element={<Movies />} />
        <Route path="/reelflix/tv" element={<TvShows />} />
        <Route path="/reelflix/people" element={<People />} />
        <Route path="/reelflix/movie/details/:id" element={<MovieDetails />}>
          <Route
            path="/reelflix/movie/details/:id/trailer"
            element={<Trailer />}
          />
        </Route>
        <Route path="/reelflix/tv/details/:id" element={<TvDetails />}>
          <Route
            path="/reelflix/tv/details/:id/trailer"
            element={<Trailer />}
          />
        </Route>
        <Route
          path="/reelflix/person/details/:id"
          element={<PersonDetails />}
        />
      </Routes>
    </div>
  );
};

export default App;
