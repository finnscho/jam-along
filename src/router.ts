import firebase from 'firebase';
import Vue from 'vue';
import Router from 'vue-router';

import Home from '@/views/Home.vue';
import Login from '@/views/Login.vue';
import SignUp from '@/views/SignUp.vue';
import Disclaimer from '@/views/Disclaimer.vue';
import RecorderApp from './views/RecorderApp.vue';
import store from './store';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '*',
      redirect: '/login',
    },
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/sign-up',
      name: 'SignUp',
      component: SignUp,
    },

    {
      path: '/home',
      name: 'Home',
      component: Home,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/RecorderApp',
      name: 'RecorderApp',
      component: RecorderApp,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/disclaimer',
      name: 'Disclaimer',
      component: Disclaimer,
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.fullPath == '/disclaimer') {
    next();
    return;
  }
  const currentUser = firebase.auth().currentUser;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !currentUser) {
    store.commit('setNextUrl', to.fullPath);
    next({
      path: 'login',
    });
  } else if (!requiresAuth && currentUser) next('home');
  else {
    store.commit('setNextUrl', '');
    next();
  }
});

export default router;
