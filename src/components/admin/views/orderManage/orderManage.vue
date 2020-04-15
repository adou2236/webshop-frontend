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

<!--        <el-table-column label="操作">-->
<!--          <template slot-scope="scope">-->
<!--            <el-button size="mini" slot="reference" @click='handleEdit(scope.row)'>编辑</el-button>-->
<!--            <el-popconfirm-->
<!--              title="确认删除？"-->
<!--              confirmButtonText="确认"-->
<!--              cancelButtonText='取消'-->
<!--              icon="el-icon-info"-->
<!--              iconColor="red"-->
<!--              @onConfirm="handleDelete(scope.$index, scope.row)"-->
<!--            >-->
<!--              <el-button-->
<!--                slot="reference"-->
<!--                size="mini"-->
<!--                type="danger">删除</el-button>-->
<!--            </el-popconfirm>-->
<!--          </template>-->
<!--        </el-table-column>-->
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

<!--    <el-dialog-->
<!--      :show-close="false"-->
<!--      :visible.sync="dialogVisible"-->
<!--      width="30%"-->
<!--      :before-close="handleClose">-->
<!--      <el-form label-position="left" ref="form" :model="sizeForm" label-width="80px" size="mini">-->
<!--        <el-form-item label="商品名称">-->
<!--          <el-input v-model="sizeForm.name"></el-input>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="商品种类">-->
<!--          <el-select style="width: 100%" v-model="sizeForm.category._id" placeholder="选择商品种类">-->
<!--            <el-option-->
<!--              v-for="item in goodCatgorys"-->
<!--              :key="item._id"-->
<!--              :label="item.name"-->
<!--              :value="item._id">-->
<!--            </el-option>-->
<!--          </el-select>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="商品价格">-->
<!--          <el-input v-model="sizeForm.price"></el-input>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="库存">-->
<!--          <el-input v-model="sizeForm.count"></el-input>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="商品折扣">-->
<!--          <el-input v-model="sizeForm.discount"></el-input>-->
<!--        </el-form-item>-->
<!--        <el-form-item label-width="0" style="margin:0;" size="mini">-->
<!--          <el-button type="primary" @click="onSubmit">确认</el-button>-->
<!--          <el-button @click="dialogVisible=false">取消</el-button>-->
<!--        </el-form-item>-->
<!--      </el-form>-->
<!--    </el-dialog>-->
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
      searchOrder(value){
        console.log(value)
        this.getTableData(value.orderUser,value.status,value.payMethod,value.orderId,1)
      },
      // onSubmit(){
      //   this.$http({
      //     method:"PUT",
      //     url:"/api/products/"+this.editingRow,
      //     data:this.sizeForm
      //   }).then(response=>{
      //     console.log(response)
      //     if(!response.data.flag){
      //       this.$message({
      //         message:response.data.message,
      //         type:'error'
      //       })
      //     }
      //     this.getTableData('','',this.currentPage)
      //   }).catch(error=>{
      //     if(!error.response.data.flag){
      //       this.$message({
      //         message:error.response.data.message,
      //         type:'error'
      //       })
      //     }
      //   })
      //   this.dialogVisible=false
      //
      //
      // },
      handleClose(e){
        console.log(e)
      },
      open() {
        this.$prompt('', '请输入名称', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({ value }) => {
          this.newCatgory(value)
        }).catch(() => {
        });
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
      // sureEditstatisticalValue(value){
      //   value._self.$refs[`popover-${value.$index}`].doClose();
      //   this.$http({
      //     method:"PUT",
      //     url:"/api/categories/"+value.row._id,
      //     data:{
      //       name:this.editstatisticalValue
      //     }
      //   }).then(response=>{
      //     if(response.data.flag) {
      //       this.$message({
      //         message: response.data.message,
      //         type: 'success'
      //       })
      //       this.getTableData('','',1)
      //     }
      //   }).catch(error=>{
      //     //400请求调到error种，error默认显示error.message
      //     if(!error.response.data.flag){
      //       this.$message({
      //         message:error.response.data.message,
      //         type:'error'
      //       })
      //     }
      //   })
      // },
      handleCurrentChange(value){
        this.currentPage = value
        console.log(value)
        this.getTableData(this.formInline.orderUser,this.formInline.status,this.formInline.payMethod,this.formInline.orderId,value)

      },
      // handleEdit(value) {
      //   for(let item  in value){
      //     this.sizeForm[item] = value[item]
      //   }
      //   console.log("this.sizeForm",this.sizeForm)
      //   this.editingRow = value._id
      //   this.dialogVisible=true
      // },
      // handleDelete(index, row) {
      //   this.$http({
      //     method:"DELETE",
      //     url:"/api/products/"+row._id
      //   }).then(response=>{
      //     if(response.data.flag){
      //       this.$message({
      //         message:response.data.message,
      //         type:'success',
      //         duration:2000
      //       })
      //       this.getTableData('','',this.currentPage)
      //     }
      //   }).catch(error=>{
      //     if(!error.response.data.flag){
      //       this.$message({
      //         message:error.response.data.message,
      //         type:'error'
      //       })
      //     }
      //   })
      // },
      // getCategory(){
      //   this.$http({
      //     method:"GET",
      //     url:"/api/categories",
      //   }).then(response=>{
      //     console.log(response)
      //     if(!response.data.flag){
      //       this.$message({
      //         message:response.data.message,
      //         type:'error'
      //       })
      //     }
      //     else{
      //       this.goodCatgorys = response.data.data
      //     }
      //   }).catch(error=>{
      //     console.log(error)
      //   })
      // },
    }
  }
</script>

<style scoped>
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
