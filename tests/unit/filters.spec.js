import { mount } from "@vue/test-utils";
import Filters from "../../src/components/Filters.vue";

let wrapper;

beforeEach(() => {
  wrapper = mount(Filters, {
    propsData: {
      loading: false
    },
    computed: {
      isDesktopView() {
        return true;
      }
    }
  });
});

describe("Toggle filters button", () => {
  test("is toggle button visible", () => {
    const toggleButton = wrapper.find(".filters__toggleButton");

    expect(toggleButton.exists()).toBe(true);
  });
});

describe("Emit Type value", () => {
  test("is emitted after change", async () => {
    await wrapper.setData({ typeVal: "video" });

    expect(wrapper.emitted("type-search")).toBeTruthy();
  });
});

describe("Emit Sort value", () => {
  test("is emitted after change", async () => {
    await wrapper.setData({ sortByVal: "viewCount" });

    expect(wrapper.emitted("sortBy-search")).toBeTruthy();
  });
});

describe("Emit Date value", () => {
  test("is emitted after change", async () => {
    await wrapper.setData({ dateVal: "2021-03-05T19:03:51.168Z" });

    expect(wrapper.emitted("date-search")).toBeTruthy();
  });
});
