<template>
  <div v-if="busy" class="text-center">
    <b-spinner
      variant="primary"
      label="Loading..."></b-spinner>
  </div>
  <div v-else>
    <b-input-group prepend="LINEトークン" size="lg" class="mb-2">
      <b-form-input v-model="lineApiToken"></b-form-input>
    </b-input-group>
    <div class="text-right">
      <b-button variant="success" @click="update">設定</b-button>
    </div>
  </div>
</template>

<script>
import Utils from '../utils/Utils.js'

export default {
  components: {
  },
  name: 'ConfigNotice',
  props: {
    shareId: String,
  },
  data() {
    return {
      lineApiToken: '',
      busy: false,
    };
  },
  mounted() {
    this.display()
  },
  methods: {
    display() {
      this.busy = true
      Utils.httpGet('https://tyspine.com/service/money/getLineApiToken',
        {
          shareId: this.shareId,
        })
      .then(response => this.lineApiToken = response.data.lineApiToken)
      .finally(() => this.busy = false)
    },
    update() {
      if(!this.lineApiToken) return;
      Utils.httpPost('https://tyspine.com/service/money/updateLineApiToken',
        {
          shareId: this.shareId,
          lineApiToken: this.lineApiToken,
        })
      .finally(() => alert('設定しました'))
    },
  },
}
</script>

<style scoped>
</style>
