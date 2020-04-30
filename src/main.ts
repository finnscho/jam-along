import Vue from 'vue'
import App from './App.vue'
import store from './store'
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false
Vue.filter('kb', val => {
  return Math.floor(val/1024);  
});
new Vue({
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
