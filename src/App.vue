<template>
  <div id="app">
    <Login v-if="store.scene==='Login'" />
    <UserRegister v-if="store.scene==='UserRegister'" />
    <MyPage v-if="store.scene==='MyPage'" />
    <Config v-if="store.scene==='Config'" />
  </div>
</template>

<script>
import Login from "./scene/Login.vue";
import UserRegister from "./scene/UserRegister.vue";
import MyPage from "./scene/MyPage.vue";
import Config from "./scene/Config.vue";

export default {
  components: {
    Login,
    UserRegister,
    MyPage,
    Config
  },
  name: "app",
  data() {
    return {
      store: this.$store
    };
  },
  methods: {}
};
</script>

<style>
#app {
  font-family: verdana, "ヒラギノ丸ゴ ProN W4", "Hiragino Maru Gothic ProN",
    "メイリオ", "Meiryo", "ＭＳ Ｐゴシック", "MS PGothic", Sans-Serif;
}
* {
  user-select: none;
}
input {
  user-select: auto;
}
</style>
