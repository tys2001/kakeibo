<template>
  <div>
    <div v-if="busy" class="text-center">
      <b-spinner
        variant="primary"
        label="Loading..."></b-spinner>
    </div>
    <b-list-group v-else>
      <b-list-group-item
        v-for="member in memberList"
        :key="memberList.indexOf(member)"
        @click="toggleRowDetail(member)"
        class="listItem"
        :opened="member===selectedMember"
      >
        <div class="member">{{member.memberId}}</div>
        <b-button
          v-if="member===selectedMember"
          class="float-right"
          variant="success"
          size="sm"
          @click="deleteRow(member)"
        >削除</b-button>
      </b-list-group-item>
    </b-list-group>
    <transition name="trans">
      <b-card v-if="addFormVisible" class="addForm">
        <b-input-group prepend="メンバー名" size="lg" class="mb-2">
          <b-form-input v-model="addMemberId"></b-form-input>
        </b-input-group>
        <div class="text-right">
          <b-button variant="success" @click="addRow">登録</b-button>
          <b-button @click="addFormVisible=false">キャンセル</b-button>
        </div>
      </b-card>
      <b-button v-else pill @click="addFormVisible=true" variant="primary" class="addButton" size="lg">
        <font-awesome-icon  icon="plus"/>
      </b-button>
    </transition>
  </div>
</template>

<script>
import Utils from '../utils/Utils.js'

export default {
  components: {
  },
  name: 'ConfigMember',
  props: {
    shareId: String,
  },
  data() {
    return {
      memberList: [],
      selectedMember: null,
      busy: false,
      addFormVisible: false,
      addMemberId: '',
    };
  },
  mounted() {
    this.search()
  },
  methods: {
    search() {
      this.busy = true
      Utils.httpGet('https://tyspine.com/service/money/getMemberList',
        {
          shareId: this.shareId,
        })
      .then(response => this.memberList = response.data)
      .finally(() => this.busy = false)
    },
    addRow() {
      if(!this.addMemberId) return;
      if(!confirm("追加しますか？")) return;
      Utils.httpPost('https://tyspine.com/service/money/addMember',
        {
          shareId: this.shareId,
          memberId: this.addMemberId,
        })
      .finally(() => this.search())
      this.addMemberId = ''
      this.addFormVisible=false
    },
    deleteRow(selectedMember) {
      if(!confirm("削除しますか？")) return;
      Utils.httpPost('https://tyspine.com/service/money/deleteMember',
        {
          shareId: this.shareId,
          memberId: selectedMember.memberId,
        })
      .finally(() => this.search())
    },
    toggleRowDetail(selectedMember) {
      if(this.selectedMember === selectedMember) {
        this.selectedMember = null;
      } else {
        this.selectedMember = selectedMember;
      }
    },
  },
}
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
.listItem .member{
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
