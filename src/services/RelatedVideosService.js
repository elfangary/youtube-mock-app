import axios from "axios";
import { RELATED_VIDEOS_API } from "@/api";

export default {
  /**
   * relatedVideos service accepts videoId arg

   * @param {String} videoId
   */
  async relatedVideos(videoId) {
    const res = await axios.get(RELATED_VIDEOS_API(videoId));
    return res.data;
  }
};
