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
<!--          <el-table-column-->
<!--            label="操作"-->
<!--            width="120">-->
<!--            <template slot-scope="scope">-->
<!--              <el-button-->
<!--                @click.native.prevent="deleteRow(scope.$index, cartData)"-->
<!--                type="danger"-->
<!--                size="mini">-->
<!--                移除-->
<!--              </el-button>-->
<!--            </template>-->
<!--          </el-table-column>-->
        </el-table>
    </div>
  </div>
</template>

<script>
  import {getBanner} from '../../../../apis/admin'

  export default {
    name: 'bannerManage',
    data(){
      return{
        bannerData:[]
      }
    },
    mounted () {
      console.log("EEE")
      this.getAllBanner()
    },
    methods:{
      addNewBanner(){

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
