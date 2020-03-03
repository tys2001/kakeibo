<template>
  <div id="app">
    <Login v-if="scene==='Login'" @goto="goto"/>
    <UserRegister v-if="scene==='UserRegister'" @goto="goto"/>
    <MyPage v-if="scene==='MyPage'" @goto="goto"/>
    <Config v-if="scene==='Config'" @goto="goto"/>
  </div>
</template>

<script>
import Login from './scene/Login.vue'
import UserRegister from './scene/UserRegister.vue'
import MyPage from './scene/MyPage.vue'
import Config from './scene/Config.vue'

export default {
  components: {
    Login,
    UserRegister,
    MyPage,
    Config,
  },
  name: 'app',
  data() {
    return {
      store: this.$store,
      scene: 'Login',
    }
  },
  methods: {
    goto(scene) {
      this.scene = scene
    },
  },
}
</script>

<style>
#app {
  font-family: verdana,"ヒラギノ丸ゴ ProN W4","Hiragino Maru Gothic ProN","メイリオ","Meiryo","ＭＳ Ｐゴシック","MS PGothic",Sans-Serif;
}
* {
	user-select: none;
}
input {
	user-select: auto;
}
</style>
