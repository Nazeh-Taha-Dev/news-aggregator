import { useCallback, useRef } from "react";

/**
 * useInfiniteScroll
 *
 * This hook helps to implement infinite scroll feature in lists.
 *
 * It takes 3 props in an object:
 * - hasMore: boolean indicating whether there are more pages to load.
 * - isLoading: boolean indicating whether the next page is being loaded.
 * - loadNextPage: a function to be called when the next page should be loaded.
 *
 * The hook returns an object with a single property: lastItemRef.
 * This is a function that should be passed to the last item in the list.
 * It sets up an observer that will call loadNextPage when the last item
 * comes into view.
 */
export const useInfiniteScroll = ({
    hasMore,
    isLoading,
    loadNextPage,
  }) => {
    const observer = useRef();
  
    const lastItemRef = useCallback(
      (node) => {
        if (isLoading) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver((entries) => {
          if (entries[0].isIntersecting && hasMore) {
            loadNextPage();
          }
        });
        if (node) observer.current.observe(node);
      },
      [isLoading, hasMore, loadNextPage]
    );
  
    return { lastItemRef };
  };