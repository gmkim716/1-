<template>
  <div>
    <span id="searchedList" @click="goDetail(result.id)">{{ result.title }}</span>
  </div>

</template>

<script>
export default {
  name: 'SearchBarListItem',
  props: {
    result: Object,
  },
  methods: {
    goDetail(id) {
      this.$router.push({ name: 'detail', params: {id} })
    }
  }
}
</script>

<style scorped>
  #searchedList {
    color: black;
  }
</style>