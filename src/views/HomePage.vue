<template>
  <div class="home-page">
    <MainHeader @submit-search="submitSearch" :loading="loading" />
    <Filters
      @type-search="searchBytype"
      @date-search="searchByDate"
      @sortBy-search="searchBySort"
    />
    <template v-if="!loading && !error">
      <List
        :list="list"
        :totalResultsCount="totalResultsCount"
        :showItemDesc="true"
      />
      <ShowMoreButton
        v-if="nextPageToken && !isDesktopView"
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
import { IsDesktopViewMixin } from "@/mixins/IsDesktopViewMixin.js";
import { InfiniteScrollMixin } from "@/mixins/InfiniteScrollMixin.js";

export default {
  name: "HomePage",
  mixins: [IsDesktopViewMixin, InfiniteScrollMixin],
  components: { MainHeader, Filters, List, ShowMoreButton, Loading },
  data: function() {
    return {
      list: [],
      totalResultsCount: 0,
      bindedSearchVal: "",
      bindedTypeVal: "",
      bindedDateVal: "",
      bindedSortVal: "relevance",
      nextPageToken: "",
      loading: false,
      showMoreLoading: false,
      error: null
    };
  },
  methods: {
    submitSearch(searchVal) {
      this.bindedSearchVal = searchVal;
    },
    searchBytype(type) {
      this.bindedTypeVal = type;
    },
    searchByDate(date) {
      this.bindedDateVal = date;
    },
    searchBySort(sort) {
      this.bindedSortVal = sort;
    },
    handleShowMoreItems() {
      this.fetchDataList({ resetList: false });
    },
    handlePaginateOnScroll() {
      this.isDesktopView && this.fetchDataList({ resetList: false });
    },
    constructSearchQuery() {
      const searchParams = {
        part: "snippet",
        maxResults: 10,
        ...this.$route.query
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
          this.totalResultsCount = data.pageInfo.totalResults;
          this.loading = false;
          this.showMoreLoading = false;
          this.error = null;
        })
        .catch(err => {
          this.loading = false;
          this.showMoreLoading = false;
          this.error = err.message;
        });
    },
    handleChangeInSearchParams() {
      this.$router.push({
        path: "/search",
        query: {
          type: this.bindedTypeVal,
          publishedAfter: this.bindedDateVal,
          order: this.bindedSortVal,
          q: this.bindedSearchVal ? this.bindedSearchVal.replace(" ", "+") : "",
          pageToken: this.nextPageToken
        }
      });
    }
  },
  mounted() {
    this.fetchDataList({ resetList: true });
  },
  watch: {
    bindedSearchVal() {
      this.handleChangeInSearchParams();
    },
    bindedTypeVal() {
      this.handleChangeInSearchParams();
    },
    bindedDateVal() {
      this.handleChangeInSearchParams();
    },
    bindedSortVal() {
      this.handleChangeInSearchParams();
    },
    "$route.query"() {
      this.fetchDataList({ resetList: true });
    }
  }
};
</script>
