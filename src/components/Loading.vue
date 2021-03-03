<template>
  <div class="loading">
    <LoadingIcon width="30" height="30" />
    <p class="loading__text">Loading</p>
  </div>
</template>

<script>
import LoadingIcon from "@/components/icons/Loading.vue";

export default {
  name: "Loading",
  components: { LoadingIcon }
};
</script>

<style scoped lang="scss">
.loading {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &__text {
    color: $gray;
  }
}
</style>
