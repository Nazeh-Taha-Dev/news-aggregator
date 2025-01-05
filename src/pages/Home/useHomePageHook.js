import { useCallback, useEffect, useState } from "react";
import {
  fetchGuardianArticles,
  fetchNewsAPIArticles,
  fetchNYTArticles,
} from "../../services/api";
import { useDebounce } from "../../utils/hooks";

const useHomePageHook = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
 
  const debouncedSearchTerm = useDebounce(searchTerm, 500); // Use the debounced value

  const fetchArticles = useCallback(async () => {
    setLoading(true);
    setArticles([]); // Clear previous articles

    try {
      const [newsAPIData, guardianData, nytData] = await Promise.all([
        fetchNewsAPIArticles({
          pageSize: 10,
          page: 1,
          sortBy: "publishedAt",
          q: debouncedSearchTerm || "latest",
        }),
        fetchGuardianArticles({
          pageSize: 10,
          page: 1,
          "show-fields": "trailText,thumbnail",
          q: debouncedSearchTerm,
        }),
        fetchNYTArticles({ pageSize: 10, page: 1, q: debouncedSearchTerm }),
      ]);

      setArticles([
        ...newsAPIData.payload,
        ...guardianData.payload,
        ...nytData.payload,
      ]);
    } catch (err) {
      console.error("Error fetching articles:", err);
    } finally {
      setLoading(false);
    }
  }, [debouncedSearchTerm]);

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  const handleChangeSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return { articles, searchTerm, handleChangeSearch, loading };
};

export default useHomePageHook;
