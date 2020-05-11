import Vue from 'vue'
import App from './App.vue'
import store from './store'
import vuetify from './plugins/vuetify';
import firebase from 'firebase';
import router from './router'

const firebaseConfig = {
  apiKey: "AIzaSyDBIKhTYn7oY1Nwmv8YfqNOfLDBWuH6sTE",
  authDomain: "jam-along-1ec4d.firebaseapp.com",
  databaseURL: "https://jam-along-1ec4d.firebaseio.com",
  projectId: "jam-along-1ec4d",
  storageBucket: "jam-along-1ec4d.appspot.com",
  messagingSenderId: "920694412221",
  appId: "1:920694412221:web:dfa848268d37308418f8d4",
  measurementId: "G-7CR6HV95ML"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

Vue.config.productionTip = false
Vue.filter('kb', val => {
  return Math.floor(val / 1024);
});
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
