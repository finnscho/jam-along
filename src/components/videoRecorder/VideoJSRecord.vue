<template>
  <v-container v-on:click="activate" z-index="999" v-on:touchstart="activate">
    <div id="videoJs" v-cloak @drop.prevent="addFile" @dragover.prevent>
      <video
        v-on:click="activate"
        :id="id"
        class="video-js vjs-layout-large "
        v-bind:style="isActive() ? 'border: solid;' : ''"
        playsinline
        controls
        preload="auto"
        width="10vh"
        height="10vh"
      >
        <source v-if="src != null" :src="src" type="video/mp4" />
      </video>
    </div>
  </v-container>
</template>

<script>
import '../../../node_modules/videojs-wavesurfer/dist/videojs.wavesurfer.min.js';
import '../../../node_modules/videojs-wavesurfer/dist/css/videojs.wavesurfer.css';
import '../../../node_modules/video.js/dist/video.min.js';
import waveSurfer from '../../../node_modules/wavesurfer.js/dist/wavesurfer.min.js';
import 'video.js/dist/video-js.css';
import 'videojs-record/dist/css/videojs.record.css';
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import 'webrtc-adapter';
import RecordRTC from 'recordrtc';

import videojs from 'video.js';
// eslint-disable-next-line
import Record from 'videojs-record/dist/videojs.record.js';
import 'videojs-offset';

import store from '@/store';

@Component()
export default class VideoJSRecord extends Vue {
  @Prop() id;
  @Prop() active;
  @Prop() src;
  data() {
    return {
      min: 0,
      max: 3000,
      slider: 0,

      player: '',
    };
  }
  isActive() {
    return store.state.activePlayer == this;
  }
  created() {
    this.$root.$refs.A = this;
  }
  mounted() {
    const options = {
      controls: false,
      autoplay: false,
      crossOrigin: 'anonymous',
      fluid: true,
      responsive: true,
      loop: false,
      width: 400,
      height: 400,
      controlBar: {
        volumePanel: true,
        seeking: true,
      },
      plugins: {
        // configure videojs-record plugin
        record:
          this.src == null
            ? {
                audio: true,
                crossOrigin: 'anonymous',
                maxLength: 500,
                debug: true,
                // video: true,
                frameWidth: 400,
                frameHeight: 400,
                width: 400,
                height: 400,
                video: {
                  // video media constraints: set resolution of camera
                  width: 400,
                  height: 400,
                },
              }
            : {},
        wavesurfer: {
          barHeight: 100,
          debug: true,
          waveColor: '#FF914C',
          progressColor: 'orangered',
          cursorColor: 'yellow',
          container: '.waveform',
          hideScrollbar: true,
        },
      },
    };
    //  this.myid = '234'// + (Math.floor(Math.random() * Math.floor(100)))
    /* eslint-disable no-console */
    this.player = videojs('#' + this.id, options, () => {
      // print version information at startup
      const msg =
        'Using video.js ' +
        videojs.VERSION +
        ' with videojs-wavesurfer ' +
        videojs.getPluginVersion('wavesurfer') +
        ' and wavesurfer.js ' +
        waveSurfer.VERSION;
      videojs.log(msg);
    });

    this.player.width = 1000;
    this.player.height = 1000;

    const isMobileDevice = /Mobi/i.test(window.navigator.userAgent);
    // if (!isMobileDevice && this.src != null)
    //   this.player.wavesurfer().load(this.player.src);

    store.commit('addPlayer', this);
    if (this.src !== null && this.src !== undefined) {
      this.player.src = this.src;
      // this.player.src.crossOrigin = 'anonymous';
      this.player.crossOrigin = 'anonymous';
    } else {
      try {
        this.player.record().getDevice();
      } catch {
        alert('fehler');
      }
    }

    store.commit('activePlayer', this);
    // device is ready
    this.player.on('deviceReady', () => {
      console.log('device is ready!');
    });

    // user clicked the record button and started recording
    this.player.on('startRecord', () => {
      const x = new Date().getTime();

      store.state.players.forEach(element => {
        //if(element.recordedData !== undefined)
        {
          console.log('play');
          element.player.play();
        }
      });
      const y = new Date().getTime();

      this.slider = y - x;
      console.log('offset: ' + this.slider.toString());
    });
    this.player.on('ended', () => {
      alert;
    }),
      // user completed recording and stream is available
      this.player.on('finishRecord', () => {
        const isMobileDevice = /Mobi/i.test(window.navigator.userAgent);
        if (!isMobileDevice && !store.state.waveform) {
          this.player.wavesurfer().load(this.player.recordedData);
          store.commit('setWaveForm', true);
        }
        console.log('finished recording: ', this.player.recordedData);
      });

    // error handling
    this.player.on('error', (element, error) => {
      console.warn(error);
    });

    this.player.on('deviceError', () => {
      console.error('device error:', this.player.deviceErrorCode);
    });
  }

  addFile(e) {
    const droppedFiles = e.dataTransfer.files;

    if (!droppedFiles) return;
    // this tip, convert FileList to array, credit: https://www.smashingmagazine.com/2018/01/drag-drop-file-uploader-vanilla-js/
    [...droppedFiles].forEach(f => {
      const reader = new FileReader();
      reader.onload = this.loadData;
      reader.addEventListener(
        'load',
        function() {
          // convert image file to base64 string
          const preview = document.querySelector('video');
          preview.src = reader.result;
          // this.player.record().getDevice();
          const css = document.createElement('style');
          css.type = 'text/css';
          css.setAttributeNode(document.createAttribute('scopped'));
          css.appendChild(
            document.createTextNode('.vjs-record .vjs-device-button.vjs-control{display:none}')
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
    this.files = this.files.filter(f => {
      return f != file;
    });
  }
  style() {
    return store.state.activePlayer == this ? 'border: dashed;' : '';
  }
  activate() {
    store.commit('activePlayer', this);
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

VideoJSRecord.player = undefined;
</script>

<style>
button.vjs-record.vjs-device-button.vjs-control.vjs-icon-av-perm {
  display: none !important;
}
.video-js .vjs-control-bar {
  display: none !important;
}
video {
  width: 10vh;
}
.vjs-record .vjs-device-button.vjs-control {
  display: none !important;
}
#videoJs {
  height: 100%;
}
.video-js.vjs-fluid,
.video-js.vjs-16-9,
.video-js.vjs-4-3 {
  height: 100%;
}
/* .video-js{
  height:10vh!important
} */
</style>
