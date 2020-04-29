<template>
  <div id="all">
    <div v-for="item in orderList">
      <div class="bar">
        <div style="box-sizing:border-box;width: 75%;padding:0 20px;display: flex;white-space: nowrap;text-overflow:ellipsis;overflow: hidden;">
          <span>订单编号：{{item.orderId}}</span>
          <span style="margin-left: 25px">下单时间：{{item.createTime}}</span>
        </div>
        <div class="situation">
          <span class="tags">总金额</span>
          <span class="tags">订单状态</span>
        </div>

      </div>
      <div style="display: flex">
        <div class="goods">
          <div class="detail" v-for="good in item.goodsList">
            <img style="width: 80px;height: 80px" :src="good.product.cover">
            <span style="font-size: 14px">{{good.product.name}}</span>
            <span style="font-size: 16px">￥{{good.payPrice}}</span>
            <span style="font-size: 14px">X{{good.sum}}</span>
            <span style="font-size: 16px">￥{{good.payPrice*good.sum}}</span>

          </div>
        </div>
        <div class="situation">
          <span class="tags">￥{{item.totalMoney}}</span>
          <span class="tags" v-if="item.status===0"><el-button @click="payBill(item.orderId)" type="primary" size="mini">立即支付</el-button></span>
          <span class="tags" v-else-if="item.status===1">支付成功</span>
          <span class="tags remove" v-else>
            <span class="dispaire">超时失效</span>
            <el-button class="removeBtn" size="mini" type="danger" @click="removeOrder(item.orderId)">删除订单</el-button>
          </span>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  // import
  import {getOrders, removeOrder} from '../../../../apis/customer'
  import Test from '../test'

  export default {
    name: 'orderList',
    components: {Test},
    data(){
      return{
        orderList:[]
      }
    },
    mounted () {
      this.getAllOrder(localStorage.getItem('userId'),'')
    },
    methods:{
      removeOrder(id){
        removeOrder({orderId:id}).then(res=>{
          if(res.data.flag){
            this.$message({
              message:res.data.message,
              type:'success'
            })
            this.getAllOrder(localStorage.getItem('userId'),'')
          }
        }).catch(err=>{
          console.log(err)
          if(!err.response.data.flag){
            this.$message({
              message:err.response.data.message,
              type:'error'
            })
          }
        })
      },
      payBill(e){
        console.log("EEEEEEEEEEE")
        console.log(e)

      },
      getAllOrder(userId,status){
        let params={
          orderUser : userId,
          status : status
        }
        getOrders(params).then(res=>{
          if(res.data.flag){
            this.orderList = res.data.data.orderList
            console.log("this.orderList",this.orderList)
          }
        }).catch(err=>{
          console.log(err)
        })
      }
    }
  }
</script>

<style scoped>
  #all{
    width: 100%;
  }
  .bar {
    display: flex;
    text-align: left;
    font-size: 12px;
    height: 40px;
    box-sizing: border-box;
    line-height: 40px;
    background-color: #eee;
  }
  .detail{
    justify-content: space-around;
    align-items: center;
    border-bottom: 1px solid #dcdcdc;
    display: flex;
    margin:0 20px;
    padding: 15px 0px;
  }
  .goods{
    width: 75%;
  }
  .goods div:last-child{
    border: none;
  }
  .situation{
    display: flex;
    flex:1;
    text-align: center;
    border-left: 1px solid #dcdcdc;
  }
  .tags {
    font-size: 14px;
    display: flex;
    align-items: center;
    text-align: center;
    width: 50%;
    justify-content: center
  }
  .removeBtn{
    display: none;
  }

</style>
<style lang="scss">
  .remove{
    &:hover {
      .dispaire {
        display: none;
      }
      .removeBtn {
        text-align: center;
        display: block;
      }
    }
  }
</style>
