
/**
 * Makes an API call to given URL, with query and method,
 * and returns a promise with response data normalized by given function.
 *
 * @param {Object} options
 * @param {string} options.url - Base URL of the API
 * @param {Object} options.urlParams - Query parameters to be added to the URL
 * @param {string} options.method - HTTP method to use (default: GET)
 * @param {function} options.normalizeResponseFunction - Function to normalize the response data
 * @returns {Promise<Object>} - Promise with response data,
 *                              with {status, message, payload} properties
 */
export async function apiHandler({
  url = "",
  urlParams = {},
  method = "GET",
  normalizeResponseFunction,
}) {

  const params = new URLSearchParams(urlParams);
  const URL = `${url}${params.toString()}`;

  try {
    const response = await fetch(URL, {
      method,
    });
    if (!response.ok)
      return {
        status: "error",
        message: "Failed to fetch data",
        payload: normalizeResponseFunction
        ? normalizeResponseFunction(null)
        : null,
      };
      
    const data = await response.json();

    return {
      status: "success",
      message: "succeed to fetch data",
      payload: normalizeResponseFunction
        ? normalizeResponseFunction(data)
        : data,
    };
  } catch (error) {
    return {
      status: "error",
      message: "Failed to fetch data",
      payload: normalizeResponseFunction
      ? normalizeResponseFunction(null)
      : null,
    };
  }
}
