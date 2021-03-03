<template>
  <div class="main-header">
    <Container>
      <template class="header-wrapper">
        <router-link to="/">
          <h1>
            <div class="logo-wrapper">
              <img alt="Youtube logo" src="../assets/logo-light.png" />
            </div>
            <span v-if="!isSearchInputVisible">Youtube</span>
          </h1>
        </router-link>
        <p class="search-input-wrapper" v-if="isSearchInputVisible">
          <input v-model="searchVal" />
          <span v-if="searchVal" @click="clearSearchInputVal">x</span>
        </p>
        <button @click="toggleSearchInput">
          <div class="svg-wrapper">
            <SearchIcon width="30" height="30" />
          </div>
        </button>
      </template>
    </Container>
  </div>
</template>

<script>
import SearchIcon from "@/components/icons/Search.vue";
import Container from "@/components/Container.vue";

export default {
  name: "MainHeader",
  components: {
    SearchIcon,
    Container
  },
  data: function() {
    return {
      isSearchInputVisible: false,
      searchVal: ""
    };
  },
  methods: {
    toggleSearchInput() {
      if (this.isSearchInputVisible && this.searchVal) {
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

<style scoped lang="scss">
.header-wrapper {
  display: flex;
  height: 50px;
  justify-content: space-between;
  background-color: $primary;
  align-items: center;
  padding: 5px 20px;

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
}
</style>
