export const IsDesktopViewMixin = {
  data: function() {
    return {
      windowWidth: 0
    };
  },
  methods: {
    handleResize() {
      this.windowWidth = window.innerWidth;
    }
  },
  computed: {
    isDesktopView() {
      return this.windowWidth > 768;
    }
  },
  created() {
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
  },
  unmounted() {
    window.removeEventListener("resize", this.handleResize);
  }
};
