import Vue from 'vue';
import Vuex from 'vuex';
import VideoJSRecord from '../components/videoRecorder/VideoJSRecord.vue'

const fb = require('../firebaseConfig');
Vue.use(Vuex);

export class Child {
  id: string;
  src: any;

  constructor(id, src) {
    this.id = id;
    this.src = src;
  }
}
export default new Vuex.Store({

  state: {
    // videos: Array<Blob>(),
    children: Array<Child>(),
    // eslint-disable-next-line
    players: Array<VideoJSRecord>(),
    activePlayer: VideoJSRecord,
    currentUser: null,
    userProfile: {}
  },

  mutations: {
    setCurrentUser(state, val) {
      state.currentUser = val
    },
    setUserProfile(state, val) {
      state.userProfile = val
    },

    // addVideo (state, n: Blob) {

    //   state.videos.push(n);
    // },
    addPlayer(state, n: any) {

      state.players.push(n);
    },
    activePlayer(state, n: any) {

      state.activePlayer = n;
    },
    addChildren(state, n: any) {
      //@ts-ignore
      state.children.push(n);
    },
    removeChildren(state, n: any) {

      for (let i = 0; i < state.children.length; i++) {
        if (state.children[i].id === n) {
          state.children.splice(i, 1);
        }
      }

      //@ts-ignore
      for (let j = 0; j < state.players.length; j++) {
        //@ts-ignore
        if (state.players[j].id === n) {
          state.players.splice(j, 1);
        }
      }

    }
  },
  actions: {
    fetchUserProfile({ commit, state }) {
      //@ts-ignore
      fb.usersCollection.doc(state.currentUser?.uid).get().then(res => {
        commit('setUserProfile', res.data())
      }).catch(err => {
        console.log(err)
      })
    }
  }
})
