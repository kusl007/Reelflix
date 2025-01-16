import axios from "../utils/axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Search = () => {
  const [query, setQuery] = useState("");
  const clearQuery = () => setQuery("");
  const [results, setResults] = useState([]);
  const { pathname } = useLocation();
  const searchMovies = async () => {
    const response = await axios.get(`search/multi?query=${query}`);
    setResults(response.data.results);
  };
  const newPath = pathname.split("reelflix");
  useEffect(() => {
    searchMovies();
  }, [query]);
  return (
    <div className="sticky  w-[50vmax] md:w-full  top-0 left-0  z-50 ">
      {/* Search Bar */}
      <div className="h-[10vh] static flex items-center justify-center">
        <div className="relative w-[70%]">
          <i className="ri-search-line absolute top-1/2 left-4 transform -translate-y-1/2 text-zinc-400 text-2xl"></i>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for movies, TV shows, or people..."
            className="w-full py-3 pl-12 pr-12 rounded-full bg-zinc-800 border border-zinc-700 text-lg placeholder:text-zinc-500 text-zinc-100 outline-none focus:ring-2 focus:ring-yellow-400"
          />
          {query && (
            <span
              onClick={clearQuery}
              className="absolute top-1/2 right-4 transform -translate-y-1/2 text-zinc-400 cursor-pointer hover:text-zinc-100 transition"
            >
              ❌
            </span>
          )}
        </div>
      </div>

      {/* Search Results */}
      {query.length > 0 && (
        <div className="absolute top-[12vh] left-1/2 -translate-x-1/2 w-[70%] bg-zinc-800 border border-zinc-700 rounded-xl shadow-lg max-h-[50vh] overflow-auto">
          {results.map((item, index) => (
            <Link
              to={`/reelflix/${item.media_type}/details/${item.id}`}
              key={item.release_date}
              className="flex items-center px-5 py-4 hover:bg-zinc-700 text-zinc-100 text-lg font-medium transition"
            >
              <img
                className="w-20 h-20 rounded-full mr-5 object-cover"
                src={
                  item.backdrop_path || item.profile_path
                    ? `https://image.tmdb.org/t/p/original/${
                        item.backdrop_path || item.profile_path
                      }`
                    : `${newPath[0]}reelflix/no-image.jpg`
                }
                alt=""
              />
              <span className="text-xl font-semibold">
                {item.title ||
                  item.name ||
                  item.original_name ||
                  item.original_title}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
