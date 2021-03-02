<template>
  <div class="filters">
    <select v-model="typeVal">
      <option
        v-for="type in filtersOptions.typeFiltersOptions"
        :value="type.value"
        :key="type.value"
        :disabled="type.disabled"
        >{{ type.title }}</option
      >
    </select>
    <select v-model="dateVal">
      <option
        v-for="date in filtersOptions.dateFiltersOptions"
        :value="date.value"
        :key="date.value"
        :disabled="date.disabled"
        >{{ date.title }}</option
      >
    </select>
  </div>
</template>

<script>
import { TYPE_FILTERS_OPTIONS, DATE_FILTERS_OPTIONS } from "@/constants";

export default {
  name: "Filters",
  data: function() {
    return {
      typeVal: "",
      dateVal: "",
      filtersOptions: {
        typeFiltersOptions: TYPE_FILTERS_OPTIONS,
        dateFiltersOptions: DATE_FILTERS_OPTIONS
      }
    };
  },
  watch: {
    typeVal() {
      this.$emit("type-search", this.typeVal);
    },
    dateVal() {
      this.$emit("date-search", this.dateVal);
    }
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
