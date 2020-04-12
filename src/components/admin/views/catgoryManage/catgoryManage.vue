<template>
    <div id="all">
      <div class="searchArea"></div>
      <div class="showArea">
        <el-button @click="open" size="mini" class="newBtn" type="primary"><i class="el-icon-plus"></i>新增分类</el-button>
        <el-table
          border
          :data="tableData"
          style="width: 100%">
          <el-table-column
            type="index"
            width="50">
          </el-table-column>
          <el-table-column
            label="分类名称">
            <template slot-scope="scope">
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ scope.row.name }}</el-tag>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="内部数量">
            <template slot-scope="scope">
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">100</el-tag>
              </div>
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
              <el-popover
                placement="top"
                width="306"
                :ref="`popover-${scope.$index}`"
              >
                <p style="text-align: center">名称</p>
                <el-input
                  style="width: 100%"
                  placeholder="请输入新的名称"
                  v-model="editstatisticalValue"
                  clearable
                  class="EditstatisticalValueInput">
                </el-input>
                <div style="text-align: right; margin-top: 16px">
                  <el-button size="mini" type="text" style="color:#333333" @click="scope._self.$refs[`popover-${scope.$index}`].doClose()">取消</el-button>
                  <el-button type="text" size="mini" @click="sureEditstatisticalValue(scope)">确定</el-button>
                </div>
                <el-button size="mini" slot="reference" @click='handleEdit(scope)'>编辑</el-button>
              </el-popover>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
</template>

<script>
  export default {
    name: 'catgoryManage',
    data(){
      return{
        editstatisticalValue:'',
        tableData: []
      }
    },
    mounted () {
      this.getTableData()

    },
    methods: {
      open() {
        this.$prompt('', '请输入名称', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({ value }) => {
          this.newCatgory(value)
        }).catch(() => {
        });
      },
      getTableData(){
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
            this.tableData = response.data.data
          }
        }).catch(error=>{
          console.log(error)
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
            this.getTableData()
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
      handleEdit(value) {
        this.editstatisticalValue=value.row.name
      },
      handleDelete(index, row) {
        this.$http({
          method:"DELETE",
          url:"/api/categories/"+row._id
        }).then(response=>{
          if(response.data.flag){
            this.$message({
              message:response.data.message,
              type:'success',
              duration:2000
            })
            this.getTableData()
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
      newCatgory(name){
        this.$http({
          method:"POST",
          url:"/api/categories/newcategory",
          data:{
            name:name
          }
        }).then(response=>{
          if(response.data.flag) {
            this.$message({
              message: response.data.message,
              type: 'success'
            })
            this.getTableData()
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
      }

    }
  }
</script>

<style scoped>
  .showArea{

  }
  .newBtn {
    float: left;
    margin: 0 0 10px 10px ;
  }

</style>
