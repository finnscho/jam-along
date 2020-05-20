import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import 'videojs-record/dist/css/videojs.record.css';
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import 'webrtc-adapter';
import RecordRTC from 'recordrtc';

// eslint-disable-next-line
import Record from 'videojs-record/dist/videojs.record.js';
import 'videojs-offset';
import store from '@/store';

// import { jalVideo } from "../models/models";
// import ffmpeg from 'ffmpeg.js';
// import  MediaStreamToWebm from 'mediastream-to-webm'
import VideoStreamMerger from 'video-stream-merger';

export default class JalffmpegService {
  player: videojs;
  mergeVideos(videos: any[]) {
    const merger = new VideoStreamMerger();
    merger.setOutputSize(1200, 1200);
    let x = 0;
    let width = 0;
    let height = 0;
    let y = videos.length > 2 ? 0 : merger.height / 4;

    videos.forEach(element => {
      //  const media = { ...element.record().mediaElement };
      let media: HTMLMediaElement;
      if (element.src != null) {
        media = document.getElementById(element.id + '_html5_api') as HTMLMediaElement;
      } else {
        //DeepCopy
        media = element.player.record().mediaElement as HTMLMediaElement;
      }
      store.state.videoGrid.forEach(gridVideo => {
        if (gridVideo.id == element.id) {
          x = gridVideo.x * 200;
          y = gridVideo.y * 200;
          width = Math.floor(gridVideo.sizeX / 10) * 200;
          height = width;
        }
      });
      merger.addMediaElement('webm', media, {
        //merger.addStream(videos[i].record().stream, {
        x: x, // position of the topleft corner
        y: y,
        width: width,
        height: height,

        // we don't want sound from the screen (if there is any)
      });
    });

    // // Start the merging. Calling this makes the result available to us
    merger.start();

    const outputElement = document.querySelector('#output');
    if (outputElement !== null) {
      const media = outputElement as HTMLMediaElement;
      media.srcObject = merger.result;
      media.autoplay = true;
    }

    return merger;
  }

  deepCopy(obj) {
    let copy;

    // Handle the 3 simple types, and null or undefined
    if (null == obj || 'object' != typeof obj) return obj;

    // Handle Date
    if (obj instanceof Date) {
      copy = new Date();
      copy.setTime(obj.getTime());
      return copy;
    }

    // Handle Array
    if (obj instanceof Array) {
      copy = [];
      for (let i = 0, len = obj.length; i < len; i++) {
        copy[i] = this.deepCopy(obj[i]);
      }
      return copy;
    }

    // Handle Object
    if (obj instanceof Object) {
      copy = {};
      for (const attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = this.deepCopy(obj[attr]);
      }
      return copy;
    }

    throw alert("Unable to copy obj! Its type isn't supported.");
  }
}
