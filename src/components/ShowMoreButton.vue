<template>
  <button class="show-more-button" @click="handleClick">Show More Items</button>
</template>

<script>
export default {
  name: "ShowMoreButton",
  props: {
    handleClick: {
      type: Function
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
