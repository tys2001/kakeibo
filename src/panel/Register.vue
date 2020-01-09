<template>
  <div v-if="busy" class="text-center">
    <b-spinner
      variant="primary"
      label="Loading..."></b-spinner>
  </div>
  <div v-else>
    <h1 class="text-right border-bottom" style="height: 60px;line-height: 60px;">
      <font-awesome-icon icon="yen-sign" class="fa-xs"/>{{amount}}
    </h1>
    <SlideSelect :items="memberList" v-model="memberSelected"  class="mb-2"/>
    <SlideSelect :items="categoryList" v-model="categorySelected"  class="mb-2"/>
    <PriceInput v-model="amount" :maxLength="7" @submit="register" class="price-input"/>
  </div>
</template>

<script>
import axios from 'axios'
import Utils from '../utils/Utils.js'
import SlideSelect from '../components/SlideSelect.vue'
import PriceInput from '../components/PriceInput.vue'
export default {
  components: {
    SlideSelect,
    PriceInput,
  },
  name: 'Register',
  props: {
    shareId: String,
  },
  data() {
    return {
      busy: false,
      amount: '',
      memberList: [],
      memberSelected: '',
      categoryList: [],
      categorySelected: '',
    };
  },
  created() {
    this.busy = true
    axios.all([
      Utils.httpGet('https://tyspine.com/service/money/getMemberList', { shareId: this.shareId }),
      Utils.httpGet('https://tyspine.com/service/money/getPayTypeList', { shareId: this.shareId }),
    ])
    .then(responses => {
      this.memberList = []
      for(let d of responses[0].data) {
        this.memberList.push({
          value: d.memberId,
          label: d.memberId,
        })
      }
      if(this.memberList.length > 0) {
        this.memberSelected = this.memberList[0].value
      }
      this.categoryList = []
      for(let d of responses[1].data) {
        this.categoryList.push({
          value: d.payTypeId,
          label: d.payTypeId,
        })
      }
      if(this.categoryList.length > 0) {
        this.categorySelected = this.categoryList[0].value
      }
    })
    .finally(() => this.busy = false)
  },
  methods: {
    register() {
      if(isNaN(parseInt(this.amount))) {
        return;
      }
      Utils.httpPost('https://tyspine.com/service/money/addPay',
        {
          shareId: this.shareId,
          memberId: this.memberSelected,
          payTypeId: this.categorySelected,
          payAmount: this.amount,
        })
      .then(()=>alert('登録しました'))
      .catch(()=>alert('通信エラーです'))
      .finally(() => {
        this.amount = ''
      })
    },
  },
}
</script>

<style scoped>
.price-input {
  position: fixed;
  left: 0;
  bottom: 60px;
  border-top: 1px solid gray;
  border-radius: 10px;
}
</style>
