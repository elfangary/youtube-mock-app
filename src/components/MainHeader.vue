<template>
  <header
    class="main-header"
    :class="[isDesktopView ? 'sticky' : '', loading ? 'animate-border' : '']"
  >
    <Container>
      <div class="main-header__wrapper">
        <router-link to="/search" class="main-header__link">
          <h1 class="main-header__title">
            <div class="main-header__logo-wrapper">
              <img alt="Youtube logo" :src="logoUrl" />
            </div>
            <span v-if="!isSearchInputVisible && !isDesktopView">Youtube</span>
          </h1>
        </router-link>
        <div class="main-header__search">
          <div
            class="main-header__search__input-wrapper"
            v-if="isSearchInputVisible || isDesktopView"
          >
            <input v-model="searchVal" />
            <span
              class="main-header__search__clear"
              v-if="searchVal"
              @click="clearSearchInputVal"
              >x</span
            >
          </div>
          <button
            @click="toggleSearchInput"
            class="main-header__search__button"
          >
            <span class="main-header__search__button__svg-wrapper">
              <SearchIcon
                :width="isDesktopView ? 17 : 30"
                :height="isDesktopView ? 17 : 30"
                :color="isDesktopView ? '#696969' : '#ffffff'"
              />
            </span>
          </button>
        </div>
      </div>
    </Container>
  </header>
</template>

<script>
import SearchIcon from "@/components/icons/Search.vue";
import Container from "@/components/Container.vue";
import { IsDesktopViewMixin } from "@/mixins/IsDesktopViewMixin.js";

const primrayLogo = require("../assets/logo.png");
const secondaryLogo = require("../assets/logo-light.png");

export default {
  name: "MainHeader",
  mixins: [IsDesktopViewMixin],
  components: {
    SearchIcon,
    Container
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

      this.isSearchInputVisible = !this.isSearchInputVisible;
    },
    clearSearchInputVal() {
      this.searchVal = "";
    }
  }
};
</script>

<style lang="scss">
.main-header {
  height: 60px;
  background-color: $primary;
  padding: 5px 20px;
  box-shadow: 0 4px 2px 0px $lightGray;

  &.sticky {
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 1;

    & + * {
      padding-top: 60px;
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

  &__wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
  }

  &__link {
    cursor: pointer;
    text-decoration: none;
  }

  &__title {
    margin: 0;
    color: $white;
    font-size: 17px;
    display: flex;
    align-items: center;
  }

  &__logo-wrapper {
    max-width: 50px;
    margin-inline-end: 10px;

    img {
      width: 100%;
    }
  }

  &__search {
    display: flex;

    &__input-wrapper {
      position: relative;

      input {
        height: 25px;
        width: 200px;
      }
    }

    &__clear {
      position: absolute;
      right: 10px;
      cursor: pointer;
      top: 4px;
      font-size: 18px;
    }

    &__button {
      background: none;
      border: 0;
      padding: 0;
      cursor: pointer;

      &:focus {
        outline: 0;
      }

      &__svg-wrapper {
        width: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }

  @media (min-width: 768px) {
    background-color: $white;
    padding: 0;

    &__title {
      color: $black;
      font-size: 25px;
    }

    &__logo-wrapper {
      max-width: 120px;
    }

    &__search {
      display: flex;

      &__input-wrapper {
        input {
          height: 30px;
          width: 700px;
        }
      }

      &__clear {
        top: 6px;
        font-size: 20px;
      }

      &__button {
        background-color: $extraLightGray;
        padding: 2px 15px;
        border: 1px solid $lightGray;
      }
    }
  }
}
</style>
