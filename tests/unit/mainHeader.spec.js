import { mount } from "@vue/test-utils";
import MainHeader from "../../src/components/MainHeader.vue";

let wrapper;

beforeEach(() => {
  wrapper = mount(MainHeader, {
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

describe("Clear search button visibility", () => {
  test("is clear button visible", async () => {
    await wrapper.setData({ searchVal: "test" });
    expect(wrapper.vm.searchVal).toBe("test");

    expect(wrapper.find(".main-header__search__clear").exists()).toBe(true);
  });
});

describe("Clear search input value", () => {
  test("is value cleared after setting", async () => {
    await wrapper.setData({ searchVal: "test" });
    expect(wrapper.vm.searchVal).toBe("test");

    const clearSearchEl = wrapper.find(".main-header__search__clear");
    await clearSearchEl.trigger("click");

    expect(wrapper.vm.searchVal).toBe("");
  });
});

describe("Submit search button", () => {
  test("is button visible", async () => {
    const searchButton = wrapper.find(".main-header__search__button");

    expect(searchButton.exists()).toBe(true);
  });
});

describe("Emit Submit value", () => {
  test("is emitted after submission", async () => {
    await wrapper.setData({ searchVal: "test" });

    const searchButton = wrapper.find(".main-header__search__button");
    await searchButton.trigger("click");

    expect(wrapper.emitted("submit-search")).toBeTruthy();
  });
});
