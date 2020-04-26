import $http from './apis'



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
