import store, { Child } from "../../store";
import { saveAs } from 'file-saver';
import VideoJSRecord from "../videoRecorder/VideoJSRecord.vue"
import { JALVideo, JALUser, JALProject } from "../models/models"


import firebase from 'firebase';
export default class JALStateService {



  writeUserData(userId, videos: Array<JALVideo>, projectid: string, name) {
    firebase.database().ref('project/' + projectid).set({
      projectid: projectid,
      name: name,
      userid: userId,
      videos: videos
    });


    firebase.database().ref('users/' + userId + '/projects').push(
      projectid,
      err => console.log(err ? 'error while pushing' : 'successful push')
    )
    // const ref = firebase.database().ref('users/' + userId + '/projects');
    // ref.on('value', function (snapshot) {
    //   list = snapshot.val() as Array<string>;
    //   snapshot.val().projects != undefined ? list.push(projectid) : list = [projectid]
    //   ref.set(list);

    // })
    // ref.update({
    //   userId: userId,
    //   projects: { list }
    // });
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
    const videos = new Array<JALVideo>();
    store.state.players.forEach((element: VideoJSRecord) => {

      const metadata = {
        contentType: 'video/webm',
      };
      //@ts-ignore  
      const storageRef = firebase.storage().ref(`${element.id}`).put(element.player.recordedData, metadata);
      storageRef.on(`state_changed`, snapshot => null, error => { console.log(error.message) },
        () => {

          storageRef.snapshot.ref.getDownloadURL().then((url) => {
            //@ts-ignore
            videos.push(new JALVideo(url, element.slider, element.id))

            this.writeUserData(firebase.auth().currentUser?.uid, videos, projectid, projetName)
          });
        }
      );

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

    const projectRef = firebase.database().ref('project/' + store.state.activeProject);
    projectRef.on('value', function (snapshot) {

   
      snapshot.val().videos.forEach((element: JALVideo) => {

        try {

          store.commit("addChildren", new Child(element.id, element.videourl));

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
    })
  }
}