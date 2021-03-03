/**
 * construct search string query form params object
 *
 * @param {Object} params
 */
export const constructSearchQueryStr = params => {
  let searchQueryStr = "";

  Object.keys(params).map(key => {
    if (params[key]) {
      searchQueryStr += `&${key}=${params[key]}`;
    }
  });

  return searchQueryStr.substring(1);
};
