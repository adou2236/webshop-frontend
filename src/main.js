// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from "../src/store/index"
import axios from 'axios';
import VDistpicker from 'v-distpicker'


Vue.component('v-distpicker', VDistpicker)//地区选择器

Vue.use(ElementUI)

var testLocal = localStorage.getItem("test");
var $http = axios.create({
  headers: {'userInfoCode': testLocal}
});
Vue.prototype.$http = $http;

Vue.config.productionTip = false


// //request拦截器，为每一个请求头部添加token
// $http.interceptors.request.use(
//   config => {
//     if (sessionStorage.getItem("fmsTokeId")) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
//       config.headers.fmsTokeId = sessionStorage.getItem("fmsTokeId");
//     }
//     return config;
//   },
//   err => {
//     return Promise.reject(err);
//   });
//
//
// //response拦截，token失效转到登录
// $http.interceptors.response.use(function (response) {
//   if(response.data.resultCode==='222222'){
//     alert('登录超时，请重新登录');
//     localStorage.clear();
//     router.replace({
//       path: '/',
//     })
//   }
//   return response;
// }, function (error) {
//   // 对响应错误做点什么
//   return Promise.reject(error);
// });

const freePage = ['/home', '/productList', '/product','/login', '/register','/admin/login'] // 无需验证token的页面

//路由跳转统一处理，token反验证
router.beforeEach((to, from, next) => {
  if (freePage.indexOf(to.path)===-1) {  // 判断该路由是否需要token
    if (localStorage.getItem("token")) {  // 获取当前的token是否存在
      next();
    }
    else {
      next({
        path: '/login',
        query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  }
  else {
    next();
  }
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
