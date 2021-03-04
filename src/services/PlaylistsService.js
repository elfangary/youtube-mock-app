import axios from "axios";
import { PLAYLISTS_API, PLAYLIST_ITEMS_API } from "@/api";

export default {
  /**
   * playlists service accepts ChannelId arg
   *
   * @param {String} channelId
   */
  async playlists(channelId) {
    const res = await axios.get(PLAYLISTS_API(channelId));
    return res.data;
  },

  /**
   * playlistItems service accepts playlistId arg
   *
   * @param {String} playlistId
   */
  async playlistItems(playlistId) {
    const res = await axios.get(PLAYLIST_ITEMS_API(playlistId));
    return res.data;
  }
};
