<template>
  <v-container fluid>
    <v-overlay :opacity="1" :value="overlay" :z-index="99">
      <v-img src="../../assets/logo_transparent_background.png" />
      <v-progress-linear indeterminate color="#FF914C"></v-progress-linear>
    </v-overlay>

    <v-overlay :opacity="0.8" :value="$store.state.saveOverlay" :z-index="99">
      <v-img src="../../assets/logo_transparent_background.png" />
      <h2 style="color:#FF914C">save project...</h2>
      <v-progress-linear indeterminate color="#FF914C"></v-progress-linear>
    </v-overlay>
    <v-dialog :value="saveProjectDialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Project</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field label="Project name*" v-model="projectName" required></v-text-field>
              </v-col> </v-row></v-container
        ></v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="#FF914C" text @click="saveProjectDialog = false">Close</v-btn>
          <v-btn color="#FF914C" text @click="saveProject">Save</v-btn>
        </v-card-actions>
      </v-card></v-dialog
    >
    <v-app-bar fixed dense style="vertical-align: bottom;">
      <!-- <v-file-input accept="image/*" style="color:"#FF914C"" width="5%" @change="onFileChange" label="Projekt öffnen"></v-file-input> -->

      <input type="file" ref="file" style="display: none" v-on:change="handleFileUpload()" />

      <v-btn @click="$refs.file.click()">
        <v-icon color="#FF914C">mdi-movie-open</v-icon>
      </v-btn>

      <v-btn v-on:click="record">
        <v-icon v-bind:color="recording ? 'red' : '#FF914C'">mdi-record</v-icon>
      </v-btn>
      <v-btn v-if="!$store.state.playing" v-on:click="click">
        <v-icon color="#FF914C">mdi-play</v-icon>
      </v-btn>
      <v-btn v-if="$store.state.playing" v-on:click="pause">
        <v-icon color="#FF914C">mdi-pause</v-icon>
      </v-btn>

      <v-btn v-on:click="stop">
        <v-icon color="#FF914C">mdi-stop</v-icon>
      </v-btn>
      <v-btn v-on:click="save" :style="!isMobileDevice ? 'margin-left:10vw' : ''">
        <v-icon color="#FF914C" v-if="downloading == false">mdi-download</v-icon>
        <v-progress-circular
          v-if="downloading == true"
          :width="3"
          color="#FF914C"
          indeterminate
        ></v-progress-circular>
      </v-btn>
      <v-btn v-on:click="saveProjectDialog = true" style="margin-left:50px">
        <v-icon color="#FF914C">mdi-zip-disk</v-icon>
      </v-btn>

      <v-btn v-on:click="removePlayer">
        <v-icon color="#FF914C">mdi-delete</v-icon>
      </v-btn>

      <v-btn @click="setTransformationMode('position')"
        ><v-icon :color="$store.state.transformationMode == 'position' ? 'white' : '#FF914C'"
          >mdi-arrow-all</v-icon
        ></v-btn
      >
      <v-btn @click="setTransformationMode('size')"
        ><v-icon :color="$store.state.transformationMode == 'size' ? 'white' : '#FF914C'"
          >mdi-arrow-top-right-bottom-left</v-icon
        ></v-btn
      >
    </v-app-bar>
    <!-- <div v-for="n in this.$store.state.videoGrid"  :key="n.id">
    <div
              id="addFile"
              centered
            
              v-cloak
              @drop.prevent="addFile"
              @dragover.prevent


                :class="'Tiles-floor data-x=' +n.x +' data-y=' + y "
                 style='width:10vh;height:10vh;background:#ff914c'
            >
              <video-js-recorder style="width:10vh;height:10vh;padding:0!important" :id="n.id" />
            </div>
</div> -->

    <div id="Grid" class="Grid" scrollable>
      <div class="Grid-selector addMode"></div>
      <div class="Tiles">
        <video-js-recorder
          v-for="n in this.$store.state.videoGrid"
          :style="getStyle(n)"
          :key="n.id"
          :id="n.id"
          :src="n.videourl"
          :class="'Tiles-floor data-x=' + n.x + ' data-y=' + n.y"
        ></video-js-recorder>
      </div>
    </div>

    <v-card style="height='1vh'">
      <v-col cols="12">
        <div style="height='6vh!important'">
          <v-slider
            v-model="timeSlider"
            @change="changeTime"
            thumb-label
            step="0.001"
            :max="getDuration()"
          ></v-slider>
        </div>
        <div v-show="$store.state.waveform" style="height='3vh!important'" class="waveform"></div>
      </v-col>
    </v-card>
  </v-container>
  <!-- </v-col>
      <v-col cols="4"> </v-col>
    </v-row>
  </v-container> -->
</template>
<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import VideoJSRecord from './VideoJSRecord.vue';
import store, { Child, GridVideo } from '../../store';
import { VideoStreamMerger } from 'video-stream-merger';
import 'videojs-offset';
import JalffmpegService from '../services/ffmpegService';
import JalStateService from '../services/JALStateService';
import videojs from 'video.js';
import JALStateService from '../services/JALStateService';
import jquery from 'jquery';
import $ from 'jquery';
import { Pt, Line } from 'pts';

@Component({
  components: {
    'video-js-recorder': VideoJSRecord,
  },
})
export default class VideoRecorderGrid extends Vue {
  @Prop() projectidprop: string | undefined;
  // children: any;
  files: any;
  data: any;
  viId = 0;
  hover = false;
  downloading = false;
  file: any = '';
  merger: any;
  factor = 1;
  saveProjectDialog = false;
  valueDeterminate = 0;

  recording = false;
  overlay = false;
  projectid = '';
  projectName = '';
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
  //  get id(){
  //    return;

  //  }

  setTransformationMode(value) {
    store.commit('setTransformationMode', value);
  }
  getStyle(n: GridVideo) {
    return (
      'left:' +
      n.x * 10 +
      'vh ; top:' +
      n.y * 10 +
      'vh ; width:' +
      n.sizeX +
      'vh ;  height:' +
      n.sizeX +
      'vh'
    );
  }

  constructor(params) {
    super(params);
    this.isMobileDevice = /Mobi/i.test(window.navigator.userAgent);
    if (this.isMobileDevice) {
      alert(
        'Jam-Along might not work with mobile devices. Please use Google Chrome on a Desktop PC'
      );
      this.setTransformationMode('size');
    }

    sessionStorage.clear();
    //this.children = ["Gustav"];
    this.files = [];
    this.data = [];

    this.recordedChunks = [];
    this.projectName = store.state.activeProjectName;
  }

  async init() {
    await this.sleep(1200);

    store.commit('resetChildren');

    if (store.state.activeProject == '') {
      store.commit(
        'setProject',
        Math.random()
          .toString(36)
          .substring(2) + Date.now().toString(36)
      );
      // JALStateService.prototype.createProject(
      //   store.state.userProfile.userId,
      //   store.state.activeProject
      // );
    } else {
      JALStateService.prototype.loadProject();
    }

    this.overlay = false;
  }
  sleep(ms) {
    return new Promise(resolve => {
      setTimeout(resolve, ms);
    });
  }
  mounted() {
    this.overlay = true;
    this.init();
    this.blub();
    //     window.addEventListener(‘resize’, function() {
    // this.getWindowWidth()
    // });
  }

  setZoom(zoom, el) {
    const transformOrigin = [0, 0];
    //@ts-ignore
    const p = ['webkit', 'moz', 'ms', 'o'],
      s = 'scale(' + zoom + ')',
      oString = transformOrigin[0] * 100 + '% ' + transformOrigin[1] * 100 + '%';

    for (let i = 0; i < p.length; i++) {
      el.style[p[i] + 'Transform'] = s;
      el.style[p[i] + 'TransformOrigin'] = oString;
    }

    el.style['transform'] = s;
    el.style['transformOrigin'] = oString;
  }

  getZoom(value) {
    const zoomScale = Number(value) / 100;
    this.setZoom(zoomScale, document.getElementsByClassName('Grid')[0]);
  }
  vwTOpx(value) {
    const w = window,
      d = document,
      e = d.documentElement,
      g = d.getElementsByTagName('body')[0],
      x = w.innerWidth || e.clientWidth || g.clientWidth,
      y = w.innerHeight || e.clientHeight || g.clientHeight;

    return (x * value) / 100; // affichage du résultat (facultatif)
  }
  getDuration() {
    if (store.state.activePlayer.player != undefined)
      return store.state.activePlayer.player?.duration();
    else return 0;
  }
  get timeSlider() {
    try {
      if (store.state.activePlayer.player != undefined && store.state.activePlayer.player != null) {
        if (
          store.state.activePlayer.player?.duration() ==
          store.state.activePlayer.player.currentTime()
        ) {
          store.commit('setPlaying', false);
        }
        if (!this.isMobileDevice) {
          return store.state.activePlayer.player.currentTime();
        } else {
          return store.state.activePlayer.player.wavesurfer.getCurrentTime();
        }
      } else return 0;
    } catch {
      return 0;
    }
  }

  set timeSlider(value) {
    this.i = 0;
  }
  i = 0;
  changeTime(value) {
    try {
      if (store.state.activePlayer.player != undefined && store.state.activePlayer.player != null)
        store.state.activePlayer.player.currentTime(value);
    } catch {
      console.log('error');
    }
  }

  blub() {
    'use strict';

    console.log('START');
    const size = this.vwTOpx(22);
    const Grid = {
      // DEPENDANCIES: Pt.js
      vhTOpx(value) {
        const w = window,
          d = document,
          e = d.documentElement,
          g = d.getElementsByTagName('body')[0],
          x = w.innerWidth || e.clientWidth || g.clientWidth,
          y = w.innerHeight || e.clientHeight || g.clientHeight;

        const result = (y * value) / 100; // affichage du résultat (facultatif)
        return result;
      },

      pxTOvw(value) {
        const w = window,
          d = document,
          e = d.documentElement,
          g = d.getElementsByTagName('body')[0],
          x = w.innerWidth || e.clientWidth || g.clientWidth,
          y = w.innerHeight || e.clientHeight || g.clientHeight;

        const result = (100 * value) / x; // affichage du résultat (facultatif)
        return result;
      },

      cellSize: 10,
      curCell: new Pt(0, 0),
      offset: new Pt(0, 0),
      curTileType: 'Tiles-floor',
      lastVideoTile: new GridVideo(null, null, null, null, null),

      cursor: {
        enable: function() {
          $('body').on('mousemove', '.Grid', Grid.cursor.run);
          $('body').on('touchmove', '.Grid', Grid.cursor.runTouch);
          $('.Grid').css('cursor', 'default');

          $('.Grid-selector')
            .css({
              left: Grid.curCell.x * Grid.vhTOpx(Grid.cellSize) + Grid.offset.x,
              top: Grid.curCell.y * Grid.vhTOpx(Grid.cellSize) + Grid.offset.y,
            })
            .show();
        },
        disable: function() {
          $('body').off('mousemove', '.Grid', Grid.cursor.run);
          $('body').off('touchmove', '.Grid', Grid.cursor.runTouch);
          $('.Grid-selector').hide();
        },
        run: function(e) {
          //@ts-ignore
          const bounds = document.getElementById('Grid').getBoundingClientRect();
          const x = e.clientX - bounds.left;
          const y = e.clientY - bounds.top;
          // console.log('x: ' + x + ' y: '+ y );
          // console.log('e.pageX: ' + e.pageX + ' e.pageY: '+ e.pageY );

          const hoverCell = new Pt(
            Math.floor(x / Grid.vhTOpx(Grid.cellSize)),
            Math.floor(y / Grid.vhTOpx(Grid.cellSize))
          );

          // console.log(
          //   hoverCell.x +
          //     " y: " +
          //     hoverCell.y +
          //     " Grid.vhTOpx(Grid.cellSize) " +
          //     Grid.cellSize +
          //     "  => " +
          //     hoverCell.x
          // );
          //alert('left'+ hoverCell.x * Grid.cellSize + Grid.offset.x+ 'hoverCell.x '+  hoverCell.x + ' Grid.cellSize' +Grid.vhTOpx(Grid.cellSize)+ '  Grid.offset.x ' + Grid.offset.x  )
          $('.Grid-selector').css({
            left: hoverCell.x * Grid.vhTOpx(Grid.cellSize),
            top: hoverCell.y * Grid.vhTOpx(Grid.cellSize),
          });
        },
        runTouch: function(e) {
          console.log('HIIIIIEEER 2 ');

          //@ts-ignore
          const bounds = document.getElementById('Grid').getBoundingClientRect();
          const x = e.touches[0].clientX - bounds.left;
          const y = e.touches[0].clientY - bounds.top;

          const hoverCell = new Pt(
            Math.floor(x / Grid.vhTOpx(Grid.cellSize)),
            Math.floor(y / Grid.vhTOpx(Grid.cellSize))
          );
          console.log(' Grid.curCell.x ' + Grid.curCell.x);
          console.log(' Grid.curCell.y ' + Grid.curCell.y);
          console.log(' hoverCell.x ' + hoverCell.x);
          console.log(' hoverCell.y ' + hoverCell.y);

          if (Grid.curCell.x !== hoverCell.x || Grid.curCell.y !== hoverCell.y) {
            Grid.curCell = hoverCell;

            console.log('DA');
            Grid.mergeVideoTile(Grid.curTileType, Grid.curCell.x, Grid.curCell.y);
          }
        },
      },

      modify: {
        enable: function() {
          $('.Grid').on('mousedown', Grid.modify.start);
          $('.Grid').on('touchstart', Grid.modify.startTouch);
          $('.Grid').on('mouseup', Grid.modify.end);
          $('.Grid').on('touchend', Grid.modify.endTouch);
          $('.Grid').on('contextmenu', function() {
            return false;
          });
        },
        disable: function() {
          $('.Grid').off('mousedown', Grid.modify.start);
          $('.Grid').off('touchstart', Grid.modify.startTouch);
          $('.Grid').off('mousemove', Grid.modify.run);
          $('.Grid').off('touchmove', Grid.modify.runTouch);
        },
        start: function(e) {
          if (!/Mobi/i.test(window.navigator.userAgent)) {
            console.log('MOD START');
            //@ts-ignore
            const bounds = document.getElementById('Grid').getBoundingClientRect();
            const x = e.clientX - bounds.left;
            const y = e.clientY - bounds.top;

            const hoverCell = new Pt(
              Math.floor(x / Grid.vhTOpx(Grid.cellSize)),
              Math.floor(y / Grid.vhTOpx(Grid.cellSize))
            );
            Grid.lastVideoTile.lastX = hoverCell.x;
            Grid.lastVideoTile.lastY = hoverCell.y;
            Grid.curCell = hoverCell;
            if (e.which == 1) {
              Grid.addVideoTile(Grid.curTileType, Grid.curCell.x, Grid.curCell.y);
            } else if (e.which == 3) {
              $('.Grid-selector')
                .removeClass('addMode')
                .addClass('deleteMode')
                .hide()
                .show(1);
              Grid.deleteTile(Grid.curTileType, Grid.curCell.x, Grid.curCell.y);
            }
            $('.Grid').on('mousemove', Grid.modify.run);
            $('.Grid').on('touchmove', Grid.modify.runTouch);
          }
        },
        startTouch: function(e) {
          console.log('TOUCH START');
          //@ts-ignore
          const bounds = document.getElementById('Grid').getBoundingClientRect();
          const x = e.touches[0].clientX - bounds.left;
          const y = e.touches[0].clientY - bounds.top;
          //0.7 is the transformation size in portrait mode
          const factor = window.innerHeight > window.innerWidth ? 0.7 : 1;
          const hoverCell = new Pt(
            Math.floor(x / Grid.vhTOpx(Grid.cellSize * factor)),
            Math.floor(y / Grid.vhTOpx(Grid.cellSize * factor))
          );

          Grid.curCell = hoverCell;

          if (e.which == 0) {
            Grid.addVideoTile(Grid.curTileType, Grid.curCell.x, Grid.curCell.y);
          } else if (e.which == 3) {
            $('.Grid-selector')
              .removeClass('addMode')
              .addClass('deleteMode')
              .hide()
              .show(1);
            Grid.deleteTile(Grid.curTileType, Grid.curCell.x, Grid.curCell.y);
          }

          $('.Grid').on('mousehmove', Grid.modify.run);
          $('.Grid').on('touchmove', Grid.modify.runTouch);
        },

        runTouch: function(e) {
          //@ts-ignore
          const bounds = document.getElementById('Grid').getBoundingClientRect();
          const x = e.touches[0].clientX - bounds.left;
          const y = e.touches[0].clientY - bounds.top;

          const hoverCell = new Pt(
            Math.floor(x / Grid.vhTOpx(Grid.cellSize)),
            Math.floor(y / Grid.vhTOpx(Grid.cellSize))
          );

          if (Grid.curCell.x !== hoverCell.x || Grid.curCell.y !== hoverCell.y) {
            Grid.curCell = hoverCell;
            if (e.which == 0) {
              console.log('DA');
              Grid.mergeVideoTile(Grid.curTileType, Grid.curCell.x, Grid.curCell.y);
            } else if (e.which == 3) {
              Grid.deleteTile(Grid.curTileType, Grid.curCell.x, Grid.curCell.y);
            }
          }
        },

        run: function(e) {
          //@ts-ignore
          const bounds = document.getElementById('Grid').getBoundingClientRect();
          const x = e.clientX - bounds.left;
          const y = e.clientY - bounds.top;

          const hoverCell = new Pt(
            Math.floor(x / Grid.vhTOpx(Grid.cellSize)),
            Math.floor(y / Grid.vhTOpx(Grid.cellSize))
          );

          if (Grid.curCell.x !== hoverCell.x || Grid.curCell.y !== hoverCell.y) {
            Grid.curCell = hoverCell;
            if (e.which == 1) {
              console.log('DA');
              Grid.mergeVideoTile(Grid.curTileType, Grid.curCell.x, Grid.curCell.y);
            } else if (e.which == 3) {
              Grid.deleteTile(Grid.curTileType, Grid.curCell.x, Grid.curCell.y);
            }
          }
        },
        endTouch: function(e) {
          console.log('end touch');
        },
        end: function(e) {
          console.log('MOD END');
          $('.Grid-selector')
            .removeClass('deleteMode')
            .addClass('addMode')
            .hide()
            .show(1);
        },
      },

      pan: {
        lastPt: new Pt(0, 0),
        enable: function() {
          $(document).on('keydown', Grid.pan.start);
          $(document).on('keyup', Grid.pan.disable);
        },
        disable: function(e) {
          if (e.which == 32) {
            e.preventDefault();
            $('.Grid').off('mousedown', Grid.pan.begin);
            $('.Grid').off('touchstart', Grid.pan.begin);
            $('.Grid').off('mouseup', Grid.pan.stop);
            $('.Grid').off('touchend', Grid.pan.stop);
            Grid.cursor.enable();
            Grid.modify.enable();
          }
        },
        start: function(e) {
          console.log('MOUSESTART');
          if (e.which == 32) {
            e.preventDefault();
            Grid.cursor.disable();
            Grid.modify.disable();
            $('.Grid').css('cursor', 'move');
            $('.Grid').on('mousedown', Grid.pan.begin);
            $('.Grid').on('touchstart', Grid.pan.begin);
            $('.Grid').on('touchend', Grid.pan.stop);
          }
        },
        begin: function(e) {
          //@ts-ignore
          const bounds = document.getElementById('Grid').getBoundingClientRect();
          const x = e.clientX - bounds.left;
          const y = e.clientY - bounds.top;

          Grid.pan.lastPt = new Pt(x, y);
          $('.Grid').on('mousemove', Grid.pan.run);
          $('.Grid').on('touchmove', Grid.pan.runTouch);
        },
        run: function(e) {
          console.log('MOUSERUN');
          //@ts-ignore
          const bounds = document.getElementById('Grid').getBoundingClientRect();
          const x = e.clientX - bounds.left;
          const y = e.clientY - bounds.top;

          Grid.offset.x += x - Grid.pan.lastPt.x;
          Grid.offset.y += y - Grid.pan.lastPt.y;
          $('.Tiles').css({
            left: Grid.offset.x,
            top: Grid.offset.y,
          });
          $('.Grid').css('background-position', Grid.offset.x + 'px ' + Grid.offset.y + 'px');
          Grid.pan.lastPt = new Pt(x, y);
        },
        stop: function(e) {
          console.log('MOUSESTOP');
          $('.Grid').off('mousemove', Grid.pan.run);
          $('.Grid').off('touchmove', Grid.pan.runTouch);
        },

        runTouch: function(e) {
          //@ts-ignore
          const bounds = document.getElementById('Grid').getBoundingClientRect();
          const x = e.touches[0].clientX - bounds.left;
          const y = e.touches[0].clientY - bounds.top;

          Grid.offset.x += x - Grid.pan.lastPt.x;
          Grid.offset.y += y - Grid.pan.lastPt.y;
          $('.Tiles').css({
            left: Grid.offset.x,
            top: Grid.offset.y,
          });
          $('.Grid').css('background-position', Grid.offset.x + 'px ' + Grid.offset.y + 'px');
          Grid.pan.lastPt = new Pt(x, y);
        },
      },

      isTileAt: function(tileType, x, y) {
        let res = false;
        store.state.videoGrid.forEach(element => {
          const exMax = element.x + element.sizeX / 10 - 1;
          const eyMax = element.y + element.sizeX / 10 - 1;
          if (element.x <= x && x <= exMax && element.y <= y && y <= eyMax) {
            res = true;

            store.commit('setActivePlayById', element.id);
          }
        });
        return res;
        // return (
        //   $("." + tileType + "[data-x='" + x + "'][data-y='" + y + "']")
        //     .length > 0
        // );
      },

      mergeVideoTile: function(tileType, x, y) {
        const size = true;

        if (Grid.lastVideoTile.id == null) {
          store.state.videoGrid.forEach(video => {
            //@ts-ignore
            if (video.id == store.state.activePlayer.id) {
              Grid.lastVideoTile = video;
            }
          });
        }

        const gridVideo: GridVideo = Grid.lastVideoTile;

        if (Grid.lastVideoTile.lastX > x) {
          if (size) {
            //LINKS
            if (store.state.transformationMode == 'position') {
              gridVideo.x = gridVideo.x - 1;
            } else {
              gridVideo.sizeX = gridVideo.sizeX - 10; //<60?gridVideo.sizeX * 2: gridVideo.sizeX;
            }
          }
        } else if (Grid.lastVideoTile.x < x) {
          // console.log("Nach RECHTS");
          if (size) {
            if (store.state.transformationMode == 'position') {
              gridVideo.x = gridVideo.x + 1;
            } else {
              gridVideo.sizeX = gridVideo.sizeX + 10;
            }
          }
        } else if (Grid.lastVideoTile.y < y) {
          if (size) {
            if (store.state.transformationMode == 'position') {
              gridVideo.y = gridVideo.y + 1;
            } else {
              gridVideo.sizeX = gridVideo.sizeX + 10;
            }
          }
          //console.log("Nach UNTEN");
        } else if (Grid.lastVideoTile.y >= y) {
          if (size) {
            if (store.state.transformationMode == 'position') {
              gridVideo.y = gridVideo.y - 1;
            } else {
              gridVideo.sizeX = gridVideo.sizeX - 10;
            }
          }
        }
        if (gridVideo.sizeX >= 10) {
          Grid.lastVideoTile.lastX = x;
          Grid.lastVideoTile.lastY = y;
          store.commit('updateGridVideo', gridVideo);
        } else {
          gridVideo.sizeX = 10;
        }
      },
      addVideoTile: function(tileType, x, y) {
        // console.log("addVideoTile at x/y" + x + "  y " + y);
        if (!Grid.isTileAt(tileType, x, y)) {
          const id = 'JALvideojs' + Date.now();
          //  console.log("adding video at x: " + x + " y: " + y);
          const gridVideo = new GridVideo(id, x, y, 10, 10);

          Grid.lastVideoTile = {
            id: id,
            sizeX: 10,
            sizeY: 10,
            x: x,
            y: y,
            lastX: x,
            lastY: y,
            src: undefined,
          };
          store.commit('addVideoToGrid', gridVideo);
          store.commit('setTransformationMode', 'size');
          //   //        $("." + tileType + "[data-x='" + x + "'][data-y='" + y + "']").css({
          //   // left: x * Grid.vhTOpx(Grid.cellSize),
          //   // top: y * Grid.vhTOpx(Grid.cellSize),})
          // }

          // if (!Grid.isTileAt(tileType, x, y)) {

          // const html =
          //   "<video-js-recorder class='" +
          //   tileType +
          //   "' data-x='" +
          //   x +
          //   "' data-y='" +
          //   y +
          //   "id='JALvideojs" + Date.now() + "' " +
          //   "style='position:absolute;width:10vh;height:10vh; left: " +
          //   x * Grid.cellSize +
          //   "vh; top: " +
          //   y * Grid.cellSize +
          //   "vh'></video-js-recorder>";
          // $(".Tiles").append(html);
          // $("." + tileType + "[data-x='" + x + "'][data-y='" + y + "']").css({
          //   left: x * Grid.vhTOpx(Grid.cellSize),
          //   top: y * Grid.vhTOpx(Grid.cellSize),
          // });
        }
      },

      addTile: function(tileType, x, y) {
        // console.log("addtile at x/y" + x + "  " + y);
        if (!Grid.isTileAt(tileType, x, y)) {
          const html =
            "<div class='" +
            tileType +
            "' data-x='" +
            x +
            "' data-y='" +
            y +
            "' style='position:absolute;width:10vh;height:10vh;background:#ff914c; left: " +
            x * Grid.cellSize +
            'vh; top: ' +
            y * Grid.cellSize +
            "vh'></div>";
          $('.Tiles').append(html);
          // $("." + tileType + "[data-x='" + x + "'][data-y='" + y + "']").css({
          //   left: x * Grid.vhTOpx(Grid.cellSize),
          //   top: y * Grid.vhTOpx(Grid.cellSize),
          // });
        }
      },

      //   addTile: function(tileType, x, y) {
      //     console.log('addtile at x/y' + x + '  ' +y )
      //  if( !Grid.isTileAt(tileType,x,y) ) {

      //     const html =
      //       "<div class='" +
      //       tileType +
      //       "' data-x='" +
      //       x +
      //       "' data-y='" +
      //       y +
      //       "' style='width:10vh;height:10vh;background:#ff914c'></div>";
      //     $(".Tiles").append(html);
      //     $("." + tileType + "[data-x='" + x + "'][data-y='" + y + "']").css({
      //       left: x * Grid.vhTOpx(Grid.cellSize),
      //       top: y * Grid.vhTOpx(Grid.cellSize),
      //     });

      // }

      //           const html =
      //            "<div id='addFile' centered  style='position:absolute;width:10vh;height:10vh;' v-cloak @drop.prevent='addFile' @dragover.prevent"+
      //  "left: " +
      //             x * Grid.cellSize +
      //             "vh; top: " +
      //             y * Grid.cellSize +
      //             "vh'>"
      //             "<video-js-recorder  left: " +
      //             x * Grid.cellSize +
      //             "vh; top: " +
      //             y * Grid.cellSize +
      //             "vh'/> </div>"
      //           $(".Tiles").append(html);
      // $("." + tileType + "[data-x='" + x + "'][data-y='" + y + "']").css({
      //   left: x * Grid.vhTOpx(Grid.cellSize),
      //   top: y * Grid.vhTOpx(Grid.cellSize),
      // });
      // }
      // },

      deleteTile: function(tileType, x, y) {
        $('.' + tileType + "[data-x='" + x + "'][data-y='" + y + "']").remove();
      },

      deleteAllTilesOfType: function(tileType) {
        $('.' + tileType).remove();
      },
    };

    Grid.cursor.enable();
    Grid.modify.enable();
    Grid.pan.enable();

    $('#btn-clearAll').click(function() {
      Grid.deleteAllTilesOfType(Grid.curTileType);
    });
  }

  get videoWidth() {
    if (this.isMobileDevice) {
      return '100px';
    }
    switch (store.state.children.length) {
      case 1:
        return '100vw';
      case 2:
        return '48vw';
      case 3:
      case 4:
      case 5:
      case 6:
        return '32vw';
      default:
        return '10vw';
    }
  }
  get getColMd() {
    return 6;
  }
  addFile(e) {
    const droppedFiles = e.dataTransfer.files;

    if (!droppedFiles) return;
    // this tip, convert FileList to array, credit: https://www.smashingmagazine.com/2018/01/drag-drop-file-uploader-vanilla-js/
    [...droppedFiles].forEach(f => {
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

      //const name = "JALvideojs" + Date.now();

      store.commit('setAtivePlayerSrc', e2.target.result);
      //@ts-ignore
      store.commit('removeChildren', store.state.activePlayer.id);
    }
  }
  removeFile(file) {
    this.files = this.files.filter(f => {
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
    console.log('Try to refresh merged Stream:');

    let i = 1;
    const data: any[] = [];

    store.state.players.forEach(element => {
      data.push(element);

      if (element.player.record() !== undefined) {
        console.log('save');
        //element.record().saveAs({ video: "video" + i + ".webm" });
        i++;
      }
    });

    this.merger = this.service.mergeVideos(data);
    const stream = this.merger.result;
    console.log(stream);

    const recordedChunks = [];
    const options = { mimeType: 'video/webm; codecs=vp9' };
    //@ts-ignore
    this.mediaRecorder = new MediaRecorder(stream, options);
    this.mediaRecorder.crossOrigin = 'anonymous';
    store.state.players.forEach(element => {
      const oldPlayer = document.getElementById(element.id);
      //Todo dispose
      //  oldPlayer.muted = true;
      // videojs(oldPlayer).dispose();
    });
    // async refreshMergedStream() {
    // console.log("Try to refresh merged Stream:");

    // let i = 1;
    // const data: any[] = [];

    // store.state.players.forEach((element) => {
    //   data.push(element);

    //   if (element.player.record() !== undefined) {
    //     console.log("save");
    //     //element.record().saveAs({ video: "video" + i + ".webm" });
    //     i++;
    //   }
    // });

    // // this.merger = this.service.mergeVideos(data);
    // const stream = this.service.mergeVideos(data).result.Readable();

    // //const stream = new stream.Readable() // any Node.js readable stream

    // const promise = streamToBlob(stream);

    // promise.then(() => {
    //   alert();
    // });

    // console.log(stream);

    // const recordedChunks = [];
    // const options = { mimeType: "video/webm; codecs=vp9" };
    // //@ts-ignore
    // this.mediaRecorder = new MediaRecorder(stream, options);
    // store.state.players.forEach((element) => {
    //   const oldPlayer = document.getElementById(element.id);
    //   //Todo dispose
    //   //  oldPlayer.muted = true;
    //   // videojs(oldPlayer).dispose();
    // });
  }
  public addPlayer() {
    store.commit('addChildren', new Child('JALvideojs' + Date.now(), null));
    //this.children.push('JALvideojs' +Date.now());
    this.mediaRecorder = null;
  }

  public removePlayer() {
    //@ts-ignore
    store.commit('removeChildren', store.state.activePlayer.id);
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
      store.state.players.forEach(element => {
        element.player.on('ended', () => {
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

    store.state.players.forEach(element => {
      store.commit('addChildren', new Child('JALvideojs' + Date.now(), null));
    });
  }

  public click() {
    store.state.players.forEach(element => {
      // if(element.recordedData !== undefined)
      {
        store.commit('setPlaying', true);
        console.log('play');

        if (!this.isMobileDevice && element.player.wavesurfer != null) {
          element.player.wavesurfer().play();
          element.player.wavesurfer().surfer.setVolume(0);
        } else {
          element.player.play();
        }
      }
    });
  }
  public pause() {
    store.state.players.forEach(element => {
      // if(element.recordedData !== undefined)
      {
        store.commit('setPlaying', false);
        console.log('pause');
        element.player.pause();
      }
    });
  }
  public stop() {
    store.state.players.forEach(element => {
      // if(element.recordedData !== undefined)
      {
        console.log('stop');
        element.player.currentTime(0);
        element.player.pause();
      }
    });

    store.commit('setPlaying', false);
  }
  saveProject() {
    this.saveProjectDialog = false;
    JalStateService.prototype.saveState(
      //@ts-ignore
      store.state.activeProject,
      this.projectName
    );
  }

  public save() {
    console.log('todoSave');

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
    console.log('data-available');
    // if (event.data.size > 0) {
    this.recordedChunks.push(event.data);
    console.log(this.recordedChunks);
    this.download();
    this.downloading = false;
    // } else {
    //   alert('An Error occured.');
    // }
  }
  download() {
    const blob = new Blob(this.recordedChunks, {
      type: 'video/webm',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    document.body.appendChild(a);
    //a.style = "display: none";
    a.href = url;
    a.download = 'test.webm';
    a.click();
    window.URL.revokeObjectURL(url);
  }
}
</script>

<style lang="less" scoped>
@lineColour: #ff914c;
@gridColour: darken(#363636, 0%);
@tileColour: darken(red, 20%);
.grid( @lineColour; @size; @cellCount ) {
  background-image: linear-gradient(fade(@lineColour, 50%) 3px, transparent 0),
    linear-gradient(90deg, fade(@lineColour, 50%) 3px, transparent 0),
    linear-gradient(fade(@lineColour, 30%) 1px, transparent 0),
    linear-gradient(90deg, fade(@lineColour, 30%) 1px, transparent 0);
  background-size: @size * @cellCount @size * @cellCount, @size * @cellCount @size * @cellCount,
    @size @size, @size @size;
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
  color: #ff914c;
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
    color: #ff914c;
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
  margin-left: 32vw;
  margin-top: 7vh;
  width: 60.5vh;
  height: 60.5vh;
  flex: 1;
  position: relative;
  overflow: hidden;
  user-select: none;
  background-color: @gridColour;
  .grid(#FF914C; 10vh; 3);
  z-index: 0;
  &:after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    .grid(#FF914C; 10vh; 3);
  }
}
.Grid-selector {
  position: absolute;
  width: 10vh;
  height: 10vh;
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
  color: white;
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
  width: 10vh;
  height: 10vh;
  // background: green;
  animation: block-in 0.3s 0 ease-out;
  z-index: 1;
}
.container {
  padding: 0;
}
@keyframes block-in {
  0% {
    width: 0;
    height: 0;
    margin: 10vh / 2 10vh / 2;
    border-radius: 50%;
    background: transparent;
  }
  100% {
    width: 10vh;
    height: 10vh;
    margin: 0 0;
    border-radius: 0;
    background: green;
  }
}

@media only screen and (max-device-width: 1000px) and (orientation: portrait) {
  .Grid {
    transform: scale(0.7);
    left: 0;
    margin-left: 0;
  }
} /* styles for smartphones and tablets in portrait mode */
@media only screen and (max-device-width: 1000px) and (orientation: landscape) {
  .Grid {
    margin-left: 10;
  }
} /* styles for smartphones and tablets in landscape mode */
</style>
