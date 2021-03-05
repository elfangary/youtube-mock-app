<template class="channel-section">
  <ChannelPlayLists v-if="isPlaylistSection" :channelId="channelId" />
  <ChannelUploads v-if="isRecentUploadsSection" :channelId="channelId" />
</template>

<script>
import ChannelPlayLists from "@/components/ChannelPlayLists.vue";
import ChannelUploads from "@/components/ChannelUploads.vue";

export default {
  name: "ChannelSection",
  components: { ChannelPlayLists, ChannelUploads },
  props: {
    section: {
      type: Object
    },
    channelId: {
      type: String
    }
  },
  data: function() {
    return {
      sectionType: this.section.snippet.type
    };
  },
  computed: {
    isPlaylistSection() {
      return this.sectionType === "singlePlaylist";
    },
    isRecentUploadsSection() {
      return this.sectionType === "recentUploads";
    }
  }
};
</script>
