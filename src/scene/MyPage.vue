<template>
  <div style="padding: 60px 0;">
    <b-navbar fixed="top" type="dark" variant="info" style="height: 60px;">
      <b-navbar-nav class="ml-auto">
        <b-nav-item-dropdown right no-caret>
          <template v-slot:button-content>
            <font-awesome-icon icon="bars" class="fa-lg"/>
          </template>
          <b-dropdown-item @click="$emit('goto', 'Config')">設定</b-dropdown-item>
          <b-dropdown-item @click="reload">更新</b-dropdown-item>
          <b-dropdown-item @click="logout">ログアウト</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-navbar>
    <b-navbar class="bottom-navi" fixed="bottom" type="dark" variant="info" style="height: 60px;">
      <b-button class="col-4" size="lg" @click="panel='Register'" variant="info" :pressed="panel==='Register'">
        <font-awesome-icon icon="yen-sign" class="fa-2x"/>登録
      </b-button>
      <b-button class="col-4" size="lg" @click="panel='History'" variant="info" :pressed="panel==='History'">
        <font-awesome-icon icon="clock" class="fa-2x"/>履歴
      </b-button>
      <b-button class="col-4" size="lg" @click="panel='Summary'" variant="info" :pressed="panel==='Summary'">
        <font-awesome-icon icon="chart-pie" class="fa-2x"/>集計
      </b-button>
    </b-navbar>
    <Register v-if="panel==='Register'" :shareId="shareId" class="register-container"/>
    <Calendar v-if="panel==='History' || panel==='Summary'" :selectedYearMonth="selectedYearMonth" class="month-container"/>
    <History v-if="panel==='History'" :shareId="shareId" :selectedYearMonth="selectedYearMonth" class="history-container"/>
    <Summary v-if="panel==='Summary'" :shareId="shareId" :selectedYearMonth="selectedYearMonth" class="summary-container"/>
  </div>
</template>

<script>
import Register from '../panel/Register.vue'
import Calendar from '../panel/Calendar.vue'
import History from '../panel/History.vue'
import Summary from '../panel/Summary.vue'
export default {
  components: {
    Register,
    Calendar,
    History,
    Summary,
  },
  name: 'MyPage',
  props: {
  },
  data() {
    return {
      panel: 'Register',
      shareId: '',
      selectedYearMonth: {
        year: 2020,
        month: 1,
      },
    };
  },
  created() {
    this.shareId = localStorage.shareId
  },
  methods: {
    logout() {
      delete localStorage.shareId
      this.$emit('goto', 'Login')
    },
    reload() {
      location.reload()
    },
  },
}
</script>

<style scoped>
.bottom-navi > button{
  font-size: 14px;
}

.month-container {
  padding: 10px;
  position: -webkit-sticky;
  position: sticky;
  top: 60px;
  z-index: 2;
  background-color: #fff;
}
.register-container {
  padding: 10px;
}
.history-container,
.summary-container {
  padding: 0 10px 10px 10px;
}

</style>
