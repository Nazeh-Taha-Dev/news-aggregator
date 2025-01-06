import { useCallback, useEffect, useRef, useState } from "react";
import {
  fetchGuardianArticles,
  fetchNewsAPIArticles,
  fetchNYTArticles,
} from "../../services/api";
import { useDebounce } from "../../utils/hooks";
import { useFilterData } from "./FilterDataContext";
import { formatNYTDate } from "../../utils/handlers";

const useHomePageHook = () => {
  const { filterData } = useFilterData();
  const { searchTerm, category, source, date } = filterData;
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);

  const totalPagesRef = useRef({ guardian: 2, newsAPI: 2, nyt: 2 });
  const isFetching = useRef(false);
  const hasMore = !!source
    ? page < totalPagesRef.current[source]
    : Object.keys(totalPagesRef.current).some(
        (key) => page < totalPagesRef.current[key]
      );

  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const debouncedCategory = useDebounce(category, 500);

  const fetchArticlesFromSources = useCallback(
    async (fetchTasks) => {
      try {
        const results = await Promise.all(
          Array.isArray(fetchTasks) ? fetchTasks : [fetchTasks]
        );

        const updatedTotalPages = { ...totalPagesRef.current };
        const newArticles = [];

        results.forEach((result, index) => {
          const sourceName = Array.isArray(fetchTasks)
            ? ["newsAPI", "guardian", "nyt"][index]
            : source;
          updatedTotalPages[sourceName] =
            result?.payload?.totalPages || updatedTotalPages[sourceName];
          newArticles.push(...(result?.payload?.articles || []));
        });

        totalPagesRef.current = updatedTotalPages;
        setArticles((prevArticles) => [...prevArticles, ...newArticles]);
      } catch (error) {
        console.error("Error fetching articles:", error);
        setError("Failed to fetch articles.");
      } finally {
        setLoading(false);
        isFetching.current = false;
      }
    },
    [source]
  );

  const fetchArticles = useCallback(
    async (_page = 1) => {
      if (isFetching.current) return;
      isFetching.current = true;

      const reset = _page === 1;
      setPage(_page);

      if (reset) {
        setArticles([]);
      }

      setLoading(true);
      const fetchTasks = {
        newsApi: () =>
          fetchNewsAPIArticles({
            page: _page,
            from: date,
            debouncedCategory,
            sortBy: "publishedAt",
            q: debouncedSearchTerm || "latest",
          }),
        theGuardian: () =>
          fetchGuardianArticles({
            page: _page,
            "from-date": date,
            section: debouncedCategory,
            "show-fields": "trailText,thumbnail",
            q: debouncedSearchTerm,
          }),
        newYorkTimes: () =>
          fetchNYTArticles({
            begin_date: formatNYTDate(date),
            section: debouncedCategory,
            page: _page,
            q: debouncedSearchTerm,
          }),
      };

      await fetchArticlesFromSources(
        !!source
          ? fetchTasks[source]()
          : Object.values(fetchTasks).map((task) => task())
      );
    },
    [
      fetchArticlesFromSources,
      source,
      date,
      debouncedCategory,
      debouncedSearchTerm,
    ]
  );

  useEffect(() => {
    setPage(1);
  }, [searchTerm, source, category]);

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  const fetchNextPageArticles = useCallback(() => {
    fetchArticles(page + 1);
  }, [fetchArticles, page]);

  return { articles, loading, fetchNextPageArticles, hasMore, error };
};

export default useHomePageHook;
