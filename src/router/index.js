import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import detail from '@/components/page/detail'
import notFound from '@/components/page/notFound'
import category from '@/components/page/category'
import mylist from '@/components/page/mylist'
import store from '@/store/index'
Vue.use(Router)
const router =  new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,
      meta:{
        keepAlive:true,
        title:'私人追剧管家'
      }
    },
    {
      path:'/detail/:id',
      name:'detail',
      component: detail,
      meta:{
        title:'详情'
      }
    },
    {
      path:'/category',
      name:'category',
      component:category,
      meta:{
        keepAlive:true,
        title:'分类'
      }
    },
    {
      path:'/mylist',
      name:'mylist',
      component:mylist,
      meta:{
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      }
    }
  ]
})
router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  // next()
  if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
    let token = store.state.login.currentUser.getUserToken()
    console.log(token); //拿到了
    if (token) { 
        next();
    }
    else {
      store.dispatch('handle')
      next({
          path: '/',
          // query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  }
  else {
      next();
  }
})


export default router;