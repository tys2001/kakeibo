<template>
    <div>
        <div v-if="busy" class="text-center">
            <b-spinner variant="primary" label="Loading..."></b-spinner>
        </div>
        <b-list-group v-else>
            <b-list-group-item
                v-for="category in categoryList"
                :key="categoryList.indexOf(category)"
                @click="toggleRowDetail(category)"
                class="listItem"
                :opened="category===selectedCategory"
            >
                <div class="category">{{category.payTypeId}}</div>
                <b-button
                    v-if="category===selectedCategory"
                    class="float-right"
                    variant="success"
                    size="sm"
                    @click="deleteRow(category)"
                >削除</b-button>
            </b-list-group-item>
        </b-list-group>
        <transition name="trans">
            <b-card v-if="addFormVisible" class="addForm">
                <b-input-group prepend="カテゴリ名" size="lg" class="mb-2">
                    <b-form-input v-model="addCategoryId"></b-form-input>
                </b-input-group>
                <div class="text-right">
                    <b-button variant="success" @click="addRow">登録</b-button>
                    <b-button @click="addFormVisible=false">キャンセル</b-button>
                </div>
            </b-card>
            <b-button
                v-else
                pill
                @click="addFormVisible=true"
                variant="primary"
                class="addButton"
                size="lg"
            >
                <font-awesome-icon icon="plus" />
            </b-button>
        </transition>
    </div>
</template>

<script>
import Utils from "../utils/Utils.js";

export default {
    components: {},
    name: "ConfigCategory",
    props: {},
    data() {
        return {
            store: this.$store,
            categoryList: [],
            selectedCategory: null,
            busy: false,
            addFormVisible: false,
            addCategoryId: ""
        };
    },
    mounted() {
        this.search();
    },
    methods: {
        search() {
            this.busy = true;
            Utils.httpGet("https://tyspine.com/service/money/getPayTypeList", {
                shareId: this.store.auth.shareId
            })
                .then(response => (this.categoryList = response.data))
                .finally(() => (this.busy = false));
        },
        addRow() {
            if (!this.addCategoryId) return;
            if (!confirm("追加しますか？")) return;
            Utils.httpPost("https://tyspine.com/service/money/addPayType", {
                shareId: this.store.auth.shareId,
                payTypeId: this.addCategoryId
            }).finally(() => this.search());
            this.addCategoryId = "";
            this.addFormVisible = false;
        },
        deleteRow(selectedCategory) {
            if (!confirm("削除しますか？")) return;
            Utils.httpPost("https://tyspine.com/service/money/deletePayType", {
                shareId: this.store.auth.shareId,
                payTypeId: selectedCategory.payTypeId
            }).finally(() => this.search());
        },
        toggleRowDetail(selectedCategory) {
            if (this.selectedCategory === selectedCategory) {
                this.selectedCategory = null;
            } else {
                this.selectedCategory = selectedCategory;
            }
        }
    }
};
</script>

<style scoped>
.listItem {
    padding: 5px;
    height: 42px;
    transition: 200ms;
    cursor: pointer;
}
.listItem[opened] {
    height: 72px;
    color: var(--white);
    background-color: var(--primary);
}
.listItem .category {
    height: 30px;
    line-height: 30px;
    font-size: 20px;
}
.addButton {
    position: fixed;
    right: 10px;
    bottom: 10px;
}
.addForm {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
}
.trans-enter-active,
.trans-leave-active {
    transition: all 200ms;
}
.trans-enter,
.trans-leave-to {
    transform: translateY(100px);
}
</style>
