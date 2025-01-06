import React from "react";
import { Container, Grid2 } from "@mui/material";
import ArticleCard from "../../components/ArticleCard";
import useHomePageHook from "./useHomePageHook";
import { LoadingSkeleton } from "../../components/LoadingSkeleton";
import FilterCard from "../../components/FilterCard";
import { FilterDataProvider } from "./FilterDataContext";
import { useInfiniteScroll } from "../../utils/hooks";


function Home() {
  
  const { loading, articles,hasMore, fetchNextPageArticles } = useHomePageHook();

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
        {loading && <LoadingSkeleton />}
      </Grid2>
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
