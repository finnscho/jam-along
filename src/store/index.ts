import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {videos: Array<Blob>(),
    // eslint-disable-next-line
          players: Array()},
  mutations: {
    addVideo (state, n: Blob) {
    
      state.videos.push(n);
    },
    addPlayer (state, n: any) {
    
      state.players.push(n);
    }
  },
},)
