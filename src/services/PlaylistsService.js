import axios from "axios";
import { PLAYLISTS_API } from "@/api";

export default {
  /**
   * playlists service accepts ChannelId arg
   *
   * @param {String} ChannelId
   */
  async playlists(ChannelId) {
    const res = await axios.get(PLAYLISTS_API(ChannelId));
    return res.data;
  }
};
