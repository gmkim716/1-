<template>
  <div>
    <p id="searchedList" @click="goDetail(result.id)" style="font-size:100%">{{ result.title }}</p>
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
  #searchedList:hover {
    background-color: lightgray;
  }
</style>