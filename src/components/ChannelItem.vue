<template class="channel-item">
  <router-link
    :to="{ name: 'ChannelDetails', params: { id: itemId } }"
    class="list-item__link"
  >
    <div class="list-item__thumbnail-container">
      <img :src="thumbnail" class="list-item__thumbnail" :alt="title" />
    </div>
    <div class="list-item__description">
      <p class="list-item__title">{{ title }}</p>
    </div>
  </router-link>
</template>

<script>
export default {
  name: "ChannelItem",
  props: {
    thumbnail: {
      type: String
    },
    title: {
      type: String
    },
    itemId: {
      type: String
    }
  }
};
</script>
