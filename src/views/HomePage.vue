<template>
  <div class="home-page">
    <MainHeader @submit-search="submitSearch" />
    <Filters @type-search="searchBytype" @date-search="searchByDate" />
    <List :list="list" />
    <ShowMoreButton :handleClick="handleShowMoreItems" />
  </div>
</template>

<script>
import MainHeader from "@/components/MainHeader.vue";
import Filters from "@/components/Filters.vue";
import List from "@/components/List.vue";
import ShowMoreButton from "@/components/ShowMoreButton.vue";
import { constructSearchQuery } from "@/utils/construct_search_query.js";
import { SEARCH_API } from "@/api";

export default {
  name: "HomePage",
  components: { MainHeader, Filters, List, ShowMoreButton },
  data: function() {
    return {
      list: [],
      bindedSearchVal: "",
      bindedTypeVal: "",
      bindedDateVal: "",
      pageToken: ""
    };
  },
  methods: {
    submitSearch(searchVal) {
      this.bindedSearchVal = searchVal;
      this.fetchDataList();
    },
    searchBytype(type) {
      this.bindedTypeVal = type;
      this.fetchDataList();
    },
    searchByDate(date) {
      this.bindedDateVal = date;
      this.fetchDataList();
    },
    handleShowMoreItems() {
      this.fetchDataList();
    },
    constructApiUrl() {
      const searchParams = {
        part: "snippet",
        maxResults: 10,
        type: this.bindedDateVal,
        publishedAfter: this.bindedDateVal,
        q: this.bindedSearchVal?.replace(" ", "+"),
        pageToken: this.pageToken
      };

      const queryStr = constructSearchQuery(searchParams);

      return SEARCH_API(queryStr);
    },
    fetchDataList() {
      const apiUrl = this.constructApiUrl();
      this.axios.get(apiUrl).then(response => {
        this.list = this.list.concat(response.data.items);
        this.pageToken = response.data.nextPageToken;
      });
    }
  },
  mounted() {
    this.fetchDataList();
  }
};
</script>
