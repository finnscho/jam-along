<template>
  <v-container style="padding-top='5%'" fluid>
    <v-layout>
      <v-app-bar fixed dense style="vertical-align: bottom;">
        <v-btn v-on:click="record">
          <v-icon v-bind:color="recording ? 'red' : 'orange'"
            >mdi-record</v-icon
          >
        </v-btn>
        <v-btn v-on:click="click">
          <v-icon color="orange">mdi-play</v-icon>
        </v-btn>
        <v-btn v-on:click="pause">
          <v-icon color="orange">mdi-pause</v-icon>
        </v-btn>
        <v-btn v-on:click="stop">
          <v-icon color="orange">mdi-stop</v-icon>
        </v-btn>
        <v-btn v-on:click="save" style="margin-left:50px">
          <v-icon color="orange" v-if="downloading == false">mdi-download</v-icon>
          <v-progress-circular
          v-if="downloading == true"
        :width="3"
        color="orange"
        indeterminate
      ></v-progress-circular>
        </v-btn>

           
        <v-btn
          v-on:click="addPlayer"
          v-on:mouseover="mouseoverAddBtn"
          v-on:mouseleave="mouseleaveAddBtn"
        >
          <v-icon color="orange">mdi-view-grid-plus-outline</v-icon>
        </v-btn>

        <v-card-text>
          <label>offset</label>
          <v-row>
            <v-col class="pr-4">
              <v-slider
                v-model="slider"
                class="align-center"
                style="margin-bottom:2%;"
                max=3000
              >
                <template v-slot:append>
                  <v-text-field
                    v-model="slider"
                    thumb-label
                    class="mt-0 pt-0"
                    hide-details
                    single-line
                    type="number"
                    style="width: 60px"
                  ></v-text-field>
                </template>
              </v-slider>
            </v-col>
          </v-row>
        </v-card-text>

        <v-btn v-on:click="setOffset" margin="auto"
          ><v-icon color="orange">mdi-pokeball</v-icon></v-btn
        >
      </v-app-bar>

      <!-- <v-card :style="{background-color: bulkselected?'primary':'black'}" > -->
      <v-card class="maincard" width="100%" height="50%" style="padding:2%; ">
        
        <v-row>
          <v-col>
            <v-row style="padding-top: 5%;padding-left: 10%;">
              <v-col
                 height:200px
                padding-top=10%
                v-for="n in children"
                :key="n"
                cols="6"
                md="5"
              >
                <div id="app" v-cloak @drop.prevent="addFile" @dragover.prevent>
                  <video-js-recorder
                    v-bind:id="n"
                  />
                </div>
              </v-col>
              <v-col height:200px cols="6" md="5">
                <div id="app" v-cloak @drop.prevent="addFile" @dragover.prevent>
                  <video
                    playsinline
                    controls muted
                    style="display:none"
                    preload="auto"
                    id="output"
                  ></video>
                </div>
              </v-col>

              <v-col>
                <div v-if="hover">
                  <div
                    padding="10%"
                    style="width:560px;height:420px;border-style: dashed;border-color: orange;"
                  >
                    <v-icon color="orange">mdi-music-box-multiple</v-icon>
                  </div>
                </div>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card>
      <!-- <v v-bind:id="'output'"/> -->
    </v-layout>
  </v-container>
</template>
<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import VideoJSRecord from "./VideoJSRecord.vue";
import store from "../../store";
import { VideoStreamMerger } from "video-stream-merger";
import "videojs-offset";
import JalffmpegService  from "../services/ffmpegService";
import videojs from "video.js";
@Component({
  components: {
    "video-js-recorder": VideoJSRecord,
  },
})
export default class VideoRecorderGrid extends Vue {
  children: any;
  files: any;
  data: any;
  hover = false;
  downloading = false;
  slider: number;
  recording = false;
  mediaRecorder: MediaRecorder =  null;
 service = new JalffmpegService();
 recordedChunks: any[]

  constructor(params) {
    super(params);
    this.children = ["Gustav"];
    this.files = [];
    this.data = [];
    this.slider = 0;
    this.recordedChunks = []

  }

  addFile(e) {
    const droppedFiles = e.dataTransfer.files;

    if (!droppedFiles) return;
    // this tip, convert FileList to array, credit: https://www.smashingmagazine.com/2018/01/drag-drop-file-uploader-vanilla-js/
    [...droppedFiles].forEach((f) => {
      const reader = new FileReader();

      reader.onload = this.loadData;

      reader.readAsDataURL(f);
      this.files.push(f);
    });
  }
  loadData(e2) {
    if (e2 !== null && e2.target !== null) {
      // finished reading file data.
      alert(e2?.target.result);
      this.data.push(e2.target.result);
      // var img = document.createElement('img');
      // img.src= e2.target.result;
      // document.body.appendChild(img);
    }
  }
  removeFile(file) {
    this.files = this.files.filter((f) => {
      return f != file;
    });
  }
  setOffset() {
    console.log("offset: " + this.slider / 1000);
    store.state.activePlayer.offset({
      start: this.slider / 1000,
      //Should the video go to the beginning when it ends
    });
  }
  mouseoverAddBtn() {
    this.hover = true;
  }
  mouseleaveAddBtn() {
    this.hover = false;
  }

  refreshMergedStream(){

    console.log('Try to refresh merged Stream:');


    let i = 1;
    const data: any[] = [];

    store.state.players.forEach((element) => {

      data.push(element.player);

      if (element.player.record() !== undefined) {
        console.log("save");
      //element.record().saveAs({ video: "video" + i + ".webm" });
        i++;
      }
    });

    const stream = this.service.mergeVideos(data);
    console.log(stream);

    const recordedChunks = [];
    const  options = { mimeType: "video/webm; codecs=vp9" };
     this.mediaRecorder= new MediaRecorder(stream, options);
    store.state.players.forEach(element => {

       const  oldPlayer = document.getElementById(element.id);
       //Todo dispose
     //  oldPlayer.muted = true;
        // videojs(oldPlayer).dispose();
  });
  }
  public addPlayer(){

  this.children.push('JALvideojs' +Date.now());
  this.mediaRecorder  = null;
  }



  record() {
   
    
    if(this.mediaRecorder != null)
    {
      if(this.recording != true){
        this.mediaRecorder.ondataavailable = this.handleDataAvailable;
        this.mediaRecorder?.start();
        this.recording = true;
        this.click();

      }
      else
      {
        this.mediaRecorder?.stop();
        this.recording = false;
      }
    }
    else
    {
    let recorder: any;
    if(this.service.player != undefined){recorder = this.service.player.record()}
    else
    {
      recorder = store?.state?.activePlayer?.record();
    }

    if (!recorder.isRecording()) {
      recorder.start();
      this.recording = true;
    } else {
      recorder.stop();
      this.recording = false;
    }
    }

    if(this.recording)
    {
              store.state.players.forEach(element => {
          element.player.on("ended", () => {
            if(this.recording){this.record();}
      });
        });
    }
    
  }
  public click() {
    store.state.players.forEach((element) => {
      // if(element.recordedData !== undefined)
      {
        console.log("play");
        element.player.play();
      }
    });
  }
  public pause() {
    store.state.players.forEach((element) => {
      // if(element.recordedData !== undefined)
      {
        console.log("pause");
        element.player.pause();
      }
    });
  }
  public stop() {
    store.state.players.forEach((element) => {
      // if(element.recordedData !== undefined)
      {
        console.log("stop");
        element.player.stop();
      }
    });
  }
  public save() {
console.log('todoSave')
this.downloading = true;
    this.refreshMergedStream();
    this.record();
}



handleDataAvailable(event) {
  console.log("data-available");
  if (event.data.size > 0) {
    this.recordedChunks.push(event.data);
    console.log(this.recordedChunks);
    this.download();
    this.downloading = false;
  } else {
    // ...
  }
}
 download() {
  const blob = new Blob(this.recordedChunks, {
    type: "video/webm"
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  document.body.appendChild(a);
  //a.style = "display: none";
  a.href = url;
  a.download = "test.webm";
  a.click();
  window.URL.revokeObjectURL(url);
}
}
</script>

<style>
maincard {
  padding: 0px;
}
.maincard {
  padding-top: 25%;
}
.container {
  padding: 0;
}
.col-md-5 {
  /* flex: 0 0 41.6666666667%;
    max-width: 41.6666666667%; */
  padding: 0;
}

.grid-container {
  display: grid;
}
/* .video-js .vjs-tech .active{
  margin: 2px;
  border: dashed;


} */
.grid-container--fill {
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
}

.grid-container--fit {
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
}

/* .center-screen {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%);
} */

.grid-element {
  background-color: deepPink;
  padding: 20px;
  color: #fff;
  border: 1px solid #fff;
}
</style>
