<template>
  <div id="all">
    <div class="headBar">页首</div>
    <div class="sideBar">
      <el-menu
        :router="true"
        default-active="/admin/firstPage"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
        <el-menu-item index="/admin/firstPage">
          <i class="el-icon-menu"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item index="/admin/user">
          <i class="el-icon-menu"></i>
          <span slot="title">用户</span>
        </el-menu-item>
        <el-menu-item index="/admin/catgory">
          <i class="el-icon-document"></i>
          <span slot="title">分类</span>
        </el-menu-item>
        <el-menu-item index="/admin/product">
          <i class="el-icon-document"></i>
          <span slot="title">商品</span>
        </el-menu-item>
        <el-menu-item index="/admin/insertProd">
          <i class="el-icon-document"></i>
          <span slot="title">商品录入</span>
        </el-menu-item>
        <el-menu-item index="/admin/order">
          <i class="el-icon-document"></i>
          <span slot="title">订单</span>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="contextBox">
      <router-view></router-view>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'mainBox',
    methods:{
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>

<style scoped>
  #all {
    width: 100%;
    height: 100%;
  }
  .headBar{
    width:100%;
    height: 10%;
  }
  .sideBar{
    width: 15%;
    float: left;
  }
  .contextBox{
    padding:20px 20px 20px 20px;
    display: block;
    right: 0;
    position: absolute;
    left: 15%;
    float: left;
  }

</style>
