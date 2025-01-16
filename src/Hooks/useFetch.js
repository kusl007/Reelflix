import { useEffect, useState } from "react";
import axios from "../utils/axios";

export function useFetch(url) {
  const [data, setData] = useState(null); // Start as null for better error handling
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Reset states when the URL changes
    setData(null);
    setError(null);
    setLoading(true);

    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        setData(response.data.results); // Adjusted based on API structure
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, error, loading };
}
