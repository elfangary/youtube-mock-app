<template>
  <div class="list-item"></div>
</template>

<script>
export default {
  name: "ListItem",
  props: {
    item: {
      type: Object
    }
  },
  data: function() {
    return {
      isVideo: this.defineItemType() === "video",
      isPlayList: this.defineItemType() === "playlist",
      isChannel: this.defineItemType() === "channel"
    };
  },
  methods: {
    defineItemType() {
      return this.item.id.kind.replace("youtube#", "");
    }
  }
};
</script>

<style scoped lang="scss">
.list-item {
  color: $primary;
}
</style>
