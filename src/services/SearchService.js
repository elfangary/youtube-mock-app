import axios from "axios";
import { SEARCH_API } from "@/api";

export default {
  /**
   * search service accepts searchQueryStr arg
   *
   * @param {String} searchQueryStr
   */
  async search(searchQueryStr) {
    const res = await axios.get(SEARCH_API(searchQueryStr));
    return res.data;
  }
};
