<template>
  <div v-if="busy" class="text-center">
    <b-spinner variant="primary" label="Loading..."></b-spinner>
  </div>
  <div v-else>
    <h1 class="text-right border-bottom" style="height: 60px;line-height: 60px;">
      <font-awesome-icon icon="yen-sign" class="fa-xs" />
      <span>{{amount}}</span>
    </h1>
    <SlideSelect
      :items="store.memberList"
      v-model="memberSelected"
      valueField="memberId"
      textField="memberId"
      class="mb-2"
    />
    <SlideSelect
      :items="store.categoryList"
      v-model="categorySelected"
      valueField="payTypeId"
      textField="payTypeId"
      class="mb-2"
    />
    <PriceInput v-model="amount" :maxLength="7" @submit="register" class="price-input" />
  </div>
</template>

<script>
import Utils from "../utils/Utils.js";
import SlideSelect from "../components/SlideSelect.vue";
import PriceInput from "../components/PriceInput.vue";
export default {
  components: {
    SlideSelect,
    PriceInput
  },
  name: "Register",
  props: {},
  data() {
    return {
      store: this.$store,
      busy: false,
      amount: "",
      memberSelected: "",
      categorySelected: ""
    };
  },
  created() {
    this.busy = true;
    Promise.all([
      this.store.loadCacheMemberList(),
      this.store.loadCacheCategoryList()
    ])
      .then(() => {
        if (this.store.memberList.length > 0) {
          if (localStorage.memberSelected)
            this.memberSelected = localStorage.memberSelected;
          else this.memberSelected = this.store.memberList[0].memberId;
        }
        if (this.store.categoryList.length > 0) {
          if (localStorage.categorySelected)
            this.categorySelected = localStorage.categorySelected;
          else this.categorySelected = this.store.categoryList[0].payTypeId;
        }
      })
      .finally(() => (this.busy = false));
  },
  methods: {
    register() {
      if (isNaN(parseInt(this.amount))) return;
      Utils.httpPost("addPay", {
        memberId: this.memberSelected,
        payTypeId: this.categorySelected,
        payAmount: this.amount
      })
        .then(response => {
          if (response.data) {
            localStorage.memberSelected = this.memberSelected;
            localStorage.categorySelected = this.categorySelected;
            alert("登録しました");
          }
        })
        .catch(() => alert("通信エラーです"))
        .finally(() => (this.amount = ""));
    }
  }
};
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
