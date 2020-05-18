
import { GridVideo } from './../../store/index';
import store, { Child } from "../../store";
import { saveAs } from 'file-saver';
import VideoJSRecord from "../videoRecorder/VideoJSRecord.vue"
import { JALVideo, JALUser, JALProject } from "../models/models"


import firebase from 'firebase';
export default class JALStateService {



  writeUserData(userId, videos: Array<JALVideo>, projectid: string, name) {
    const updates = {};
    updates['project/' + projectid] = {
      name: name,
      userid: userId,
      videos: videos
    };
    updates['users/' + userId + '/projects/' + projectid] = {
      projectid: projectid, name: name
    }


    firebase.database().ref().update(updates);



  }

  createProject(userId, projectid) {
    firebase.database().ref('users/' + userId + '/projects').push(
      projectid,
      err => console.log(err ? 'error while pushing' : 'successful push')
    )
  }

  createUser(userId, email, name, lastname) {
    firebase.database().ref('users/' + userId).set({
      userId: userId,
      email,
      name,
      lastname,
      projects: {}
    });
  }

  saveState(projectid: string, projetName: string) {
    
    const Myvideos = new Array<JALVideo>();

    store.state.players.forEach((element: VideoJSRecord) => {
      let gridVideo: GridVideo;
      store.state.videoGrid.forEach(gridVideoElement => {
        //@ts-ignore
        if (gridVideoElement.id == element.id) {
          gridVideo = gridVideoElement;
        }
      });
      const metadata = {
        contentType: 'video/webm',
      };
      //@ts-ignore  
      if (element.player.src != null && typeof element.player.src == 'string') {
        //@ts-ignore
        Myvideos.push(new JALVideo(element.player.src, element.slider, element.id, gridVideo.x, gridVideo.y, gridVideo.sizeX, gridVideo.sizeY))
        this.writeUserData(firebase.auth().currentUser?.uid, Myvideos, projectid, projetName)

      }
      else {
        //@ts-ignore  
        const storageRef = firebase.storage().ref(`${element.id}`).put(element.player.recordedData, metadata);
        storageRef.on(`state_changed`, snapshot => null, error => { console.log(error.message) },
          () => {

            storageRef.snapshot.ref.getDownloadURL().then((url) => {
              //@ts-ignore
              Myvideos.push(new JALVideo(url, element.slider, element.id, gridVideo.x, gridVideo.y, gridVideo.sizeX, gridVideo.sizeY))

              this.writeUserData(firebase.auth().currentUser?.uid, Myvideos, projectid, projetName)
              // alert('project successfully stored')
            });
          }
        );
      }


    })

    alert('project successfully stored')



  }


  loadState(files: any) {

    const fileReader = new FileReader();
    fileReader.onload = (e: any) => {
      const loadedState = JSON.parse(e.target.result) as Array<JALVideo>;
      store.state.players = [];
      store.state.children = [];
      loadedState.forEach(element => {
        element.videourl
      });

    };
    fileReader.readAsText(files);
  }

  loadUser(userid) {
    const projectRef = firebase.database().ref('users/' + userid);
    projectRef.on('value', function (snapshot) {

      store.commit("setUser", snapshot.val());

    })
  }
  loadProject() {
    //@ts-ignore
    const projectRef = firebase.database().ref('project/' + store.state.activeProject.projectid);

    projectRef.once('value').then(function (snapshot) {

      if (snapshot.val().videos !== undefined) {
        snapshot.val().videos.forEach((element) => {

          try {
      

              store.commit("addVideoToGrid",element);

          }
          catch (error) {
            alert('error');
            // A full list of error codes is available at
            // https://firebase.google.com/docs/storage/web/handle-errors
            switch (error.code) {
              case 'storage/object-not-found':
                // File doesn't exist
                break;

              case 'storage/unauthorized':
                // User doesn't have permission to access the object
                break;

              case 'storage/canceled':
                // User canceled the upload
                break;
              case 'storage/unknown':
                // Unknown error occurred, inspect the server response
                break;
            }
          }
        });
      }
    })
  }
}