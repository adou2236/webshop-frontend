<template>
    <div id="all">
      <div class="checkOut">
        <div class="mainArea">
          <div class="header">收货地址</div>
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
          <div class="header">订单详情</div>
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
                    <span style="top: 50%;position: absolute;transform: translateY(-50%); ">{{scope.row.name}}</span>
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
          <el-button @click="cancel">取 消</el-button>
          <el-button type="primary" @click="updateAddress">确 定</el-button>
        </div>
      </el-dialog>
    </div>
</template>

<script>
  import state from '../../../../store/state'
  import {getGood, ceateOrder, getResiver, updateAddress, deleteAddress} from '../../../../apis/customer'

  export default {
    name: 'orderPage',
    data(){
      return{
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
    computed:{
      sumMoney(){
        console.log()
        return this.cartData.map(
          row=>row.price*row.num).reduce(
          (acc, cur) => (cur + acc), 0)
      }
    },
    mounted () {
      this.getResiverList()
      this.getCartGoods()

    },
    methods:{
      setProvince(data){
        console.log("data",data)
        this.localform.areaAddress = data.province.value+' '+data.city.value+' '+data.area.value

      },
      cancel(){

      },
      updateAddress(){
        this.localform.userId = localStorage.getItem("userId")
        console.log(this.localform)
        updateAddress(this.localform).then(res=>{
          console.log(res)
        }).catch(err=>{
          console.log(err)
        })

      },
      getCartGoods(){
        let cartGoods = state.cart
        console.log(state.cart)
        this.totalNum = cartGoods.totalNum
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
      getResiverList(){
        getResiver({userId:localStorage.getItem("userId")}).then(res=>{
          if(res.data.flag){
            this.Resiver = res.data.data
            let asb = this.Resiver.find(item=>{
              return item.isdefault
            })
            this.flag = asb._id
            console.log("asb",asb)
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
        console.log(id)
        deleteAddress(id).then(res=>{
          console.log(res)
        }).catch(err=>{
          console.log(err)
        })

      },

      payBill(){
        const that = this
        let ns = that.cartData.map(obj=>{
          return {product:obj.id,sum:obj.num}
        })
        let data = {
          resiver:"5e8eee365b2cfff218614d6f",
          payMethod:that.payMot,
          goodsList:ns,
          orderUser:'5e870403ade3df40b4b68594'
        }
        ceateOrder(data).then(res=>{
          console.log("res",res)

        }).catch(err=>{
          console.log("err",err)


        })

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
    box-shadow: 0 0 10px 3px #d6d6d6;
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
