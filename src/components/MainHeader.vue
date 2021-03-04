<template>
  <div
    class="main-header"
    :class="[isDesktopView ? 'sticky' : '', loading ? 'animate-border' : '']"
  >
    <template class="header-wrapper" :class="loading ? 'animate-border' : ''">
      <router-link to="/search">
        <h1>
          <div class="logo-wrapper">
            <img alt="Youtube logo" :src="logoUrl" />
          </div>
          <span v-if="!isSearchInputVisible || isDesktopView">Youtube</span>
        </h1>
      </router-link>
      <p
        class="search-input-wrapper"
        v-if="isSearchInputVisible || isDesktopView"
      >
        <input v-model="searchVal" />
        <span v-if="searchVal" @click="clearSearchInputVal">x</span>
      </p>
      <button @click="toggleSearchInput">
        <div class="svg-wrapper">
          <SearchIcon
            width="30"
            height="30"
            :color="isDesktopView ? '#696969' : '#ffffff'"
          />
        </div>
      </button>
    </template>
  </div>
</template>

<script>
import SearchIcon from "@/components/icons/Search.vue";
import { IsDesktopViewMixin } from "@/mixins/IsDesktopViewMixin.js";

const primrayLogo = require("../assets/logo.png");
const secondaryLogo = require("../assets/logo-light.png");

export default {
  name: "MainHeader",
  mixins: [IsDesktopViewMixin],
  components: {
    SearchIcon
  },
  props: {
    loading: {
      type: Boolean
    }
  },
  data: function() {
    return {
      isSearchInputVisible: false,
      searchVal: ""
    };
  },
  computed: {
    logoUrl() {
      return this.isDesktopView ? primrayLogo : secondaryLogo;
    }
  },
  methods: {
    toggleSearchInput() {
      if (this.isSearchInputVisible || this.isDesktopView) {
        return this.$emit("submit-search", this.searchVal);
      }

      return (this.isSearchInputVisible = !this.isSearchInputVisible);
    },
    clearSearchInputVal() {
      this.searchVal = "";
    }
  }
};
</script>

<style lang="scss">
.main-header {
  &.sticky {
    position: fixed;
    top: 0;
    width: 100%;

    & + * {
      padding-top: 50px;
    }

    &::after {
      content: " ";
      display: block;
      width: 0;
      height: 3px;
      background: $primary;
      transition: width 500ms;
    }

    &.animate-border {
      &::after {
        width: 100%;
        position: relative;
        top: 0;
      }
    }
  }
}

.header-wrapper {
  display: flex;
  height: 50px;
  justify-content: space-between;
  background-color: $primary;
  align-items: center;
  padding: 5px 20px;
  box-shadow: 0 4px 2px 0px $lightGray;

  a {
    cursor: pointer;
    text-decoration: none;

    h1 {
      margin: 0;
      color: $white;
      font-size: 17px;
      display: flex;
      align-items: center;

      .logo-wrapper {
        max-width: 50px;
        margin-inline-end: 10px;

        img {
          width: 100%;
        }
      }
    }
  }

  .search-input-wrapper {
    position: relative;
    margin: 0;

    input {
      height: 20px;
    }

    span {
      position: absolute;
      right: 10px;
      top: 2px;
      font-size: 17px;
      color: $gray;
    }
  }

  button {
    background: none;
    border: 0;
    padding: 0;
    cursor: pointer;

    .svg-wrapper {
      width: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  @media (min-width: 768px) {
    background-color: $white;

    a {
      h1 {
        color: $black;
      }
    }

    .search-input-wrapper {
      input {
        height: 25px;
        width: 500px;
      }
    }
  }
}
</style>
