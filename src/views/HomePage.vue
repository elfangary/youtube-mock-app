<template>
  <div class="home-page">
    <MainHeader @submit-search="submitSearch" />
    <Filters @type-search="searchBytype" @date-search="searchByDate" />
    <List list="list" />
  </div>
</template>

<script>
import MainHeader from "@/components/MainHeader.vue";
import Filters from "@/components/Filters.vue";
import List from "@/components/List.vue";
import { SEARCH_API } from "@/api";

export default {
  name: "HomePage",
  components: { MainHeader, Filters, List },
  data: function() {
    return {
      list: [],
      bindedSearchVal: "",
      bindedTypeVal: "",
      bindedDateVal: ""
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
    constructApiUrl() {
      const trimmedSearchVal = this.bindedSearchVal?.replace(" ", "+");

      const searchParams = `part=snippet&maxResults=10${this.bindedTypeVal &&
        "&type=" + this.bindedTypeVal}${this.bindedDateVal &&
        "&publishedAfter=" + this.bindedDateVal}${trimmedSearchVal &&
        "&q=" + trimmedSearchVal}`;

      return SEARCH_API(searchParams);
    },
    fetchDataList() {
      const apiUrl = this.constructApiUrl();
      this.axios.get(apiUrl).then(response => {
        debugger;
        this.list = response.data.items;
      });
    }
  },
  mounted() {
    this.fetchDataList();
  }
};
</script>
