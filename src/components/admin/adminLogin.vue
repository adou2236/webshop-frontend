<template>
    <div id="all">
      <div class="formArea">
        <div>
          <div class="head">
            管理系统
          </div>
          <div class="body">
            <el-form size="small" :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
              <el-form-item label-width="0" prop="userName">
                <el-input placeholder="请输入用户名" type="username" v-model="ruleForm.name" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label-width="0" prop="password">
                <el-input placeholder="请输入密码" show-password type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label-width="0">
                <el-checkbox style="float:right" v-model="remCode">记住密码</el-checkbox>
                <el-button type="primary" style="width: 100%" @click="login('ruleForm')">登录</el-button>
              </el-form-item>
            </el-form>
          </div>

        </div>

      </div>
    </div>
</template>
<script>
  import {getGood} from '../../apis/customer'
  import state from '../../store/state'

  export default {
    name: 'adminLogin',
    data() {
      return {
        remCode:false,
        ruleForm: {
          name: '',
          password: '',
        },
        rules: {
          name: [
            {required: true, message: '请输入用户名', trigger: 'blur'},
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {min:8,max:16, message: '密码长度为8-16位', trigger: 'change'}
          ]
        }
      }
    },
    mounted () {

    },
    methods:{

      login(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$http({
              method:"POST",
              url:"/api/admin/login",
              data:{
                name:this.ruleForm.name,
                password:this.ruleForm.password
              }
            }).then(response=>{
              console.log(response)
              if(!response.data.flag){
                this.$message({
                  message:response.data.message,
                  type:'error'
                })
              }
            }).catch(error=>{
              console.log(error)
            })
          } else {
            return false;
          }
        });
      },
    },

  }
</script>

<style scoped>
  .formArea{
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    position: absolute;
    width:350px;
    /*height:50%;*/
    top:50%;
    left:50%;
    transform: translate(-50%, -50%);
  }
  .head{
    width:100%;
    line-height: 50px;
    font-size: 20px;
    /*border-bottom: 2px solid ;*/

  }
  .body{
    padding:20px

  }

</style>
