import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import("@/modules/home/Home.vue"),
    },

    {
      path: '/projects/:key',
      name: 'project-detail',
      component: () => import("@/modules/projects/Project.vue"),
    },

    {
      path: '/projects',
      name: 'projects',
      component: () => import("@/modules/projects/Projects.vue"),
    },


    {
      path: '/settings',
      name: 'settings',
      component: () => import("@/modules/settings/Settings.vue")
    },

    // another.
    {
      path: "*",
      redirect: "/"
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    // },
  ],
});
