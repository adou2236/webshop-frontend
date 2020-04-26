import Vue from 'vue'
import Router from 'vue-router'
import adminLogin from '@/components/admin/adminLogin'
import mainBox from '../components/admin/views/mainBox'
import userManage from '../components/admin/views/userManage/userManage'
import catgoryManage from '../components/admin/views/catgoryManage/catgoryManage'
import productManage from '../components/admin/views/productManage/productManage'
import bannerManage from '../components/admin/views/productManage/bannerManage'
import orderManage from '../components/admin/views/orderManage/orderManage'
import firstPage from '../components/admin/views/firstPage/firstPage'
import insertProd from '../components/admin/views/insertProd/insertProd'
import mailPage from '../components/customer/mailPage'
import cartPage from '../components/customer/views/cartPage/cartPage'
import productDetails from '../components/customer/views/productDetails/productDetails'
import productList from '../components/customer/views/productList/productList'
import orderPage from '../components/customer/views/orderPage/orderPage'
import homePage from '../components/customer/views/homePage/homePage'
import secondChild from '../components/customer/views/secondChild'
import userLogin from '../components/customer/views/userDetails/userLogin'
import userDetails from '../components/customer/views/userDetails/userDetails'
import orderList from '../components/customer/views/userDetails/orderList'
import resiverList from '../components/customer/views/userDetails/resiverList'
import unDetermin from '../components/customer/views/userDetails/unDetermin'
import test from '../components/customer/views/test'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/test',
      name: 'test',
      component: test,
    },
    {
      path: '/',
      name: 'mailPage',
      component: mailPage,
      redirect:'/secondChild',
      children:[
        {
          path: '/secondChild',
          component: secondChild,
          redirect:'/home',
          children:[
            {
              path: '/home',
              name: 'home',
              component: homePage,
            },
            {
              path: '/productList',
              name: 'productList',
              component: productList,
            },{
              path: '/product',
              name: 'productDetails',
              component: productDetails,
            }
          ]
        },{
          path: '/order',
          name: 'orderPage',
          component: orderPage,
        },{
          path: '/cart',
          name: 'cartPage',
          component: cartPage,
        },{
          path: '/userMsg',
          name: 'userDetails',
          component: userDetails,
          redirect:'/userMsg/orderList',
          children: [
            {
              path:'/userMsg/resiverList',
              name:'resiverList',
              component:resiverList
            },
            {
              path:'/userMsg/orderList',
              name:'orderList',
              component:orderList
            },
            {
              path:'/userMsg/unDetermin',
              name:'unDetermin',
              component:unDetermin
            }
          ]
        }
      ]
    },
    {
      path:'/login',
      name:'userLogin',
      component:userLogin,
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
      redirect:'/admin/user',
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
        path:'/admin/banner',
        name: 'bannerManage',
        component: bannerManage,
       },{
        path:'/admin/order',
        name: 'orderManage',
        component: orderManage,
       },{
        path:'/admin/firstPage',
        name: 'firstPage',
        component: firstPage,
       },{
        path:'/admin/insertProd',
        name: 'insertProd',
        component: insertProd,
       }]
    }
  ]
})
