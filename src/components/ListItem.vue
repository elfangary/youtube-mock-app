<template>
  <a class="list-item">
    <div class="list-item__thumbnail-container">
      <img
        :src="item.snippet.thumbnails.default.url"
        class="list-item__thumbnail"
        :alt="item.snippet.title"
      />
    </div>
    <div class="list-item__description">
      <VideoItem v-if="isVideo" :item="item" />
      <PlayListItem v-if="isPlayList" :item="item" />
      <ChannelItem v-if="isChannel" :item="item" />
    </div>
  </a>
</template>

<script>
import VideoItem from "@/components/VideoItem.vue";
import PlayListItem from "@/components/PlayListItem.vue";
import ChannelItem from "@/components/ChannelItem.vue";

export default {
  name: "ListItem",
  props: {
    item: {
      type: Object
    }
  },
  components: {
    VideoItem,
    PlayListItem,
    ChannelItem
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
      debugger;
      return this.item.id.kind.replace("youtube#", "");
    }
  },
  computed: {
    thumbnailStyle() {
      const x = {
        width: this.item.snippet.thumbnails.default.width,
        height: this.item.snippet.thumbnails.default.height
      };
      console.log("X", x);
      return {
        width: this.item.snippet.thumbnails.default.width,
        height: this.item.snippet.thumbnails.default.height
      };
    }
  }
};
</script>

<style scoped lang="scss">
.list-item {
  display: flex;

  &__description {
    display: flex;
    flex-direction: column;
    color: $gray;
    text-align: left;
    margin-left: 10px;
  }
}
</style>
