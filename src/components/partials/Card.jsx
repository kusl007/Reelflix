import React from "react";
import { Link, useLocation } from "react-router-dom";
const Card = ({ data }) => {
  const { pathname } = useLocation();
  const newPath = pathname.split('reelflix')
  return (
    data && (
      <Link
        to={
          pathname.includes("movie")
            ? `/reelflix/movie/details/${data.id}`
            : `/reelflix/${data.media_type}/details/${data.id}`
        }
        className="h-[25rem] w-64 rounded flex flex-col gap-5   bg-zinc-800 flex-shrink-0 "
      >
        <div className="img min-h-48 w-full overflow-hidden">
          <img
            src={
              data.backdrop_path || data.profile_path
                ? `https://image.tmdb.org/t/p/original/${
                    data.backdrop_path || data.profile_path
                  }`
                : `${newPath[0]}reelflix/no-image.jpg`
            }
            className="w-full h-full object-cover"
            alt=""
          />
        </div>
        <div className="info flex flex-col gap-3 px-5 overflow-y-auto pb-3">
          <h1 className="text-2xl font-semibold ">
            {data.title ||
              data.name ||
              data.original_name ||
              data.original_title}{" "}
          </h1>
          <p>{data.overview.slice(0, 130)}...</p>
        </div>
      </Link>
    )
  );
};

export default Card;
