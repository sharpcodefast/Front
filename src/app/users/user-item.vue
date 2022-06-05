<template>
  <div>
    <div>{{ user.name }}</div>
    <!-- <div>{{ name }}</div> -->
  </div>
</template>

<script>
export default {
  name: "app-user-item",
  props:{
    user : { type: Object, default: null},
    name: { type: String, default: 'no-name' },
  }

};
</script>

<style lang="scss" scoped>
</style>
