import React, { useState } from "react";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";

const Trailer = () => {
  const height = window.innerHeight - window.innerHeight / 3;
  const width = window.innerWidth - window.innerWidth / 3;

  const { pathname } = useLocation();
  const category = pathname.includes("movie") ? "movies" : "tv";
  const ytVideo = useSelector((state) => state[category].info.videos);
  return ytVideo ? (
    <div className="flex items-center justify-center  md:max-w-[80vw]  h-screen w-full bg-zinc-900 bg-opacity-95 fixed z-[99] top-0 right-0 ">
      <ReactPlayer
        height={height}
        width={width}
        url={`https://www.youtube.com/watch?v=${ytVideo.key}`}
        controls={true}
      />
      <span>
        <button
          className="absolute top-2 right-2 text-white font-bold text-xl border-0 rounded-full hover:scale-110 transition-all duration-200"
          onClick={() => window.history.back()}
        >
          ❌
        </button>
      </span>
    </div>
  ) : (
    <div className="grid  place-items-center md:max-w-[80vw]  h-screen w-full bg-black bg-opacity-95  fixed z-[99] top-0 right-0 ">
      <h1 className="text-5xl font-black absolute left-1/2 top-1/2 -translate-x-1/2  -translate-y-1/2">
        Error 404 | Not Found
      </h1>
    </div>
  );
};

export default Trailer;
