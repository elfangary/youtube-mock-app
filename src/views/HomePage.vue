<template>
  <div class="home-page">
    <MainHeader @submit-search="submitSearch" />
    <Filters @type-search="searchBytype" @date-search="searchByDate" />
    <template v-if="!loading && !error">
      <List :list="list" />
      <ShowMoreButton
        v-if="nextPageToken"
        :handleClick="handleShowMoreItems"
        :loading="showMoreLoading"
      />
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
import { constructSearchQueryStr } from "@/utils/construct_search_query_string.js";
import SearchService from "@/services/SearchService.js";

export default {
  name: "HomePage",
  components: { MainHeader, Filters, List, ShowMoreButton, Loading },
  data: function() {
    return {
      list: [],
      bindedSearchVal: "",
      bindedTypeVal: "",
      bindedDateVal: "",
      nextPageToken: "",
      loading: false,
      showMoreLoading: false,
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
    constructSearchQuery() {
      const searchParams = {
        part: "snippet",
        maxResults: 10,
        type: this.bindedTypeVal,
        publishedAfter: this.bindedDateVal,
        q: this.bindedSearchVal?.replace(" ", "+"),
        pageToken: this.nextPageToken
      };

      return constructSearchQueryStr(searchParams);
    },
    fetchDataList(options) {
      const { resetList } = options;
      const queryStr = this.constructSearchQuery();

      if (resetList) this.loading = true;
      if (!resetList) this.showMoreLoading = true;

      SearchService.search(queryStr)
        .then(data => {
          this.list = resetList ? data.items : this.list.concat(data.items);
          this.nextPageToken = data.nextPageToken;
          this.loading = false;
          this.showMoreLoading = false;
          this.error = null;
        })
        .catch(err => {
          this.loading = false;
          this.showMoreLoading = false;
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
