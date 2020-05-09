<template>
  <v-container style="padding-top='5%'" fluid>
    <v-layout>
      <v-app-bar fixed dense style="vertical-align: bottom;">
        <!-- <v-file-input accept="image/*" style="color:'orange'" width="5%" @change="onFileChange" label="Projekt öffnen"></v-file-input> -->

        <v-btn
          v-on:click="addPlayer"
          v-on:mouseover="mouseoverAddBtn"
          v-on:mouseleave="mouseleaveAddBtn"
        >
          <v-icon color="orange">mdi-camera-plus</v-icon>
        </v-btn>
        <input
          type="file"
          ref="file"
          style="display: none"
          v-on:change="handleFileUpload()"
        />

        <v-btn @click="$refs.file.click()">
          <v-icon color="orange">mdi-movie-open</v-icon>
        </v-btn>

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
        <v-btn v-on:click="save" style="margin-left:10vw">
          <v-icon color="orange" v-if="downloading == false"
            >mdi-download</v-icon
          >
          <v-progress-circular
            v-if="downloading == true"
            :width="3"
            color="orange"
            indeterminate
          ></v-progress-circular>
        </v-btn>

        <!-- <v-btn v-on:click="saveProject" style="margin-left:50px">
        <v-icon color="orange">mdi-zip-disk</v-icon>
        </v-btn>-->

        <v-btn v-on:click="removePlayer">
          <v-icon color="orange">mdi-delete</v-icon>
        </v-btn>
      </v-app-bar>
      <v-card id="myCard" style="margin-top: 8vh;">
        <v-row id="VideoRow">
          <v-col
            v-for="n in this.$store.state.children"
            :key="n.id"
            v-bind:md="{ getColMd }"
          >
            <div
              id="addFile"
              centered
              v-bind:style="{ width: videoWidth }"
              v-cloak
              @drop.prevent="addFile"
              @dragover.prevent
            >
              <video-js-recorder v-bind:id="n.id" v-bind:src="n.src" />
            </div>
          </v-col>
          <v-col cols="1" md="6">
            <div id="blib" v-cloak @drop.prevent="addFile" @dragover.prevent>
              <video
                playsinline
                controls
                muted
                style="display:none"
                preload="auto"
                id="output"
              ></video>
            </div>
          </v-col>
        </v-row>
      </v-card>
      <!-- <v-card :style="{background-color: bulkselected?'primary':'black'}" > -->
      <!-- <v-card class="maincard" width="100%" height="100%" style="padding:2%; ">
        <v-row>
          <v-col>
            <v-row>
              <v-col
                height:200px
                padding-top="10%"
                v-for="n in this.$store.state.children"
                :key="n"
                cols="6"
                md="5"
              >
                <div id="app" v-cloak @drop.prevent="addFile" @dragover.prevent>
                  <video-js-recorder v-bind:id="n" />
                </div>
              </v-col>
              <v-col height:200px cols="6" md="5">
                <div id="app" v-cloak @drop.prevent="addFile" @dragover.prevent>
                  <video
                    playsinline
                    controls
                    muted
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
      </v-card> -->

      <!-- <v v-bind:id="'output'"/> -->
    </v-layout>
  </v-container>
</template>
<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import VideoJSRecord from "./VideoJSRecord.vue";
import store, { Child } from "../../store";
import { VideoStreamMerger } from "video-stream-merger";
import "videojs-offset";
import JalffmpegService from "../services/ffmpegService";
import JalStateService from "../services/JALStateService";
import videojs from "video.js";
import JALStateService from "../services/JALStateService";
@Component({
  components: {
    "video-js-recorder": VideoJSRecord,
  },
})
export default class VideoRecorderGrid extends Vue {
  // children: any;
  files: any;
  data: any;
  hover = false;
  downloading = false;
  file: any = "";

  recording = false;
  //@ts-ignore
  mediaRecorder: MediaRecorder = null;
  service = new JalffmpegService();
  recordedChunks: any[];
  handleFileUpload() {
    //@ts-ignore
    const file = this.$refs.file.files[0];
    const reader = new FileReader();

    reader.onload = this.loadData;

    reader.readAsDataURL(file);
    this.files.push(file);
  }
  constructor(params) {
    super(params);
    const isMobileDevice = /Mobi/i.test(window.navigator.userAgent);
    if (isMobileDevice) {
      alert(
        "Jam-Along might not work with mobile devices. Please use Google Chrome on a Desktop PC"
      );
    }

    sessionStorage.clear();
    //this.children = ["Gustav"];
    this.files = [];
    this.data = [];

    this.recordedChunks = [];
  }
  get videoWidth() {
    switch (store.state.children.length) {
      case 1:
        return "100vw";
      case 2:
        return "48vw";
      case 3:
      case 4:
      case 5:
      case 6:
        return "32vw";
      default:
        return "15vw";
    }
  }
  get getColMd() {
    return 6;
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

      const name = "JALvideojs" + Date.now();
      store.commit("addChildren", new Child(name, e2.target.result));
    }
  }
  removeFile(file) {
    this.files = this.files.filter((f) => {
      return f != file;
    });
  }

  mouseoverAddBtn() {
    this.hover = true;
  }
  mouseleaveAddBtn() {
    this.hover = false;
  }

  refreshMergedStream() {
    console.log("Try to refresh merged Stream:");

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
    const options = { mimeType: "video/webm; codecs=vp9" };
    //@ts-ignore
    this.mediaRecorder = new MediaRecorder(stream, options);
    store.state.players.forEach((element) => {
      const oldPlayer = document.getElementById(element.id);
      //Todo dispose
      //  oldPlayer.muted = true;
      // videojs(oldPlayer).dispose();
    });
  }
  public addPlayer() {
    store.commit("addChildren", new Child("JALvideojs" + Date.now(), null));
    //this.children.push('JALvideojs' +Date.now());
    this.mediaRecorder = null;
  }

  public removePlayer() {
    //@ts-ignore
    store.commit("removeChildren", store.state.activePlayer.id);
  }

  record() {
    if (this.mediaRecorder != null) {
      if (this.recording != true) {
        this.mediaRecorder.ondataavailable = this.handleDataAvailable;
        this.mediaRecorder?.start();
        this.recording = true;
        this.click();
      } else {
        this.mediaRecorder?.stop();
        this.recording = false;
      }
    } else {
      let recorder: any;
      if (this.service.player != undefined) {
        recorder = this.service.player.record();
      } else {
        recorder = store?.state?.activePlayer?.player.record();
      }

      if (!recorder.isRecording()) {
        recorder.start();
        this.recording = true;
      } else {
        recorder.stop();
        this.recording = false;
      }
    }

    if (this.recording) {
      store.state.players.forEach((element) => {
        element.player.on("ended", () => {
          if (this.recording) {
            this.record();
          }
        });
      });
    }
  }
  onFileChange(e) {
    alert();
    const files = e.target.files || e.dataTransfer.files;
    if (!files.length) return;
    JALStateService.prototype.loadState(files[0]);

    store.state.players.forEach((element) => {
      store.commit("addChildren", new Child("JALvideojs" + Date.now(), null));
    });
  }

  public click() {
    store.state.players.forEach((element) => {
      // if(element.recordedData !== undefined)
      {
        console.log("play");

        const isMobileDevice = /Mobi/i.test(window.navigator.userAgent);
        if (!isMobileDevice) {
          element.player.wavesurfer().play();
          element.player.wavesurfer().surfer.setVolume(0);
        }
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
  saveProject() {
    JalStateService.prototype.saveState();
  }

  public save() {
    console.log("todoSave");

    this.downloading = true;
    try {
      this.refreshMergedStream();
      this.record();
    } catch (e) {
      alert(e.message);
    } finally {
      this.downloading = false;
    }
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
      type: "video/webm",
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
.col {
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
#addFile {
  max-height: 60%;
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
