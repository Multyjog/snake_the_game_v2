<template>
  <div class="home">
    <img src="../assets/snake.png" />
    <HelloWorld />
  </div>
</template>

<script>
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  components: {
    HelloWorld
  }
};
</script>

<style scoped>
.home {
  background-image: url("/src/assets/background.jpg");
}
img {
  width: auto;
  height: 150px;
}
</style>
