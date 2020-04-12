// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios';

Vue.use(ElementUI)

var testLocal = localStorage.getItem("test");
var $http = axios.create({
  headers: {'userInfoCode': testLocal}
});
Vue.prototype.$http = $http;

Vue.config.productionTip = false



/* eslint-disable no-new */
new Vue({
  el: '#app',
  $http,
  router,
  components: { App },
  template: '<App/>'
})
