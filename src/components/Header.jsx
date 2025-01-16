import React from "react";
import { Link, Outlet } from "react-router-dom";

const Header = ({ data }) => {
  return (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.5), rgba(0,0,0,0.7)),url(
        https://image.tmdb.org/t/p/original/${
          data.backdrop_path || data.profile_path
        })`,
        backgroundPosition: "center center",
        backgroundSize: "cover",
      }}
      className="h-[50vh]  w-full flex flex-col  justify-end gap-2 p-4"
    >
      <div className="info flex flex-col gap-2 md:w-1/2">
        <h1 className="text-[3vmax] font-bold text-zinc-100">
          {data.title || data.name || data.original_name || data.original_title}
        </h1>
        <p className="md:text-xl font-semibold ">
          {data.overview.slice(0, 200)}
          <Link 
          to={`/reelflix/${data.media_type}/details/${data.id}`}
          className="text-blue-400">...more</Link>
        </p>
        <p></p>
        <Link
          to={`/reelflix/${data.media_type}/details/${data.id}/trailer`}
          className="px-5 py-2 md:text-2xl font-semibold text-white bg-golden-yellow self-start rounded mt-2"
        >
          Watch Trailer
        </Link>
        <Outlet />
      </div>
    </div>
  );
};

export default Header;
