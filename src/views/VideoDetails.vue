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
import VideoService from "@/services/VideoService.js";
import RelatedVideosService from "@/services/RelatedVideosService.js";

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
  watch: {
    "$route.params.id"(id) {
      this.videoId = id;
      this.fetchVideoDetails();
      this.fetchRealatedVideos();
    }
  },
  methods: {
    fetchVideoDetails() {
      this.loading = true;

      VideoService.videoDetails(this.videoId)
        .then(data => {
          this.videoData = data.items[0];
          this.loading = false;
          this.error = null;
        })
        .catch(err => {
          this.loading = false;
          this.error = err.message;
        });
    },
    fetchRealatedVideos() {
      this.loading = true;

      RelatedVideosService.relatedVideos(this.videoId)
        .then(data => {
          this.relatedVideos = data.items;
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
    this.fetchVideoDetails();
    this.fetchRealatedVideos();
  }
};
</script>
