<template>
  <b-card header="ログイン" class="m-2">
    <b-input-group prepend="ID" size="lg" class="mb-2">
      <b-form-input v-model="shareId"></b-form-input>
    </b-input-group>
    <b-input-group prepend="パスワード" size="lg" class="mb-2">
      <b-form-input type="password" v-model="password"></b-form-input>
    </b-input-group>
    <b-button
      block
      size="lg"
      variant="primary"
      class="mb-4"
      @click="login"
    >ログイン</b-button>
    <b-button
      block
      variant="outline-primary"
      @click="$emit('goto', 'UserRegister')"
    >新規登録</b-button>
  </b-card>
</template>

<script>

export default {
  components: {
  },
  name: 'Login',
  props: {
  },
  data() {
    return {
      shareId: '',
      password: '',
    };
  },
  created() {
    if(localStorage.shareId) {
      this.shareId = localStorage.shareId
      this.login()
    }
  },
  methods: {
    login() {
      localStorage.shareId = this.shareId
      this.$emit('goto', 'MyPage')
    },
  },
}
</script>

<style scoped>

</style>
