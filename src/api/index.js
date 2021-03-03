const MAIN_API_URL = process.env.VUE_APP_YOUTUBE_API_BASE_URL;
const API_KEY = process.env.VUE_APP_API_KEY;

export const SEARCH_API = searchParams =>
  `${MAIN_API_URL}/search?${searchParams}&key=${API_KEY}`;

export const VIDEO_API = id =>
  `${MAIN_API_URL}/videos?part=id,snippet,statistics&id=${id}&key=${API_KEY}`;

export const RELATED_VIDEOS_API = id =>
  `${MAIN_API_URL}/search?part=snippet&relatedToVideoId=${id}&type=video&maxResults=10&key=${API_KEY}`;
