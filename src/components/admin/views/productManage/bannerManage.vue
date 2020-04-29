<template>
  <div id="all">
    <div style="float: left;padding: 20px"><el-button type="primary" @click="addNewBanner" size="small">新增</el-button></div>
    <div>
        <el-table
          :highlight-current-row="false"
          ref="multipleTable"
          @selection-change="handleSelectionChange"
          :data="bannerData"
          style="width: 100%">
          <el-table-column
            type="selection">
          </el-table-column>
          <el-table-column
            label="商品">
            <template slot-scope="scope">
              <el-image style="width: 80px;height: 80px" :src="scope.row.prodId.cover"></el-image>
              <span style="top: 50%;position: absolute;transform: translateY(-50%); margin-left: 10px">{{scope.row.prodId.name}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="banner图">
            <template slot-scope="scope">
              <el-image fit="scale-down" style="width: 100px; height: 100px" :src="scope.row.imgUrl"></el-image>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            width="120">
            <template slot-scope="scope">
              <el-button
                @click.native.prevent="deleteBanner(scope.row)"
                type="danger"
                size="mini">
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
    </div>
    <el-dialog title="新增banner"
               :visible.sync="dialogFormVisible">
      <el-form :model="banner">
        <el-form-item label="选择商品" label-width="120px">
          <el-select style="width: 100%" v-model="banner.product" placeholder="请选择">
            <el-option
              v-for="item in products"
              :key="item._id"
              :label="item.name"
              :value="item._id">
              <span style="float: left"><el-image style="width: 40px;height: 40px" fit="cover" :src="item.cover"></el-image></span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{ item.name }}</span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="图片地址" label-width="120px">
          <el-input v-model="banner.imgUrl"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible=false">取 消</el-button>
        <el-button type="primary" @click="updateBanner">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import {deleteBanner, getBanner, updateBanner} from '../../../../apis/admin'
  import {getAllGoods} from '../../../../apis/customer'

  export default {
    name: 'bannerManage',
    data(){
      return{
        dialogFormVisible:false,
        products:[],
        banner:{
          product: '',
          imgUrl: ''
        },
        bannerData:[]
      }
    },
    mounted () {
      this.getAllBanner()
      this.getAllProduct()
    },
    methods:{
      updateBanner(){
        let data = {
         imgUrl:this.banner.imgUrl,
         prodId:this.banner.product
        }
        updateBanner(data).then(res=>{
          if(res.data.flag){
            this.dialogFormVisible=false
            this.$message({
              message:res.data.message,
              type:"success"
            })
            this.getAllBanner()
          }
        }).catch(err=>{
          if(!err.response.data.flag){
            this.$message({
              message:err.response.data.message,
              type:"error"
            })
          }
        })

      },
      getAllProduct(){
        getAllGoods().then(res=>{
          if(res.data.flag){
          this.products = res.data.data.data
          }
        }).catch(err=>{

        })
      },
      deleteBanner(row){
        deleteBanner(row._id).then(res=>{
          if(res.data.flag){
            this.$message({
              message:res.data.message,
              type:'success'
            })
            this.getAllBanner()
          }
        }).catch(err=>{
          if(!err.response.data.flag){
            this.$message({
              message:err.response.data.message,
              type:'error'
            })
          }
        })
      },
      addNewBanner(){
        this.dialogFormVisible = true

      },
      getAllBanner(){
        getBanner().then(res=>{
          console.log(res.data.data)
          this.bannerData = res.data.data
        }).catch(err=>{

        })
      },
      handleSelectionChange(){

      }

    }
  }
</script>

<style scoped>

</style>
