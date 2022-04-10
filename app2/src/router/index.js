import Vue from "vue";
import VueRouter from "vue-router";
import Router from "vue-router";
import Home from "../views/HomeView.vue";

// This prevents an error when trying to route to the same path that we're already on.
// See here: https://github.com/vuejs/vue-router/issues/2881#issuecomment-520554378
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalPush.call(this, location, onResolve, onReject);
  return originalPush.call(this, location).catch((err) => {
    if (Router.isNavigationFailure(err)) {
      // resolve err
      return err;
    }
    // rethrow error
    return Promise.reject(err);
  });
};

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "HomeView",
    component: Home,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
