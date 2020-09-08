import Vue from 'vue';
import VueRouter from 'vue-router';
import { Home, Explorer, Markdown } from '../views';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/explorer/:userId',
    name: 'Explorer',
    component: Explorer,
    props: true,
  },
  {
    path: '/markdown/:documentId',
    name: 'Markdown',
    component: Markdown,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
