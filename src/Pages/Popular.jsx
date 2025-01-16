import React, { useEffect, useState } from "react";
import Search from "../components/Search";
import Dropdown from "../components/Dropdown";
import InfiniteScroll from "react-infinite-scroll-component";
import VCards from "../components/VCards";
import { useFetch } from "../Hooks/useFetch"; // Custom hook to fetch data
import Loading from "./Loading";

const Popular = () => {
  document.title = "Reelflix | Popular";
  const [cat, setCat] = useState("movie"); // Default category
  const [cardsData, setCardsData] = useState([]); // Store fetched data
  const [page, setPage] = useState(1); // Track current page for pagination
  const [hasMore, setHasMore] = useState(true); // Flag to indicate more data is available
  const [loading, setLoading] = useState(false); // Prevent multiple fetch calls

  // Fetch data directly from useFetch hook
  const {
    data: fetchedData,
    error,
    loading: fetching,
  } = useFetch(`/${cat}/popular?page=${page}`); // Fetch data based on filters

  const fetchPopularData = async () => {
    if (loading || page > 6) return; // Prevent fetch if already loading or page exceeds limit
    setLoading(true); // Set loading state to true

    try {
      if (fetchedData && Array.isArray(fetchedData)) {
        setCardsData((prev) => [...prev, ...fetchedData]); // Append new data to existing data
        if (fetchedData.length === 0 || page > 6) {
          setHasMore(false); // If no data is returned, stop fetching
        }
      } else {
        console.error("Fetched data is not an array or is null:", fetchedData); // Log the error if fetchedData isn't an array
      }
    } catch (error) {
      console.error("Error fetching data:", error); // Handle any errors
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  useEffect(() => {
    setPage(1); // Reset to page 1
    setCardsData([]); // Clear existing data
    setHasMore(true); // Reset hasMore to true for new fetch
  }, [cat]);

  // Fetch data when the component first mounts or when page changes
  useEffect(() => {
    if (page === 1) {
      fetchPopularData(); // Fetch initial data
    } else if (fetchedData !== null) {
      fetchPopularData(); // Fetch data when page changes
    }
  }, [page, fetchedData]); // Trigger fetch on page change or new fetched data
  useEffect(() => {
    return () => {
      setCardsData([]);
    };
  }, []);
  // Trigger fetching when page number increases (on scroll)
  useEffect(() => {
    if (fetchedData && Array.isArray(fetchedData) && fetchedData.length > 0) {
      fetchPopularData(); // Fetch new data when the page changes
    }
  }, [fetchedData]); // Trigger fetch when `fetchedData` changes

  const getMoreData = () => {
    if (!loading) setPage((prev) => prev + 1); // Increment page number to load more data
  };

  return cardsData.length > 0 ? (
    <div className="md:w-[80vw] w-full">
      <Search />
      <div className="px-5 flex justify-between mt-5">
        <div className="flex items-center gap-4">
          <i className="ri-arrow-right-circle-fill text-3xl hover:text-golden-yellow cursor-pointer"></i>
          <h1 className="text-3xl font-bold">
            Popular{" "}
            <span className="text-xs text-zinc-500">
              ({cat.split("_").join(" ")})
            </span>
          </h1>
        </div>
        <div className="flex gap-4">
          <Dropdown
            title={cat}
            options={["movie", "tv"]}
            func={(e) => setCat(e.target.value)} // Update category filter
          />
        </div>
      </div>

      {/* Display cards or loading message */}
      {cardsData.length > 0 ? (
        <InfiniteScroll
          dataLength={cardsData.length}
          next={getMoreData} // Load more data when scrolled to bottom
          hasMore={hasMore} // Stop fetching when no more data is available
          loader={
            <h4 className="text-4xl text-center text-white">Loading...</h4>
          }
        >
          <VCards title={cat} cardsData={cardsData} />{" "}
          {/* Display fetched cards */}
        </InfiniteScroll>
      ) : fetching ? (
        <h4 className="text-center text-4xl text-white">Loading...</h4> // Show loading if data is still being fetched
      ) : (
        <h4 className="text-center text-2xl text-white">No data available.</h4> // Show message if no data available
      )}
    </div>
  ):(
    <Loading/>
  )
};

export default Popular;
