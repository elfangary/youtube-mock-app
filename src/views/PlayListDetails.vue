<template>
  <div class="playlist-details">
    <MainHeader @submit-search="submitSearch" :loading="loading" />
    <div>
      <template v-if="!loading && !error">
        <Container>
          <p class="playlist-details__title">Playlist</p>
          <ul
            class="playlist-details__list"
            v-if="playlistItems.length && !loading && !error"
          >
            <li class="list-item" v-for="(item, i) in playlistItems" :key="i">
              <VideoItem
                :thumbnails="item.snippet.thumbnails"
                :title="item.snippet.title"
                :channelTitle="item.snippet.channelTitle"
                :itemId="item.snippet.resourceId.videoId"
              />
            </li>
          </ul>
        </Container>
      </template>
    </div>
    <Loading v-if="loading" />
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script>
import MainHeader from "@/components/MainHeader.vue";
import VideoItem from "@/components/VideoItem.vue";
import Loading from "@/components/Loading.vue";
import PlaylistsService from "@/services/PlaylistsService.js";
import Container from "@/components/Container.vue";

export default {
  name: "PlayListDetails",
  components: {
    MainHeader,
    VideoItem,
    Loading,
    Container
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
    },
    submitSearch(searchVal) {
      this.$router.push({
        path: "/search",
        query: {
          q: searchVal?.replace(" ", "+")
        }
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
    color: $black;
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
