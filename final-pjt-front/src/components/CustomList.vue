<template>
  <div>
    <div class='col-md-3 my-4' style='background-color:#D4964A'>
      <h3>CustomList</h3>
    </div>
    <CustomListItem/>
  </div>
</template>

<script>
import CustomListItem from '@/components/CustomListItem'

export default {
  name: 'CustomList',
  components: {
    CustomListItem,
  }
}
</script>
<style scoped>
  h3 {
    color: white;
  }
  .card, h5, span{
    color: black;
  }
</style>

<style>

</style>