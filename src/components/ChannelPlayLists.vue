<template class="channel-playlists">
  <div class="channel-playlists__container">
    <p class="channel-playlists__title">PlayLists</p>
    <ul
      class="channel-playlists__list"
      v-if="channelPlaylists.length && !loading && !error"
    >
      <li
        class="channel-playlists__list__item"
        v-for="(playlist, i) in channelPlaylists"
        :key="i"
      >
        <PlayListItem
          :thumbnails="playlist.snippet.thumbnails"
          :title="playlist.snippet.title"
          :channelTitle="playlist.snippet.channelTitle"
          :itemId="playlist.id"
        />
      </li>
    </ul>
    <Loading v-if="loading" />
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script>
import PlaylistsService from "@/services/PlaylistsService.js";
import PlayListItem from "@/components/PlayListItem.vue";
import Loading from "@/components/Loading.vue";

export default {
  name: "ChannelPlayLists",
  components: { PlayListItem, Loading },
  props: {
    channelId: {
      type: Object
    }
  },
  data: function() {
    return {
      channelPlaylists: [],
      loading: false,
      error: null
    };
  },
  methods: {
    fetchChannelPlayLists() {
      this.loading = true;

      PlaylistsService.playlists(this.channelId)
        .then(data => {
          this.channelPlaylists = data.items;
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
    this.fetchChannelPlayLists();
  }
};
</script>

<style scoped lang="scss">
.channel-playlists {
  &__container {
    text-align: left;
    border-top: 1px solid $lightGray;
    border-bottom: 1px solid $lightGray;
    margin: 10px 0;
    padding: 0 30px;
  }

  &__title {
    font-size: 18px;
    font-weight: bold;
  }

  &__list {
    list-style: none;
    padding: 10px;

    li {
      & + li {
        margin-top: 15px;
      }
    }
  }
}
</style>
