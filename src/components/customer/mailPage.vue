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
      <div  class="userInfo">
        <div class="userAvg">
          <div><el-avatar  :size="40" icon="el-icon-user-solid"></el-avatar></div>
          <el-popover
            placement="bottom-end"
            width="90"
            trigger="hover">
            <div style="text-align: center; margin: 0">
<!--              <el-button style="width: 80%" type="danger" size="mini" @click="logout">退出</el-button>-->
            </div>
            <span slot="reference" class="userName">{{userName}}  <i class="el-icon-arrow-down"></i></span>
          </el-popover>
        </div>
        <div @click="$router.push({path:'/cart'})" class="cart">
          <el-popover
            placement="bottom"
            width="90"
            trigger="hover">
            <div style="text-align: center; margin: 0">
              <!--              <el-button style="width: 80%" type="danger" size="mini" @click="logout">退出</el-button>-->
            </div>
            <i slot="reference" class="el-icon-shopping-cart-2"></i>
          </el-popover>
        </div>
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
        keyWord:'',
        userName:"ghq1"
      }
    },
    methods:{
      search() {
        this.$router.push({name:'productList',query:{keyWord:this.keyWord}})
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
    display: flex;
    float: right;
    right:10%;
    position: absolute;
  }
  .toolBar {
    align-items:center;
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
  .userAvg {
    display: flex;
    padding: 0 40px;
    align-items:center;
  }
  .userName{
    margin-left: 15px;
    color: #FFFFFF;
  }
  .cart{
    font-size: 30px;
    display: flex;
    align-items:center;
  }

</style>
