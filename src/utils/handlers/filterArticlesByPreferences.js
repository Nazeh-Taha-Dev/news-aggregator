/**
 * Filters articles by user preferences.
 * @param {array} articles - An array of article objects.
 * @param {object} storedPreferences - An object with user preferences.
 * @returns {array} An array of filtered articles.
 */
export function filterArticlesByPreferences(articles, storedPreferences) {
  if (
    !storedPreferences?.source?.length &&
    !storedPreferences?.category?.length &&
    !storedPreferences?.author?.length
  ) {
    return articles;
  }

  const filteredArticles = articles.filter((article) => {
    // Check each preferred value against the article's values
    const matches = Object.keys(storedPreferences).some((key) => {
      return storedPreferences[key].includes(article[key]);
    });
    return matches; // Return true if at least one match is found
  });

  return filteredArticles;
}
