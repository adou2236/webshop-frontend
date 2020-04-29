<template>
    <div id="all">
      <div class="checkOut">
        <div class="mainArea">
          <h-title v-bind:title="'收货地址'"/>
          <div class="localList">
            <div class="resieverBox" :class="flag===item._id?'choosed':''" v-for="item in Resiver" :key="item._id">
              <div @click="changeLocation(item._id)" >
                <span class="checkpoint" v-if="flag===item._id"><i style="color: #5683ea;font-size: 20px" class="el-icon-success"></i></span>
                <p style="margin-top: 0">收件地址：{{item.areaAddress}}</p>
                <p>详细地址：{{item.detailAddress}}</p>
                <p>收件人：{{item.name}}</p>
                <p style="margin-bottom: 0">联系电话：{{item.phone}}</p>
                <div class="operation">
<!--                  <span class="operationBtn" >-->
<!--                    设为默认地址-->
<!--                  </span>-->
                  <span class="operationBtn" @click="updateLocation(item)">
                    修改
                  </span>
                  <span class="operationBtn" @click="deleteLocation(item._id)" style="border-left: 1px solid #e1e1e1; ">
                    删除
                  </span>
                </div>
              </div>

            </div>
            <div style="line-height: 150px;font-size: 20px" class="resieverBox" @click="addLocation"><i class="el-icon-circle-plus">添加新地址</i></div>
          </div>
        </div>
        <div class="mainArea">
          <h-title v-bind:title="'订单详情'"/>
          <div class="goodsList">
            <div style="width: 100%;padding: 0 30px;box-sizing: border-box">
              <el-table
                :highlight-current-row="false"
                :data="cartData"
                style="width: 100%">
                <el-table-column
                  label="商品">
                  <template slot-scope="scope">
                    <el-image style="width: 80px;height: 80px" :src="scope.row.cover"></el-image>
                    <span style="top: 50%;position: absolute;transform: translateY(-50%); margin-left: 10px">{{scope.row.name}}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  label="单价"
                  width="120">
                  <template slot-scope="scope">
                    ￥{{scope.row.price}}
                  </template>
                </el-table-column>
                <el-table-column
                  prop="num"
                  label="数量"
                  width="120">
                </el-table-column>
                <el-table-column
                  prop="sum"
                  label="合计"
                  width="120">
                  <template slot-scope="scope">
                    ￥{{scope.row.price*scope.row.num}}
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div class="optionBar">
              <div class="payMethod">
                支付方式：
                <el-radio v-model="payMot" :label=item.id border v-for="item in methodList" :key="item.id">{{item.name}}</el-radio>
              </div>
              <div class="message">
                <div class="sumMsg">
                  <div style="display: flex;margin-right:10px">共{{totalNum}}件商品</div>
                  <div>|</div>
                  <div style="margin-left:10px;display: flex">总金额为:￥{{sumMoney}}</div>
                </div>
                <div class="payBtn">
                  <el-button type="primary" size="big" @click="payBill">支付</el-button>
                </div>
              </div>
          </div>
          </div>
        </div>
      </div>
      <el-dialog title="新增收货地址"
                 :visible.sync="dialogFormVisible">
        <el-form :model="localform">
          <el-form-item label="所在地区" label-width="120px">
            <v-distpicker style="float: left"
                          :province="localform.province"
                          :city="localform.city"
                          :area="localform.area"
                          @selected="setProvince"></v-distpicker>
          </el-form-item>
          <el-form-item label="详细地址" label-width="120px">
            <el-input v-model="localform.detailAddress"></el-input>
          </el-form-item>
          <el-form-item label="收件人姓名" label-width="120px">
            <el-input v-model="localform.name"></el-input>
          </el-form-item>
          <el-form-item label="电话号码" label-width="120px">
            <el-input v-model="localform.phone"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible=false">取 消</el-button>
          <el-button type="primary" @click="updateAddress">确 定</el-button>
        </div>
      </el-dialog>
      <el-dialog title="新增收货地址"
                 :visible.sync="testDia">
        <el-button @click="correctPay">模拟支付点这里</el-button>
        <el-button @click="errorPay">模拟超时点这里</el-button>
      </el-dialog>
    </div>
</template>

<script>
  import hTitle from '../tools/hTitle'
  import state from '../../../../store/state'
  import {
    getGood,
    ceateOrder,
    getResiver,
    updateAddress,
    deleteAddress,
    correctPay,
    overTime
  } from '../../../../apis/customer'
  import HTitle from '../tools/hTitle'

  export default {
    name: 'orderPage',
    components: {HTitle},
    data(){
      return{
        orderId:'',
        testDia:false,
        localform:{
          name:'',
          phone:'',
          detailAddress:'',
        },
        dialogFormVisible:false,
        totalNum:0,
        payMot:"0",
        methodList:[{
          id:"0",
          name:"微信"
        },
          {
            id:"1",
            name:"支付宝"
          }],
        cartData:[],
        flag:'',
        Resiver:[]

      }
    },
    created () {
      let pageGoods = []
      pageGoods = this.$route.params.comfirmedGood
      if(!this.$route.params.comfirmedGood){
        this.$message({
          message:"非法操作",
          type:'error'
        })

      }else{
        this.cartData = pageGoods
        console.log(this.cartData)
      }
    },
    computed:{
      sumMoney(){
        return this.cartData.map(
          row=>row.price*row.num).reduce(
          (acc, cur) => (cur + acc), 0)
      }
    },
    mounted () {
      this.getResiverList()
      // this.getCartGoods()

    },
    methods:{
      stopBubbling(e) {
        e = window.event || e;
        if (e.stopPropagation) {
          e.stopPropagation();      //阻止事件 冒泡传播
        } else {
          e.cancelBubble = true;   //ie兼容
        }
      },
      setProvince(data){
        console.log("data",data)
        this.localform.areaAddress = data.province.value+' '+data.city.value+' '+data.area.value
      },
      updateAddress(){
        this.localform.userId = localStorage.getItem("userId")
        updateAddress(this.localform).then(res=>{
          this.getResiverList()
          this.dialogFormVisible = false
        }).catch(err=>{
          if(!err.response.data.flag){
            this.$message({
              message:err.response.data.message,
              type:'error'
            })
          }
        })
      },
      // getCartGoods(){
      //   let cartGoods = state.cart
      //   console.log(state.cart)
      //   this.totalNum = cartGoods.totalNum
      //   cartGoods.goods.forEach(item=>{
      //     getGood(item.id).then(response => {
      //       if(response.data.flag){
      //         let {data} = response.data
      //         this.cartData.push({id:data._id,name:data.name,price:data.price,num:item.num,cover:data.cover})
      //       }
      //     }).catch(err=>{
      //     })
      //
      //   })
      //
      // },
      getResiverList(){
        getResiver({userId:localStorage.getItem("userId")}).then(res=>{
          if(res.data.flag){
            this.Resiver = res.data.data
            let asb = this.Resiver.find(item=>{
              return item.isdefault
            })
            this.flag = asb._id
          }
        }).catch(err=>{

        })
      },
      changeLocation(id){
        this.flag = id
      },
      addLocation(){//新增不传_id
        this.localform = {

        }
        this.dialogFormVisible=true
      },
      updateLocation(value){//修改要传_id
        this.stopBubbling(event);
        const abc = value.areaAddress.split(' ')
        this.localform.province = abc[0]
        this.localform.city= abc[1]
        this.localform.area =  abc[2]
        this.localform._id = value._id
        this.localform.detailAddress = value.detailAddress
        this.localform.name = value.name
        this.localform.phone = value.phone
        console.log(this.localform)
        this.dialogFormVisible=true
      },
      deleteLocation(id){
        this.stopBubbling(event);
        this.$confirm('确认删除此地址吗？', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          showClose:false
        }).then(() => {
          deleteAddress(id).then(res=>{
            this.getResiverList()
            if(res.data.flag){
              this.$message({
                message:"删除成功",
                type:"success"
              })
            }
          }).catch(err=>{
            return
          })
        }).catch(() => {
          return
        });
      },

      payBill(){
        const that = this
        that.cartData.forEach(item=>{
          this.$store.commit("deleteFromCart",item.id)
        })
        let ns = that.cartData.map(obj=>{
          return {product:obj.id,sum:obj.num}
        })
        let data = {
          resiver:this.flag,
          payMethod:that.payMot,
          goodsList:ns,
          orderUser:localStorage.getItem('userId')
        }
        ceateOrder(data).then(res=>{
          if(res.data.flag){
            this.orderId = res.data.data.orderId
            this.testDia=true
          }
        }).catch(err=>{
          console.log("err",err)
        })
      },
      correctPay(){
        correctPay({orderId:this.orderId}).then(res=>{
          console.log(res)
        }).catch(err=>{
          console.log(err)
        })
        this.testDia=false
        this.$router.push({path:'/home'})
      },
      errorPay(){
        overTime({orderId:this.orderId}).then(res=>{
          console.log(res)
        }).catch(err=>{
          console.log(err)
        })
        this.testDia=false
        this.$router.push({path:'/home'})
      }
    }
  }
</script>

<style lang="scss">
  .resieverBox{
    &:hover {
      background: #F2F2F2;
      .operation {
        visibility: visible;
        transform: translate(0, 0);
      }
    }

  }
  .el-dialog{
    border-radius: 10px;

  }
  .el-table--enable-row-hover .el-table__body tr:hover>td{
    background-color: #ffffff !important;
  }



</style>
<style scoped>


  #all{
    width: 100%;
    height: 100%;
  }
  .checkOut{
    box-sizing: border-box;
    width: 80%;
    margin:80px auto;
  }
  .mainArea {
    width: 100%;
    border: 1px solid #dcdcdc;
    margin-top: 40px;
    border-radius: 5px;
  }
  .header {
    font-size: 20px;
    box-sizing: border-box;
    border-bottom: #dcdcdc 1px solid;
    height: 40px;
    line-height: 40px;
    width: 100%;
    text-align: left;
    padding-left: 30px;
  }
  .localList{
    width: 100%;
    padding:20px;
    box-sizing: border-box;
    display: inline-block;
  }
  .resieverBox{
    overflow:hidden;
    position: relative;
    text-align:left;
    box-sizing: border-box;
    padding:20px 20px 0 20px;
    /*box-sizing: border-box;*/
    box-shadow: 0 0 10px 3px #f5f5f5;
    background-color: #f4f4f4;
    border-radius: 5px;
    user-select:none;
    cursor: pointer;
    float: left;
    margin: 0 10px 10px 10px;
    border: #1a1a1a 1px solid;
    width: 30%;
    height: 190px;
  }
  .choosed{
    box-shadow: 0 0 10px 3px #5d7a9a;
    background-color: #FFFFFF;
    border: #5683ea 1px solid!important;
  }
  .checkpoint {
    float: right;
    position: relative;
  }
  .goodsList{
    width: 100%;
    box-sizing: border-box;
  }
  .optionBar{
    display: block;
    height: 80px;
    user-select: none;
  }
  .message{
    align-items: center;
    box-sizing: border-box;
    height: 100%;
    padding:10px 20px;
    display: flex;
    float:right;
  }
  .payMethod{
    align-items: center;
    box-sizing: border-box;
    height: 100%;
    padding:10px 20px;
    display: flex;
    float:left;
  }
  .sumMsg{
    float: left;
    display: flex;
    margin-right: 20px;
  }
  .payBtn{
    float: right;
    box-shadow: 0 0 10px 3px rgba(212, 215, 217, 0.99);
  }
  .operation{
    box-sizing: border-box;
    visibility: visible;
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 30px;
    background: #e1e1e1;
    transition: all .2s ease;
    transform: translateY(30px);
    border-top: 1px solid #e1e1e1;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: center;
    align-items: center;
    -ms-flex-pack: center;
    justify-content: center;
    z-index: 11;
  }
  .operationBtn {
    background-color: #ffffff;
    width: 50%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
  }
</style>
