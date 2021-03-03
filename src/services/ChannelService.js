import axios from "axios";
import { CHANNEL_DETAILS_API, CHANNEL_SECTIONS_API } from "@/api";

export default {
  /**
   * channelDetails service accepts channelId arg
   *
   * @param {String} channelId
   */
  async channelDetails(channelId) {
    const res = await axios.get(CHANNEL_DETAILS_API(channelId));
    return res.data;
  },

  /**
   * channelSections service accepts channelId arg
   *
   * @param {String} channelId
   */
  async channelSections(channelId) {
    const res = await axios.get(CHANNEL_SECTIONS_API(channelId));
    return res.data;
  }
};
