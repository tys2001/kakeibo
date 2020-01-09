<template>
  <div>
    <b-button size="lg" class="col-3" @click="movePrev">
      <font-awesome-icon icon="angle-double-left"/>
    </b-button>
    <div class="ym-display col-6">
      <div class="year">{{selectedYearMonth.year}}年</div>
      <div class="month">{{selectedYearMonth.month}}月</div>
    </div>
    <b-button size="lg" class="col-3" @click="moveNext">
      <font-awesome-icon icon="angle-double-right"/>
    </b-button>
  </div>
</template>

<script>
export default {
  components: {
  },
  name: 'Calendar',
  props: {
    selectedYearMonth: Object,
  },
  data() {
    return {
    };
  },
  methods: {
    moveNext() {
      this.selectedYearMonth.month++
      if(this.selectedYearMonth.month > 12) {
        this.selectedYearMonth.year++
        this.selectedYearMonth.month = 1
      }
    },
    movePrev() {
      this.selectedYearMonth.month--
      if(this.selectedYearMonth.month < 1) {
        this.selectedYearMonth.year--
        this.selectedYearMonth.month = 12
      }
    },
  },
}
</script>

<style scoped>
.ym-display {
  display:inline-block;
  vertical-align:bottom;
}
.year,
.month {
  text-align: center;
}
.month {
  font-size: 24px;
}
</style>
