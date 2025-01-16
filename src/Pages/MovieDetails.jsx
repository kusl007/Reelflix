import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import {
  clearMovieInfo,
  fetchMovieDetails,
} from "../redux/actions/movieActions";
import Cards from "../components/Cards";
import Loading from "./Loading";


const MovieDetails = () => {
  const movieDetails = useSelector((state) => state.movies);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    dispatch(fetchMovieDetails(id));

    return () => {
      // Only clear TV info if not navigating to the Trailer route
      if (!location.pathname.includes("trailer")) {
        dispatch(clearMovieInfo());
      }
    };
  }, [dispatch, id, location.pathname]);

  return movieDetails?.info ? (
    <div
      className="md:w-[80vw] w-full  !min-h-screen after:w-full after:content-[''] after:h-full after:bg-black after:bg-opacity-75 z-10 after:absolute after:top-0 after:left-0 relative"
      style={{
        backgroundImage: `url('https://image.tmdb.org/t/p/original/${
          movieDetails?.info?.detail?.backdrop_path ||
          movieDetails?.info?.detail?.poster_path
        }')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="z-40 w-full h-full px-10 py-5 relative">
        {/* Header Section */}
        <div className="flex gap-x-5 px-10 py-5 text-xl">
          <button onClick={() => navigate(-1)}>
            <i className="ri-arrow-left-line text-xl hover:text-golden-yellow"></i>
          </button>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={movieDetails?.info?.detail?.homepage}
          >
            <i className="ri-global-line hover:text-golden-yellow"></i>
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={`https://www.wikidata.org/wiki/${movieDetails?.info?.externalId?.wikidata_id}`}
          >
            <i className="ri-earth-fill hover:text-golden-yellow"></i>
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={`https://www.imdb.com/title/${movieDetails?.info?.externalId?.imdb_id}`}
            className="font-black hover:text-golden-yellow"
          >
            IMDB
          </a>
        </div>

        {/* Content Section */}
        <div className="flex gap-5">
          {/* Poster Image */}
          <div className="h-[28rem] w-96 hidden md:relative md:block">
            <img
              src={`https://image.tmdb.org/t/p/original/${
                movieDetails?.info?.detail?.poster_path ||
                movieDetails?.info?.detail?.backdrop_path
              }`}
              className="w-full h-full object-contain"
              alt="Movie Poster"
            />
            <span className="absolute top-5 right-16 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-bold text-lg px-3 py-1 rounded-full shadow-md">
              {movieDetails?.info?.detail?.vote_average.toFixed(1)}
            </span>
          </div>

          {/* Movie Info */}
          <div className="info">
            <h1 className="text-5xl font-black">
              {movieDetails?.info?.detail?.title ||
                movieDetails?.info?.detail?.name ||
                movieDetails?.info?.detail?.original_name ||
                movieDetails?.info?.detail?.original_title}
              <span className="text-xl text-zinc-400">
                {" "}
                ({movieDetails?.info?.detail?.release_date?.split("-")[0]})
              </span>
            </h1>
            <p className="text-xl font-semibold mt-1">
              {movieDetails?.info?.detail?.genres
                ?.map((g) => g.name)
                .join(", ")}
              <span className="text-golden-yellow">
                {" "}
                {movieDetails?.info?.detail?.runtime} min
              </span>
            </p>
            <h2 className="text-xl font-semibold italic text-zinc-200 mt-5">
              {movieDetails?.info?.detail?.tagline}
            </h2>
            <div>
              <h2 className="text-2xl font-bold mt-5">Overview</h2>
              <p className="w-[40vmax]">
                {movieDetails?.info?.detail?.overview}
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-bold mt-5">
                Movie is Available in Languages:
              </h2>
              <p className="w-[40vmax]">
                {movieDetails?.info?.translations
                  ?.map((t) => t.name)
                  .join(", ")}
              </p>
            </div>
            <Link
              to="trailer"
              className="px-5 text-2xl flex w-fit items-center font-bold text-white py-2 bg-golden-yellow bg-opacity-80 hover:bg-opacity-90 mt-5 rounded"
            >
              <i className="ri-play-fill"></i>
              <span>Watch Trailer</span>
            </Link>
          </div>
        </div>

        {/* Watch Providers */}
        <div className="flex flex-col gap-y-3">
          {movieDetails?.info?.watchProviders && (
            <>
              {movieDetails?.info?.watchProviders?.rent?.length > 0 && (
                <div className="flex items-center gap-x-3">
                  <span className="text-3xl font-semibold">Rent:</span>
                  <div className="flex gap-x-5 mt-5">
                    {movieDetails?.info?.watchProviders?.rent?.map((item) => (
                      <img
                        className="h-12 w-12 rounded object-cover"
                        src={`https://image.tmdb.org/t/p/original/${item.logo_path}`}
                        alt=""
                        key={item.provider_id}
                      />
                    ))}
                  </div>
                </div>
              )}
              {movieDetails?.info?.watchProviders?.flatrate?.length > 0 && (
                <div className="flex items-center gap-x-3">
                  <span className="text-3xl font-semibold">Streaming:</span>
                  <div className="flex gap-x-5 mt-5">
                    {movieDetails?.info?.watchProviders?.flatrate?.map(
                      (item) => (
                        <img
                          className="h-12 w-12 rounded object-cover"
                          src={`https://image.tmdb.org/t/p/original/${item.logo_path}`}
                          alt=""
                          key={item.provider_id}
                        />
                      )
                    )}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Recommendations */}
        <hr className="border-none h-[3px] bg-zinc-500 rounded-full mt-4" />
        {movieDetails?.info?.similar?.length > 0 ||
        movieDetails?.info?.recommendations?.length > 0 ? (
          <Cards
            data={
              movieDetails?.info?.recommendations?.length > 0
                ? movieDetails?.info?.recommendations
                : movieDetails?.info?.similar
            }
          />
        ) : (
          <h1 className="text-3xl text-center py-5 font-bold">
            NO Suggestions
          </h1>
        )}
      </div>
      <Outlet />
    </div>
  ) : (
    <Loading />
  );
};

export default MovieDetails;
