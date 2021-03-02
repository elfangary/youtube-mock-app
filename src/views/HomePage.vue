<template>
  <div class="home-page">
    <Filters />
    <List />
  </div>
</template>

<script>
import Filters from "@/components/Filters.vue";
import List from "@/components/List.vue";

export default {
  name: "HomePage",
  components: { Filters, List }
};
</script>
