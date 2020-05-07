import axios from 'axios';
import router from '../router/index'

var testLocal = "test";
var $http = axios.create({
  headers: {'userInfoCode': testLocal}
});

//request拦截
$http.interceptors.request.use(
  config => {
    if (localStorage.getItem('token')) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
      console.log("有token")
      config.headers.token = localStorage.getItem("token");
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  });


//response拦截，token失效转到登录
$http.interceptors.response.use(function (response) {
  if(response.data.message==='tokenError'){
    alert('登录超时，请重新登录');
    localStorage.clear();
    router.replace({
      path: '/login',
    })
  }
  return response;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});

export default $http
