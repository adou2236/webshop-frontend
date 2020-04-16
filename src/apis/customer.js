import $http from './apis'



export const getAllGoods = (params) => {
  console.log("url请求")
  return $http({
    url:'/api/products',
    method:"GET",
    params:params
  })
}
