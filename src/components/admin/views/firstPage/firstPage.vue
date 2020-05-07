<template>
  <div id="all">
    <div style="display: flex;justify-content: space-between">
      <el-card v-for="item in showList" :key="item.id" style="border-radius:5px" :body-style="{ padding: '0px',display: 'flex'}"  shadow="hover">
        <div class="icon"><i style="margin: auto" :class="item.class"></i></div>
        <div style="padding: 10px;width: 100px">
          <div style="font-size: 12px">{{item.name}}</div>
          <div style="font-size: 25px">10086</div>
        </div>
      </el-card>
    </div>
    <div style="display:flex;margin-top: 20px;height: 350px">
      <div style="width: 65%;margin-right: 20px">
        <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
          <el-tab-pane v-for="item in paneList" :key="item.name" :label="item.label" :name="item.name">
            <div style="width: 100%;height: 200px;background-color: #6b95ea"></div>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div style="flex: 1">

      </div>

    </div>

  </div>
</template>

<script>
  export default {
    name: 'firstPage',
    data(){
      return{
        danmu:['1'],
        activeName: 'first',
        showList:[
          {id:0,class:'el-icon-bicycle',name:"今日访问量"},
          {id:1,class:'el-icon-truck',name:"总访问量"},
          {id:2,class:'el-icon-user-solid',name:"用户总数"},
          {id:3,class:'el-icon-tickets',name:"订单总数"},
          {id:4,class:'el-icon-present',name:"总收益"},
        ],
        paneList:[
          {label:"访问统计",name:'first'},
          {label:"评分分布",name:'second'},
        ]
      }
    },
    methods:{
      handleClick(tab, event) {

      }
    }
  }
</script>

<style scoped>
  .icon{
    vertical-align: middle;
    font-size:50px;
    color:white;
    background-color:#6b95ea;
    width: 80px;
    height: 80px;
    display: flex;
  }

</style>
