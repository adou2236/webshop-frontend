<template>
  <div id="all">
    <div style="padding: 20px">
      <el-carousel  :interval="4000" type="card" trigger="click">
        <el-carousel-item v-for="item in bannerList" :key="item._id">
          <el-image @click="$router.push({path:'/product',query:{id:item._id}})" :src="item.imgUrl" style="background-color: #1a1a1a"></el-image>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
  import {getBanner} from '../../../../apis/admin'

  export default {
    name: 'homePage',
    data(){
      return{
        bannerList:[]

      }
    },
    mounted () {
      this.getAllBanner()
    },
    methods:{
      getAllBanner(){
        getBanner().then(res=>{
          console.log(res.data.data)
          this.bannerList = res.data.data
        }).catch(err=>{

        })
      },
    }
  }
</script>

<style scoped>

</style>
