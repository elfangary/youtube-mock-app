<template class="channel-item">
  <p class="channel-item__title">{{ item.snippet.title }}</p>
</template>

<script>
export default {
  name: "ChannelItem",
  props: {
    item: {
      type: Object
    }
  }
};
</script>

<style scoped lang="scss">
.channel-item {
  &__title {
    font-size: 15px;
    font-weight: bold;
    margin: 0 0 5px 0;
  }
}
</style>
