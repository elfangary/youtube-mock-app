<template class="playlist-item">
  <router-link
    :to="{ name: 'PlaylistDetails', params: { id: itemId } }"
    class="list-item__link"
  >
    <div class="list-item__thumbnail-container">
      <img :src="thumbnail" class="list-item__thumbnail" :alt="title" />
    </div>
    <div class="list-item__info">
      <p class="list-item__title">{{ title }}</p>
      <p v-if="isDesktopView && showItemDesc" class="list-item__desc">
        {{ description }}
      </p>
      <p class="list-item__channel-title">{{ channelTitle }}</p>
    </div>
  </router-link>
</template>

<script>
import { IsDesktopViewMixin } from "@/mixins/IsDesktopViewMixin.js";

export default {
  name: "PlayListItem",
  mixins: [IsDesktopViewMixin],
  props: {
    thumbnails: {
      type: Object
    },
    title: {
      type: String
    },
    description: {
      type: String
    },
    channelTitle: {
      type: String
    },
    itemId: {
      type: String
    },
    showItemDesc: {
      type: Boolean
    }
  },
  computed: {
    thumbnail() {
      return this.thumbnails[this.isDesktopView ? "medium" : "default"].url;
    }
  }
};
</script>
