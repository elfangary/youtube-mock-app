<template>
  <div class="video-wrapper">
    <Container>
      <div class="video" v-if="!error && !loading">
        <iframe
          id="ytplayer"
          class="video__player"
          type="text/html"
          width="640"
          height="260"
          :src="
            'https://www.youtube.com/embed/' +
              videoData.id +
              '?autoplay=1&origin=http://example.com'
          "
          frameborder="0"
        ></iframe>
        <div class="video__info">
          <p class="video__title">{{ videoData.snippet.title }}</p>
          <p v-if="!isDesktopView" class="video__channel-title">
            {{ videoData.snippet.channelTitle }}
          </p>
          <p v-if="isDescVisible" class="video__description">
            {{ videoData.snippet.description }}
          </p>
          <p class="video__views">{{ viewCount }} views</p>
          <template class="video__reactions">
            <p class="video__likes">
              <span>
                <Like width="20" height="20" />
              </span>
              {{ parsedLikes }}
            </p>
            <p class="video__dislikes">
              <span>
                <Dislike width="20" height="20" />
              </span>
              {{ parsedDisLikes }}
            </p>
          </template>
        </div>
        <div v-if="isDesktopView" class="video__channel-extra-info">
          <router-link
            :to="{ name: 'ChannelDetails', params: { id: channelData.id } }"
            class="video__channel-extra-info__link"
          >
            <div class="video__channel-extra-info__avatar">
              <img
                :src="channelData.snippet.thumbnails.default.url"
                :alt="channelData.snippet.title"
              />
            </div>
            <div class="video__channel-extra-info__details">
              <p class="video__channel-extra-info__details__title">
                {{ channelData.snippet.title }}
              </p>
              <p calss="video__channel-extra-info__details__published-date">
                Published on {{ publishedDate }}
              </p>
            </div>
          </router-link>
        </div>
      </div>
    </Container>
    <Loading v-if="loading" />
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script>
import Like from "@/components/icons/Like.vue";
import Dislike from "@/components/icons/Dislike.vue";
import Loading from "@/components/Loading.vue";
import Container from "@/components/Container.vue";
import { IsDesktopViewMixin } from "@/mixins/IsDesktopViewMixin.js";
import ChannelService from "@/services/ChannelService.js";

export default {
  name: "Video",
  mixins: [IsDesktopViewMixin],
  components: { Like, Dislike, Container, Loading },
  props: {
    videoData: {
      type: Object
    }
  },
  data: function() {
    return {
      isDescVisible: false,
      channelData: null,
      loading: false,
      error: null
    };
  },
  methods: {
    roundToThousand(num) {
      return num.toString().length > 3 ? `${(num / 1000).toFixed(0)}K` : num;
    },
    fetchChannelDetails() {
      this.loading = true;

      ChannelService.channelDetails(this.videoData.snippet.channelId)
        .then(data => {
          this.channelData = data.items[0];
          this.loading = false;
          this.error = null;
        })
        .catch(err => {
          this.loading = false;
          this.error = err.message;
        });
    }
  },
  computed: {
    viewCount() {
      return Number(this.videoData.statistics.viewCount).toLocaleString();
    },
    parsedLikes() {
      return this.roundToThousand(this.videoData.statistics.likeCount);
    },
    parsedDisLikes() {
      return this.roundToThousand(this.videoData.statistics.dislikeCount);
    },
    publishedDate() {
      let options = { year: "numeric", month: "long", day: "numeric" };

      return new Date(this.videoData.snippet.publishedAt).toLocaleString(
        "en-US",
        options
      );
    }
  },
  created() {
    this.fetchChannelDetails();
  }
};
</script>

<style scoped lang="scss">
.video {
  text-align: left;
  color: $gray;

  &__player {
    width: 100%;
  }

  &__info {
    padding: 0 10px;
  }

  &__title {
    color: $black;
    font-size: 15px;
    font-weight: bold;
  }

  &__description {
    display: flex;
    flex-direction: column;
    color: $gray;
    text-align: left;
    margin-left: 10px;
  }

  &__reactions {
    display: flex;
    margin: 10px 0;

    p {
      margin: 0;

      & + p {
        margin-left: 20px;
      }

      span {
        margin-right: 5px;
      }
    }
  }

  &__channel-extra-info {
    border-top: 1px solid $lightGray;
    padding: 40px 0;

    &__link {
      text-decoration: none;
      display: flex;
      align-items: center;
      color: $gray;
    }

    &__avatar {
      margin-right: 20px;

      img {
        border-radius: 50%;
        overflow: hidden;
      }
    }

    &__details {
      &__title {
        font-size: 18px;
        font-weight: bold;
        margin: 0;
        color: $black;
      }

      &__published-date {
        font-size: 16px;
        margin: 0;
      }
    }
  }

  @media (min-width: 768px) {
    &__player {
      height: 500px;
    }

    &__title {
      font-size: 18px;
    }

    &__reactions {
      justify-content: flex-end;
    }
  }
}
</style>
