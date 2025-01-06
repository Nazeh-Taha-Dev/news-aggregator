import { v4 as uuidv4 } from "uuid"; // create random id's
import { formatDate } from "./formatDate";
import { PAGE_SIZE } from "../../services/base-urls-consts";

// Normalize NewsAPI response
const normalizeNewsAPIResponse = (response) => {
  if (!response) return { articles: [], totalPages: 1 }; // if error
  const totalResults = response?.totalResults || PAGE_SIZE;
  const totalPages = Math.ceil(totalResults / PAGE_SIZE);

  return {
    articles: response.articles.map((article) => ({
      id: uuidv4(),
      title: article?.title || "",
      description: article?.description || "",
      url: article?.url || "",
      source: "News Api",
      publishedAt: article?.publishedAt
        ? formatDate(article.publishedAt)
        : "--",
      image: article?.urlToImage || "",
    })),
    totalPages,
  };
};

// Normalize The Guardian response
const normalizeGuardianResponse = (response) => {
  if (!response) return { articles: [], totalPages: 1 }; // if error

  const totalPages = response?.response?.pages || 1;

  return {
    articles: response.response.results.map((article) => ({
      id: uuidv4(),
      title: article?.webTitle || "",
      description: article?.fields?.trailText || "",
      url: article?.webUrl || "",
      source: "The Guardian",
      publishedAt: article?.webPublicationDate
        ? formatDate(article?.webPublicationDate)
        : "--",
      image: article?.fields?.thumbnail || "",
    })),
    totalPages,
  };
};

// Normalize NYT response
const normalizeNYTResponse = (response) => {
  if (!response) return { articles: [], totalPages: 1 }; // if error

  const totalHits = response?.response?.meta?.hits;
  const totalPages = Math.ceil(totalHits / PAGE_SIZE);

  return {
    articles: response.response.docs.map((article) => ({
      id: uuidv4(),
      title: article?.headline?.main || "",
      description: article?.snippet || "",
      url: article?.web_url || "",
      source: "The New York Times",
      publishedAt: article.pub_date ? formatDate(article.pub_date) : "--",
      image: article?.multimedia?.[0]?.url
        ? `https://static01.nyt.com/${article.multimedia[0].url}`
        : null,
    })),
    totalPages,
  };
};

export {
  normalizeNewsAPIResponse,
  normalizeGuardianResponse,
  normalizeNYTResponse,
};
