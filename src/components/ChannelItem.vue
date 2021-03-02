<template>
  <p>{{ item.snippet.title }}</p>
  <p>{{ item.snippet.channelTitle }}</p>
</template>

<script>
export default {
  name: "ChannelItem",
  props: {
    item: {
      type: Object
    }
  }
};
</script>
