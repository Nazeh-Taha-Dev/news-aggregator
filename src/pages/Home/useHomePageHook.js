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
  // const isFetching = useRef(false);

  // Debounce the search term, category, source and date
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const debouncedCategory = useDebounce(category, 500);
  const debouncedSource = useDebounce(source, 500);
  const debouncedDate = useDebounce(date, 500);
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

  /**
   * Fetches articles from the specified sources.
   * If the sources are not specified, it fetches from all sources.
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
            : debouncedSource;
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
      }
    },
    [preferences, debouncedSource]
  );

  /**
   * Fetches articles from the specified source.
   * If the source is not specified, it fetches from all sources.
   */
  const fetchArticles = useCallback(
    async (_page = 1) => {
      const reset = _page === 1;
      setPage(_page);

      if (reset) {
        setArticles([]);
      }

      setLoading(true);
      const fetchTasks = {
        /**
         * Fetches articles from NewsAPI.
         * @param {number} _page The page number to fetch.
         * @param {string} debouncedDate The date to filter articles.
         * @param {string} debouncedCategory The category to filter articles.
         * @param {string} debouncedSearchTerm The search term to filter articles.
         */
        newsApi: () =>
          fetchNewsAPIArticles({
            page: _page,
            from: debouncedDate,
            debouncedCategory,
            sortBy: "publishedAt",
            q: debouncedSearchTerm || "latest",
          }),
        /**
         * Fetches articles from The Guardian.
         * @param {number} _page The page number to fetch.
         * @param {string} debouncedDate The date to filter articles.
         * @param {string} debouncedCategory The category to filter articles.
         * @param {string} debouncedSearchTerm The search term to filter articles.
         */
        theGuardian: () =>
          fetchGuardianArticles({
            page: _page,
            "from-date": debouncedDate,
            section: debouncedCategory,
            "show-fields": "trailText,thumbnail,byline",
            q: debouncedSearchTerm,
          }),
        /**
         * Fetches articles from The New York Times.
         *
         * @param {number} _page - The page number to fetch.
         * @param {string} debouncedDate - The date to filter articles from.
         * @param {string} debouncedCategory - The category to filter articles.
         * @param {string} debouncedSearchTerm - The search term to filter articles.
         *
         * @returns {Promise<Object>} - A promise resolving to the fetched articles.
         */
        newYorkTimes: () =>
          fetchNYTArticles({
            page: _page,
            begin_date: formatNYTDate(debouncedDate),
            section: debouncedCategory,
            q: debouncedSearchTerm,
          }),
      };

      await fetchArticlesFromSources(
        !!debouncedSource
          ? fetchTasks[debouncedSource]()
          : Object.values(fetchTasks).map((task) => task())
      );
    },
    [
      fetchArticlesFromSources,
      debouncedSource,
      debouncedDate,
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
