import {
  GUARDIAN_API_KEY,
  GUARDIAN_API_URL,
  NEWS_API_KEY,
  NEWS_API_URL,
  NYT_API_KEY,
  NYT_API_URL,
  PAGE_SIZE,
} from "../constants";
import {
  normalizeGuardianResponse,
  normalizeNewsAPIResponse,
  normalizeNYTResponse,
  removeEmptyValues,
} from "../utils/handlers";
import { apiHandler } from "../utils/handlers";



// Fetch articles from NewsAPI
export const fetchNewsAPIArticles = (params) => {
  const urlParams = {
    apiKey: NEWS_API_KEY,
    pageSize: PAGE_SIZE,
    ...removeEmptyValues(params), // remove empty values from params,
  };
  return apiHandler({
    url: NEWS_API_URL,
    urlParams,
    normalizeResponseFunction: normalizeNewsAPIResponse,
  });
};

// Fetch articles from The Guardian
export const fetchGuardianArticles = (params) => {
  const urlParams = {
    "api-key": GUARDIAN_API_KEY,
    pageSize: PAGE_SIZE,
    ...removeEmptyValues(params),
  };
  return apiHandler({
    url: GUARDIAN_API_URL,
    urlParams,
    normalizeResponseFunction: normalizeGuardianResponse,
  });
};

// Fetch articles from The New York Times
export const fetchNYTArticles = (params) => {
  const urlParams = {
    "api-key": NYT_API_KEY,
     pageSize: PAGE_SIZE,
    ...removeEmptyValues(params),
  };
  return apiHandler({
    url: NYT_API_URL,
     pageSize: PAGE_SIZE,
    urlParams,
    normalizeResponseFunction: normalizeNYTResponse,
  });
};
