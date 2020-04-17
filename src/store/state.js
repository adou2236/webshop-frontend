let token = '';
let userId = '';
let userName = '未登录';
let cart = {
  goods:[],
  totalNum:0
};
try {
  if (localStorage.getItem('token')) {
    token = localStorage.getItem('token')
  }
  if (localStorage.getItem('cart')) {
    cart =JSON.parse(localStorage.getItem('cart'))
    console.log("购物车为",cart)
  }
} catch (e) {}

export default{
  token: token,
  userId:userId,
  userName:userName,
  cart:cart,
}
