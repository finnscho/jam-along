import store from "../../store";
import { saveAs } from 'file-saver';
import VideoJSRecord from "../videoRecorder/VideoJSRecord.vue"
import {JALVideo} from "../models/models"



export default class JALStateService {



  saveState() {
    const projectData: Array<JALVideo> = new Array<JALVideo>();
    store.state.players.forEach((element) => {
      //@ts-ignore
      let slider = store.state.activePlayer.slider;
      const videoElement = element as VideoJSRecord;
      //@ts-ignore
      if(videoElement.id != store.state.activePlayer.id)
      {
        //@ts-ignore
        slider = videoElement.slider;
      }
      //@ts-ignore
      const video: JALVideo = new JALVideo("./assets/video1.webm",slider);

      projectData.push(video)
      
    });
    //@ts-ignore
    const newBlob = new Blob([JSON.stringify(projectData)], { type: 'application/json;' });
    const filename = `jam-along-${new Date().getTime()}.json`;
    saveAs(newBlob, filename);


  }

  loadState(files: any) {
    //sessionStorage.
    // this.$refs.fileupload.click();
    // this.$refs.fileupload.addEventListener('change', () => {
    //   const files = this.$refs.fileupload.files;
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
  //   async shareState() {
  //     try {
  //       const res = await HttpService.post('/upload', this.$store.state);
  //       addNotification({
  //         title: 'Here is your code!',
  //         text: 'Enter the following code on the target device: ' + res.data.code,
  //       });
  //     } catch (e) {
  //       addNotification({
  //         title: 'Something went wrong!',
  //         text: 'Please try again!',
  //       });
  //     }
  //   },
  //   async loadStateFromServer(code: string) {
  //     console.log(code);
  //     try {
  //       const res = await HttpService.get(`/share/${code}`);
  //       this.replaceState(res.data.content);
  //       addNotification({
  //         title: 'Stories restored!',
  //         text: 'Your stories are now transferred',
  //       });
  //       this.show = false;
  //     } catch (e) {
  //       addNotification({
  //         title: 'Code is not valid!',
  //         text: 'Stories can not be restored, please try again.',
  //       });
  //     }
  //   },
}