import React, { useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";

const Sidenav = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const linksArr = [
    [
      {
        name: "Trending",
        icon: "ri-fire-fill md:text-2xl mr-2",
      },
      {
        name: "Popular",
        icon: "ri-sparkling-fill md:text-2xl mr-2",
      },
      {
        name: "Movie",
        icon: "ri-movie-fill md:text-2xl mr-2",
      },
      {
        name: "TV",
        icon: "ri-tv-fill md:text-2xl mr-2",
      },
      {
        name: "People",
        icon: "ri-group-2-fill md:text-2xl mr-2",
      },
    ],
    [
      {
        name: "About",
        icon: "ri-information-2-fill md:text-2xl mr-2",
      },
      {
        name: "Contact Us",
        icon: "ri-phone-fill md:text-2xl mr-2",
      },
    ],
  ];

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Mobile Hamburger Button */}
      <button
        onClick={toggleSidebar}
        className={`md:hidden fixed top-4 transition-all duration-300 z-[9999] ${
          isOpen ? "left-[85%]" : "left-2"
        } z-50 px-2 py-1 bg-golden-yellow rounded-md`}
      >
        <i className={`ri-${isOpen ? "close" : "menu"}-line text-2xl`}></i>
      </button>

      {/* Sidebar */}
      <div
        className={`
          fixed md:sticky  top-0 left-0 
          w-screen md:w-[20vw] 
           bg-black
          z-[999]
          h-screen
          transform transition-transform duration-300 ease-in-out 
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 
          md:border-r-[4px] border-r-zinc-500 
          px-5 
          z-40
          
          top-0
          left-0
        `}
      >
        <Link
          to="/reelflix/"
          className="flex text-4xl text-golden-yellow gap-2 items-center py-2 mt-5"
        >
          <i className="ri-movie-2-ai-fill"></i>
          <h1 className="font-bold">ReelFlix</h1>
        </Link>

        {/* Mobile and Desktop News Feeds Section */}
        <nav className="mt-5">
          <h2 className="text-2xl font-semibold hidden md:block">News Feeds</h2>
          <ul className="pl-5 md:mt-10 flex flex-col">
            {linksArr[0].map((item, index) => (
              <NavLink
                key={index}
                to={`/reelflix/${item.name.toLowerCase().replace(/\s+/g, "-")}`}
                onClick={toggleSidebar}
                className={({ isActive }) =>
                  `md:text-xl md:mb-5  ${
                    isActive
                      ? "bg-golden-yellow bg-opacity-90 text-zinc-900"
                      : "bg-transparent text-white"
                  } hover:bg-golden-yellow items-center hover:text-black p-5 rounded transition duration-300 flex gap-2 font-semibold`
                }
              >
                <i className={item.icon}></i>
                <h3>{item.name}</h3>
              </NavLink>
            ))}
          </ul>
        </nav>

        <hr className="border-none h-[2px] bg-zinc-500 hidden md:block" />

        {/* Mobile and Desktop Website Information Section */}
        <nav className="md:mt-10 mt-5">
          <h2 className="text-2xl font-semibold hidden md:block">
            Website Information
          </h2>
          <ul className="pl-5 md:mt-10 flex flex-col">
            {linksArr[1].map((item, index) => (
              <NavLink
                key={index}
                to={`/${item.name.toLowerCase().replace(/\s+/g, "-")}`}
                onClick={toggleSidebar}
                className={({ isActive }) =>
                  `md:text-xl md:mb-5  ${
                    isActive
                      ? "bg-golden-yellow bg-opacity-90 text-zinc-900"
                      : "bg-transparent text-white"
                  } items-center hover:bg-golden-yellow hover:text-black p-5 rounded transition duration-300 flex gap-2 font-semibold`
                }
              >
                <i className={item.icon}></i>
                <h3>{item.name}</h3>
              </NavLink>
            ))}
          </ul>
        </nav>
      </div>

      {/* Overlay for mobile when sidebar is open */}
      {isOpen && (
        <div
          onClick={toggleSidebar}
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
        ></div>
      )}
    </>
  );
};

export default Sidenav;
