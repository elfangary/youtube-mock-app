<template class="list-item">
  <VideoItem
    v-if="isVideo"
    :thumbnail="item.snippet.thumbnails.default.url"
    :title="item.snippet.title"
    :channelTitle="item.snippet.channelTitle"
    :itemId="itemId"
  />
  <PlayListItem
    v-if="isPlayList"
    :thumbnail="item.snippet.thumbnails.default.url"
    :title="item.snippet.title"
    :channelTitle="item.snippet.channelTitle"
    :itemId="itemId"
  />
  <ChannelItem
    v-if="isChannel"
    :thumbnail="item.snippet.thumbnails.default.url"
    :title="item.snippet.title"
    :itemId="itemId"
  />
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
  computed: {
    itemId() {
      const itemType = this.defineItemType();
      return `${this.item.id[`${itemType}Id`]}`;
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
      return this.item.id.kind.replace("youtube#", "");
    }
  }
};
</script>

<style lang="scss">
.list-item {
  &__link {
    display: flex;
    text-decoration: none;
  }

  &__description {
    display: flex;
    flex-direction: column;
    color: $gray;
    text-align: left;
    margin-left: 10px;
  }

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
