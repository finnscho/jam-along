<template>
  <v-container v-on:click="activate">
    <div id="app" v-cloak @drop.prevent="addFile" @dragover.prevent>
      <video
        :id="id"
        class="video-js vjs-layout-large"
        v-bind:style="isActive() ? 'border: dashed;' : ''"
        playsinline
        controls
        preload="auto"
      ></video>

    </div>      
  </v-container>
</template>



<script>
import  "../../../node_modules/videojs-wavesurfer/dist/videojs.wavesurfer.min.js"
import  "../../../node_modules/videojs-wavesurfer/dist/css/videojs.wavesurfer.css"
import "../../../node_modules/video.js/dist/video.min.js"
import waveSurfer from "../../../node_modules/wavesurfer.js/dist/wavesurfer.min.js"
import "video.js/dist/video-js.css";
import "videojs-record/dist/css/videojs.record.css";
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import "webrtc-adapter";
import RecordRTC from "recordrtc";

import videojs from "video.js";
// eslint-disable-next-line
import Record from "videojs-record/dist/videojs.record.js";
import "videojs-offset";

import store from "@/store";

@Component()
export default class VideoJSRecord extends Vue {
@Prop()id;
@Prop()active;
  data() {
    return {
      src: {},
      min: 0,
      max: 3000,
      slider: 0,
     
      player: "",
      options: {
        controls: false,
        autoplay: false,
        fluid: true,
        responsive: true,
        loop: false,
        width: 1920,
        height: 1080,
        controlBar: {
          volumePanel: true,
          seeking: true,
        },
        plugins: {
          // configure videojs-record plugin
          record: {
            audio: true,
           
            maxLength: 500,
            debug: true,
            video: {
                // video media constraints: set resolution of camera
                width: 1920,
                height: 1080
            },
          },
          wavesurfer: {

           
           
            barHeight:100,
            debug: true,
            waveColor: 'orange',
            progressColor: 'orangered',
            cursorColor: 'yellow',
             container: '.waveform',
            hideScrollbar: true
            }

        },
      },
    };
  }
    isActive(){
  
    return store.state.activePlayer == this.player;
  }
  created() {
    this.$root.$refs.A = this;
  }
  mounted() {
    //  this.myid = '234'// + (Math.floor(Math.random() * Math.floor(100)))
    /* eslint-disable no-console */
    this.player = videojs("#" + this.id, this.options, () => {
      // print version information at startup
      const msg ='Using video.js '+ videojs.VERSION +
        ' with videojs-wavesurfer ' +
        videojs.getPluginVersion('wavesurfer') +
        ' and wavesurfer.js ' + waveSurfer.VERSION;
      videojs.log(msg);
    });

this.player.width = 1920;
this.player.height = 1080;
    store.commit("addPlayer", this);
    try {
      this.player.record().getDevice();
    } catch {
      alert("fehler");
    }

    // device is ready
    this.player.on("deviceReady", () => {
      console.log("device is ready!");
    });

    // user clicked the record button and started recording
    this.player.on("startRecord", () => {
      const x = new Date().getTime();
      console.log("time x : " + x.toString());
      store.state.players.forEach((element) => {
        //if(element.recordedData !== undefined)
        {
          console.log("play");
          element.player.play();
        }
      });
      const y = new Date().getTime();
      console.log("time y : " + y.toString());
      this.slider = y - x;
      console.log("offset: " + this.slider.toString());
    });

    // user completed recording and stream is available
    this.player.on("finishRecord", () => {
      this.player.wavesurfer().load(this.player.recordedData)
  //   const wavesurfer = waveSurfer.create({
  //       container: '#waveform',
        
  //       waveColor: '#A8DBA8',
  // progressColor: '#3B8686',
  // backend: 'MediaElement',
  // scrollParent: true,
  //   });
//     const mediaElt = document.querySelector('video');

// wavesurfer.load(mediaElt);

      // this.player.options.plugins.push(        {wavesurfer: {
      //       backend: 'MediaElement',
      //       msDisplayMax: 10,
      //       debug: true,
      //       waveColor: 'green',
      //       progressColor: 'blue',
      //       cursorColor: 'red',
      //       hideScrollbar: true,}})
      // the blob object contains the recorded data that
      // can be downloaded by the user, stored on server etc.
      console.log("finished recording: ", this.player.recordedData);
      // store.commit("addVideo", this.player.recordedData);
    });

    // error handling
    this.player.on("error", (element, error) => {
      console.warn(error);
    });

    this.player.on("deviceError", () => {
      console.error("device error:", this.player.deviceErrorCode);
    });
  }

  addFile(e) {
    const droppedFiles = e.dataTransfer.files;

    if (!droppedFiles) return;
    // this tip, convert FileList to array, credit: https://www.smashingmagazine.com/2018/01/drag-drop-file-uploader-vanilla-js/
    [...droppedFiles].forEach((f) => {
      const reader = new FileReader();
      reader.onload = this.loadData;
      reader.addEventListener(
        "load",
        function() {
          // convert image file to base64 string
          const preview = document.querySelector("video");
          preview.src = reader.result;
          // this.player.record().getDevice();
          const css = document.createElement("style");
          css.type = "text/css";
          css.setAttributeNode(document.createAttribute("scopped"));
          css.appendChild(
            document.createTextNode(
              ".vjs-record .vjs-device-button.vjs-control{display:none}"
            )
          );
          this.$el.appendChild(css);
        },
        false
      );
      reader.readAsDataURL(f);
      this.files.push(f);
    });
  }
  loadData(e2) {
    if (e2 !== null && e2.target !== null) {
      // finished reading file data.
      this.src = e2.target.result;
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
style(){
  alert('')
  return store.state.activePlayer == this.player ? 'border: dashed;' : ''
  
}
  activate() {
    store.commit("activePlayer", this.player);
  }

  // ync(action, target, param, callback) {
  //             this.me = this,
  //             this.offset = (this.context.currentTime - target.startTime) % target.buffer.duration;
  //             const time = target.buffer.duration - this.offset;
  //             console.log('player.sync', this.context.currentTime + this.time, action);
  //             if (this.syncTimer) {
  //             window.clearTimeout(this.syncTimer);
  //             }
  //             this.syncTimer = window.setTimeout(function() {
  //             const returned = this.me[action](param);
  //             if (callback) {
  //                 callback(returned);
  //             }
  //             }, time * 1000);
  //         }
  //     }
  beforeDestroy() {
    if (this.player) {
      this.player.dispose();
    }
  }
}
</script>

<style>
.video-js .vjs-control-bar {
  display: none !important;
}
.video-js .vjs-tech {
  /* height:1000px;
  width: 1000px; */
}
</style>
