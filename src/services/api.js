import {
  GUARDIAN_API_URL,
  NEWS_API_URL,
  NYT_API_URL,
} from "./base-urls-consts";
import {
  normalizeGuardianResponse,
  normalizeNewsAPIResponse,
  normalizeNYTResponse,
} from "../utils/handlers";
import { apiHandler } from "../utils/handlers/apiHandler";
const NEWS_API_KEY="191e900eddd449f0b65fdb57db1e9f39"
const GUARDIAN_API_KEY="b12b98aa-0844-4180-b3cb-2223c496ff07"
const NYT_API_KEY="AvMzjWtOGoTtrZKRiTvfrbpYhCrnMnnt"
// Fetch articles from NewsAPI
export const fetchNewsAPIArticles = (params) => {
  const urlParams = {
    apiKey: NEWS_API_KEY,
    ...params,
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
    ...params,
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
    ...params,
  };
  return apiHandler({
    url: NYT_API_URL,
    urlParams,
    normalizeResponseFunction: normalizeNYTResponse,
  });
};
