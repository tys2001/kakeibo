<template>
  <div class="container-box">
    <div
      v-for="item in items"
      :key="item.value"
      @click="$emit('input', item.value)"
      :selected="value===item.value"
      class="item"
    >{{item.label}}</div>
  </div>
</template>

<script>
export default {
  name: 'SlideSelect',
  props: {
    items: Array,
    value: String,
  },
  data() {
    return {
    };
  },
  methods: {
  },
}
</script>

<style scoped>
.container-box {
  white-space: nowrap;
  overflow-y: hidden;
  overflow-x: scroll;
  -webkit-overflow-scrolling: touch;
}
.item {
  padding: 0 10px;
  margin-right: 5px;
  height: 40px;
  line-height: 40px;
  font-size: 16px;
  border-radius: 20px;
  color: darkblue;
  background-color: white;
  border: 1px solid darkblue;
  display: inline-block;
  text-align: center;
  cursor: pointer;
  transition: 200ms;
}
.item[selected] {
  background-color: darkblue;
  color: white;
}
</style>
