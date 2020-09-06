import { createRouter, createWebHashHistory } from "vue-router";
import { Markdown, Home } from "../views";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/markdown/:documentId",
    name: "Markdown",
    component: Markdown,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
