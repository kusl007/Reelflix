import React from "react";
import { Link, useLocation } from "react-router-dom";

const VCard = ({ data, title }) => {
  if (!data) return null;
  const { pathname } = useLocation();
  return (
    <Link
      to={`/reelflix/${
        title || (data.media_type == "people" ? "person" : data.media_type)
      }/details/${data.id}`}
      className="h-[28rem] w-72 relative group flex-shrink-0 overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
    >
      {/* Image Wrapper */}
      <div className="img h-full w-full overflow-hidden rounded-lg">
        <img
          src={
            data.backdrop_path || data.profile_path || data.poster_path
              ? `https://image.tmdb.org/t/p/original/${
                  data.backdrop_path || data.profile_path || data.poster_path
                }`
              : `${pathname[0]}no-image.jpg`
          }
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          alt={data.title || data.name || "Image"}
        />
      </div>

      {/* Title Overlay */}
      <h1 className="absolute inset-0 flex items-center justify-center text-center text-2xl font-semibold text-white bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-2">
        {data.title || data.name || data.original_name || data.original_title}
      </h1>

      {/* Rating Badge */}
      {data.vote_average && (
        <span className="absolute top-4 right-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-bold text-lg px-3 py-1 rounded-full shadow-md">
          {data.vote_average.toFixed(1)}
        </span>
      )}
    </Link>
  );
};

export default VCard;
