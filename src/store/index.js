import Vue from 'vue'
import 'es6-promise/auto'   //引用依赖
import Vuex from 'vuex'
import state from './state'  //引用同目录下的state.js
import mutations from './mutation'  //引用同目录下的mutations.js

Vue.use(Vuex); //使用vuex插件

export default new Vuex.Store({
  state,
  mutations
})
