<template>
  <div class="playlist-details">
    <MainHeader @submit-search="submitSearch" />
    <p class="playlist-details__title">Playlist</p>
    <template v-if="!loading && !error">
      <ul
        class="playlist-details__list"
        v-if="playlistItems.length && !loading && !error"
      >
        <li class="list-item" v-for="(item, i) in playlistItems" :key="i">
          <VideoItem
            :thumbnail="item.snippet.thumbnails.default.url"
            :title="item.snippet.title"
            :channelTitle="item.snippet.channelTitle"
            :itemId="item.id.videoId"
          />
        </li>
      </ul>
    </template>
    <Loading v-if="loading" />
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script>
import MainHeader from "@/components/MainHeader.vue";
import VideoItem from "@/components/VideoItem.vue";
import Loading from "@/components/Loading.vue";
import PlaylistsService from "@/services/PlaylistsService.js";

export default {
  name: "PlayListDetails",
  components: {
    MainHeader,
    VideoItem,
    Loading
  },
  data: function() {
    return {
      playlistId: this.$route.params.id,
      playlistItems: [],
      loading: false,
      error: null
    };
  },
  watch: {
    "$route.params.id"(id) {
      this.playlistId = id;
      if (id) this.fetchPlaylistItems();
    }
  },
  methods: {
    fetchPlaylistItems() {
      this.loading = true;

      PlaylistsService.playlistItems(this.playlistId)
        .then(data => {
          this.playlistItems = data.items;
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
    this.fetchPlaylistItems();
  }
};
</script>

<style scoped lang="scss">
.playlist-details {
  &__title {
    color: $gray;
    font-size: 20px;
    font-weight: bold;
    text-align: left;
    padding: 0 20px;
  }

  &__list {
    list-style: none;
    padding: 20px;

    li {
      & + li {
        margin-top: 15px;
      }
    }
  }
}
</style>
