<template>
    <b-card header="ユーザ登録" class="m-2">
        <b-input-group prepend="ID" size="lg" class="mb-2">
            <b-form-input v-model="userId"></b-form-input>
        </b-input-group>
        <b-input-group prepend="パスワード" size="lg" class="mb-2">
            <b-form-input type="password" v-model="password"></b-form-input>
        </b-input-group>
        <b-input-group prepend="パスワード確認" size="lg" class="mb-2">
            <b-form-input type="password" v-model="passwordConfirm"></b-form-input>
        </b-input-group>
        <b-button block size="lg" variant="primary" @click="$emit('goto', 'Login')">登録</b-button>
    </b-card>
</template>

<script>
export default {
    components: {},
    name: "UserRegister",
    props: {},
    data() {
        return {
            store: this.$store,
            userId: "",
            password: "",
            passwordConfirm: ""
        };
    },
    methods: {
        search() {}
    }
};
</script>

<style scoped>
</style>
