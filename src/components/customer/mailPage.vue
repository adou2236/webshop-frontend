<template>
  <div id="all">
    <div class="toolBar">
      <div style="cursor: pointer" @click="$router.push({path:'/home'})" class="logo vueblog-font">
        Gmall
      </div>
      <div class="searchArea">
        <el-input
          placeholder="请输入内容"
          v-model="keyWord">
          <i @click="search" slot="suffix" style="cursor: pointer" class="el-input__icon el-icon-search"></i>
        </el-input>
      </div>
      <div  class="userInfo">
        <div @click="token===null?$router.push({path:'/login'}):$router.push({path:'/userMsg'})" class="userAvg">
          <div><el-avatar  :size="40" icon="el-icon-user-solid"></el-avatar></div>
          <el-popover
            :disabled="token===null"
            placement="bottom"
            :visible-arrow="false"
            width="90"
            trigger="hover">
            <div style="text-align: center; margin: 0;font-size: 25px">
              <el-link type="primary" @click="$router.push({path:'/userMsg'})">个人中心</el-link><br>
              <el-link type="danger" @click="logout">退出</el-link>
            </div>
            <span slot="reference" class="userName">{{token===null?'未登录':userName}}  <i class="el-icon-arrow-down"></i></span>
          </el-popover>
        </div>
        <div @click="toCartPage" class="cart">
          <el-popover
            placement="bottom"
            width="250"
            trigger="click">
            <div  style="min-height: 20px;max-height: 500px;overflow: auto;text-align: center; margin: 0">
              <div   v-for="item in cart" >
                <div style="padding:10px 0;display: flex;border-bottom:1px #424242 solid;position: relative">
                  <el-image style="border:1px solid;width: 80px;height: 80px" fit="cover" :src="item.img"/>
                  <div style="padding: 15px 10px">
                    <div class="goodName" >{{item.name}}</div>
                    <div style="font-size: 14px;font-weight:700;color:#d44d44">￥{{item.price}} <span style="font-size:12px;color: #cacaca"> x {{item.num}}</span></div>
                  </div>
                  <div style="display:flex;right: 10px;position: absolute;height: 80px">
                    <el-button @click="removeGood(item._id)" style="font-size:10px;margin:auto" size="mini" type="danger" icon="el-icon-close" circle></el-button>
                  </div>
                </div>
              </div>
              <div v-if="isEmpty">购物车为空</div>
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
    <div class="footer">
      <div><h4>其他链接:</h4>
        <span><h5>后台管理系统</h5></span>
        <span><h5>git地址:www.github.com/adou2236</h5></span>
      </div>
      <div style="margin-left: 20px"><h4>联系方式</h4>
        <span><h5>qq:609597441</h5></span>
        <span><h5>邮箱:6009597441@qq.com</h5></span>
      </div>
      <div style="display:flex;align-items:center;margin-left: 20px">
        <h3>本人2019本科毕业，今年23岁，目前积极找工作中，如果你能给我提供工作机会，请联系我吧</h3>
      </div>
    </div>

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
<!--    <transition @after-enter='afterEnter' @before-enter="beforeEnter">-->
<!--      &lt;!&ndash;整张图片&ndash;&gt;-->
<!--      <div class="move_img" v-if="showMoveImg"-->
<!--           :style="{left:(cartPositionL-10) + 'px',top:(cartPositionT-10) + 'px'}">-->
<!--        <div><img :src="moveImgUrl"></div>-->
<!--      </div>-->
<!--    </transition>-->
  </div>
</template>

<script>
  import state from '../../store/state'
  import {getGood, submitRate} from '../../apis/customer'
  import {mapGetters} from 'vuex'
  import '../../../static/font/font.css'

  export default {
    name: 'mailPage',
    data(){
      return{
        isEmpty:true,
        token:localStorage.getItem('token'),
        userName :localStorage.getItem('name'),
        cart:[],
        value:0,
        totalNum:0,
        visible:false,
        message:'',
        iconClasses: ['icon-rate-face-1', 'icon-rate-face-2', 'icon-rate-face-3'],
        keyWord:'',
      }
    },
    mounted () {
      this.getCartGoods()
    },
    computed:{
      // ...mapGetters(['messArray_get']),

      mycartNum(){

        return state.cart.totalNum
      },
      mycartGoods(){
        return state.cart.goods
      }
    },
    watch:{
      // messArray_get : function(val){
      //   console.log("messArray_get ",val)
      // },
      mycartNum(newVal, oldVal) {
        this.totalNum =newVal
      },
      mycartGoods(newVal, oldVal) {
          this.getCartGoods()
      }
    },
    methods:{
      // listenInCart () {
      //   this.ADD_ANIMATION({moveShow: false, receiveInCart: true})
      // },
      // beforeEnter (el) {
      //   let elStyle = el.style
      //   let elChild = el.children[0]
      //   let elChildSty = elChild.style
      //   elStyle.transform = `translate3d(0,${this.elTop - this.cartPositionT}px,0)`
      //   elChildSty.transform = `translate3d(${-(this.cartPositionL - this.elLeft)}px,0,0) scale(1.2)`
      // },
      // afterEnter (el) {
      //   let elStyle = el.style
      //   let elChild = el.children[0]
      //   let elChildSty = elChild.style
      //   elStyle.transform = `translate3d(0,0,0)`
      //   elChildSty.transform = `translate3d(0,0,0) scale(.2)`
      //   elStyle.transition = 'transform .55s cubic-bezier(.29,.55,.51,1.08)'
      //   elChildSty.transition = 'transform .55s linear'
      //   // 动画结束
      //   elChild.addEventListener('transitionend', () => {
      //     this.listenInCart()
      //   })
      //   elChild.addEventListener('webkitAnimationEnd', () => {
      //     this.listenInCart()
      //   })
      // },
      removeGood(id){
        console.log(id)
        this.$store.commit('deleteFromCart', id);
      },
      toCartPage(){
      this.$router.push({path:'/cart'})
      },
      getCartGoods(){
        this.cart = []
        let cartGoods = state.cart
        this.totalNum = cartGoods.totalNum
        cartGoods.goods.forEach(item=>{
          getGood(item.id).then(response => {
            if(response.data.flag){
              let {data} = response.data
              this.cart.push({_id:data._id,name:data.name,price:data.price,num:item.num,img:data.cover})
              if(this.cart.length!==0){
                this.isEmpty = false
              }
            }
          }).catch(err=>{
          })

        })

      },
      logout(){
        localStorage.removeItem('token')
        this.$router.push({name:'home'})
      },
      putRate(){
        this.visible=false
        let data = {
          rate:this.value,
          message: this.message,
          userId:"554"
        }
        submitRate(data)
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
    background-color: #1a1a1a;
    color: #F2F2F2;
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
  .footer {
    box-sizing: border-box;
    display: flex;
    border-top: 1px solid #e6e6e6;
    background: #fafafa;
    text-align: left;
    float: left;
    margin-top: 40px;
    padding: 40px 10vw;
    /*background-color: cornflowerblue;*/
    width: 100%;
  }
  .userAvg {
    cursor: pointer;
    display: flex;
    padding: 0 40px;
    align-items:center;
  }
  .userName{
    margin-left: 15px;
    color: #FFFFFF;
  }
  .cart{
    cursor: pointer;
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
