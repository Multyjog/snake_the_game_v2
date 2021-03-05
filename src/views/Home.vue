<template>
  <div class="home">
    <div class="warning">
      <h3 class="first">Your device screen is to small for this page!</h3>
      <h3>We are sorry</h3>
    </div>
    <Snake />
  </div>
</template>

<script>
import Snake from "@/components/Snake.vue";

export default {
  name: "Home",
  components: {
    Snake
  }
};
</script>

<style scoped>
@media screen and (max-width: 820px) {
  .warning {
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: rgb(240, 196, 3);
    color: rgb(44, 42, 42);
    z-index: 150;
    font-size: 3rem;
    display: block !important;
    margin: 0;
    top: 0px;
    left: 0px;
  }
  .first {
    margin-top: 50%;
  }
}
.warning {
  display: none;
}
.home {
  background-image: url("/src/assets/background.jpg");
  background-repeat: no-repeat;
}
/* img {
  width: auto;
  height: 150px;
} */
</style>
