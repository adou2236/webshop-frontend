import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import adminLogin from '@/components/admin/adminLogin'
import mainBox from '../components/admin/views/mainBox'
import userManage from '../components/admin/views/userManage/userManage'
import catgoryManage from '../components/admin/views/catgoryManage/catgoryManage'
import productManage from '../components/admin/views/productManage/productManage'
import orderManage from '../components/admin/views/orderManage/orderManage'
import firstPage from '../components/admin/views/firstPage/firstPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/admin/login',
      name: 'adminLogin',
      component: adminLogin
    },
    {
      path:'/admin',
      name: 'mainBox',
      component: mainBox,
      children:[{
        path:'/admin/user',
        name: 'userManage',
        component: userManage,
        },
        {
        path:'/admin/catgory',
        name: 'catgoryManage',
        component: catgoryManage,
       },{
        path:'/admin/product',
        name: 'productManage',
        component: productManage,
       },{
        path:'/admin/order',
        name: 'orderManage',
        component: orderManage,
       },{
        path:'/admin/firstPage',
        name: 'firstPage',
        component: firstPage,
       }]
    }
  ]
})
