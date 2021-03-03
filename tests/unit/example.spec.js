import { shallowMount } from "@vue/test-utils";
import HelloWorld from "@/components/HelloWorld.vue";

describe("HelloWorld.vue", () => {
  it("renders correctly", () => {
    const msg = "Welcome to Snake The Game";
    const wrapper = shallowMount(HelloWorld);
    expect(wrapper.text()).toMatch(msg);
  });
  it("renders score correctly", async () => {
    const wrapper = shallowMount(HelloWorld);
    await wrapper.setData({ score: 123 });
    expect(wrapper.text()).toMatch("Score: 123");
  });
});
