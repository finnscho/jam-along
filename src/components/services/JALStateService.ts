import store from "../../store";
import { saveAs } from 'file-saver';
import { mapActions, mapGetters } from 'vuex';
import cloneDeep from 'lodash/cloneDeep';
import merge from 'lodash/merge';
import VuexPersistence from 'vuex-persist'

export default class JALStateService {

/**
 * Convert BASE64 to BLOB
 * @param Base64Image Pass Base64 image data to convert into the BLOB
 */
private convertBase64ToBlob(Base64Image: any) {
  // Split into two parts
  const parts = Base64Image.split(';base64,');

  // Hold the content type
  const imageType = parts[0].split(':')[1];

  // Decode Base64 string
  const decodedData = window.atob(parts[1]);

  // Create UNIT8ARRAY of size same as row data length
  const uInt8Array = new Uint8Array(decodedData.length);

  // Insert all character code into uInt8Array
  for (let i = 0; i < decodedData.length; ++i) {
      uInt8Array[i] = decodedData.charCodeAt(i);
  }

  // Return BLOB image after conversion
  return new Blob([uInt8Array], { type: imageType });
}





saveState() {

  //saveState()
  //@ts-ignore
  //JSON.parse(sessionStorage.getItem("JamAlong"));
  // const newBlob = new Blob([sessionStorage.getItem("JamAlong")], { type: 'application/json;' });
  // const filename = `jam-along-${new Date().getTime()}.json`;
  // saveAs(newBlob, filename);
  // sessionStorage.clear();



    // const state = cloneDeep(store.state);
    // delete state.app;
    // delete state.route;
    // const newBlob = new Blob([JSON.stringify(store.state)], { type: 'application/json;' });
    // const filename = `chaptr-${new Date().getTime()}.json`;
    // saveAs(newBlob, filename);


    let cache: any[] = [];
   const c = store.state.activePlayer.recordedData;
    

    const s = JSON.stringify(store.state
      , (key, value) => {
        // let process = true;
      if (typeof value === 'object') {
        
       
        if(value instanceof Blob){
  
          // const reader = new FileReader();

          // // let process = false;
          // reader.onload = function(event){
          //   console.log(JSON.stringify(reader.result));

          //   value = JSON.stringify(reader.result);
          //   return value;
          // };
          
          // reader.readAsText(value);
          // process = false;
          return"HERBERT"
            // for (var i = 0; i < byteArray.byteLength; i++) {
            //   // do something with each byte in the array
            // }
          }

        // Duplicate reference found, discard key
        if (cache.includes(value)) return;

        // Store value in our collection
        cache.push(value);
       }
       if(process){
      return value;
       }
    })
      const newBlob = new Blob([s], { type: 'application/json;' });
    const filename = `jam-along-${new Date().getTime()}.json`;
    saveAs(newBlob, filename);
    cache = [];

// // Note: cache should not be re-used by repeated calls to JSON.stringify.
    
   
    //cache = null;




  }

  loadState(files: any) {
    //sessionStorage.
    // this.$refs.fileupload.click();
    // this.$refs.fileupload.addEventListener('change', () => {
    //   const files = this.$refs.fileupload.files;
      const fileReader = new FileReader();
      fileReader.onload = (e: any) => {
        const loadedState = JSON.parse(e.target.result);
        store.replaceState(loadedState);

        
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