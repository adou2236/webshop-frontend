<template>
    <div id="all">
      <div class="outerBox">
        <div class="sideBar">
          <div class="userMsg"></div>
          <div class="optionArea">
            <div class="option"
                 v-for="item in options"
                 :key="item.id"
                 :class="flag===item.id?'active':''"
                 @click="pushRouter(item)"
            >{{item.name}}</div>
          </div>
        </div>
        <div class="settingPage">
          <h-title v-bind:title="name"></h-title>
          <router-view/>
        </div>
      </div>

    </div>
</template>

<script>
  import hTitle from '../tools/hTitle'
  import settingContainer from './settingContainer'
  import SettingContainer from './settingContainer'
  import HTitle from '../tools/hTitle'
  export default {
    name: 'userDetails',
    components: {HTitle, SettingContainer},
    data(){
      return{
        flag:0,
        name:'订单管理',
        options:[{id:0,name:'订单管理',value:'orderList'},
        {id:1,name:'地址管理',value:'resiverList'},
        {id:2,name:'占位',value:'unDetermin'},
        {id:3,name:'占位',value:'unDetermin'},
        {id:4,name:'占位',value:'unDetermin'}]
      }
    },
    methods:{
      pushRouter(value){
        this.flag=value.id
        this.name = value.name
        this.$router.push({name:value.value})
      }
    }
  }
</script>

<style scoped>
  #all{
  }
  .active{
    background-color: #409EFF;
    color: #F2F2F2;
  }
  .outerBox {
    width: 80%;
    margin:40px auto;
    display: flex;
    box-sizing: border-box;
  }
  .sideBar{
    box-sizing: border-box;
    border-radius: 5px;
    border: 1px solid #dcdcdc;
    width:200px;
    float: left;
    height: auto;
    display:inline-table;
  }
  .option{
    cursor:pointer;
    padding:10px 0;
    text-align: center;
    border-top: 1px solid #ebebeb
  }
  .userMsg{
    height: 200px;
  }
  .settingPage{
    border: 1px solid #dcdcdc;
    height: auto;
    display:inline-table;
    border-radius: 5px;
    box-sizing: border-box;
    flex:1;
    margin:0 0 0 25px;
  }

</style>
