<template>
  <div class="filters">
    <select>
      <option
        v-for="type in filtersOptions.typeFiltersOptions"
        :value="type.value"
        :key="type.value"
        >{{ type.title }}</option
      >
    </select>
    <select>
      <option
        v-for="date in filtersOptions.dateFiltersOptions"
        :value="date.value"
        :key="date.value"
        >{{ date.title }}</option
      >
    </select>
  </div>
</template>

<script>
export default {
  name: "Filters",
  data: function() {
    return {
      filtersOptions: {
        typeFiltersOptions: [
          {
            title: "All",
            value: "all"
          },
          {
            title: "Channel",
            value: "channel"
          },
          {
            title: "Playlist",
            value: "playlist"
          }
        ],
        dateFiltersOptions: [
          {
            title: "Today",
            value: "today"
          },
          {
            title: "This Week",
            value: "thisWeek"
          },
          {
            title: "This Month",
            value: "thisMonth"
          }
        ]
      }
    };
  }
};
</script>

<style scoped lang="scss">
.filters {
  display: flex;
  justify-content: center;
  margin: 20px 0;

  select {
    height: 50px;
    flex: 1;
    padding: 10px;
    color: $gray;
    background: $white;
    font-size: 18px;
    font-weight: bold;

    & + select {
      margin-left: 15px;
    }
  }
}
</style>
