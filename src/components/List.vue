<template>
  <ul class="list">
    <li v-for="(item, i) in list" :key="i">
      <ListItem item="item" />
    </li>
  </ul>
</template>

<script>
import ListItem from "@/components/ListItem.vue";

export default {
  name: "List",
  components: { ListItem },
  props: {
    list: {
      type: Array
    }
  }
};
</script>

<style scoped lang="scss">
.list {
  outline: 1px solid $gray;
}
</style>
