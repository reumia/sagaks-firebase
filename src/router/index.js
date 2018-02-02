import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'

import Home from '@/components/pages/Home'
import About from '@/components/pages/About'
import Cut from '@/components/pages/Cut'
import AddCut from '@/components/pages/AddCut'
import Comic from '@/components/pages/Comic'
import AddComic from '@/components/pages/AddComic'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/comic/:comicId/cut/add',
      name: 'AddCut',
      component: AddCut,
      props: route => ({
        comicId: route.params.comicId,
        parentId: route.query.parentId
      })
    },
    {
      path: '/comic/:comicId/cut/:cutId',
      name: 'Cut',
      component: Cut,
      props: true
    },
    {
      path: '/comic/add',
      name: 'AddComic',
      component: AddComic
    },
    {
      path: '/comic/:id',
      name: 'Comic',
      component: Comic,
      props: true
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})

router.beforeEach((to, from, next) => {
  // 페이지 진입시, 네비게이션 닫기
  store.commit('HIDE_GLOBAL_NAVIGATION')
  next()
})

export default router
