<template>
  <div class="video-details">
    <MainHeader @submit-search="submitSearch" />
    <template v-if="!loading && !error && videoData">
      <Video :videoData="videoData" />
      <List v-if="relatedVideos.length" :list="relatedVideos" />
    </template>
    <Loading v-if="loading" />
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script>
import MainHeader from "@/components/MainHeader.vue";
import List from "@/components/List.vue";
import Video from "@/components/Video.vue";
import Loading from "@/components/Loading.vue";
import { VIDEO_API, RELATED_VIDEOS_API } from "@/api";

export default {
  name: "VideoDetails",
  components: { MainHeader, Video, List, Loading },
  data: function() {
    return {
      videoId: this.$route.params.id,
      videoData: null,
      relatedVideos: [],
      loading: false,
      error: null
    };
  },
  methods: {
    fetchVideoDetails() {
      const apiUrl = VIDEO_API(this.$route.params.id);
      this.loading = true;
      this.axios
        .get(apiUrl)
        .then(response => {
          this.videoData = response.data.items[0];
          this.loading = false;
          this.error = null;
        })
        .catch(err => {
          this.loading = false;
          this.error = err.message;
        });
    },
    fetchRealatedVideos() {
      const apiUrl = RELATED_VIDEOS_API(this.$route.params.id);
      this.loading = true;
      this.axios
        .get(apiUrl)
        .then(response => {
          this.relatedVideos = response.data.items;
          this.loading = false;
          this.error = null;
        })
        .catch(err => {
          this.loading = false;
          this.error = err.message;
        });
    }
  },
  mounted() {
    this.fetchVideoDetails();
    this.fetchRealatedVideos();
  }
};
</script>
