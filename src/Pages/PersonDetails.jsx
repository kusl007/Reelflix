import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  clearPeopleInfo,
  fetchPeopleDetails,
} from "../redux/actions/peopleActions";
import Cards from "../components/Cards";
import Dropdown from "../components/Dropdown";
import Loading from "./Loading";

const PersonDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { info } = useSelector((state) => state.people);
  const dispatch = useDispatch();
  const [category, setCategory] = useState("movie");

  useEffect(() => {
    dispatch(fetchPeopleDetails(id));
    return () => {
      dispatch(clearPeopleInfo());
    };
  }, [id]);

  return (
    info ? (
      <div className="px-5 sm:px-10 lg:px-[10%] w-[80vw]  mx-auto min-h-screen  text-white">
        {/* Navigation */}
        <nav className="h-[8vh] w-full flex items-center gap-4 text-xl">
          <button
            onClick={() => navigate(-1)}
            className="hover:text-[#6556CD] ri-arrow-left-line"
          />
        </nav>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Left Section: Poster and Details */}
          <div className="lg:w-[30%] w-full">
            <img
              className="shadow-lg rounded-md h-[50vh] object-cover w-full"
              src={`https://image.tmdb.org/t/p/original/${info?.detail?.profile_path}`}
              alt={`${info?.detail?.name}`}
            />
            <hr className="mt-8 mb-5 border-none h-[2px] bg-zinc-500" />

            {/* Social Media Links */}
            <div className="flex gap-4 text-2xl">
              {info?.externalid?.wikidata_id && (
                <a
                  target="_blank"
                  href={`https://www.wikidata.org/wiki/${info?.externalid?.wikidata_id}`}
                  className="hover:text-[#6556CD]"
                >
                  <i className="ri-earth-fill"></i>
                </a>
              )}
              {info?.externalid?.facebook_id && (
                <a
                  target="_blank"
                  href={`https://www.facebook.com/${info?.externalid?.facebook_id}`}
                  className="hover:text-[#6556CD]"
                >
                  <i className="ri-facebook-circle-fill"></i>
                </a>
              )}
              {info?.externalid?.instagram_id && (
                <a
                  target="_blank"
                  href={`https://www.instagram.com/${info?.externalid?.instagram_id}`}
                  className="hover:text-[#6556CD]"
                >
                  <i className="ri-instagram-fill"></i>
                </a>
              )}
              {info?.externalid?.twitter_id && (
                <a
                  target="_blank"
                  href={`https://twitter.com/${info?.externalid?.twitter_id}`}
                  className="hover:text-[#6556CD]"
                >
                  <i className="ri-twitter-x-fill"></i>
                </a>
              )}
            </div>

            {/* Personal Information */}
            <div className="mt-8 space-y-4">
              <h2 className="text-xl font-semibold text-zinc-400">
                Person Info
              </h2>
              <div>
                <h3 className="text-lg font-semibold">Known For</h3>
                <p>{info?.detail?.known_for_department}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Gender</h3>
                <p>{info?.detail?.gender === 2 ? "Male" : "Female"}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Birthday</h3>
                <p>{info?.detail?.birthday}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Deathday</h3>
                <p>{info?.detail?.deathday || "Still Alive"}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Place of Birth</h3>
                <p>{info?.detail?.place_of_birth}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Also Known As</h3>
                <p>{info?.detail?.also_known_as?.join(", ")}</p>
              </div>
            </div>
          </div>

          {/* Right Section: Details and Information */}
          <div className="lg:w-[65%] w-full">
            <h1 className="text-4xl sm:text-5xl font-black text-zinc-400">
              {info?.detail?.name}
            </h1>
            <section className="mt-5">
              <h2 className="text-xl font-semibold">Biography</h2>
              <p className="mt-3 md:text-sm text-xs">
                {window.innerWidth >= 600
                  ? info?.detail?.biography
                  : info?.detail?.biography?.slice(0, 600) + "..."}
              </p>
            </section>

            <section className="mt-8">
              <h2 className="text-lg font-semibold">Known For</h2>
              <Cards data={info?.combinedCredits?.cast} />
            </section>

            <section className="mt-8">
              <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center">
                <h2 className="text-xl font-semibold">Acting</h2>
                <Dropdown
                  title="Category"
                  options={["tv", "movie"]}
                  func={(e) => setCategory(e.target.value)}
                />
              </div>
              <ul className="mt-5 h-[50vh] overflow-y-auto p-5 border border-zinc-700 rounded-md shadow-lg">
                {info?.[`${category}Credits`]?.cast?.map((c, i) => (
                  <li
                    key={i}
                    className="hover:bg-[#19191d] p-4 rounded-md transition duration-300 cursor-pointer"
                  >
                    <Link
                      to={`/reelflix/${category}/details/${c?.id}`}
                      className="block"
                    >
                      <strong>{c?.name || c?.title}</strong>
                      {c?.character && (
                        <span className="block text-sm mt-1 text-zinc-400">
                          Character Name: {c.character}
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </div>
    ):(
      <Loading/>
    )
  );
};

export default PersonDetails;
