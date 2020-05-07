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

var testLocal = "fuckyou";
var $http = axios.create({
  headers: {'userInfoCode': testLocal}
});
Vue.prototype.$http = $http;


// //request拦截
// $http.interceptors.request.use(
//   config => {
//     if (localStorage.getItem('token')) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
//       console.log("有token")
//       config.headers.token = localStorage.getItem("token");
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
//   if(response.data.message==='tokenError'){
//     alert('登录超时，请重新登录');
//     localStorage.clear();
//     router.replace({
//       path: '/login',
//     })
//   }
//   return response;
// }, function (error) {
//   // 对响应错误做点什么
//   return Promise.reject(error);
// });

const freePage = ['/test','/home', '/productList', '/product','/login', '/register'] // 无需验证token的页面
const whiteList = '/admin/login'

//路由跳转统一处理，token反验证
router.beforeEach((to, from, next) => {
  if(to.path.indexOf('admin')===-1) {//客户端验证
    console.log("客户端验证")
    if (freePage.indexOf(to.path) === -1) {  // 判断该路由是否需要token
      if (localStorage.getItem("token")) {  // 获取当前的token是否存在
        next();
      } else {
        next({
          path: '/login',
          query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
        })
      }
    }else{
      next()
    }
  }
  else {//服务端验证
    console.log("服务端验证")

    if (to.path !== whiteList) {  // 判断该路由是否需要token
      if (localStorage.getItem("adminToken")) {  // 获取当前的token是否存在
        next();
      } else {
        next({
          path: '/admin/login',
          query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
        })
      }
    }else{
      next()
    }
  }
});



Vue.config.productionTip = false
new Vue({
  el: '#app',
  store,
  $http,
  router,
  components: { App },
  template: '<App/>'
})
