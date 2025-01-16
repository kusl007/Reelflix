import { useEffect, useState } from "react";

import Search from "../components/Search";

import { useFetch } from "../Hooks/useFetch";

import Dropdown from "../components/Dropdown";
import InfiniteScroll from "react-infinite-scroll-component";
import VCards from "../components/VCards";
import Loading from "./Loading";

const People = () => {
  document.title = "Reelflix | People";
  const [cardsData, setCardsData] = useState([]); // Store fetched data
  const [page, setPage] = useState(1); // Track current page for pagination
  const [hasMore, setHasMore] = useState(true); // Flag to indicate more data is available
  const [loading, setLoading] = useState(false); // Prevent multiple fetch calls

  // Fetch data directly from useFetch hook
  const {
    data: fetchedData,
    error,
    loading: fetching,
  } = useFetch(`person/popular?page=${page}`); // Fetch data based on filters

  const fetchPeopleData = async () => {
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

  // Reset data when category or duration changes

  // Fetch data when the component first mounts or when page changes
  useEffect(() => {
    if (page === 1) {
      fetchPeopleData(); // Fetch initial data
    } else if (fetchedData !== null) {
      fetchPeopleData(); // Fetch data when page changes
    }
  }, [page, fetchedData]); // Trigger fetch on page change or new fetched data

  // Trigger fetching when page number increases (on scroll)
  useEffect(() => {
    if (fetchedData && Array.isArray(fetchedData) && fetchedData.length > 0) {
      fetchPeopleData(); // Fetch new data when the page changes
    }
  }, [fetchedData]); // Trigger fetch when `fetchedData` changes

  const getMoreData = () => {
    if (!loading) setPage((prev) => prev + 1); // Increment page number to load more data
  };
  useEffect(() => {
    return () => {
      setCardsData([]);
    };
  }, []);
  return cardsData.length > 0 ?(
    <div className="md:w-[80vw] w-full">
      <Search />
      <div className="px-5 flex justify-between mt-5">
        <div className="flex items-center gap-4">
          <i className="ri-arrow-right-circle-fill text-3xl hover:text-golden-yellow cursor-pointer"></i>
          <h1 className="text-3xl font-bold">People</h1>
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
          <VCards title="person" cardsData={cardsData} />{" "}
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

export default People;
