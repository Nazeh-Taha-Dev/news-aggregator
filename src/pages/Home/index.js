import React from "react";
import { Container, Grid2 } from "@mui/material";
import ArticleCard from "../../components/ArticleCard";
import useHomePageHook from "./useHomePageHook";
import { LoadingSkeleton } from "../../components/LoadingSkeleton";
import FilterCard from "../../components/FilterCard";
import { FilterDataProvider } from "./FilterDataContext";
import { useInfiniteScroll, useLocalStorage } from "../../utils/hooks";
import { PAGE_SIZE } from "../../constants";
import NoResultComponent from "../../components/NoResultComponent";
import { usePreferencesData } from "../../global-context";

/**
 * Home component renders the main content of the page, including a list of articles
 * and filter options. It utilizes hooks to manage state and fetch articles from
 * different sources. The component also supports infinite scrolling to load more
 * articles when the user scrolls to the end of the list.
 *
 * - Displays a loading skeleton while articles are being fetched.
 * - Shows a no result component when no articles match the filters.
 * - Uses the FilterCard component for filtering options.
 * - Uses the ArticleCard component to display individual articles.
 * - Utilizes the useInfiniteScroll hook to load more articles as the user scrolls.
 */
function Home() {
  // Custom hook to fetch articles and manage state
  const { loading, articles, hasMore, fetchNextPageArticles } =
    useHomePageHook();

  // Custom hook for infinite scrolling
  const { lastItemRef } = useInfiniteScroll({
    hasMore,
    isLoading: loading,
    loadNextPage: fetchNextPageArticles,
  });

  return (
    <Container>
      <FilterCard />
      <Grid2 container spacing={2} marginTop={2}>
        {articles.map((article, index) => (
          <Grid2
            item
            size={{ xs: 12, sm: 6, md: 4 }}
            key={article.id}
            ref={index === articles.length - 1 ? lastItemRef : null}
          >
            <ArticleCard article={article} />
          </Grid2>
        ))}
        {loading && <LoadingSkeleton length={PAGE_SIZE} />}
      </Grid2>
      {!loading && articles.length === 0 && <NoResultComponent />}
    </Container>
  );
}

/**
 * The HomePage component is the main page of the application.
 * It renders the Home component which displays the list of articles
 * and the FilterCard component which allows the user to filter the articles.
 * The FilterDataProvider component is used to provide the filter data to the Home component.
 */
export default function HomePage() {
  return (
    <FilterDataProvider>
      <Home />
    </FilterDataProvider>
  );
}
