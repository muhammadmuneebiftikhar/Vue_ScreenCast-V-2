import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import VideoWatch from "../views/VideoWatch.vue";
import AdminVideoCreate from "../views/AdminVideoCreate.vue";
import AdminVideoList from "../views/AdminVideoList.vue";
import AdminVideoEdit from "../views/AdminVideoEdit.vue";
import AdminUserList from "../views/AdminUserList.vue";
import UserLogin from "../views/UserLogin.vue";
import UserRegisteration from "../views/UserRegisteration.vue";
import Admin from "../views/Admin.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/admin",
    name: "home",
    component: Admin,
    beforeEnter(to, from, next){
      let currentUser = JSON.parse(window.localStorage.currentUser);
      if(currentUser && currentUser.admin){
        next();
      }
      else{
        next("/");
      }
    },
    children: [
      {
        path: "videos",
        name: "admin-video-list",
        component: AdminVideoList,
      },  
      {
        path: "users",
        name: "admin-user-list",
        component: AdminUserList,
      },  
      {
        path: "videos/:_id/edit",
        name: "admin-video-edit",
        component: AdminVideoEdit,
        params: true,
      }, 
      {
        path: "video/new",
        name: "admin-video-create",
        component: AdminVideoCreate
      },
    ]
  },
  {
    path: "/login",
    name: "user-login",
    component: UserLogin,
  },
  {
    path: "/registeration",
    name: "user-registeration",
    component: UserRegisteration,
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
  {
    path: "/video/:_id",
    name: "video-watch",
    component: VideoWatch,
    params: true,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
