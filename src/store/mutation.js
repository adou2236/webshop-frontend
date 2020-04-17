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
  changeUserName (state, userName) {
    state.userName = userName;
    try {
      localStorage.userName = userName
    } catch (e) {}
  },
  changeCart (state,cart){
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

  }
}
