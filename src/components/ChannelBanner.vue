<template class="channel-banner">
  <div class="channel-banner__theme" :style="bannerThemeStyling">
    <span class="channel-banner__theme__avatar">
      <img
        :src="channelData.snippet.thumbnails.default.url"
        :alt="channelData.snippet.title"
      />
    </span>
  </div>
  <div class="channel-banner__info">
    <p class="channel-banner__info__title">{{ channelData.snippet.title }}</p>
    <p class="channel-banner__info__count">
      <span>{{ channelData.statistics.subscriberCount }}</span> subscribers
    </p>
    <p class="channel-banner__info__count">
      <span>{{ channelData.statistics.videoCount }}</span> videos
    </p>
    <p class="channel-banner__info__count">
      <span>{{ channelData.statistics.viewCount }}</span> views
    </p>
  </div>
</template>

<script>
export default {
  name: "ChannelBanner",
  props: {
    channelData: {
      type: Object
    }
  },
  computed: {
    bannerThemeStyling() {
      return this.getBannerTheme();
    }
  },
  methods: {
    getBannerTheme() {
      return {
        "background-color": this.channelData.brandingSettings.channel
          .profileColor
      };
    }
  }
};
</script>

<style scoped lang="scss">
.channel-banner {
  border-bottom: 1px solid $lightGray;
  &__theme {
    position: relative;
    width: 100%;
    height: 50px;

    &__avatar {
      position: absolute;
      left: 30px;
      top: 50%;
    }
  }

  &__info {
    color: $gray;
    margin-left: 150px;
    margin-top: 20px;
    text-align: left;

    p {
      margin: 0;

      & + p {
        margin-top: 5px;
      }
    }

    &__title {
      font-size: 18px;
      font-weight: bold;
    }

    &__count {
      font-size: 16px;

      span {
        font-weight: bold;
      }
    }
  }
}
</style>
