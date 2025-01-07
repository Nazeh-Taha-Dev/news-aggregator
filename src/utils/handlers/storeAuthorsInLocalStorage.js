/**
 * Stores a deduplicated and sorted list of authors in localStorage.
 *
 * This function takes an array of articles, extracts the author or byline from
 * each article, removes any empty values, deduplicates the list, sorts it
 * alphabetically, and then saves the resulting list in localStorage under the
 * key "authorsList".
 *
 * @param {Array} articles - An array of article objects with author or byline properties.
 */
export function storeAuthorsInLocalStorage(articles) {
  if (!Array.isArray(articles) || articles.length === 0) return;

  // Extract authors, remove "By" from the start, deduplicate, and sort
  const newAuthors = articles
    .map((article) => {
      const author = article?.author;
      if (!author) return null;
      const cleanedAuthor = author.replace(/^By\s+/i, ""); // Remove "By"
      return cleanedAuthor.split(" ").slice(0, 2).join(" "); // Take first two words
    })
    .filter(Boolean); // Remove null/empty values

  // Retrieve existing authors from localStorage
  const existingAuthors = JSON.parse(localStorage.getItem("authorsList") || "[]")
    .map((item) => item.value);

  // Merge, deduplicate, and sort
  const mergedAuthors = Array.from(new Set([...existingAuthors, ...newAuthors]))
    .sort()
    .map((author) => ({ label: author, value: author }));

  // Store the updated list in localStorage
  localStorage.setItem("authorsList", JSON.stringify(mergedAuthors));
}
