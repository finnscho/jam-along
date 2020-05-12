import Vue from 'vue'
import App from './App.vue'
import store from './store'
import vuetify from './plugins/vuetify';
import firebase from 'firebase';
import router from './router'
const fb = require('./firebaseConfig.js');

Vue.config.productionTip = false
Vue.filter('kb', val => {
  return Math.floor(val / 1024);
});

let app
fb.auth.onAuthStateChanged(user => {
  if (!app) {
    app = new Vue({
      el: '#app',
      router,
      store,
      vuetify,
      render: h => h(App)
    }).$mount('#app')
  }
})
