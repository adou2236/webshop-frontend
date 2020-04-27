<template>
    <div id="all">
      <div class="container">
        <el-form :hide-required-asterisk="true" size="small" :model="ruleForm"
                 :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item style=" text-align: left" label="商品名称" prop="name">
            <el-input style="width: 203px" v-model="ruleForm.name" placeholder="商品名称"></el-input>
          </el-form-item>
          <el-form-item style=" text-align: left" label="商品类别" prop="category">
            <el-select  v-model="ruleForm.category" placeholder="商品类别">
              <el-option
                v-for="item in goodCatgorys"
                :key="item._id"
                :label="item.name"
                :value="item._id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item style=" text-align: left" label="商品价格" prop="price">
            <el-input-number v-model="ruleForm.price"
                             :precision="2"
                             :step="0.01">
            </el-input-number>
          </el-form-item>
          <el-form-item style=" text-align: left" label="商品库存" prop="count">
            <el-input-number v-model="ruleForm.count"
                             type="number"
                             :step-strictly="true"
                             :step="1">
            </el-input-number>
          </el-form-item>
          <el-form-item style=" text-align: left" label="商品图片" prop="cover">
            <el-upload
              class="upload-demo"
              :limit="1"
              drag
              action="/api/imgUpload/upImg"
              :on-success="handlePictureCardPreview"
              :on-remove="handleRemove">
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </el-form-item>
          <el-form-item style="text-align: left;padding:0 50px" label-width="0">
            <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
</template>

<script>
  export default {
    name: 'insertProd',
    data() {
      return {
        dialogVisible: false,
        goodCatgorys:[],
        ruleForm: {
          name: '',
          category: '',
          price: 0.01,
          count: 0,
          cover:''
        },
        rules: {
          name: [
            { required: true, message: '请输入商品名称', trigger: 'blur' },
            { min: 1, max: 50, message: '长度在 3 到 50 个字符', trigger: 'blur' }
          ],
          category: [
            { required: true, message: '请选择商品类别', trigger: 'change' }
          ],
          price: [
            { type: 'number', required: true, message: '请输入价格', trigger: 'blur' }
          ],
          count: [
            { type: 'number', required: true, message: '请输入库存', trigger: 'blur' }
          ]
        }
      };
    },
    mounted () {
      console.log(this.wordFlip('hello world!'))
      this.getCategory()
    },
    methods: {
      handleRemove(file, fileList) {
        console.log("删除了")
        this.ruleForm.cover = '';
        this.dialogVisible = false;
      },
      handlePictureCardPreview(response, file, fileList) {
        console.log("上传成功",response,file)
        this.ruleForm.cover = response.data.url;
        this.dialogVisible = true;
      },
      wordFlip(words){
        let arrList = words.split(' ')
        let result = ''
        for(let item of arrList){
          console.log(item)
          result += item.split('').reverse().join('')+' '
        }
        return result.trim()
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.newProduct(formName)
          } else {
            return false;
          }
        });
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
      newProduct(formName){
        this.$http({
          method:"POST",
          url:"/api/products/newproduct",
          data:this.ruleForm
        }).then(response=>{
          if(!response.data.flag){
            this.$message({
              message:response.data.message,
              type:'error'
            })
          }
          else{
            this.$refs[formName].resetFields();
            this.$message({
              message:response.data.message,
              type:'success'
            })
          }
        }).catch(error=>{
          console.log(error)
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style scoped>
  .container{
    padding:20px;
  }

</style>
