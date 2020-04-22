<template>
  <div id="all">
    <div class="cartTable">
      <h-title v-bind:title="'购物车'"></h-title>
<!--      <div class="header">-->
<!--        <div class="title">购物车</div>-->
<!--      </div>-->
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
            label="商品"
            width="180">
            <template slot-scope="scope">
              <el-image style="width: 80px;height: 80px" :src="scope.row.cover"></el-image>
              <span style="top: 50%;position: absolute;transform: translateY(-50%); margin-left: 10px">{{scope.row.name}}</span>
            </template>
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
        <div class="checkAll">
          <el-checkbox style="margin: auto" v-model="checked" @change="$refs.multipleTable.toggleAllSelection()" >{{checked?'全不选':'全选'	}}</el-checkbox>
        </div>
        <div class="message">
          <div class="sumMsg">
            <div style="display: flex;margin-right:10px">共{{totalNum}}件商品</div>
            <div>|</div>
            <div style="margin-left:10px;display: flex">总金额为:￥{{totalMoney}}</div>
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
  import hTitle from '../tools/hTitle'
  import state from '../../../../store/state'
  import {getGood} from '../../../../apis/customer'
  import HTitle from '../tools/hTitle'

  export default {
    name: 'cartPage',
    components: {HTitle},
    data(){
      return{
        checked:false,
        totalMoney:0,
        totalNum:0,
        cartData:[]
      }
    },
    computed:{
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
        console.log("ccc",state.cart)
        cartGoods.goods.forEach(item=>{
          getGood(item.id).then(response => {
            if(response.data.flag){
              let {data} = response.data
              this.cartData.push({id:data._id,name:data.name,price:data.price,num:item.num,cover:data.cover})
            }
          }).catch(err=>{
          })

        })

      },
      deleteRow(){

      },
      handleSelectionChange(e){
        this.totalNum = 0
        this.totalMoney = 0
        if(e.length!==0){
          e.forEach(item=>{
              this.totalNum+=item.num
              this.totalMoney+=item.num*item.price
            }
          )
        }

      }
    }
  }
</script>

<style lang="scss">
  thead tr th:first-child div{
    visibility: hidden;
  }

</style>

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
    box-sizing: border-box;
    padding:15px;
    height: 100%;
    display: flex;
    float:left;
    width: 10%;
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
