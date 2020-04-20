import $http from './apis'



export const getAllGoods = (params) => {
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

export const ceateOrder = (data) => {
  return $http({
    url:'/api/order/newOrder',
    method:"POST",
    data:data
  })
}

export const submitRate = (data) =>{
   $http({
    url:'/api/tools/rate',
    method:"POST",
    data:data
  })
}

export const login = (data) =>{
   return $http({
    url:'/api/users/login',
    method:"POST",
    data:data
  })
}

export const getResiver = (params) =>{
   return $http({
    url:'/api/resiver',
    method:"GET",
    params:params
  })
}

export const updateAddress = (data) =>{
   return $http({
    url:'/api/resiver/updateAddress',
    method:"POST",
    data:data
  })
}
