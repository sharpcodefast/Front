import Vue from "vue";
import VueRouter from "vue-router";
import AuthRequired from "./utils/AuthRequired";

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: () => import(/* webpackChunkName: "app" */ './views'),
    redirect: '/app/piaf',
    beforeEnter: AuthRequired,
    children: [
      {
        path: 'app/piaf',
        component: () => import(/* webpackChunkName: "piaf" */ './app/piaf'),
        redirect: '/app/piaf/start',
        children: [
          { path: 'start', component: () => import(/* webpackChunkName: "piaf" */ './app/piaf/start') }
        ]
      },
      {
        path: 'app/second-menu',
        component: () => import(/* webpackChunkName: "second-menu" */ './app/secondMenu'),
        redirect: '/app/second-menu/second',
        children: [
          { path: 'second', component: () => import(/* webpackChunkName: "second-menu" */ './app/secondMenu/Second') }
        ]
      },
      {
        path: 'app/single',
        component: () => import(/* webpackChunkName: "single" */ './app/single')
      },
      {
        path: 'app/users',
        component: () => import(/* webpackChunkName: "single" */ './app/users/user-list')
      }
    ]
  },
  { path: '/error', component: () => import(/* webpackChunkName: "error" */ './views/Error') },
  {
    path: '/user',
    component: () => import(/* webpackChunkName: "user" */ './views/user'),
    redirect: '/user/login',
    children: [
      { path: 'login', component: () => import(/* webpackChunkName: "user" */ './views/user/Login') },
      { path: 'register', component: () => import(/* webpackChunkName: "user" */ './views/user/Register') },
      { path: 'forgot-password', component: () => import(/* webpackChunkName: "user" */ './views/user/ForgotPassword') }
    ]
  },
  { path: '*', component: () => import(/* webpackChunkName: "error" */ './views/Error') }
]

const router = new VueRouter({
  linkActiveClass: "active",
  routes,
  mode: "history"
});

export default router;
