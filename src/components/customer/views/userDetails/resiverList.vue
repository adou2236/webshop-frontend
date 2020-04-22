<template>
    <div id="all">
      <div style="width: 100%">
        <el-table
          :highlight-current-row="false"
          :data="Resiver"
          :header-cell-style="{'background-color':'#eee',
          'height':'15px',
          'padding':'5px',
          'font-weight':'400'}"
          style="width: 100%">
          <el-table-column
            width="150"
            prop="name"
            label="姓名">
          </el-table-column>
          <el-table-column
            label="地址">
            <template slot-scope="scope">
              {{scope.row.areaAddress+' '+scope.row.detailAddress}}
            </template>
          </el-table-column>
          <el-table-column
            prop="phone"
            label="电话">
          </el-table-column>
          <el-table-column
            label="操作"
            width="150">
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
    </div>
</template>

<script>
  import {getResiver} from '../../../../apis/customer'

  export default {
    props:['name'],
    name: 'resiverList',
    data(){
      return{
        Resiver:[]
      }
    },
    mounted () {
      this.getResiverList()
    },
    methods:{
      getResiverList(){
        getResiver({userId:localStorage.getItem("userId")}).then(res=>{
          if(res.data.flag){
            this.Resiver = res.data.data

          }
        }).catch(err=>{

        })
      },
    }
  }

</script>

<style scoped>
  #all{
    /*padding: 0 30px;*/
    width: 100%;
    box-sizing: border-box;
    border: 1px solid #dcdcdc;
    border-radius: 0 0 5px 5px;
  }

</style>
