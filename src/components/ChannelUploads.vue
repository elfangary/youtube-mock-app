<template class="channel-uploads">
  <div class="channel-uploads__container">
    <p class="channel-uploads__title">Uploads</p>
    <ul
      class="channel-uploads__list"
      v-if="uploadsList.length && !loading && !error"
    >
      <li
        class="channel-uploads__list__item"
        v-for="(channelUpload, i) in uploadsList"
        :key="i"
      >
        <VideoItem
          :thumbnail="channelUpload.snippet.thumbnails.default.url"
          :title="channelUpload.snippet.title"
          :channelTitle="channelUpload.snippet.channelTitle"
          :itemId="channelUpload.id.videoId"
        />
      </li>
    </ul>
    <Loading v-if="loading" />
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script>
import VideoItem from "@/components/VideoItem.vue";
import Loading from "@/components/Loading.vue";
import { constructSearchQueryStr } from "@/utils/construct_search_query_string.js";
import SearchService from "@/services/SearchService.js";

export default {
  name: "ChannelUploads",
  components: { VideoItem, Loading },
  props: {
    channelId: {
      type: Object
    }
  },
  data: function() {
    return {
      uploadsList: [],
      loading: false,
      error: null
    };
  },
  methods: {
    constructSearchQuery() {
      const searchParams = {
        part: "snippet,id",
        maxResults: 10,
        order: "date",
        channelId: this.channelId
      };

      return constructSearchQueryStr(searchParams);
    },
    fetchUploadsList() {
      const queryStr = this.constructSearchQuery();

      this.loading = true;

      SearchService.search(queryStr)
        .then(data => {
          this.uploadsList = data.items;
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
    this.fetchUploadsList();
  }
};
</script>

<style scoped lang="scss">
.channel-uploads {
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
