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
      <div
        :class="{ food: true }"
        :style="{
          marginLeft: foodCoords[0] * 40 + 'px',
          marginTop: foodCoords[1] * 40 + 'px'
        }"
      ></div>
    </div>
  </div>
</template>

<script>
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}
function isEqualCoords(a, b) {
  if ((a[0] === b[0]) & (a[1] === b[1])) return true;
  return false;
}
export default {
  name: "HelloWorld",
  data: () => {
    return {
      snakeCoords: [
        [14, 10],
        [14, 11],
        [14, 12]
      ],
      foodCoords: [6, 12],
      dir: "Up",
      length: 3,
      score: 0
    };
  },
  methods: {
    isTurnAllowed() {
      if (isEqualCoords(this.getNewHeadPosition(this.dir), this.neck) === true)
        return false;
      return true;
    },
    createFood() {
      let newFoodCoords = [getRandomInt(0, 19), getRandomInt(0, 19)];
      this.foodCoords = [...newFoodCoords];
    },
    eatFood() {
      if (isEqualCoords(this.head, this.foodCoords)) {
        this.createFood();
        this.length += 1;
        this.score += 125;
      }
    },
    getNewHeadPosition(d) {
      let head = this.head;
      if (d === "Up") {
        head[1] -= 1;
      }
      if (d === "Left") {
        head[0] -= 1;
      }
      if (d === "Down") {
        head[1] += 1;
      }
      if (d === "Right") {
        head[0] += 1;
      }
      if (head[0] < 0) head[0] = 19;
      if (head[1] < 0) head[1] = 19;
      if (head[0] > 19) head[0] = 19;
      if (head[1] > 19) head[1] = 19;
      return (this.head = head);
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
      this.eatFood();
      console.log(this.length);
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
