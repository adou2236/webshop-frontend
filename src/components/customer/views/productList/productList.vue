<template>
    <div id="all">
      <div class="sortArea">
        <a class="sortItem" @click="order=item.value" :class="order===item.value?'active':''" v-for="item in orderType">{{item.label}}
          <span v-if="item.value">{{item.type===1?'↑':'↓'}}</span>
        </a>
      </div>
      <div class="showArea">
        <div class="goodsBox" v-for="good in goods">
          <el-image class="goodImg" fit="cover" :src="good.cover">
            <div slot="placeholder" class="image-slot">
              加载中
            </div>
          </el-image>
          <div class="title">{{good.name}}</div>
          <div class="details">描述</div>
          <div class="price">
            <div class="addToCart">
              <el-button size="mini" type="danger" @click="addToCart(good)">加入购物车</el-button>
            </div>
            <p>￥{{good.price}}</p>
          </div>

        </div>
        <div class="noGoods" v-if="noGoods">没有商品</div>
      </div>
    </div>
</template>

<script>
  import {getAllGoods} from '../../../../apis/customer'
  import state from '../../../../store/state'

  export default {
    name: 'productList',
    data(){
      return{
        order:'',
        orderType:[{label:'默认',value:''},
          {label:'价格',value:'price',type:-1},
          {label:'库存',value:'count',type:-1}],
        goods:[],
        noGoods:false
      }
    },
    watch:{
      order :function (newValue,oldValue) {
        getAllGoods({page:1,sort:newValue,order:-1}).then(response => {
          if(response.data.flag){
            this.goods = response.data.data.data
          }
        }).catch(err=>{
          this.noGoods=true
        })
      }
    },
    mounted () {
      let key = ''
      if(this.$route.query.keyWord){
        key = this.$route.query.keyWord
      }

      getAllGoods({details:key,page:1}).then(response => {
        if(response.data.flag){
          this.goods = response.data.data.data
        }
      }).catch(err=>{
        this.noGoods=true
      })
    },
    methods:{
      addToCart(good){
        this.$store.commit('changeCart', good._id);
      },
      changeOrder(v){
        this.order = v
        if(v.type!==undefined){
          v.type=-1*v.type
        }
      }
    }
  }
</script>

<style scoped>
  #all{
    margin:0 auto;
    width:80%;
  }
  .sortArea{
    display: flex;
    height: 60px;
  }
  .sortItem{
    user-select: none;
    align-items:center;
    padding: 0 20px;
    font-size: 12px;
    color: #999;
    cursor: pointer;
    display: flex;
  }
  .sortItem:hover{
    color: #6b95ea;
  }

  .active{
    color: #5683ea;
    transition: all 0.5s ease-out
  }
  .showArea{
    display: block;
    width: 100%;
    min-height: 35vw;
  }
  .goodsBox{
    float: left;
    width:20%;
    height:25vw;
    box-sizing:border-box;
    border: 1px solid #efefef;
  }
  .goodImg {
    width: 100%;
    height: 65%;
    box-sizing:border-box;
    padding:20px 10px
  }
  .title{
    font-size: 16px;
    color: #424242;
    margin-bottom: 10px;
  }
  .details{
    margin-bottom: 10px;
    font-size: 12px;
    color: #d0d0d0;
  }
  .price{
    font-size: 14px;
    color: #d44d44
  }
  .addToCart{
    display: none;
  }



</style>
<style lang="scss">
  .goodsBox{
    &:hover {
      transform: translateY(-3px);
      box-shadow: 1px 1px 10px #999;
      .price p {
        display: none;
      }
      .addToCart {
        text-align: center;
        display: block;
      }
    }
  }
</style>
