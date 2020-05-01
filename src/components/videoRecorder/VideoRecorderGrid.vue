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
          <v-icon color="orange">mdi-download</v-icon>
        </v-btn>
        <v-btn
          v-on:click="children.push('Hallo')"
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
        <!-- 
<div class="grid-container grid-container--fit">
  <div class="grid-element">
    1
  </div>
  <div class="grid-element">
    2
  </div>
  <div class="grid-element">
    3
  </div>
  <div class="grid-element">
    4
  </div>
  <div class="grid-element">
    5
  </div>
  <div class="grid-element">
    6
  </div>
  <div class="grid-element">
    7
  </div>
</div> -->

        <v-row>
          <v-col>
            <v-row>
              <v-col
                height:200px
                v-for="n in children"
                :key="n"
                cols="6"
                md="5"
              >
                <div id="app" v-cloak @drop.prevent="addFile" @dragover.prevent>
                  <video-js-recorder />
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
  slider: number;
  recording = false;
  

  constructor(params) {
    super(params);
    this.children = ["Gustav"];
    this.files = [];
    this.data = [];
    this.slider = 0;
   
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
  // public addPlayer(){

  // alert('')
  // //   const ComponentClass = Vue.extend(VideoJSRecord)

  // // const componentInstance = new Vue( Object.assign({}, VideoJSRecord))
  //   this.children.push({nam:'Hallo'});
  // }

  record() {
    const recorder = store?.state?.activePlayer?.record();
    if (!recorder.isRecording()) {
      recorder.start();
      this.recording = true;
    } else {
      recorder.stop();
      this.recording = false;
    }
  }
  public click() {
    store.state.players.forEach((element) => {
      // if(element.recordedData !== undefined)
      {
        console.log("play");
        element.play();
      }
    });
  }
  public pause() {
    store.state.players.forEach((element) => {
      // if(element.recordedData !== undefined)
      {
        console.log("pause");
        element.pause();
      }
    });
  }
  public stop() {
    store.state.players.forEach((element) => {
      // if(element.recordedData !== undefined)
      {
        console.log("stop");
        element.stop();
      }
    });
  }
  public save() {

 console.log('FFMPEG:')
   const service = new JalffmpegService()
    

    let i = 1;
    const data: any[] = [];
    
    store.state.players.forEach((element) => {

      data.push(element);
    
      if (element.record() !== undefined) {
        console.log("save");
      //element.record().saveAs({ video: "video" + i + ".webm" });
        i++;
      }
    });
    service.mergeVideos(data);

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
