<template>
  <div class="home-page">
    <MainHeader @submit-search="submitSearch" />
    <Filters @type-search="searchBytype" @date-search="searchByDate" />
    <template v-if="!loading && !error">
      <List :list="list" />
      <ShowMoreButton :handleClick="handleShowMoreItems" />
    </template>
    <Loading v-if="loading" />
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script>
import MainHeader from "@/components/MainHeader.vue";
import Filters from "@/components/Filters.vue";
import List from "@/components/List.vue";
import ShowMoreButton from "@/components/ShowMoreButton.vue";
import Loading from "@/components/Loading.vue";
import { constructSearchQuery } from "@/utils/construct_search_query.js";
import { SEARCH_API } from "@/api";

export default {
  name: "HomePage",
  components: { MainHeader, Filters, List, ShowMoreButton, Loading },
  data: function() {
    return {
      list: [],
      bindedSearchVal: "",
      bindedTypeVal: "",
      bindedDateVal: "",
      pageToken: "",
      loading: false,
      error: null
    };
  },
  methods: {
    submitSearch(searchVal) {
      this.bindedSearchVal = searchVal;
      this.fetchDataList({ resetList: true });
    },
    searchBytype(type) {
      this.bindedTypeVal = type;
    },
    searchByDate(date) {
      this.bindedDateVal = date;
    },
    handleShowMoreItems() {
      this.fetchDataList({ resetList: false });
    },
    constructApiUrl() {
      const searchParams = {
        part: "snippet",
        maxResults: 10,
        type: this.bindedTypeVal,
        publishedAfter: this.bindedDateVal,
        q: this.bindedSearchVal?.replace(" ", "+"),
        pageToken: this.pageToken
      };

      const queryStr = constructSearchQuery(searchParams);

      return SEARCH_API(queryStr);
    },
    fetchDataList(options) {
      const { resetList } = options;
      const apiUrl = this.constructApiUrl();
      this.loading = true;
      this.axios
        .get(apiUrl)
        .then(response => {
          this.list = resetList
            ? response.data.items
            : this.list.concat(response.data.items);
          this.pageToken = response.data.nextPageToken;
          this.loading = false;
          this.error = null;
        })
        .catch(err => {
          this.loading = false;
          this.error = err.message;
        });
    }
  },
  mounted() {
    this.fetchDataList({ resetList: true });
  },
  watch: {
    bindedSearchVal() {
      this.fetchDataList({ resetList: true });
    },
    bindedTypeVal() {
      this.fetchDataList({ resetList: true });
    },
    bindedDateVal() {
      this.fetchDataList({ resetList: true });
    }
  }
};
</script>
