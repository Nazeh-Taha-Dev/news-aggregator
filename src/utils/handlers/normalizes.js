import { v4 as uuidv4 } from "uuid"; // create random id's

// Normalize NewsAPI response
const normalizeNewsAPIResponse = (data) => {
  if (!data?.articles) return []; // if error
  return data.articles.map((article) => ({
    id: uuidv4(),
    title: article.title,
    description: article.description,
    url: article.url,
    source: "News Api",
    publishedAt: article.publishedAt,
    image: article.urlToImage,
  }));
};

// Normalize The Guardian response
const normalizeGuardianResponse = (data) => {
  if (!data?.response?.results) return []; // if error
  return data.response.results.map((article) => ({
    id: uuidv4(),
    title: article?.webTitle,
    description: article?.fields?.trailText || "",
    url: article?.webUrl || "",
    source: "The Guardian",
    publishedAt: article?.webPublicationDate || "",
    image: article?.fields?.thumbnail || "",
  }));
};

// Normalize NYT response
const normalizeNYTResponse = (data) => {
  if (!data.response.docs) return []; // if error‰ß
  return data.response.docs.map((article) => ({
    id: uuidv4(),
    title: article.headline.main,
    description: article.snippet,
    url: article.web_url,
    source: "The New York Times",
    publishedAt: article.pub_date,
    image: article.multimedia?.[0]?.url
      ? `https://static01.nyt.com/${article.multimedia[0].url}`
      : null,
  }));
};

export {
  normalizeNewsAPIResponse,
  normalizeGuardianResponse,
  normalizeNYTResponse,
};
