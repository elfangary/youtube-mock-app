<template>
  <ul class="list">
    <li v-for="(item, i) in list" :key="i">
      <ListItem v-if="item" :item="item" />
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
  border-top: 1px solid $lightGray;
  list-style: none;
  padding: 10px;

  li {
    & + li {
      margin-top: 10px;
    }
  }
}
</style>
