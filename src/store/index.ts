import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {videos: Array<Blob>()},
  mutations: {
    addVideo (state, n: Blob) {
      alert('add Video')
      state.videos.push(n);
    }
  },
},)
