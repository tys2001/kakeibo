<template>
    <div style="padding: 60px 0;">
        <b-navbar fixed="top" type="dark" variant="info" style="height: 60px;">
            <b-navbar-nav>
                <b-button
                    v-if="panel==='ConfigMenu'"
                    @click="$emit('goto', 'MyPage')"
                    variant="info"
                >
                    <font-awesome-icon icon="chevron-circle-left" class="fa-lg" />
                </b-button>
                <b-button v-else @click="panel='ConfigMenu'" variant="info">
                    <font-awesome-icon icon="chevron-circle-left" class="fa-lg" />
                </b-button>
                <b-navbar-brand>{{title}}</b-navbar-brand>
            </b-navbar-nav>
        </b-navbar>
        <b-list-group v-if="panel==='ConfigMenu'" class="config-container">
            <b-list-group-item @click="panel='ConfigMember'" class="listItem">メンバー</b-list-group-item>
            <b-list-group-item @click="panel='ConfigCategory'" class="listItem">カテゴリ</b-list-group-item>
            <b-list-group-item @click="panel='ConfigNotice'" class="listItem">LINE通知</b-list-group-item>
        </b-list-group>
        <ConfigMember v-if="panel==='ConfigMember'" class="config-container" />
        <ConfigCategory v-if="panel==='ConfigCategory'" class="config-container" />
        <ConfigNotice v-if="panel==='ConfigNotice'" class="config-container" />
    </div>
</template>

<script>
import ConfigMember from "../panel/ConfigMember.vue";
import ConfigCategory from "../panel/ConfigCategory.vue";
import ConfigNotice from "../panel/ConfigNotice.vue";

export default {
    components: {
        ConfigMember,
        ConfigCategory,
        ConfigNotice
    },
    name: "Config",
    props: {},
    data() {
        return {
            store: this.$store,
            panel: "ConfigMenu"
        };
    },
    created() {},
    methods: {},
    computed: {
        title() {
            if (this.panel === "ConfigMenu") {
                return "設定";
            } else if (this.panel === "ConfigMember") {
                return "メンバー";
            } else if (this.panel === "ConfigCategory") {
                return "カテゴリ";
            } else if (this.panel === "ConfigNotice") {
                return "LINE通知";
            } else {
                return this.panel;
            }
        }
    }
};
</script>

<style scoped>
.config-container {
    padding: 10px;
}
.listItem {
    padding: 5px;
    height: 40px;
    line-height: 30px;
    font-size: 20px;
    transition: 200ms;
    cursor: pointer;
}
.listItem:hover {
    color: var(--white);
    background-color: var(--primary);
}
</style>
