import { createRouter, createWebHistory } from "vue-router";

import NProgress from "nprogress/nprogress.js";
import { useAuthStore } from "@/stores/authStore";
import DashboardView from "@/views/backend/DashboardView.vue";

import SignIn3View from "@/views/auth/SignIn3View.vue";
import error400 from "@/views/errors/400View.vue";
import error401 from "@/views/errors/401View.vue";
import error403 from "@/views/errors/403View.vue";
import error404 from "@/views/errors/404View.vue";
import error500 from "@/views/errors/500View.vue";
import error503 from "@/views/errors/503View.vue";
import layoutSimple from "@/layouts/variations/Simple.vue";
import layoutsBackend from "@/layouts/variations/Backend.vue";
import BannersView from "@/views/backend/BannersView.vue";
import LatestnewsView from "@/views/backend/LatestnewsView.vue";
import ForgotPasswordView from "@/views/auth/ForgotPasswordView.vue";

const requireAuth = (to , from, next ) => {
  const useAuth = useAuthStore();
  // const token = localStorage.getItem("token");
  if (useAuth.user.isAuthenticated) 
    {
    console.log("Authenticated", useAuth.user.isAuthenticated);
    next(); // allow to enter route
  } else {
    next({ name: "auth-signin3" }); // go to '/signin';
  }
};

const ifAuthenticated = (to, from, next) => {
const useAuth = useAuthStore();

  // const token = localStorage.getItem("token");
  if (useAuth.user.isAuthenticated) {
    next({ name: "dashboard" }); // redirect to dashboard if logged in
  } else {
    next(); // allow to enter route
  }
};


// Set all routes

const routes = [
  //dashboard routes
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/",
    component: layoutsBackend,
    children: [
      {
        path: "home",
        name: "dashboard",
        component: DashboardView,
        beforeEnter: requireAuth, // this is the guard
      },
      // tables (helpers) routes
      {
        path: "banner",
        name: "banners",
        component: BannersView,
        beforeEnter: requireAuth, // this is the guard
      },
      {
        path:"latestnews",
        name:"latestnews",
        component:LatestnewsView,
        beforeEnter: requireAuth,
      }
    ],
  },

  //auth routes
  {
    path: "/signin",
    name: "auth-signin3",
    component: SignIn3View,
    beforeEnter: ifAuthenticated 
  },

  {
path: "/forgotpassword",
name: "forgotpassword",
component: ForgotPasswordView,
beforeEnter: ifAuthenticated 
  },

  //  errors routes
  {
    path: "/errors",
    component: layoutSimple,
    children: [
      {
        path: "error400",
        name: "error400",
        component: error400,
      },
      {
        path: "error401",
        name: "400",
        component: error401,
      },

      {
        path: "error403",
        name: "403",
        component: error403,
      },
      {
        path: "/:pathMatch(.*)*",
        name: "404",
        component: error404,
      },
      {
        path: "error500",
        name: "500",
        component: error500,
      },
      {
        path: "error503",
        name: "503",
        component: error503,
      },
    ],
  },
];

// Create Router
const router = createRouter({
  history: createWebHistory(),
  linkActiveClass: "active",
  linkExactActiveClass: "",
  scrollBehavior() {
    return { left: 0, top: 0 };
  },
  routes,
});

// NProgress
/*eslint-disable no-unused-vars*/
NProgress.configure({ showSpinner: false });

router.beforeResolve((to, from, next) => {
  if (to.name) {
    NProgress.start();
  }

  next();
});

router.afterEach(() => {
  NProgress.done();
});
/*eslint-enable no-unused-vars*/

export default router;
