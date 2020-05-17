import { JALUser, JALProject } from './../components/models/models';
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

export class GridVideo {
  x: number;
  y: number;
  id: string;
  sizeX: number;
  lastX: number;
  lastY: number
  sizeY: number;
  constructor(id, x, y,sizeX,sizeY) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.sizeX = sizeX;
    this.sizeY = sizeY;
    this.lastX = x,
      this.lastY= y

  }
}
export default new Vuex.Store({

  state: {
    // videos: Array<Blob>(),
    children: Array<Child>(),
    // eslint-disable-next-line
    players: Array<VideoJSRecord>(),
    activePlayer: VideoJSRecord,
    userProfile: {} as JALUser,
    activeProject: '',
    activeProjectName: '',
    projects: Array<any>(),
    videoGrid: Array<GridVideo>()
  },

  mutations: {
    setUser(state, val: JALUser) {
      state.userProfile = val
    },

    updateGridVideo(state, video) {

      
      for (let i = 0; i < state.videoGrid.length; i++) {
        if (state.videoGrid[i].id === video.id) {
          state.videoGrid.splice(i, 1);
        }
      }
      // state.videoGrid.forEach(element => {
      //   if (element.id == video.id) {
      //     element.x = video.x;
      //     element.y = video.y;
      //     element.sizeX = video.sizeX;
      //     element.sizeY = video.sizeY;
      //   }})
      
      state.videoGrid.push(video)
        
      },
    
    addVideoToGrid(state, video) {
      state.videoGrid.push(video)
    },
    setProject(state, val) {
      state.activeProject = val
    },
    setProjectName(state, val) {
      state.activeProjectName = val
    },
    addProject(state, val: any) {
      state.projects.push({ name: val.name, projectid: val.projectid, userid: val.userid});
    },
    // addVideo (state, n: Blob) {

    //   state.videos.push(n);
    // },
    addPlayer(state, n: any) {

      state.players.push(n);
    },
    resetChildren(state) {
      state.players = Array<VideoJSRecord>();
      state.children = new Array<Child>();
    },
    activePlayer(state, n: any) {

      state.activePlayer = n;
    },
    addChildren(state, n: any) {

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
    },

  }
})
