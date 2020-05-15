<template>
  <v-container>
    <v-card>
      <v-btn v-on:click="recordClick" label="Record"></v-btn>
    </v-card>
    <h1>Vocals</h1>
    <p>
      Offset
      <input
        type="range"
        min="-500"
        max="0"
        value="-150"
        id="offset"
        step="25"
      />
      <span id="offsetTotal">-150</span>ms
    </p>
    <p>
      <a href="#" id="record">&#9864; Record Start</a>
      <a href="#" id="recordStop">&#9724; Record Stop</a>
    </p>
    <p>
      <a href="#" id="play2">&#9654; Play</a>
      <a href="#" id="stop2">&#9724; Stop</a>
    </p>

    <h1>Vocals Sync</h1>
    <p>
      <a href="#" id="recordSync">&#9864; Record Sync Start</a>
      <a href="#" id="recordSyncStop">&#9724; Record Sync Stop</a>
    </p>
    <p>
      <a href="#" id="playSync">&#9654; Play Sync</a>
      <a href="#" id="stopSync">&#9724; Stop Sync</a>
    </p>

    <h1>Exported</h1>
    <p>
      <a href="#" id="export">&#10515; Export original</a>
      <a href="#" id="export2">&#10515; Export filled</a>
    </p>
    <div id="downloads"></div>
    <div id="player"></div>
  </v-container>
</template>

<script>
import Recorder from "../../../public/Recorder";
export default {
  data() {
    return {
      me: null,
      offset: -150,
      backing: null,
      backingInstance: null,
      backingOriginal: null,
      vocals: null,
      vocalsBuffers: null,
      vocalsInstance: null,
      vocalsOffset: null,
      vocalsRecording: null,
    };
  },
  methods: {
    init() {
      this.me = this;

      try {
        window.AudioContext =
          window.AudioContext ||
          window.webkitAudioContext ||
          window.mozAudioContext ||
          window.msAudioContext;
        navigator.getUserMedia =
          navigator.getUserMedia ||
          navigator.webkitGetUserMedia ||
          navigator.mozGetUserMedia ||
          navigator.msGetUserMedia;
        window.URL =
          window.URL || window.webkitURL || window.mozURL || window.msURL;
        this.me.context = new window.AudioContext();
        this.me.context.createGain =
          this.me.context.createGain || this.me.context.createGainNode;
      } catch (e) {
        window.alert(
          "Your browser does not support WebAudio, try Google Chrome"
        );
      }

      if (navigator.getUserMedia) {
        navigator.getUserMedia(
          {
            audio: true,
            video: true,
          },
          function(stream) {
            const input = this.me.context.createMediaStreamSource(stream);
            this.me.recorder = new Recorder(input);
          },
          function(e) {
            window.alert("Please enable your microphone to begin recording");
          }
        );
      } else {
        window.alert(
          "Your browser does not support recording, try Google Chrome"
        );
      }
    },

    /**
     * @method cue
     */
    cue(url, callback) {
      console.log("player.cue", url);
      this.me = this;
      if (this.request) {
        this.request.abort();
      } else {
        this.request = new XMLHttpRequest();
      }
      this.request.open("GET", url, true);
      this.request.responseType = "arraybuffer";
      this.request.onload = function() {
        console.log("player.cue.complete");
        this.me.context.decodeAudioData(this.me.request.response, function(
          buffer
        ) {
          callback(buffer);
        });
      };
      this.request.send();
    },
    /**
     * @method play
     */
    play: function(data, callback) {
      console.log("player.play", this.context.currentTime, data);
      this.me = this;
      const source = this.context.createBufferSource();
      const gainNode = this.context.createGain();
      if (!source.start) {
        source.start = source.noteOn;
      }
      if (!source.stop) {
        source.stop = source.noteOff;
      }
      source.connect(gainNode);
      gainNode.connect(this.context.destination);
      source.buffer = data;
      source.loop = true;
      source.startTime = this.context.currentTime;
      source.start(0);
      return source;
    },
    /**
     * @method stop
     */
    stop: function(source) {
      console.log("player.stop", this.context.currentTime, source);
      if (source) {
        source.stop(0);
      }
    },
    /**
     * @method record
     */
    record: function() {
      console.log("player.record", this.context.currentTime);
      this.recorder.clear();
      this.recorder.startTime = this.context.currentTime;
      this.recorder.record();
    },
    /**
     * @method recordStop
     */
    recordStop: function(callback) {
      this.me = this;
      console.log("player.recordStop", this.context.currentTime);
      this.recorder.stop();
      this.recorder.getBuffer(function(buffers) {
        callback(buffers);
      });
    },
    /**
     * @method sync
     */
    sync: function(action, target, param, callback) {
      (this.me = this),
        (this.offset =
          (this.context.currentTime - target.startTime) %
          target.buffer.duration);
      const time = target.buffer.duration - this.offset;
      console.log("player.sync", this.context.currentTime + this.time, action);
      if (this.syncTimer) {
        window.clearTimeout(this.syncTimer);
      }
      this.syncTimer = window.setTimeout(function() {
        const returned = this.me[action](param);
        if (callback) {
          callback(returned);
        }
      }, time * 1000);
    },
    /**
     * @method createBuffer
     */
    createBuffer: function(buffers, channelTotal) {
      let channel = 0;
      const buffer = this.context.createBuffer(
        channelTotal,
        buffers[0].length,
        this.context.sampleRate
      );
      for (channel = 0; channel < channelTotal; channel += 1) {
        buffer.getChannelData(channel).set(buffers[channel]);
      }
      return buffer;
    },
    /**
     * @method getOffset
     */
    getOffset: function(vocalsRecording, backingInstance, offset) {
      const diff =
        this.recorder.startTime + offset / 1000 - backingInstance.startTime;
      console.log("player.getOffset", diff);
      return {
        before: Math.round(
          (diff % backingInstance.buffer.duration) * this.context.sampleRate
        ),
        after: Math.round(
          (backingInstance.buffer.duration -
            ((diff + vocalsRecording.duration) %
              backingInstance.buffer.duration)) *
            this.context.sampleRate
        ),
      };
    },
    /**
     * @method offsetBuffer
     */
    offsetBuffer: function(vocalsBuffers, before, after) {
      console.log("player.offsetBuffer", vocalsBuffers, before, after);
      let i = 0;
      let channel = 0;
      const channelTotal = 2;
      let num = 0;
      const audioBuffer = this.context.createBuffer(
        channelTotal,
        before + vocalsBuffers[0].length + after,
        this.context.sampleRate
      );
      let buffer = null;
      for (channel = 0; channel < channelTotal; channel += 1) {
        buffer = audioBuffer.getChannelData(channel);
        for (i = 0; i < before; i += 1) {
          buffer[num] = 0;
          num += 1;
        }
        for (i = 0; i < vocalsBuffers[channel].length; i += 1) {
          buffer[num] = vocalsBuffers[channel][i];
          num += 1;
        }
        for (i = 0; i < after; i += 1) {
          buffer[num] = 0;
          num += 1;
        }
      }
      return audioBuffer;
    },
    recordClick() {
      alert("record");
      this.vocals = null;
      this.record();
    },
  },
  mounted() {
    this.init();
  },
};

/* example additional code */

// let offset = -150,
//   this.backing = null,
//   backingInstance = null,
//   backingOriginal = null,
//   vocals = null,
//   vocalsBuffers = null,
//   vocalsInstance = null,
//   vocalsOffset = null,
//   vocalsRecording = null;

// module.init();

// document.getElementById('play').addEventListener('click', function() {
//   module.cue('90bpm.wav', function(file) {
//     backing = file;
//     backingInstance = module.play(backing);
//     backingOriginal = backingInstance;
//   });
// });

// document.getElementById('stop').addEventListener('click', function() {
//   module.stop(backingInstance);
// });

// document.getElementById('play2').addEventListener('click', function() {
//   vocalsInstance = module.play(vocals);
// });

// document.getElementById('stop2').addEventListener('click', function() {
//   module.stop(vocalsInstance);
// });

// document.getElementById('record').addEventListener('click', function() {
//   vocals = null;
//   module.record();
// });

// document.getElementById('recordStop').addEventListener('click', function() {
//   module.recordStop(function(buffers) {
//     // calculate filled version for looping playback
//     vocalsBuffers = buffers;
//     vocalsRecording = module.createBuffer(vocalsBuffers, 2);
//     vocalsOffset = module.getOffset(vocalsRecording, backingOriginal, offset);
//     vocals = module.offsetBuffer(vocalsBuffers, vocalsOffset.before, vocalsOffset.after);
//   });
// });

// document.getElementById('recordSync').addEventListener('click', function() {
//   vocals = null;
//   module.sync('record', backingInstance);
// });

// document.getElementById('recordSyncStop').addEventListener('click', function() {
//   module.sync('recordStop', backingInstance, function(buffers) {
//     // calculate filled version for looping playback
//     vocalsBuffers = buffers;
//     vocalsRecording = module.createBuffer(vocalsBuffers, 2);
//     vocalsOffset = module.getOffset(vocalsRecording, backingOriginal, offset);
//     vocals = module.offsetBuffer(vocalsBuffers, vocalsOffset.before, vocalsOffset.after);
//   });
// });

// document.getElementById('playSync').addEventListener('click', function() {
//   module.sync('play', backingInstance, vocals, function(data) {
//     vocalsInstance = data;
//   });
// });

// document.getElementById('stopSync').addEventListener('click', function() {
//   module.sync('stop', backingInstance, vocalsInstance);
// });

// document.getElementById('offset').addEventListener('change', function(e) {
//   offset = e.target.value;
//   document.getElementById('offsetTotal').innerHTML = e.target.value;
//   vocalsOffset = module.getOffset(vocalsRecording, backingOriginal, offset);
//   vocals = module.offsetBuffer(vocalsBuffers, vocalsOffset.before, vocalsOffset.after);
//   // instant playback
//   module.stop(backingOriginal);
//   module.stop(backingInstance);
//   module.stop(vocalsInstance);
//   backingInstance = module.play(backing);
//   vocalsInstance = module.play(vocals);
// });

// document.getElementById('export').addEventListener('click', function() {
//   // export original recording
//   module.recorder.exportWAV(function(blob) {
//     let url = URL.createObjectURL(blob),
//       li = document.createElement('li'),
//       au = document.createElement('audio'),
//       hf = document.createElement('a');

//     au.controls = true;
//     au.src = url;
//     hf.href = url;
//     hf.download = new Date().toISOString().replace('T', '-').slice(0, -5) + '.wav';
//     hf.innerHTML = hf.download;
//     li.appendChild(au);
//     li.appendChild(hf);
//     document.getElementById('downloads').appendChild(li);
//   });
// });

// document.getElementById('export2').addEventListener('click', function() {
//   // export modified/filled recording
//   module.recorder.exportWAV(function(blob) {
//     let url = URL.createObjectURL(blob),
//       li = document.createElement('li'),
//       au = document.createElement('audio'),
//       hf = document.createElement('a');
//     au.controls = true;
//     au.src = url;
//     hf.href = url;
//     hf.download = new Date().toISOString().replace('T', '-').slice(0, -5) + (offset === '0' ? '-' + offset : offset) + 'ms.wav';
//     hf.innerHTML = hf.download;
//     li.appendChild(au);
//     li.appendChild(hf);
//     document.getElementById('downloads').appendChild(li);
//   }, 'audio/wav', vocalsOffset.before, vocalsOffset.after);
// });
</script>

<style scoped></style>
