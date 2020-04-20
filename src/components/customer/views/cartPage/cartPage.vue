<template>
  <div id="all">
    <div class="cartTable">
      <div class="header">
        <div class="title">购物车</div>
      </div>
      <div class="table">
        <el-table
          :highlight-current-row="false"
          ref="multipleTable"
          @selection-change="handleSelectionChange"
          :data="cartData"
          style="width: 100%">
          <el-table-column
            type="selection">
          </el-table-column>
          <el-table-column
            prop="name"
            label="商品"
            width="180">
          </el-table-column>
          <el-table-column
            label="单价"
            width="100">
            <template slot-scope="scope">
              ￥{{scope.row.price}}
            </template>
          </el-table-column>
          <el-table-column
            prop="num"
            label="数量">
          </el-table-column>
          <el-table-column
            prop="sum"
            label="合计">
            <template slot-scope="scope">
              ￥{{scope.row.price*scope.row.num}}
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            width="120">
            <template slot-scope="scope">
              <el-button
                @click.native.prevent="deleteRow(scope.$index, cartData)"
                type="danger"
                size="mini">
                移除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="optionBar">
        <div class="checkAll">全选</div>
        <div class="message">
          <div class="sumMsg">
            <div style="display: flex;margin-right:10px">共{{totalNum}}件商品</div>
            <div>|</div>
            <div style="margin-left:10px;display: flex">总金额为:￥{{sumMoney}}</div>
          </div>
          <div class="payBtn">
            <el-button type="primary" size="big" @click="sendOrder">确认订单</el-button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import state from '../../../../store/state'
  import {getGood} from '../../../../apis/customer'

  export default {
    name: 'cartPage',
    data(){
      return{
        totalMoney:0,
        totalNum:0,
        cartData:[]
      }
    },
    computed:{
      sumMoney(){
        console.log()
        return this.cartData.map(
          row=>row.price*row.num).reduce(
          (acc, cur) => (cur + acc), 0)
      }
    },
    mounted () {
      this.getCartGoods()
    },
    methods:{
      sendOrder(){
        this.$router.push({path:"/order"})

      },
      getCartGoods(){
        let cartGoods = state.cart
        console.log(state.cart)
        this.totalNum = cartGoods.totalNum
        cartGoods.goods.forEach(item=>{
          getGood(item.id).then(response => {
            if(response.data.flag){
              let {data} = response.data
              this.cartData.push({id:data.id,name:data.name,price:data.price,num:item.num,img:data.cover})
            }
          }).catch(err=>{
          })

        })

      },
      deleteRow(){

      },
      handleSelectionChange(){

      }
    }
  }
</script>

<style scoped>
  #all {
    display: flex;
    width: 100%;
    height: 100%;
  }
  .cartTable{
    border:1px #999999 solid;
    border-radius: 5px;
    margin: 80px auto;
    width: 80%;
  }
  .header{
    height: 40px;
  }
  .title{
    margin-left: 30px;
    height: 40px;
    line-height: 40px;
    text-align: left;
    font-size: 20px;
  }
  .optionBar{
    display: block;
    height: 80px;
  }
  .checkAll{
    float:left;
    width: 30%;
  }
  .message{
    align-items: center;
    box-sizing: border-box;
    height: 100%;
    padding:10px 20px;
    display: flex;
    float:right;
  }

  .payBtn{
    float: right;
  }
  .sumMsg{
    float: left;
    display: flex;
    margin-right: 20px;

  }

</style>
