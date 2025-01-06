import { useCallback, useRef } from "react";

  /**
   * Provides a function to trigger loading the next page of data when the
   * last item in the list comes into view.
   *
   * @param {object} options
   * @param {boolean} options.hasMore - Should the next page be loaded?
   * @param {boolean} options.isLoading - Is a load in progress?
   * @param {function} options.loadNextPage - Function to load the next page.
   * @returns {object} An object with a single property, `lastItemRef`.
   *   `lastItemRef` is a function that takes a node and observes it for
   *   intersection with the viewport. When the node comes into view, and
   *   `hasMore` is true, the `loadNextPage` function is called.
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