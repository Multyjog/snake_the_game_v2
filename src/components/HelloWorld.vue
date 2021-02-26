<template>
  <div>
    <div class="field">
      <div
        :class="{ snake: true }"
        v-for="(coord, index) in snakeCoords"
        :key="index"
        :style="{
          marginLeft: coord[0] * 40 + 'px',
          marginTop: coord[1] * 40 + 'px'
        }"
      ></div>
      <div class="food"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data: () => {
    return {
      snakeCoords: [
        [14, 10],
        [14, 11],
        [14, 12]
      ],
      dir: "Up",
      length: 3
    };
  },
  methods: {
    getNewHeadPosition(d) {
      if (d === "Up") {
        this.head[1] -= 1;
      }
      if (d === "Left") {
        this.head[0] -= 1;
      }
      if (d === "Down") {
        this.head[1] += 1;
      }
      if (d === "Right") {
        this.head[0] += 1;
      }
      if (this.head[0] < 0) this.head[0] = 19;
      if (this.head[1] < 0) this.head[1] = 19;
      if (this.head[0] > 19) this.head[0] = 19;
      if (this.head[1] > 19) this.head[1] = 19;
      return this.head;
    },
    updateCoords() {
      let newHead = this.getNewHeadPosition(this.dir);
      this.snakeCoords = [newHead, ...this.snakeCoords];
    }
  },
  computed: {
    head() {
      return this.snakeCoords[0];
    },
    neck() {
      return this.snakeCoords[1];
    }
  },
  mounted() {
    document.addEventListener("keydown", e => {
      if (e.key === "w" && this.dir !== "Down") {
        this.dir = "Up";
      }
      if (e.key === "a" && this.dir !== "Right") {
        this.dir = "Left";
      }
      if (e.key === "s" && this.dir !== "Up") {
        this.dir = "Down";
      }
      if (e.key === "d" && this.dir !== "Left") {
        this.dir = "Right";
      }
    });
    setInterval(() => {
      this.updateCoords();
    }, 200);
  }
};
</script>

<style scoped>
.field {
  width: 800px;
  height: 800px;
  background-color: burlywood;
  margin: 0 auto;
}
.food {
  position: absolute;
  margin-left: 160px;
  margin-top: 80px;
  background-color: crimson;
  height: 40px;
  width: 40px;
  border-radius: 50%;
}
.snake {
  position: absolute;
  background-color: darkcyan;
  width: 40px;
  height: 40px;
}
</style>
