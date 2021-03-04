<template>
  <div class="video">
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
      <p class="video__channel-title">{{ videoData.snippet.channelTitle }}</p>
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
  </div>
</template>

<script>
import Like from "@/components/icons/Like.vue";
import Dislike from "@/components/icons/Dislike.vue";
import { IsDesktopViewMixin } from "@/mixins/IsDesktopViewMixin.js";

export default {
  name: "Video",
  mixins: [IsDesktopViewMixin],
  components: { Like, Dislike },
  props: {
    videoData: {
      type: Object
    }
  },
  data: function() {
    return {
      isDescVisible: false
    };
  },
  methods: {
    roundToThousand(num) {
      return num.toString().length > 3 ? `${(num / 1000).toFixed(0)}K` : num;
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
    }
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

  @media (min-width: 768px) {
    &__player {
      height: 500px;
    }
  }
}
</style>
