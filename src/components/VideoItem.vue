<template class="video-item">
  <p class="video-item__title">{{ item.snippet.title }}</p>
  <p class="video-item__channel-title">{{ item.snippet.channelTitle }}</p>
</template>

<script>
export default {
  name: "VideoItem",
  props: {
    item: {
      type: Object
    }
  }
};
</script>

<style scoped lang="scss">
.video-item {
  &__title {
    font-size: 15px;
    font-weight: bold;
    margin: 0 0 5px 0;
  }

  &__channel-title {
    font-size: 13px;
    margin: 0;
  }
}
</style>
