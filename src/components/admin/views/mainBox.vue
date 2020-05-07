<template>
  <div id="all">
    <div class="headBar">
      <div class="clapBtn">
        <i :class="clapIcon" @click="changeClap"></i>
      </div>
      <div class="title">ghq后台管理系统</div>
      <div class="userAvg">
        <div><el-avatar  :size="40" icon="el-icon-user-solid"></el-avatar></div>
        <el-popover
                placement="top-start"
                width="150"
                trigger="hover">
            <div style="text-align: center; margin: 0">
              <el-button style="width: 80%" type="danger" size="mini" @click="logout">退出</el-button>
            </div>
          <span slot="reference" class="userName">{{userName}}  <i class="el-icon-arrow-down"></i></span>
        </el-popover>
      </div>
    </div>
    <div class="sideBar">
      <el-menu
        :collapse="isCollapse"
        :router="true"
        :default-active="childPath"
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
          <i class="el-icon-user"></i>
          <span slot="title">用户</span>
        </el-menu-item>
        <el-menu-item index="/admin/catgory">
          <i class="el-icon-menu"></i>
          <span slot="title">分类</span>
        </el-menu-item>
        <el-menu-item index="/admin/product">
          <i class="el-icon-goods"></i>
          <span slot="title">商品</span>
        </el-menu-item>
        <el-menu-item index="/admin/banner">
          <i class="el-icon-goods"></i>
          <span slot="title">首页banner添加</span>
        </el-menu-item>
        <el-menu-item index="/admin/insertProd">
          <i class="el-icon-plus"></i>
          <span slot="title">商品录入</span>
        </el-menu-item>
        <el-menu-item index="/admin/order">
          <i class="el-icon-document"></i>
          <span slot="title">订单</span>
        </el-menu-item>
      </el-menu>
    </div>
    <div  class="contextBox">
      <router-view></router-view>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'mainBox',
    data(){
      return{
        userName:"ghq",
        isCollapse:false,
        childPath:'homePage',
        clapIcon:'el-icon-s-unfold'
      }
    },
    mounted () {
      this.childPath = this.$route.path
      if(this.isCollapse){
        $('.contextBox').addClass("content-collapse")
      }

    },
    watch:{
      isCollapse :function (newVal,oldVal) {
        if(newVal){
          $('.contextBox').addClass("content-collapse")
        }
        else{
          $('.contextBox').removeClass("content-collapse")
        }

      }
    },
    methods:{
      logout(){

      },
      changeClap(){
        this.isCollapse = !this.isCollapse
        if(this.isCollapse){
          this.clapIcon = 'el-icon-s-unfold'
        }else{
          this.clapIcon = 'el-icon-s-fold'
        }
      },
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
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .headBar{
    background-color: rgb(84,92,100);
    width:100%;
    height: 70px;
    display: flex;
  }
  .sideBar{
    background-color: rgb(84,92,100);
    bottom:0;
    left: 0;
    top: 70px;
    position: absolute;
    display: block;
    /*width: 15%;*/
    float: left;
  }
  .content-collapse{
    left: 65px!important;
  }
  .contextBox{
    transition: left .3s ease-in-out;
    padding:20px 20px 20px 20px;
    display: block;
    right: 0;
    position: absolute;
    left: 200px;
    float: left;
  }
  .clapBtn{
    cursor:pointer;
    width: 65px;
    height: 100%;
    line-height: 70px;
    font-size: 30px;
    color: rgb(144,147,153);
  }
  .title {

    line-height: 70px;
    padding: 0 20px;
    font-size: 22px;
    color: white;
  }
  .userAvg {
    display: flex;
    padding: 0 40px;
    height: 70px;
    float: right;
    right: 0;
    position: absolute;
    align-items:center;
  }
  .userName{
    margin-left: 15px;
    color: #FFFFFF;

  }

</style>
