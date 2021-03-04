<template>
  <div class="channel-details">
    <MainHeader @submit-search="submitSearch" />
    <template v-if="!loading && !error">
      <ChannelBanner v-if="channelData" :channelData="channelData" />
      <template v-if="channelSections.length">
        <template v-for="(section, i) in channelSections" :key="i">
          <ChannelSection :section="section" :channelId="channelId" />
        </template>
      </template>
    </template>
    <Loading v-if="loading" />
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script>
import MainHeader from "@/components/MainHeader.vue";
import ChannelBanner from "@/components/ChannelBanner.vue";
import ChannelSection from "@/components/ChannelSection.vue";
import Loading from "@/components/Loading.vue";
import ChannelService from "@/services/ChannelService.js";

export default {
  name: "ChannelDetails",
  components: {
    MainHeader,
    ChannelBanner,
    ChannelSection,
    Loading
  },
  data: function() {
    return {
      channelId: this.$route.params.id,
      channelData: null,
      channelSections: [],
      loading: false,
      error: null
    };
  },
  watch: {
    "$route.params.id"(id) {
      this.videoId = id;
      if (id) {
        this.fetchChannelDetails();
        this.fetchChannelSections();
      }
    }
  },
  methods: {
    fetchChannelDetails() {
      this.loading = true;

      ChannelService.channelDetails(this.channelId)
        .then(data => {
          this.channelData = data.items[0];
          this.loading = false;
          this.error = null;
        })
        .catch(err => {
          this.loading = false;
          this.error = err.message;
        });
    },
    fetchChannelSections() {
      this.loading = true;
      ChannelService.channelSections(this.channelId)
        .then(data => {
          this.channelSections = data.items;
          this.loading = false;
          this.error = null;
        })
        .catch(err => {
          this.loading = false;
          this.error = err.message;
        });
    }
  },
  created() {
    this.fetchChannelDetails();
    this.fetchChannelSections();
  }
};
</script>
