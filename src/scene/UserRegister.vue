<template>
  <b-card header="ユーザ登録" class="m-2">
    <b-input-group prepend="ID" size="lg" class="mb-2">
      <b-form-input v-model="shareId"></b-form-input>
    </b-input-group>
    <b-input-group prepend="パスワード" size="lg" class="mb-2">
      <b-form-input type="password" v-model="password"></b-form-input>
    </b-input-group>
    <b-input-group prepend="パスワード確認" size="lg" class="mb-2">
      <b-form-input type="password" v-model="passwordConfirm"></b-form-input>
    </b-input-group>
    <b-button block size="lg" variant="primary" class="mb-4" @click="register">登録</b-button>
    <b-button block variant="outline-primary" @click="store.scene='Login'">戻る</b-button>
  </b-card>
</template>

<script>
import Utils from "../utils/Utils.js";

export default {
  components: {},
  name: "UserRegister",
  props: {},
  data() {
    return {
      store: this.$store,
      shareId: "",
      password: "",
      passwordConfirm: ""
    };
  },
  methods: {
    register() {
      if (this.password !== this.passwordConfirm) {
        alert("確認パスワードが異なっています");
        return;
      }
      Utils.httpPost("registerUser", {
        shareId: this.shareId,
        password: this.password
      })
        .then(response => {
          if (response.data === true) {
            alert("登録しました");
            this.store.scene = "Login";
          } else {
            alert("同じIDがすでに登録されています");
          }
        })
        .catch(() => alert("通信エラーです"))
        .finally(() => {
          this.password = "";
          this.passwordConfirm = "";
        });
    }
  }
};
</script>

<style scoped>
</style>
