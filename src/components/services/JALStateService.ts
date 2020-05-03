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
  //@ts-ignore
  //JSON.parse(sessionStorage.getItem("JamAlong"));
  const newBlob = new Blob([sessionStorage.getItem("JamAlong")], { type: 'application/json;' });
  const filename = `jam-along-${new Date().getTime()}.json`;
  saveAs(newBlob, filename);
  sessionStorage.clear();



    // const state = cloneDeep(store.state);
    // delete state.app;
    // delete state.route;
    // const newBlob = new Blob([JSON.stringify(store.state)], { type: 'application/json;' });
    // const filename = `chaptr-${new Date().getTime()}.json`;
    // saveAs(newBlob, filename);


    // let cache: any[] = [];
   // const c = store.state.activePlayer.recordedData;
    

//     const s = JSON.stringify(store.state
//       , (key, value) => {
//       if (typeof value === 'object') {
        
//         if(value.arrayBuffer !== undefined){

//     //       var arrayBuffer = value.arrayBuffer // Note: not oReq.responseText
//     //       if (arrayBuffer) {
//     //         var byteArray = new Uint8Array(arrayBuffer);
//     //         value = byteArray;
//     //         // for (var i = 0; i < byteArray.byteLength; i++) {
//     //         //   // do something with each byte in the array
//     //         // }
//     //       }

//     const reader = new FileReader();

//     // The magic always begins after the Blob is successfully loaded
//       reader.onload = function () {
//         // Since it contains the Data URI, we should remove the prefix and keep only Base64 string
//         //@ts-ignore
//         const b64 = reader.result.replace(/^data:.+;base64,/, '');
//         console.log(b64); //-> "V2VsY29tZSB0byA8Yj5iYXNlNjQuZ3VydTwvYj4h"



//         const i = JALStateService.prototype.convertBase64ToBlob(b64);
        
//         // Decode the Base64 string and show result just to make sure that everything is OK
//         const html = atob(b64);
//         console.log(html); //-> "Welcome to <b>base64.guru</b>!"
//       };

//       // Since everything is set up, let’s read the Blob and store the result as Data URI
//       reader.readAsDataURL(value);





//           // let process = false;
//           // const reader = new FileReader();
//           // reader.onload = function(event){
//           //   console.log(JSON.stringify(reader.result));
//           //   process = true;
//           //   value = JSON.stringify(reader.result);
//           // };
//           // reader.readAsText(value);
  
//         }
//       // }






//         // Duplicate reference found, discard key
//         if (cache.includes(value)) return;

//         // Store value in our collection
//         cache.push(value);
//        }

//       return value;
//     })
//       const newBlob = new Blob([s], { type: 'application/json;' });
//     const filename = `jam-along-${new Date().getTime()}.json`;
//     saveAs(newBlob, filename);
//     cache = [];

// // Note: cache should not be re-used by repeated calls to JSON.stringify.
    
   
//     //cache = null;




  }

  loadState(files: any) {
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