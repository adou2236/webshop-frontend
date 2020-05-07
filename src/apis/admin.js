import $http from './apis'



export const adminLogin = (data) => {
  return $http({
    url:"/api/admin/login",
    method:"POST",
    data:data
  })
}


export const getBanner = () => {
  return $http({
    url:'/api/tools/banner',
    method:"GET",
  })
}
export const updateBanner = (data) => {
  return $http({
    url:'/api/tools/banner',
    method:"POST",
    data:data
  })
}

export const deleteBanner = (id) =>{
  return $http({
    url:'/api/tools/banner/'+id,
    method:"DELETE",
  })
}

export const findAllUser = () =>{
  return $http({
    url:'/api/allUser',
    method:"GET",
  })
}


export const codeReset = (data) =>{
  return $http({
    url:'/api/reset',
    method:"PUT",
    data:data
  })
}
