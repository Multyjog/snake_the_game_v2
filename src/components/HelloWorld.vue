<template>
  <div>
    <div class="score">Score: {{ score }}</div>
    <!-- <div class="lastscore" v-if="storedScore1 > 0"> -->
    <!-- Your best score:{{ storedScore1 }} -->
    <!-- </div> -->
    <div class="rules" v-if="isGameActive === false">
      Welcome to Snake The Game
      <ul>
        <li>Snake loves pizza</li>
        <li>Try to eat as much as possible</li>
        <li>Dont bite yourself!</li>
      </ul>
      Use WASD or &larr; &uarr; &rarr; &darr; for movement
    </div>
    <div class="field">
      <div class="board" v-if="isGameActive === false">
        <button @click="startGame()" class="btn-grad">
          Start
        </button>
        <h3 v-if="score > 0">Your score: {{ score }}</h3>
        <h3 v-if="counter > 0">You survived: {{ seconds }} seconds</h3>
      </div>
      <div
        :class="{
          snake: true,
          head: index === 0,
          up: dir === 'Up',
          right: dir === 'Right',
          left: dir === 'Left'
        }"
        v-for="(coord, index) in snakeCoords"
        :key="index"
        :style="{
          marginLeft: coord[0] * 40 + 'px',
          marginTop: coord[1] * 40 + 'px'
        }"
      ></div>
      <div
        v-if="isGameActive"
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
import { getRandomInt, isEqualCoords } from "@/utils.js";
export default {
  name: "HelloWorld",
  data: () => {
    return {
      snakeCoords: [],
      foodCoords: [6, 12],
      dir: "Up",
      length: 2,
      score: 0,
      isGameActive: false,
      counter: 0
      // storedScore1: 0
    };
  },
  methods: {
    // storeScore() {
    //   let scoreToStore = this.storedScore1;
    //   if (this.score > scoreToStore) {
    //     scoreToStore = this.score;
    //     localStorage.score = scoreToStore;
    //     this.storedScore1 = localStorage.score;
    //   }
    // },
    smash() {
      if (this.isInSnakeBody(this.head)) {
        // this.storeScore();
        this.isGameActive = false;
      }
    },
    startGame() {
      this.isGameActive = true;
      this.createFood();
      this.snakeCoords = [
        [14, 11],
        [14, 12]
      ];
      this.length = 2;
      this.score = 0;
      this.counter = 0;
    },
    isInSnakeBody(a) {
      for (let coord of this.snakeCoords.slice(1)) {
        if (isEqualCoords(a, coord)) return true;
      }
      return false;
    },
    isTurnAllowed(d) {
      let head = this.getNewHeadPosition(d);
      let neck = this.neck;
      if (!isEqualCoords(head, neck)) return true;
      return false;
    },
    createFood() {
      let newFoodCoords = [getRandomInt(0, 19), getRandomInt(0, 19)];
      while (this.isInSnakeBody(newFoodCoords)) {
        this.foodCoords = [...newFoodCoords];
      }
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
      const head = [...this.head];
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
      if (head[0] > 19) head[0] = 0;
      if (head[1] > 19) head[1] = 0;
      return head;
    },
    updateCoords() {
      let newHead = this.getNewHeadPosition(this.dir);
      this.snakeCoords = [newHead, ...this.snakeCoords].slice(0, this.length);
    }
  },
  computed: {
    head() {
      return this.snakeCoords[0];
    },
    neck() {
      return this.snakeCoords[1];
    },
    seconds() {
      return Math.floor(this.counter);
    }
  },
  mounted() {
    // if (localStorage.score) this.storedScore1 = localStorage.score;
    document.addEventListener("keydown", e => {
      if ((e.key === "w" || e.key === "ArrowUp") && this.isTurnAllowed("Up")) {
        this.dir = "Up";
      }
      if (
        (e.key === "a" || e.key === "ArrowLeft") &&
        this.isTurnAllowed("Left")
      ) {
        this.dir = "Left";
      }
      if (
        (e.key === "s" || e.key === "ArrowDown") &&
        this.isTurnAllowed("Down")
      ) {
        this.dir = "Down";
      }
      if (
        (e.key === "d" || e.key === "ArrowRight") &&
        this.isTurnAllowed("Right")
      ) {
        this.dir = "Right";
      }
    });
    setInterval(() => {
      if (this.isGameActive) {
        this.updateCoords();
        this.eatFood();
        this.smash();
        this.counter += 0.15;
      }
    }, 150);
  }
};
// 100 minutes at work
</script>

<style scoped>
.lastscore {
  width: 400px;
  position: absolute;
  margin-top: 56px;
  margin-left: 0.5rem;
  color: white;
  font-size: 2rem;
  font-weight: bold;
}
.rules {
  float: right;
  margin-right: 120px;
  font-weight: bolder;
  font-size: 1.5rem;
  color: white;
}
.score {
  margin-left: 3rem;
  float: left;
  font-weight: bolder;
  font-size: 3rem;
  color: white;
}
.snake.head.left {
  width: 40px;
  height: 40px;
  transform: rotate(90deg);
}
.snake.head.right {
  width: 40px;
  height: 40px;
  transform: rotate(-90deg);
}
.snake.head.up {
  width: 40px;
  height: 40px;
  transform: rotate(180deg);
}
.snake.head {
  width: 40px;
  height: 40px;
  background-image: url("../assets/head.png");
  background-color: rgba(255, 255, 255, 0);
  z-index: 100;
}
h3 {
  margin-left: 1rem;
  color: white;
  text-align: left;
}
.btn-grad {
  background-image: linear-gradient(
    to right,
    #b646c0 0%,
    #9e9620 51%,
    #b646c0 100%
  );
}
.btn-grad {
  margin: 10px auto;
  padding: 15px 45px;
  text-align: center;
  text-transform: uppercase;
  font-weight: bold;
  transition: 0.5s;
  background-size: 200% auto;
  color: rgb(255, 255, 255);
  border-radius: 5px;
}

.btn-grad:hover {
  background-position: right center;
  color: #fff;
}
.board {
  margin-left: 12%;
  margin-top: 11%;
  position: absolute;
  border-radius: 20px;
  background-color: rgba(83, 22, 97, 0.767);
  width: 350px;
  height: 200px;
  z-index: 110;
}
.field {
  width: 800px;
  height: 800px;
  background-color: burlywood;
  margin: 0 auto;
  border-radius: 5px;
}
.food {
  position: absolute;
  height: 40px;
  width: 40px;
  border-radius: 50%;
  background-image: url("../assets/pizza.png");
}
.snake {
  position: absolute;
  background-color: darkcyan;
  width: 40px;
  height: 40px;
  border-radius: 5px;
}
</style>
