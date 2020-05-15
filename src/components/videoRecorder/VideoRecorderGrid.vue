<template>
  <!-- <v-container style="padding-top='5%'" fluid>
    <v-row>
      <v-col cols="4"> </v-col>
      <v-col cols="4"> -->
  <!-- <v-overlay :opacity="1" :value="overlay" :z-index="99">
      <v-img src="../../assets/logo_transparent_background.png" />
      <v-progress-linear indeterminate color="#FF914C"></v-progress-linear>
    </v-overlay> -->
  <div class="Grid" >
    <div class="Grid-selector addMode"></div>
    <div class="Tiles"></div>
  </div>
  <!-- </v-col>
      <v-col cols="4"> </v-col>
    </v-row>
  </v-container> -->
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
import jquery from "jquery";
import $ from "jquery";
import { Pt, Line } from "pts";

@Component({
  components: {
    "video-js-recorder": VideoJSRecord,
  },
})
export default class VideoRecorderGrid extends Vue {
  @Prop() projectidprop: string | undefined;
  // children: any;
  files: any;
  data: any;
  hover = false;
  downloading = false;
  file: any = "";
  merger: any;
  valueDeterminate = 0;
  recording = false;
  overlay = false;
  projectid = "";
  isMobileDevice: boolean;
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
    this.isMobileDevice = /Mobi/i.test(window.navigator.userAgent);
    if (this.isMobileDevice) {
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

  async init() {
    console.log(1);
    await this.sleep(1200);
    console.log(2);
    store.commit("resetChildren");
    if (store.state.activeProject == "") {
      store.commit(
        "setProject",
        Math.random()
          .toString(36)
          .substring(2) + Date.now().toString(36)
      );
      JALStateService.prototype.createProject(
        store.state.userProfile.userId,
        store.state.activeProject
      );
    } else {
      JALStateService.prototype.loadProject();
    }

    this.overlay = false;
  }
  sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }
  mounted() {
    // this.overlay = true;
    // this.init();
    this.blub();
  }

  blub() {
    "use strict";
    alert("");
    console.log("START");

    const Grid = {
      // DEPENDANCIES: Pt.js

      cellSize: 50,
      curCell: new Pt(0, 0),
      offset: new Pt(0, 0),
      curTileType: "Tiles-floor",

      cursor: {
        enable: function() {
          $("body").on("mousemove", ".Grid", Grid.cursor.run);
          $(".Grid").css("cursor", "default");
          $(".Grid-selector")
            .css({
              left: Grid.curCell.x * Grid.cellSize + Grid.offset.x,
              top: Grid.curCell.y * Grid.cellSize + Grid.offset.y,
            })
            .show();
        },
        disable: function() {
          $("body").off("mousemove", ".Grid", Grid.cursor.run);
          $(".Grid-selector").hide();
        },
        run: function(e) {
          const hoverCell = new Pt(
            Math.floor((e.pageX - Grid.offset.x) / Grid.cellSize),
            Math.floor((e.pageY - Grid.offset.y) / Grid.cellSize)
          );
          $(".Grid-selector").css({
            left: hoverCell.x * Grid.cellSize + Grid.offset.x,
            top: hoverCell.y * Grid.cellSize + Grid.offset.y,
          });
        },
      },

      modify: {
        enable: function() {
          $(".Grid").on("mousedown", Grid.modify.start);
          $(".Grid").on("mouseup", Grid.modify.end);
          $(".Grid").on("contextmenu", function() {
            return false;
          });
        },
        disable: function() {
          $(".Grid").off("mousedown", Grid.modify.start);
          $(".Grid").off("mousemove", Grid.modify.run);
        },
        start: function(e) {
          const hoverCell = new Pt(
            Math.floor((e.pageX - Grid.offset.x) / Grid.cellSize),
            Math.floor((e.pageY - Grid.offset.y) / Grid.cellSize)
          );
          Grid.curCell = hoverCell;
          if (e.which == 1) {
            Grid.addTile(Grid.curTileType, Grid.curCell.x, Grid.curCell.y);
          } else if (e.which == 3) {
            $(".Grid-selector")
              .removeClass("addMode")
              .addClass("deleteMode")
              .hide()
              .show(1);
            Grid.deleteTile(Grid.curTileType, Grid.curCell.x, Grid.curCell.y);
          }
          $(".Grid").on("mousemove", Grid.modify.run);
        },
        run: function(e) {
          const hoverCell = new Pt(
            Math.floor((e.pageX - Grid.offset.x) / Grid.cellSize),
            Math.floor((e.pageY - Grid.offset.y) / Grid.cellSize)
          );
          if (!Grid.curCell.equalTo(hoverCell)) {
            Grid.curCell = hoverCell;
            if (e.which == 1) {
              Grid.addTile(Grid.curTileType, Grid.curCell.x, Grid.curCell.y);
            } else if (e.which == 3) {
              Grid.deleteTile(Grid.curTileType, Grid.curCell.x, Grid.curCell.y);
            }
          }
        },
        end: function(e) {
          $(".Grid-selector")
            .removeClass("deleteMode")
            .addClass("addMode")
            .hide()
            .show(1);
        },
      },

      pan: {
        lastPt: new Pt(0, 0),
        enable: function() {
          $(document).on("keydown", Grid.pan.start);
          $(document).on("keyup", Grid.pan.disable);
        },
        disable: function(e) {
          if (e.which == 32) {
            e.preventDefault();
            $(".Grid").off("mousedown", Grid.pan.begin);
            $(".Grid").off("mouseup", Grid.pan.stop);
            Grid.cursor.enable();
            Grid.modify.enable();
          }
        },
        start: function(e) {
          if (e.which == 32) {
            e.preventDefault();
            Grid.cursor.disable();
            Grid.modify.disable();
            $(".Grid").css("cursor", "move");
            $(".Grid").on("mousedown", Grid.pan.begin);
            $(".Grid").on("mouseup", Grid.pan.stop);
          }
        },
        begin: function(e) {
          Grid.pan.lastPt = new Pt(e.pageX, e.pageY);
          $(".Grid").on("mousemove", Grid.pan.run);
        },
        run: function(e) {
          Grid.offset.x += e.pageX - Grid.pan.lastPt.x;
          Grid.offset.y += e.pageY - Grid.pan.lastPt.y;
          $(".Tiles").css({
            left: Grid.offset.x,
            top: Grid.offset.y,
          });
          $(".Grid").css(
            "background-position",
            Grid.offset.x + "px " + Grid.offset.y + "px"
          );
          Grid.pan.lastPt = new Pt(e.pageX, e.pageY);
        },
        stop: function(e) {
          $(".Grid").off("mousemove", Grid.pan.run);
        },
      },

      isTileAt: function(tileType, x, y) {
        return (
          $("." + tileType + "[data-x='" + x + "'][data-y='" + y + "']")
            .length > 0
        );
      },

      addTile: function(tileType, x, y) {
        if (!Grid.isTileAt(tileType, x, y)) {
          const html =
            "<div class='" +
            tileType +
            "' data-x='" +
            x +
            "' data-y='" +
            y +
            "'></div>";
          $(".Tiles").append(html);
          $("." + tileType + "[data-x='" + x + "'][data-y='" + y + "']").css({
            left: x * Grid.cellSize,
            top: y * Grid.cellSize,
          });
        }
      },

      deleteTile: function(tileType, x, y) {
        $("." + tileType + "[data-x='" + x + "'][data-y='" + y + "']").remove();
      },

      deleteAllTilesOfType: function(tileType) {
        $("." + tileType).remove();
      },
    };

    Grid.cursor.enable();
    Grid.modify.enable();
    Grid.pan.enable();

    $("#btn-clearAll").click(function() {
      Grid.deleteAllTilesOfType(Grid.curTileType);
    });
  }

  get videoWidth() {
    if (this.isMobileDevice) {
      return "150px";
    }
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
      data.push(element);

      if (element.player.record() !== undefined) {
        console.log("save");
        //element.record().saveAs({ video: "video" + i + ".webm" });
        i++;
      }
    });

    this.merger = this.service.mergeVideos(data);
    const stream = this.merger.result;
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
        this.merger.destroy();
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

        if (this.isMobileDevice) {
          element.player.wavesurfer().play();
          element.player.wavesurfer().surfer.setVolume(0);
        } else {
          element.player.play();
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
    JalStateService.prototype.saveState(
      store.state.activeProject,
      store.state.activeProjectName
    );
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

<style lang="less" scoped>

@cellSize: 50px;
@lineColour:white;
@gridColour: darken(#269, 0%);
@tileColour: darken(@gridColour, 20%);
.grid( @lineColour; @cellSize; @cellCount ) {
  background-image: linear-gradient(fade(@lineColour, 50%) 3px, transparent 0),
    linear-gradient(90deg, fade(@lineColour, 50%) 3px, transparent 0),
    linear-gradient(fade(@lineColour, 30%) 1px, transparent 0),
    linear-gradient(90deg, fade(@lineColour, 30%) 1px, transparent 0);
  background-size: @cellSize* @cellCount @cellSize* @cellCount,
    @cellSize* @cellCount @cellSize* @cellCount, @cellSize @cellSize,
    @cellSize @cellSize;
}

*,
:before,
:after {
  box-sizing: border-box;
}

body {
  position: relative;
  display: flex;
  min-height: 100vh;
}

.Pannel {
  box-sizing: content-box;
  position: fixed;
  margin: 1em;
  padding: 0.5em 1em;
  color: white;
  text-shadow: 1px 1px 0 0 black;
  background: hsl(0, 0, 10%);
  border-radius: 0.5em;
  box-shadow: 2px 2px 20px 0 rgba(0, 0, 0, 0.75);
  //resize: horizontal;
  opacity: 0.95;
  overflow: auto;
  z-index: 1;
  h1 {
    margin: 0.4em 0;
    font-size: 1.3em;
    color: papayawhip;
  }
  .btn {
    margin: 0.4em 0;
  }
  .btn-default {
    background-image: linear-gradient(hsl(0, 0, 90%), hsl(0, 0, 60%));
    &:hover {
      border-color: hsl(0, 0, 30%);
    }
  }
  .btn-default.active {
    color: white;
    text-shadow: 1px 1px 0 rgba(0, 0, 0, 0.3);
    box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.2);
  }
  .btn-add.active {
    background-image: linear-gradient(darken(limegreen, 20%), limegreen);
    border-color: darken(limegreen, 20%);
  }
  .btn-delete.active {
    background-image: linear-gradient(darken(crimson, 20%), crimson);
    border-color: darken(crimson, 20%);
  }
  .btn-default:active {
    box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.4);
  }
}

.Grid {
  margin-left:33vw ;
  margin-top:10vh ;
  width: 33vw;
  height: 33vw;
  flex: 1;
  position: relative;
  overflow: hidden;
  user-select: none;
  background-color: @gridColour;
  .grid(white; @cellSize; 5);
  z-index: 0;
  /*&:after {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    .grid( white; @cellSize; 5 );
  }*/
}
.Grid-selector {
  position: absolute;
  width: @cellSize;
  height: @cellSize;
  border-radius: 2px;
  animation: pulse 2s infinite ease-in-out;
  z-index: 100;
  box-shadow: 0 0 20px currentColor;
}
@keyframes pulse {
  0% {
    box-shadow: 0 0 20px currentColor;
  }
  50% {
    box-shadow: 0 0 10px currentColor;
  }
  100% {
    box-shadow: 0 0 20px currentColor;
  }
}
.Grid-selector.addMode {
  color: limegreen;
}
.Grid-selector.deleteMode {
  color: crimson;
}

.Tiles {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
}

.Tiles-floor {
  position: absolute;
  width: @cellSize;
  height: @cellSize;
  background: @tileColour;
  animation: block-in 0.3s 0 ease-out;
  z-index: 1;
}
@keyframes block-in {
  0% {
    width: 0;
    height: 0;
    margin: @cellSize / 2 @cellSize / 2;
    border-radius: 50%;
    background: transparent;
  }
  100% {
    width: @cellSize;
    height: @cellSize;
    margin: 0 0;
    border-radius: 0;
    background: @tileColour;
  }
}
</style>
