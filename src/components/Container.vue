<template>
  <div class="container">
    <slot></slot>
  </div>
</template>

<style scoped lang="scss">
.container {
  width: 100%;
  height: 100%;
  position: relative;

  @media (min-width: 768px) {
    width: 80%;
    margin: auto;
  }
}
</style>
