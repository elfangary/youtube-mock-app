<template>
  <div class="main-header">
    <Container>
      <template class="header-wrapper">
        <router-link to="/">
          <h1>
            <div class="logo-wrapper">
              <img alt="Youtube logo" src="../assets/logo-light.png" />
            </div>
            <span>Youtube</span>
          </h1>
        </router-link>
        <button>
          <div class="svg-wrapper">
            <SearchIcon width="40" height="40" />
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
  props: {
    msg: String
  }
};
</script>

<style scoped lang="scss">
.header-wrapper {
  display: flex;
  min-height: 80px;
  justify-content: space-between;
  background-color: $primary;
  align-items: center;

  a {
    margin: 0 20px;
    cursor: pointer;
    text-decoration: none;

    h1 {
      margin: 0;
      color: $white;
      font-size: 25px;
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

  button {
    background: none;
    border: 0;
    margin: 0 20px;
    cursor: pointer;

    .svg-wrapper {
      width: 50px;
      height: 100px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
