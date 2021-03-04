<template>
  <div class="filters">
    <button
      class="filters__toggleButton"
      @click="toggleFilters"
      v-if="isDesktopView"
    >
      <span>
        <Filter
          width="20"
          height="20"
          :color="isFiltersVisible ? '#000' : '#696969'"
        />
      </span>
      <span>Filter</span>
    </button>
    <div class="filters__inputs" v-if="!isDesktopView || isFiltersVisible">
      <select v-model="typeVal" class="filters__date">
        <option
          v-for="type in filtersOptions.typeFiltersOptions"
          :value="type.value"
          :key="type.value"
          :disabled="type.disabled"
          >{{ type.title }}</option
        >
      </select>
      <select v-model="dateVal" class="filters__date">
        <option
          v-for="date in filtersOptions.dateFiltersOptions"
          :value="date.value"
          :key="date.value"
          :disabled="date.disabled"
          >{{ date.title }}</option
        >
      </select>
      <select v-model="sortByVal" class="filters__sort" v-if="isDesktopView">
        <option
          v-for="sort in filtersOptions.sortByFiltersOptions"
          :value="sort.value"
          :key="sort.value"
          :disabled="sort.disabled"
          >{{ sort.title }}</option
        >
      </select>
    </div>
  </div>
</template>

<script>
import {
  TYPE_FILTERS_OPTIONS,
  DATE_FILTERS_OPTIONS,
  SORT_BY_FILTERS_OPTIONS
} from "@/constants";
import Filter from "@/components/icons/Filter.vue";
import { IsDesktopViewMixin } from "@/mixins/IsDesktopViewMixin.js";

export default {
  name: "Filters",
  mixins: [IsDesktopViewMixin],
  components: { Filter },
  data: function() {
    return {
      typeVal: "",
      dateVal: "",
      sortByVal: "relevance",
      filtersOptions: {
        typeFiltersOptions: TYPE_FILTERS_OPTIONS(),
        dateFiltersOptions: DATE_FILTERS_OPTIONS(),
        sortByFiltersOptions: SORT_BY_FILTERS_OPTIONS()
      },
      isFiltersVisible: false
    };
  },
  watch: {
    typeVal() {
      this.$emit("type-search", this.typeVal);
    },
    dateVal() {
      this.$emit("date-search", this.dateVal);
    },
    sortByVal() {
      this.$emit("sortBy-search", this.typeVal);
    }
  },
  methods: {
    toggleFilters() {
      this.isFiltersVisible = !this.isFiltersVisible;
    }
  }
};
</script>

<style scoped lang="scss">
.filters {
  min-height: 50px;
  text-align: right;

  &__inputs {
    display: flex;
    justify-content: center;
    margin: 20px 0;
    padding: 0 10px;

    select {
      height: 40px;
      flex: 1;
      padding: 10px;
      color: $gray;
      background: $white;
      font-size: 16px;
      font-weight: bold;

      & + select {
        margin-left: 15px;
      }
    }
  }

  &__toggleButton {
    cursor: pointer;
    background: none;
    border: 0;
    width: 100px;
    height: 30px;
    font-size: 18px;
    display: inline-flex;
    color: $gray;
    margin-top: 15px;

    &:focus {
      outline: 0;
      border: 0;
    }

    span {
      & + span {
        margin-left: 10px;
      }
    }
  }
}
</style>
