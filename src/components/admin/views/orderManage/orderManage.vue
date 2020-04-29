<template>
  <div id="all">
    <div class="searchArea">
      <el-form size="mini" :inline="true" :model="formInline" class="inlineForm">
        <el-form-item>
          <el-select clearable v-model="formInline.status" placeholder="支付状态">
            <el-option label="待支付" value="0"></el-option>
            <el-option label="已支付" value="1"></el-option>
            <el-option label="超时" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item  >
          <el-select clearable  v-model="formInline.payMethod" placeholder="支付方式">
            <el-option label="微信" value="0"></el-option>
            <el-option label="支付宝" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item >
          <el-input clearable v-model="formInline.orderId" placeholder="订单号"></el-input>
        </el-form-item>
        <el-form-item >
          <el-input clearable v-model="formInline.orderUser" placeholder="下单用户"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="searchOrder(formInline)">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="showArea">
      <el-table
        :row-class-name="tableRowClassName"
        border
        :data="tableData"
        style="width: 100%">
        <el-table-column
          label="订单时间">
          <template slot-scope="scope">
              {{ scope.row.createTime }}
          </template>
        </el-table-column>
        <el-table-column
          label="订单号">
          <template slot-scope="scope">
              {{ scope.row.orderId }}
          </template>
        </el-table-column>
        <el-table-column
          label="下单用户">
          <template slot-scope="scope">
            {{ scope.row.orderUser.name }}
          </template>
        </el-table-column>
        <el-table-column
          label="商品">
          <template slot-scope="scope">
            <el-popover
              placement="right"
              width="400"
              trigger="click">
              <el-table :data="scope.row.goodsList">
                <el-table-column width="150" property="product.name" label="商品名称"></el-table-column>
                <el-table-column width="150" property="product.price" label="购买价格"></el-table-column>
                <el-table-column width="100" property="sum" label="数量"></el-table-column>
              </el-table>
              <el-button type="info" plain slot="reference">查看</el-button>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          label="总金额">
          <template slot-scope="scope">
            ￥{{ scope.row.totalMoney }}
          </template>
        </el-table-column>
        <el-table-column
          label="支付方式">
          <template slot-scope="scope">
            <span v-if="scope.row.payMethod === '1'">支付宝</span>
            <span v-else-if="scope.row.payMethod ==='0'">微信</span>
          </template>
        </el-table-column>
        <el-table-column
          label="支付状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status === 0">待支付</span>
            <span v-if="scope.row.status === 1">已支付</span>
            <span v-if="scope.row.status === 2">超时</span>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          :hide-on-single-page="totallist<=10"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="10"
          background
          layout="prev, pager, next"
          :total="totallist">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'orderManage',
    data(){
      return{
        editingRow:'',
        formInline:{
          status: '',
          payMethod:'',
          orderId:'',
          orderUser:''
        },
        sizeForm:{
          name:'',
          price:0,
          count:0,
          discount:0,
          category:{
            name:'',
            _id:''
          }
        },
        goodCatgorys:[],
        dialogVisible:false,
        totallist:20,
        currentPage:1,
        editstatisticalValue:'',
        tableData: []
      }
    },
    mounted () {
      this.getTableData('','','','',1)
      // this.getCategory()

    },
    methods: {
      tableRowClassName({row, rowIndex}) {
        console.log(row)
        if (row.status === 0) {
          return 'ready-row';
        } else if (row.status === 1) {
          return 'success-row';
        }else{
          return 'error-row';
        }
      },
      searchOrder(value){
        console.log(value)
        this.getTableData(value.orderUser,value.status,value.payMethod,value.orderId,1)
      },
      getTableData(orderUser,status,payMethod,orderId,pages){
        this.$http({
          method:"GET",
          url:"/api/order",
          params:{
            orderUser:orderUser,
            status:status,
            payMethod:payMethod,
            orderId:orderId,
            pages:pages
          }
        }).then(response=>{
          console.log(response)
          if(!response.data.flag){
            this.$message({
              message:response.data.message,
              type:'error'
            })
          }
          else{
            this.tableData = response.data.data.orderList
            this.totallist = response.data.data.count
            console.log(  this.totallist)
          }
        }).catch(error=>{
          if(!error.response.data.flag){
            this.$message({
              message:error.response.data.message,
              type:'error'
            })
            this.tableData = []
          }
        })
      },
      handleCurrentChange(value){
        this.currentPage = value
        console.log(value)
        this.getTableData(this.formInline.orderUser,this.formInline.status,this.formInline.payMethod,this.formInline.orderId,value)

      },
    }
  }
</script>


<style lang="scss">
 

</style>
<style >
  .el-table .error-row {
    background: rgba(231, 170, 170, 0.58);
  }
  .el-table .ready-row{
    background: rgba(231, 226, 160, 0.58);
  }
  .el-table .success-row {
    background: rgba(176, 231, 170, 0.58);
  }

  .showArea{

  }
  .pagination{
    display: block;
    padding:20px;
    text-align: right
  }
  .inlineForm{
    padding:0px 20px;
    text-align: left

  }

</style>
