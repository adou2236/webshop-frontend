// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from "../src/store/index"
import axios from 'axios';

Vue.use(ElementUI)

var testLocal = localStorage.getItem("test");
var $http = axios.create({
  headers: {'userInfoCode': testLocal}
});
Vue.prototype.$http = $http;

Vue.config.productionTip = false


$http.interceptors.response.use(function (response) {
  if(response.data.resultCode==='222222'){
    alert('登录超时，请重新登录');
    localStorage.clear();
    router.replace({
      path: '/',
    })
  }
  return response;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});



/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  $http,
  router,
  components: { App },
  template: '<App/>'
})
