<template class="channel-item">
  <router-link
    :to="{ name: 'ChannelDetails', params: { id: itemId } }"
    class="list-item__link"
  >
    <div class="list-item__thumbnail-container">
      <img :src="thumbnail" class="list-item__thumbnail" :alt="title" />
    </div>
    <div class="list-item__description">
      <p class="list-item__title">{{ title }}</p>
    </div>
  </router-link>
</template>

<script>
import { IsDesktopViewMixin } from "@/mixins/IsDesktopViewMixin.js";

export default {
  name: "ChannelItem",
  mixins: [IsDesktopViewMixin],
  props: {
    thumbnails: {
      type: Object
    },
    title: {
      type: String
    },
    itemId: {
      type: String
    }
  },
  computed: {
    thumbnail() {
      return this.thumbnails[this.isDesktopView ? "medium" : "default"].url;
    }
  }
};
</script>
