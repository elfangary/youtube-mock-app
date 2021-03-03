<template class="playlist-item">
  <p class="playlist-item__title">{{ item.snippet.title }}</p>
  <p class="playlist-item__creator">{{ item.snippet.channelTitle }}</p>
</template>

<script>
export default {
  name: "PlayListItem",
  props: {
    item: {
      type: Object
    }
  }
};
</script>

<style scoped lang="scss">
.playlist-item {
  &__title {
    font-size: 15px;
    font-weight: bold;
    margin: 0 0 5px 0;
  }

  &__creator {
    font-size: 13px;
    margin: 0;
  }
}
</style>
