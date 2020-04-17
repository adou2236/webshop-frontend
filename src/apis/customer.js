import $http from './apis'



export const getAllGoods = (params) => {
  console.log("url请求")
  return $http({
    url:'/api/products',
    method:"GET",
    params:params
  })
}

export const getGood = (params) => {
  return $http({
    url:'/api/products/'+params,
    method:"GET",
  })
}

export const ceateOrder = (params) => {
  return $http({
    url:'/api/order/newOrder',
    method:"POST",
  })
}
