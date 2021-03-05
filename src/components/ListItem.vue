<template class="list-item">
  <VideoItem
    v-if="isVideo"
    :thumbnails="item.snippet.thumbnails"
    :title="item.snippet.title"
    :description="item.snippet.description"
    :channelTitle="item.snippet.channelTitle"
    :itemId="itemId"
    :showItemDesc="showItemDesc"
  />
  <PlayListItem
    v-if="isPlayList"
    :thumbnails="item.snippet.thumbnails"
    :title="item.snippet.title"
    :description="item.snippet.description"
    :channelTitle="item.snippet.channelTitle"
    :itemId="itemId"
    :showItemDesc="showItemDesc"
  />
  <ChannelItem
    v-if="isChannel"
    :thumbnails="item.snippet.thumbnails"
    :title="item.snippet.title"
    :description="item.snippet.description"
    :itemId="itemId"
    :showItemDesc="showItemDesc"
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
    },
    showItemDesc: {
      type: Boolean
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

  &__info {
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

  @media (min-width: 768px) {
    &__title {
      color: $black;
      font-size: 18px;
    }
  }
}
</style>
