export default{
  changeState (state, token) {
    state.token = token;
    try {
      localStorage.token = token
    } catch (e) {}
  },
  changeUserId (state, userId) {
    state.userId = userId;
    try {
      localStorage.userId = userId
    } catch (e) {}
  },
  changeName (state, name) {
    state.name = name;
    try {
      localStorage.name = name
    } catch (e) {}
  },
  savePassWord (state, password) {
    try {
      localStorage.password = password
    } catch (e) {}
  },
  changeCart (state,cart){
    const getters = {
      messArray_get:state=>state.cart.goods,
    }

    if(state.cart.totalNum===0){
      state.cart.goods.push({id:cart,num:1})
    }else{
      let flag = false
      state.cart.goods.forEach(item=>{
        if(item.id===cart){
          flag = true
          item.num++
          return
        }
      })
      if(!flag){
        state.cart.goods.push({id:cart,num:1})
      }
    }
    state.cart.totalNum = 0
    state.cart.goods.map(item=>{
      state.cart.totalNum +=item.num
    })
    try{
      localStorage.cart =JSON.stringify(state.cart)
    }catch (e) {

    }

  },
  deleteFromCart(state,id){
    console.log("ASD")
    const result = state.cart.goods.filter(item=>{
      return item.id !==id
    })
    state.cart.goods =result
    state.cart.totalNum = 0
    state.cart.goods.map(item=>{
      state.cart.totalNum +=item.num
    })
    try{
      localStorage.cart =JSON.stringify(state.cart)
    }catch (e) {

    }
  },

}
