<template>
    <div class="hotGoods">
      <h-title v-bind:title="'热门商品'"></h-title>
    </div>
</template>

<script>
  import hTitle from '../tools/hTitle'
  import HTitle from '../tools/hTitle'
  export default {
    name: 'populateGoods',
    components: {HTitle}
  }
</script>

<style scoped>
  .hotGoods{
    margin-top: 30px;
    border:1px #999999 solid;
    border-radius: 5px;
  }

</style>
