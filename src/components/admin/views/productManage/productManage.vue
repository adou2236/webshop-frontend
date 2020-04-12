<template>
  <div id="all">
    <div class="searchArea">
<!--      <el-input v-model="keyWord" ></el-input>-->
    </div>
    <div class="showArea">
      <el-table
        height="550"
        border
        :data="tableData"
        style="width: 100%">
        <el-table-column
          type="index">
        </el-table-column>
        <el-table-column
          label="商品名称">
          <template slot-scope="scope">
            <div slot="reference">
              <el-tag size="medium">{{ scope.row.name }}</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="商品图片">
          <template slot-scope="scope">
            {{ scope.row.cover }}
          </template>
        </el-table-column>
        <el-table-column
          label="售价">
          <template slot-scope="scope">
           ￥{{ scope.row.price }}
          </template>
        </el-table-column>
        <el-table-column
          label="库存">
          <template slot-scope="scope">
            {{ scope.row.count }}
          </template>
        </el-table-column>
        <el-table-column
          label="当前折扣">
          <template slot-scope="scope">
            {{ scope.row.discount }}
          </template>
        </el-table-column>
        <el-table-column
          label="分类">
          <template slot-scope="scope">
            {{ scope.row.category===null?'未知':scope.row.category._id }}
          </template>
        </el-table-column>
        <el-table-column
          label="修改时间">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.updateTime }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" slot="reference" @click='handleEdit(scope.row)'>编辑</el-button>
            <el-popconfirm
              title="确认删除？"
              confirmButtonText="确认"
              cancelButtonText='取消'
              icon="el-icon-info"
              iconColor="red"
              @onConfirm="handleDelete(scope.$index, scope.row)"
            >
              <el-button
                slot="reference"
                size="mini"
                type="danger">删除</el-button>
            </el-popconfirm>
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

    <el-dialog
      :show-close="false"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <el-form label-position="left" ref="form" :model="sizeForm" label-width="80px" size="mini">
        <el-form-item label="商品名称">
          <el-input v-model="sizeForm.name"></el-input>
        </el-form-item>
        <el-form-item label="商品种类">
          <el-select v-model="sizeForm.category._id" placeholder="选择商品种类">
            <el-option
              v-for="item in goodCatgorys"
              :key="item._id"
              :label="item.name"
              :value="item._id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品价格">
          <el-input v-model="sizeForm.price"></el-input>
        </el-form-item>
        <el-form-item label="库存">
          <el-input v-model="sizeForm.count"></el-input>
        </el-form-item>
        <el-form-item label="商品折扣">
          <el-input v-model="sizeForm.discount"></el-input>
        </el-form-item>
        <el-form-item label-width="0" style="margin:0;" size="mini">
          <el-button type="primary" @click="onSubmit">确认</el-button>
          <el-button @click="dialogVisible=false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'productManage',
    data(){
      return{
        editingRow:'',
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
      this.getTableData(1)
      this.getCategory()

    },
    methods: {
      onSubmit(){
        this.$http({
          method:"PUT",
          url:"/api/products/"+this.editingRow,
          data:this.sizeForm
        }).then(response=>{
          console.log(response)
          if(!response.data.flag){
            this.$message({
              message:response.data.message,
              type:'error'
            })
          }
          this.getTableData(this.currentPage)
        }).catch(error=>{
          if(!error.response.data.flag){
            this.$message({
              message:error.response.data.message,
              type:'error'
            })
          }
        })
        this.dialogVisible=false


      },
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
      getTableData(page){
        this.$http({
          method:"GET",
          url:"/api/products",
          params:{
            pages:page
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
            this.tableData = response.data.data.data
            this.totallist = response.data.data.count
          }
        }).catch(error=>{
          if(!error.response.data.flag){
            this.$message({
              message:error.response.data.message,
              type:'error'
            })
          }
        })
      },
      sureEditstatisticalValue(value){
        value._self.$refs[`popover-${value.$index}`].doClose();
        this.$http({
          method:"PUT",
          url:"/api/categories/"+value.row._id,
          data:{
            name:this.editstatisticalValue
          }
        }).then(response=>{
          if(response.data.flag) {
            this.$message({
              message: response.data.message,
              type: 'success'
            })
            this.getTableData(1)
          }
        }).catch(error=>{
          //400请求调到error种，error默认显示error.message
          if(!error.response.data.flag){
            this.$message({
              message:error.response.data.message,
              type:'error'
            })
          }
        })
      },
      handleCurrentChange(value){
        this.currentPage = value
        console.log(value)
        this.getTableData(value)

      },
      handleEdit(value) {
        for(let item  in value){
          this.sizeForm[item] = value[item]
        }
        console.log(this.sizeForm)
        this.editingRow = value._id

        this.dialogVisible=true
      },
      handleDelete(index, row) {
        this.$http({
          method:"DELETE",
          url:"/api/products/"+row._id
        }).then(response=>{
          if(response.data.flag){
            this.$message({
              message:response.data.message,
              type:'success',
              duration:2000
            })
            this.getTableData(this.currentPage)
          }
        }).catch(error=>{
          if(!error.response.data.flag){
            this.$message({
              message:error.response.data.message,
              type:'error'
            })
          }
        })
      },
      getCategory(){
        this.$http({
          method:"GET",
          url:"/api/categories",
        }).then(response=>{
          console.log(response)
          if(!response.data.flag){
            this.$message({
              message:response.data.message,
              type:'error'
            })
          }
          else{
            this.goodCatgorys = response.data.data
          }
        }).catch(error=>{
          console.log(error)
        })
      },
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
  .newBtn {
    float: left;
    margin: 0 0 10px 10px ;
  }

</style>
