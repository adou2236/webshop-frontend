import $http from './apis'



export const getBanner = () => {
  return $http({
    url:'/api/tools/banner',
    method:"GET",
  })
}
