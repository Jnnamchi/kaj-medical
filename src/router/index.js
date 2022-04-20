import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import LandingPage from "../views/LandingPage.vue";
import LoginPage from "../views/LoginPage.vue";
import { getUserLoggedIn } from "../firebase"

const routes = [
  {
    path: "/",
    name: "LandingPage",
    component: LandingPage,
  },
  {
    path: "/login",
    name: "LoginPage",
    component: LoginPage,
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
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
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  if (to == from) {
    return
  }
  if (!await getUserLoggedIn()){
    if (to.path == '/login') {
      next()
    } else {
      next('/login')
    }
  } else {
    if (to.path == '/login') {
      next('/home')
    } else {
      next()
    }
  }
})

export default router;
