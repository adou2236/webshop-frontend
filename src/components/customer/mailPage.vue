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
            width="250"
            trigger="hover">
            <div  style="min-height: 20px;max-height: 500px;overflow: auto;text-align: center; margin: 0">
              <div v-for="item in cart" >
                <div style="padding:10px 0;display: flex;border-bottom:1px #424242 solid">
                  <el-image style="border:1px solid;width: 80px;height: 80px" fit="cover" :src="item.img"/>
                  <div style="padding: 15px 10px">
                    <div class="goodName" >{{item.name}}</div>
                    <div style="font-size: 14px;font-weight:700;color:#d44d44">￥{{item.price}} <span style="font-size:12px;color: #cacaca"> x {{item.num}}</span></div>
                  </div>
                  <div style="display:flex;right: 30px;position: fixed;height: 80px">
                    <el-button style="margin:auto" size="mini" type="danger" icon="el-icon-close" circle></el-button>
                  </div>
                </div>
              </div>
            </div>
            <div slot="reference" >
              <el-badge :value="totalNum" :max="99" >
                <i style="color: #FFFFFF" class="el-icon-shopping-cart-2"></i>
              </el-badge>
            </div>


          </el-popover>
        </div>
      </div>

    </div>
    <div class="mainBox">
      <router-view>子页面</router-view>
    </div>
    <div class="footer">页脚工具</div>
    <div class="rateTool">
      <el-popover
        v-model="visible"
        placement="top-start"
        :visible-arrow="false"
        offset="200"
        width="300"
        trigger="click">
        <div>
          <el-rate
            class="rate"
            v-model="value"
            :colors="['#99A9BF', '#f7a41a', '#ff1705']">
          </el-rate>
          <el-input placeholder="给我留言吧"
                    rows="3" resize="none"
                    type="textarea" v-model="message"></el-input>
          <el-button type="danger"
                     size="mini"
                     style="margin-top: 20px;width: 100%"
                     @click="putRate">提交</el-button>
        </div>
        <el-button slot="reference" type="danger" icon="el-icon-star-off" circle></el-button>
      </el-popover>

    </div>
  </div>
</template>

<script>
  import state from '../../store/state'
  import {getGood} from '../../apis/customer'

  export default {
    name: 'mailPage',
    data(){
      return{
        cart:[],
        value:0,
        totalNum:0,
        visible:false,
        message:'',
        iconClasses: ['icon-rate-face-1', 'icon-rate-face-2', 'icon-rate-face-3'],
        keyWord:'',
        userName:"ghq1"
      }
    },
    mounted () {
      console.log("缓存数据")
      this.getCartGoods()
    },
    computed:{
      mycart(){
        return state.cart.totalNum
      }
    },
    watch:{
      mycart(newVal, oldVal) {
        console.log(newVal)
        this.totalNum =newVal
      }
    },
    methods:{
      getCartGoods(){
        let cartGoods = state.cart
        console.log(state.cart)
        this.totalNum = cartGoods.totalNum
        cartGoods.goods.forEach(item=>{
          getGood(item.id).then(response => {
            if(response.data.flag){
              let {data} = response.data
              this.cart.push({id:data.id,name:data.name,price:data.price,num:item.num,img:data.cover})
            }
          }).catch(err=>{
          })

        })

      },
      putRate(){
        this.visible=false
        console.log(this.message,this.value)
      },
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
  .goodName{
    text-align: left;
    margin-bottom: 10px;
    color: #5079d9;
    font-size: 14px;
    font-style:normal;
    white-space: nowrap;
    font-weight: 700;
    /*font-family: "PingFang SC";*/

  }
  .rate{
    text-align: center;
    height: 40px;
    width: 80%;
    padding:0 10%
  }
  .rateTool{
    position: fixed;
    bottom:50px;
    right: 40px;
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
<style lang="scss">
  .rate{
    .el-rate__icon{
      margin: auto 8px;
      font-size: 30px;
    }
  }
</style>
