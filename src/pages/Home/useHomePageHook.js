import { useCallback, useEffect, useRef, useState } from "react";
import {
  fetchGuardianArticles,
  fetchNewsAPIArticles,
  fetchNYTArticles,
} from "../../services/api";
import { useDebounce } from "../../utils/hooks";
import { useFilterData } from "./FilterDataContext";
import {
  formatNYTDate,
  storeAuthorsInLocalStorage,
} from "../../utils/handlers";
import { usePreferencesData } from "../../global-context";
import { filterArticlesByPreferences } from "../../utils/handlers";

/**
 * A hook that fetches articles based on the filters provided in the context.
 * It handles debouncing of the search term and category, and stores the fetched
 * articles in the context.
 *
 * @returns {object} An object with the following properties:
 * - articles: An array of fetched articles.
 * - loading: A boolean indicating if the articles are being fetched.
 * - fetchNextPageArticles: A function to fetch the next page of articles.
 * - hasMore: A boolean indicating if there are more articles to fetch.
 * - error: An error message if the articles failed to fetch.
 */
const useHomePageHook = () => {
  const { filterData } = useFilterData();
  const { preferences } = usePreferencesData();
  const { searchTerm, category, source, date } = filterData;
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);

  // Refs to store the total pages of each source
  const totalPagesRef = useRef({ guardian: 2, newsAPI: 2, nyt: 2 });
  const isFetching = useRef(false);

  /**
   * Returns a boolean indicating if there are more articles to fetch.
   * If the source is not specified, it checks if any of the sources have more pages.
   * If the source is specified, it checks if that specific source has more pages.
   */
  const hasMore = useCallback(() => {
    if (!source) {
      return Object.keys(totalPagesRef.current).some(
        (key) => page < totalPagesRef.current[key]
      );
    }
    return page < totalPagesRef.current[source];
  }, [page, source, totalPagesRef]);

  // Debounce the search term and category
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const debouncedCategory = useDebounce(category, 500);
  /**
   * Fetches articles from the specified sources.
   * If the source is not specified, it fetches from all sources.
   */
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
        setArticles((prevArticles) => {
          storeAuthorsInLocalStorage([...prevArticles, ...newArticles]); // Store authors
          return [
            ...prevArticles,
            ...filterArticlesByPreferences(newArticles, preferences),
          ];
        });
      } catch (error) {
        console.error("Error fetching articles:", error);
        setError("Failed to fetch articles.");
      } finally {
        setLoading(false);
        isFetching.current = false;
      }
    },
    [preferences, source]
  );

  /**
   * Fetches articles from the specified source.
   * If the source is not specified, it fetches from all sources.
   */
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
            "show-fields": "trailText,thumbnail,byline",
            q: debouncedSearchTerm,
          }),
        newYorkTimes: () =>
          fetchNYTArticles({
            page: _page,
            begin_date: formatNYTDate(date),
            section: debouncedCategory,
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

  /**
   * Fetches the next page of articles.
   */
  const fetchNextPageArticles = useCallback(() => {
    fetchArticles(page + 1);
  }, [fetchArticles, page]);

  return {
    articles,
    loading,
    fetchNextPageArticles,
    hasMore,
    error,
  };
};

export default useHomePageHook;
