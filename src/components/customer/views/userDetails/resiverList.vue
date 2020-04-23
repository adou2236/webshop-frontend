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
            label="收件人">
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
                @click="updateLocation(scope.row)"
                type="primary"
                size="mini">
                修改
              </el-button>
              <el-button
                @click="deleteLocation(scope.row._id)"
                type="danger"
                size="mini">
                移除
              </el-button>
            </template>
          </el-table-column>
        </el-table>

        <div @click="addLocation"  style="cursor:pointer;padding: 10px 0"><i style="font-weight: bolder;font-size: 25px;color:#dcdcdc" class="el-icon-plus"></i></div>

        <el-dialog :title="dialogTitle"
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


      </div>
    </div>
</template>

<script>
  import {deleteAddress, getResiver, updateAddress} from '../../../../apis/customer'

  export default {
    props:['name'],
    name: 'resiverList',
    data(){
      return{
        dialogTitle:'',
        dialogFormVisible:false,
        Resiver:[],
        localform:{
          name:'',
          phone:'',
          detailAddress:'',
        },
      }
    },
    mounted () {
      this.getResiverList()
    },
    methods:{
      addLocation(){//新增不传_id
        this.localform = {

        }
        this.dialogFormVisible=true
      },

      setProvince(data){
        console.log("data",data)
        this.localform.areaAddress = data.province.value+' '+data.city.value+' '+data.area.value
      },

      updateLocation(value){//修改要传_id
        this.dialogTitle = '修改地址'
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

      deleteLocation(id){
        console.log("id",id)
        this.$confirm('确认删除此地址吗？', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          showClose:false
        }).then(() => {
          deleteAddress(id).then(res=>{
            if(res.data.flag){
              this.$message({
                message:"删除成功",
                type:"success"
              })
              this.$nextTick(()=>{
                this.getResiverList()
              })
            }


          }).catch(err=>{
            return
          })
        }).catch(() => {
          return
        });



      },

      getResiverList(){
        getResiver({userId:localStorage.getItem("userId")}).then(res=>{
          if(res.data.flag){
            this.Resiver = res.data.data
            console.log("数据为",this.Resiver)
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
    /*border: 1px solid #dcdcdc;*/
    border-radius: 0 0 5px 5px;
  }

</style>
