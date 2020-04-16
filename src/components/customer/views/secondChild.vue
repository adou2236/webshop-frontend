<template>
    <div>
      <div class="topBar">
        <el-menu :default-active="activeIndex"
                 class="el-menu-demo" mode="horizontal"
                 :router="true">
          <el-menu-item index="/home">首页</el-menu-item>
          <el-menu-item index="/productList">所有商品</el-menu-item>
        </el-menu>
      </div>
<!--     此处放入二级子页面，与商品有关的页面，用户信息与订单信息等不需要二级导航条-->
      <router-view></router-view>
    </div>
</template>

<script>
  export default {
    name: 'secondChild',
    data(){
      return{
        activeIndex: '',
      }
    },
    watch:{
      $route(to,from){
        this.activeIndex = to.path;
      }
    },

    mounted () {
      this.activeIndex = this.$route.path
    }
  }
</script>

<style scoped>

</style>
