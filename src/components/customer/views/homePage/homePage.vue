<template>
  <div id="all">
    <div style="padding: 20px 10vw">
      <el-carousel  height="500px" :interval="40000"  trigger="click">
        <el-carousel-item v-for="item in bannerList" :key="item._id">
          <el-image   fit="cover" @click="$router.push({path:'/product',query:{id:item._id}})" :src="item.imgUrl"
                      style="border-radius:5px;width:1200px;height:500px;background-color: #1a1a1a"></el-image>
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
