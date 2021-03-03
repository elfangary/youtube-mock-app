import axios from "axios";
import { VIDEO_API } from "@/api";

export default {
  /**
   * videoDetails service accepts videoId arg
   *
   * @param {string} videoId
   */
  async videoDetails(videoId) {
    const res = await axios.get(VIDEO_API(videoId));
    return res.data;
  }
};
