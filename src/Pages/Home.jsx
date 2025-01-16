import { useEffect, useState } from "react";
import axios from "../utils/axios";
import Sidenav from "../components/Sidenav";
import Search from "../components/Search";
import Header from "../components/Header";
import { useFetch } from "../Hooks/useFetch";
import Cards from "../components/Cards";
import Dropdown from "../components/Dropdown";
import Loading from "./Loading";

function Home() {
  document.title = "Reelflix | Homepage";
  const [wallpaper, setWallpaper] = useState(null);
  const { data, error } = useFetch("trending/all/day");
  const [cat, setCat] = useState("all");
  useEffect(() => {
    if (data && !wallpaper) {
      const randomData = data[(Math.random() * data.length).toFixed()];
      setWallpaper(randomData);
    }
  }, [data]);

  return wallpaper ? (
    <div className=" md:w-[80vw] w-full  h-full relative ">
      <Search />
      <Header data={wallpaper} />
      <div className="flex justify-between px-5 mt-4 items-center">
        <h1 className="text-3xl  ">Trending</h1>
        <Dropdown
          title="Category"
          options={["all", "movie", "tv"]}
          func={(e) => setCat(e.target.value)}
        />
      </div>
      <Cards data={data} cat={cat} />
    </div>
  ) : error ? (
    <div className="h-screen w-full flex justify-center items-center bg-zinc-900 text-white text-4xl font-bold">
      <h1>{error.message}</h1>
    </div>
  ) : (
    <Loading />
  );
}
export default Home;
