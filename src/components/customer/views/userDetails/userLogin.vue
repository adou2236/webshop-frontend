<template>
    <div id="all">
      <div class="mainBox">
        <div style="height: 250px">logo占位</div>
        <div style="padding: 10px 0 50px 0">
          <el-form style="width: 80%;margin: 0 auto" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
            <el-form-item  prop="name">
              <el-input v-model="ruleForm.name" placeholder="用户名"></el-input>
            </el-form-item>
            <el-form-item   prop="password" >
              <el-input v-model="ruleForm.password" placeholder="密码" type="password"></el-input>
            </el-form-item>
            <el-form-item style="margin: 0">
                <span style="float: left">
                  <el-checkbox v-model="remCode" label="true">记住密码</el-checkbox>
                </span>
                <span style="float: right">
                  <a>忘记密码</a>
                </span>
            </el-form-item>


            <el-form-item>
              <el-button style="width: 100%" type="primary" @click="submitForm('ruleForm')">登录</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>

    </div>
</template>

<script>
  import {login} from '../../../../apis/customer'

  export default {
    name: 'userLogin',
    data(){
      return{
        remCode:true,
        ruleForm:{
          name: localStorage.getItem("name"),
          password:localStorage.getItem("password")
        },
        rules: {
          name: [
            {required: true, message: '请输入用户名', trigger: 'blur'},
          ],
          password:[
            {required: true, message: '请输入密码', trigger: 'blur'},
            { min: 8, max: 16, message: '长度在 8 到 16 个字符', trigger: 'blur' }
          ]
        }
      }
    },
    methods:{
      submitForm(formName){
        const that = this
        console.log(that.ruleForm)
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if(that.remCode){
              this.$store.commit('savePassWord', that.ruleForm.password);
            }else{
              localStorage.removeItem('password')
            }
            login(that.ruleForm).then(res=>{
              let {data} = res.data
              if(res.data.flag){
                this.$store.commit('changeState', data.token);
                this.$store.commit('changeUserId', data.userId);
                this.$store.commit('changeName', data.name);
                let redirect = '/'
                if(that.$route.query.redirect){
                  redirect = that.$route.query.redirect
                }
                this.$router.push({path:redirect})
              }
            }).catch(err=>{
              console.log(err)
              if(!err.response.data.flag){
                this.$message({
                  message:err.response.data.message,
                  type:'error'
                })
              }

            })
          } else {
            return false;
          }
        });

      }
    }
  }
</script>

<style scoped>
  #all {
    width: 100%;
    height: 100%;
    overflow:hidden;
    background-color: #856399;
    display: flex;
  }
  .mainBox{
    margin: auto;
    width: 450px;
    background-color: #ffffff;
    border: 1px solid #dadada;
    border-radius: 10px;
    box-shadow: 0 9px 30px -6px rgba(0,0,0,.2),
                0 18px 20px -10px rgba(0,0,0,.04),
                0 18px 20px -10px rgba(0,0,0,.04),
                0 10px 20px -10px rgba(0,0,0,.04);
  }


</style>
