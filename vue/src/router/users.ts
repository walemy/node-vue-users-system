import { RouteRecordRaw } from "vue-router";
import Index from "@/views/Users/Index.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/users"
  },
  {
    path: "/users",
    name: "UsersList",
    meta: {
      title: "Users",
      requiresAuth: true
    },
    component: Index
  },
  {
    path: "/users/create",
    name: "UserCreate",
    meta: {
      title: "Create user",
      requiresAuth: true
    },
    // route level code-splitting
    // this generates a separate chunk (create.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "create" */ "@/views/Users/Create.vue")
  },
  {
    path: "/users/:id",
    alias: "/users/:id",
    name: "UserShow",
    meta: {
      title: "Show user",
      requiresAuth: true
    },
    component: () => import("@/views/Users/Show.vue")
  },
  {
    path: "/users/:id/edit",
    name: "UserEdit",
    meta: {
      title: "Edit user",
      requiresAuth: true
    },
    component: () => import("@/views/Users/Edit.vue")
  }
];

export default routes;