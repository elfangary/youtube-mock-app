<template>
  <div class="list-wrapper">
    <Container>
      <p v-if="isDesktopView" class="list-wrapper__total-count">
        About {{ totalResultsCount }} results
      </p>
      <ul class="list">
        <li v-for="(item, i) in list" :key="i">
          <ListItem v-if="item" :item="item" :showItemDesc="showItemDesc" />
        </li>
      </ul>
    </Container>
  </div>
</template>

<script>
import ListItem from "@/components/ListItem.vue";
import Container from "@/components/Container.vue";
import { IsDesktopViewMixin } from "@/mixins/IsDesktopViewMixin.js";

export default {
  name: "List",
  mixins: [IsDesktopViewMixin],
  components: { ListItem, Container },
  props: {
    list: {
      type: Array
    },
    totalResultsCount: {
      type: Number
    },
    showItemDesc: {
      type: Boolean
    }
  }
};
</script>

<style scoped lang="scss">
.list-wrapper {
  border-top: 1px solid $lightGray;

  &__total-count {
    color: $gray;
    text-align: left;
    padding: 10px;
    margin: 5px 0;
  }
}

.list {
  list-style: none;
  padding: 10px;

  li {
    & + li {
      margin-top: 15px;
    }
  }
}
</style>
