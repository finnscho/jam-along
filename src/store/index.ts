import Vue from 'vue';
import Vuex from 'vuex';
import videojs from 'video.js'
import VideoJSRecord from '../components/videoRecorder/VideoJSRecord.vue'
import VuexPersistence from 'vuex-persist'
import { saveAs } from 'file-saver';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // videos: Array<Blob>(),
    children: [],
    // eslint-disable-next-line
    players: Array<VideoJSRecord>(),
    activePlayer: VideoJSRecord,
  },

  mutations: {

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

      for (let i = 0; i < state.children.length; i++) { if (state.children[i] === n) { state.children.splice(i, 1); } }

      //@ts-ignore
      for (let i = 0; i < state.players.length; i++) { if (state.players[i].id === n) { state.children.splice(i, 1); } }

    }
  },
  // plugins: [new VuexPersistence({
  //   key:"JamAlong",
  //   storage:sessionStorage,
  //   supportCircular: true,
  //   // restoreState: (key, state )=>{
  //   //   console.log('do nothing');
  //   // },
  //    saveState: (key, state, storage) =>{
  //     // if(state.downloading){
  //       //@ts-ignore
  //     const newBlob = new Blob(JSON.stringify(state), { type: 'application/json;' });
  //     const filename = `jam-along-${new Date().getTime()}.json`;
  //     saveAs(newBlob, filename);
  //     // }

  //    }

  //   //   const newBlob = new Blob([JSON.stringify(state)], { type: 'application/json;' });
  //   //   const filename = `jam-along-${new Date().getTime()}.json`;
  //   //   saveAs(newBlob, filename);}



  //   //   const newBlob = new Blob([state], { type: 'application/json;' });
  //   // const filename = `jam-along-${new Date().getTime()}.json`;
  //   // saveAs(newBlob, filename);

  //   // console.log(state)}
  //   // ,
  // }).plugin]
})
