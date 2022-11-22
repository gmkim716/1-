<template>
  <div>
    <input 
      @input="typing"
      v-model="query"
      @keyup="searching(query)"
      @keydown.enter="searchEnter(query)"
      @blur="query = null, searchList=null"
      placeholder="작품명을 검색하세요"
      type="text">
    <div v-if="searchList">
      <SearchBarListItem
        v-for="result in searchList"
        :key="result.id"
        :result="result"
      />
    </div>
  </div>
</template>

<script>
import SearchBarListItem from '@/components/SearchBarListItem'
import axios from 'axios'

export default {
  name: 'SearchBar',
  components: {
    SearchBarListItem,
  },
  data() {
    return {
      query: '',
      searchList: null,
    }
  },
  methods: {
    // 엔터 누르기 전
    searching(query) {
      axios({
        url: `http://127.0.0.1:8000/movies/search/${query}`,
        method: 'get'
      })
        .then(res => {
          this.searchList = res.data
        })
        .catch(err => console.log(err))
    },
    typing(e) {
      this.query = e.target.value
    },
    // 엔터 눌렀을 때 
    searchEnter(query) {
      this.$store.dispatch('searchEnter', query)
    }
  }
}
</script>

<style>

</style>