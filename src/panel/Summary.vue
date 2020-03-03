<template>
    <div v-if="busy" class="text-center">
        <b-spinner variant="primary" label="Loading..."></b-spinner>
    </div>
    <div v-else>
        <b-list-group>
            <b-list-group-item
                v-for="summary in summaryList"
                :key="summaryList.indexOf(summary)"
                @click="toggleRowDetail(summary)"
                class="listItem"
                :opened="summary===selectedSummary"
            >
                <div class="memberId">{{summary.memberId}}</div>
                <div class="sumPayAmount">
                    <font-awesome-icon icon="yen-sign" class="fa-xs" />
                    {{summary.sumPayAmount}}
                </div>
                <div class="shareAmount">
                    <font-awesome-icon icon="yen-sign" class="fa-xs" />
                    {{summary.shareAmount + ' ' + summary.shareType}}
                    <font-awesome-icon
                        v-if="summary.confirmDatetime"
                        icon="check"
                        style="color: var(--success);"
                    />
                </div>
                <b-button
                    v-if="summary===selectedSummary"
                    class="float-right"
                    variant="success"
                    size="sm"
                    @click="toggleConfirm(summary)"
                >{{summary.confirmDatetime?'取り消し':'済！'}}</b-button>
            </b-list-group-item>
        </b-list-group>
        <PieChart :data="chartData" />
        <PieChart :data="chartByCategoryData" />
    </div>
</template>

<script>
import Utils from "../utils/Utils.js";
import axios from "axios";
import PieChart from "../components/PieChart.vue";

export default {
    components: {
        PieChart
    },
    name: "History",
    props: {},
    data() {
        return {
            store: this.$store,
            summaryList: [],
            selectedSummary: null,
            summaryByCategoryList: [],
            busy: false
        };
    },
    mounted() {
        this.search();
    },
    methods: {
        search() {
            this.busy = true;
            const params = {
                shareId: this.store.auth.shareId,
                year: this.store.yearMonth.year,
                month: this.store.yearMonth.month
            };
            axios
                .all([
                    Utils.httpGet(
                        "https://tyspine.com/service/money/showSummaryPay",
                        params
                    ),
                    Utils.httpGet(
                        "https://tyspine.com/service/money/showSummaryByCategory",
                        params
                    )
                ])
                .then(responses => {
                    this.summaryList = responses[0].data;
                    this.summaryByCategoryList = responses[1].data;
                })
                .finally(() => (this.busy = false));
        },
        toggleRowDetail(selectedSummary) {
            if (this.selectedSummary === selectedSummary) {
                this.selectedSummary = null;
            } else {
                this.selectedSummary = selectedSummary;
            }
        },
        toggleConfirm(selectedSummary) {
            let url = "";
            if (selectedSummary.confirmDatetime) {
                if (!confirm("清算済を取り消しますか？")) return;
                url = "https://tyspine.com/service/money/deleteConfirm";
            } else {
                if (!confirm("清算済にしますか？")) return;
                url = "https://tyspine.com/service/money/addConfirm";
            }
            Utils.httpPost(url, {
                shareId: this.store.auth.shareId,
                year: this.store.yearMonth.year,
                month: this.store.yearMonth.month,
                memberId: selectedSummary.memberId
            }).finally(() => this.search());
        }
    },
    computed: {
        chartData() {
            const dataArray = [];
            const labelArray = [];
            for (let sum of this.summaryList) {
                dataArray.push(sum.sumPayAmount.replace(",", ""));
                labelArray.push(sum.memberId);
            }
            return {
                datasets: [{ data: dataArray }],
                labels: labelArray
            };
        },
        chartByCategoryData() {
            const dataArray = [];
            const labelArray = [];
            for (let sum of this.summaryByCategoryList) {
                dataArray.push(sum.sumPayAmount.replace(",", ""));
                labelArray.push(sum.payTypeId);
            }
            return {
                datasets: [{ data: dataArray }],
                labels: labelArray
            };
        }
    },
    watch: {
        "store.yearMonth": {
            handler() {
                this.search();
            },
            deep: true
        }
    }
};
</script>

<style scoped>
.listItem {
    padding: 5px;
    height: 62px;
    transition: 200ms;
    cursor: pointer;
}
.listItem[opened] {
    height: 92px;
    color: var(--white);
    background-color: var(--primary);
}
.memberId {
    width: 40%;
    height: 30px;
    line-height: 30px;
    font-size: 24px;
    float: left;
}
.sumPayAmount {
    width: 60%;
    height: 30px;
    line-height: 30px;
    font-size: 24px;
    float: left;
    text-align: right;
}
.shareAmount {
    width: 100%;
    height: 20px;
    line-height: 20px;
    font-size: 16px;
    float: left;
    text-align: right;
}
</style>
