<template>
  <div id="all">
    <div class="toolBar">
      <div style="cursor: pointer" @click="$router.push({path:'/home'})" class="logo">
        <i class="el-icon-platform-eleme"></i>
      </div>
      <div class="searchArea">
        <el-input
          placeholder="请输入内容"
          v-model="keyWord">
          <i @click="search" slot="suffix" style="cursor: pointer" class="el-input__icon el-icon-search"></i>
        </el-input>
      </div>
      <div @click="$router.push({path:'/cart'})" class="userInfo">
        用户信息，购物车
      </div>

    </div>
    <div class="mainBox">
      <router-view>子页面</router-view>
    </div>
    <div class="footer">页脚工具</div>
  </div>
</template>

<script>
  export default {
    name: 'mailPage',
    data(){
      return{
        keyWord:''
      }
    },
    methods:{
      search() {
        console.log("搜索")
      }
    }
  }
</script>

<style scoped>
  #all {
    width: 100%;
    height: 100%;
  }
  .logo {
    float: left;
    font-size: 50px;
    left:10%;
    position: absolute;
  }
  .searchArea{
    float: right;
    right:40%;
    position: absolute;
  }
  .userInfo{
    float: right;
    right:10%;
    position: absolute;
  }
  .toolBar {
    align-items:center;
    padding: 0 30px;
    display: flex;
    width: 100%;
    height: 100px;
    background-color: #1a1a1a;
  }
  .footer{
    background-color: cornflowerblue;
    width: 100%;
    height: 350px;
  }

</style>
