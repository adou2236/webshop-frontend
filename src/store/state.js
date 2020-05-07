let token = '';
let adminToken = ''
let userId = '';
let name = '';
let cart = {
  goods:[],
  totalNum:0
};

try {
  if (localStorage.getItem('token')) {
    token = localStorage.getItem('token')
  }
  if (localStorage.getItem('adminToken')) {
    adminToken = localStorage.getItem('adminToken')
  }
  if (localStorage.getItem('cart')) {
    cart =JSON.parse(localStorage.getItem('cart'))
  }
} catch (e) {}

export default{
  token: token,
  adminToken: adminToken,
  userId:userId,
  name:name,
  cart:cart,
}
