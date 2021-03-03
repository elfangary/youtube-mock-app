<template>
  <button class="show-more-button" @click="handleClick" :disabled="loading">
    <LoadingIcon width="20" height="20" v-if="loading" />
    <span v-if="!loading">Show More Items</span>
  </button>
</template>

<script>
import LoadingIcon from "@/components/icons/Loading.vue";

export default {
  name: "ShowMoreButton",
  components: { LoadingIcon },
  props: {
    handleClick: {
      type: Function
    },
    loading: {
      type: Boolean
    }
  }
};
</script>

<style scoped lang="scss">
.show-more-button {
  color: $gray;
  width: 100%;
  font-size: 16px;
  background: none;
  border: 0;
  border-top: 1px solid $lightGray;
  padding: 20px 0;
  cursor: pointer;
}
</style>
