<template>
    <div v-if="busy" class="text-center">
        <b-spinner variant="primary" label="Loading..."></b-spinner>
    </div>
    <b-list-group v-else>
        <b-list-group-item
            v-for="history in historyList"
            :key="historyList.indexOf(history)"
            @click="toggleRowDetail(history)"
            class="listItem"
            :opened="history===selectedHistory"
        >
            <div class="left-part">
                <div class="payDateTime">{{history.payDateTime}}</div>
                <div class="memberId">{{history.memberId}}</div>
                <div class="payTypeId">{{history.payTypeId}}</div>
            </div>
            <div class="payAmount">
                <font-awesome-icon icon="yen-sign" class="fa-xs" />
                {{history.payAmount}}
            </div>
            <b-button
                v-if="history===selectedHistory"
                class="float-right"
                variant="success"
                size="sm"
                @click="deleteRow(history)"
            >取り消し</b-button>
        </b-list-group-item>
    </b-list-group>
</template>

<script>
import Utils from "../utils/Utils.js";

export default {
    components: {},
    name: "History",
    props: {},
    data() {
        return {
            store: this.$store,
            historyList: [],
            selectedHistory: null,
            busy: false
        };
    },
    mounted() {
        this.search();
    },
    methods: {
        search() {
            this.busy = true;
            Utils.httpGet("https://tyspine.com/service/money/showPay", {
                shareId: this.store.auth.shareId,
                year: this.store.yearMonth.year,
                month: this.store.yearMonth.month
            })
                .then(response => (this.historyList = response.data))
                .finally(() => (this.busy = false));
        },
        deleteRow(selectedHistory) {
            if (!confirm("取り消しますか？")) return;
            Utils.httpPost("https://tyspine.com/service/money/deletePay", {
                shareId: this.store.auth.shareId,
                payId: selectedHistory.payId
            }).finally(() => this.search());
        },
        toggleRowDetail(selectedHistory) {
            if (this.selectedHistory === selectedHistory) {
                this.selectedHistory = null;
            } else {
                this.selectedHistory = selectedHistory;
            }
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
    height: 52px;
    transition: 200ms;
    cursor: pointer;
}
.listItem[opened] {
    height: 82px;
    color: var(--white);
    background-color: var(--primary);
}
.listItem .left-part {
    width: 50%;
    float: left;
}
.listItem .payAmount {
    width: 50%;
    height: 40px;
    line-height: 40px;
    text-align: right;
    font-size: 30px;
    float: left;
}
.listItem .payDateTime {
    width: 100%;
    height: 20px;
    line-height: 20px;
    float: left;
}
.listItem .memberId {
    width: 50%;
    height: 20px;
    line-height: 20px;
    float: left;
}
.listItem .payTypeId {
    width: 50%;
    height: 20px;
    line-height: 20px;
    float: left;
}
</style>
