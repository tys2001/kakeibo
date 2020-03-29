<template>
  <b-card header="ログイン" class="m-2">
    <b-input-group prepend="ID" size="lg" class="mb-2">
      <b-form-input id="kakeibo_id" v-model="shareId"></b-form-input>
    </b-input-group>
    <b-input-group prepend="パスワード" size="lg" class="mb-2">
      <b-form-input type="password" v-model="password"></b-form-input>
    </b-input-group>
    <b-button block size="lg" variant="primary" class="mb-4" @click="login">ログイン</b-button>

    <b-row no-gutters class="mb-4">
      <b-col class="pr-1">
        <b-button block variant="outline-primary" @click="store.scene='UserRegister'">新規登録</b-button>
      </b-col>
      <b-col class="pl-1">
        <b-button block variant="outline-primary" @click="demoLogin">デモ</b-button>
      </b-col>
    </b-row>
    <b-badge class="float-right">Build: {{buildTimestamp}}</b-badge>
  </b-card>
</template>

<script>
import Utils from "../utils/Utils.js";

export default {
  components: {},
  name: "Login",
  props: {},
  data() {
    return {
      store: this.$store,
      shareId: "",
      password: "",
      buildTimestamp: document.documentElement.dataset.buildTimestamp
    };
  },
  created() {
    if (localStorage.authToken) this.store.scene = "MyPage";
  },
  methods: {
    login() {
      Utils.httpPost("auth", {
        shareId: this.shareId,
        password: this.password
      })
        .then(response => {
          if (response.data.valid) {
            localStorage.authToken = response.data.authToken;
            this.store.scene = "MyPage";
          } else {
            alert("認証に失敗しました");
          }
        })
        .catch(() => alert("通信エラーです"))
        .finally(() => (this.password = ""));
    },
    demoLogin() {
      this.shareId = "demo";
      this.password = "demo0000";
      this.login();
    }
  }
};
</script>

<style scoped>
</style>
