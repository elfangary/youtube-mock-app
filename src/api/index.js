const MAIN_API_URL = process.env.VUE_APP_YOUTUBE_API_BASE_URL;
const API_KEY = process.env.VUE_APP_API_KEY;

export const SEARCH_API = searchParams =>
  `${MAIN_API_URL}${searchParams}&key=${API_KEY}`;
