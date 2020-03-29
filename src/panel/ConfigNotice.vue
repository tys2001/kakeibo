<template>
  <div v-if="busy" class="text-center">
    <b-spinner variant="primary" label="Loading..."></b-spinner>
  </div>
  <div v-else>
    <b-input-group prepend="LINEトークン" size="lg" class="mb-2">
      <b-form-input v-model="lineApiToken"></b-form-input>
    </b-input-group>
    <div class="text-right">
      <b-button href="https://tyspine.com/pub-kakeibo-notify" target="_blank" class="mr-1">
        <font-awesome-icon icon="question-circle" />
      </b-button>
      <b-button variant="success" @click="update">設定</b-button>
    </div>
  </div>
</template>

<script>
import Utils from "../utils/Utils.js";

export default {
  components: {},
  name: "ConfigNotice",
  props: {},
  data() {
    return {
      store: this.$store,
      lineApiToken: "",
      busy: false
    };
  },
  mounted() {
    this.display();
  },
  methods: {
    display() {
      this.busy = true;
      Utils.httpGet("getLineApiToken")
        .then(response => (this.lineApiToken = response.data.lineApiToken))
        .finally(() => (this.busy = false));
    },
    update() {
      if (!this.lineApiToken) return;
      Utils.httpPost("updateLineApiToken", {
        lineApiToken: this.lineApiToken
      }).finally(() => alert("設定しました"));
    }
  }
};
</script>

<style scoped>
</style>
