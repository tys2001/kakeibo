<template>
    <div>
        <b-button size="lg" class="col-3" @click="movePrev">
            <font-awesome-icon icon="angle-double-left" />
        </b-button>
        <div class="ym-display col-6">
            <div class="year">{{store.yearMonth.year}}年</div>
            <div class="month">{{store.yearMonth.month}}月</div>
        </div>
        <b-button size="lg" class="col-3" @click="moveNext">
            <font-awesome-icon icon="angle-double-right" />
        </b-button>
    </div>
</template>

<script>
export default {
    components: {},
    name: "Calendar",
    props: {},
    data() {
        return {
            store: this.$store
        };
    },
    methods: {
        moveNext() {
            this.store.yearMonth.month++;
            if (this.store.yearMonth.month > 12) {
                this.store.yearMonth.year++;
                this.store.yearMonth.month = 1;
            }
        },
        movePrev() {
            this.store.yearMonth.month--;
            if (this.store.yearMonth.month < 1) {
                this.store.yearMonth.year--;
                this.store.yearMonth.month = 12;
            }
        }
    }
};
</script>

<style scoped>
.ym-display {
    display: inline-block;
    vertical-align: bottom;
}
.year,
.month {
    text-align: center;
}
.month {
    font-size: 24px;
}
</style>
