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
  const [currentPage, setCurrentPage] = useState(1);

  const totalPagesRef = useRef({
    guardian: 2,
    newsAPI: 2,
    nyt: 2,
  });

  const hasMore =
    currentPage < totalPagesRef.current.guardian ||
    currentPage < totalPagesRef.current.newsAPI ||
    currentPage < totalPagesRef.current.nyt;

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const fetchArticles = useCallback(
    async (page = 1) => {
      const reset = page === 1;
      if (reset) {
        setArticles([]);
      }
      setCurrentPage(page);
      setLoading(true);

      const fetchTasks = [
        page < totalPagesRef.current.newsAPI &&
          fetchNewsAPIArticles({
            page,
            from: date,
            category,
            sources: source,
            sortBy: "publishedAt",
            q: debouncedSearchTerm || "latest",
          }).catch((error) => {
            console.error("Error fetching NewsAPI articles:", error);
            return {
              payload: {
                articles: [],
                totalPages: totalPagesRef.current.newsAPI,
              },
            };
          }),
        page < totalPagesRef.current.guardian &&
          fetchGuardianArticles({
            page,
            "from-date": date,
            section: category,
            source,
            "show-fields": "trailText,thumbnail",
            q: debouncedSearchTerm,
          }).catch((error) => {
            console.error("Error fetching Guardian articles:", error);
            return {
              payload: {
                articles: [],
                totalPages: totalPagesRef.current.guardian,
              },
            };
          }),
        page < totalPagesRef.current.nyt &&
          fetchNYTArticles({
            begin_date: formatNYTDate(date),
            section: category,
            source,
             page,
             q: debouncedSearchTerm }).catch((error) => {
            console.error("Error fetching NYT articles:", error);
            return {
              payload: { articles: [], totalPages: totalPagesRef.current.nyt },
            };
          }),
      ];

      try {
        const [newsAPIData, guardianData, nytData] = await Promise.all(
          fetchTasks
        );

        totalPagesRef.current = {
          newsAPI:
            newsAPIData?.payload?.totalPages || totalPagesRef.current.newsAPI,
          guardian:
            guardianData?.payload?.totalPages || totalPagesRef.current.guardian,
          nyt: nytData?.payload?.totalPages || totalPagesRef.current.nyt,
        };

        const newArticles = [
          ...(newsAPIData?.payload?.articles || []),
          ...(guardianData?.payload?.articles || []),
          ...(nytData?.payload?.articles || []),
        ];

        setArticles((prevArticles) => [...prevArticles, ...newArticles]);
      } catch (error) {
        console.error("Error fetching articles:", error);
      } finally {
        setLoading(false);
      }
    },
    [category, date, debouncedSearchTerm, source]
  );

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  const fetchNextPageArticles = useCallback(() => {
    fetchArticles(currentPage + 1);
  }, [currentPage, fetchArticles]);

  return { articles, loading, fetchNextPageArticles, hasMore };
};

export default useHomePageHook;
