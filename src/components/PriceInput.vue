<template>
  <div class="container-box">
    <b-button pill variant="primary" class="button" @click="numberPush('7')">7</b-button>
    <b-button pill variant="primary" class="button" @click="numberPush('8')">8</b-button>
    <b-button pill variant="primary" class="button" @click="numberPush('9')">9</b-button>
    <b-button pill variant="secondary" class="button" @click="clear">
      <font-awesome-icon icon="trash-alt" />
    </b-button>
    <b-button pill variant="primary" class="button" @click="numberPush('4')">4</b-button>
    <b-button pill variant="primary" class="button" @click="numberPush('5')">5</b-button>
    <b-button pill variant="primary" class="button" @click="numberPush('6')">6</b-button>
    <b-button pill variant="secondary" class="button" @click="back">
      <font-awesome-icon icon="backspace" />
    </b-button>
    <b-button pill variant="primary" class="button" @click="numberPush('1')">1</b-button>
    <b-button pill variant="primary" class="button" @click="numberPush('2')">2</b-button>
    <b-button pill variant="primary" class="button" @click="numberPush('3')">3</b-button>
    <b-button pill variant="primary" class="button" @click="numberPush('00')">00</b-button>
    <b-button pill variant="primary" class="button" @click="numberPush('0')">0</b-button>
    <b-button pill variant="primary" class="button">.</b-button>
    <b-button variant="success" class="submit button" @click="submit">登録</b-button>
  </div>
</template>

<script>
export default {
  name: "PriceInput",
  props: {
    value: String,
    maxLength: Number
  },
  data() {
    return {};
  },
  methods: {
    numberPush(number) {
      if (this.value === "") {
        if (number === "0" || number === "00") {
          return;
        }
      }
      if (this.value.length + number.length > this.maxLength) {
        return;
      }
      this.$emit("input", this.value + number);
    },
    clear() {
      this.$emit("input", "");
    },
    back() {
      this.$emit("input", this.value.slice(0, -1));
    },
    submit() {
      this.$emit("submit", this.value);
    }
  }
};
</script>

<style scoped>
.container-box {
  width: 100%;
  height: 222px;
  background-color: var(--light);
  padding: 10px;
  display: grid;
  grid-template-columns: 25% 25% 25% 25%;
  grid-template-rows: 25% 25% 25% 25%;
}

.button {
  margin: 5px;
  padding: 0;
  line-height: 40px;
  font-size: 20px;
}

.submit.button {
  line-height: 90px;
  border-radius: 20px;
  grid-column: 4;
  grid-row: 3 / 5;
}
</style>
