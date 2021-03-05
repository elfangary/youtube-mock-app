/**
 * Mixin for handling infinite scroll lists
 *
 */
export const InfiniteScrollMixin = {
  methods: {
    handleScroll() {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        this.handlePaginateOnScroll();
      }
    }
  },
  created() {
    window.addEventListener("scroll", this.handleScroll);
  },
  unmounted() {
    window.removeEventListener("scroll", this.handleScroll);
  }
};
