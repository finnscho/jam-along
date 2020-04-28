<template>
<v-container>
    <video :id="id" class="video-js " playsinline></video>
<v-card-text>
    <label>offset</label>
        <v-row>
          <v-col class="pr-4">
            <v-slider
              v-model="slider"
              class="align-center"
              :max="max"
              :min="min"
              hide-details
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
        <v-btn label="commit Offset" v-on:click="setOffset"></v-btn>
      </v-card-text>





</v-container>
</template>

<script>
    import 'video.js/dist/video-js.css'
    import 'videojs-record/dist/css/videojs.record.css'

    import 'webrtc-adapter'
    import RecordRTC from 'recordrtc'
   

    import videojs from 'video.js'
    // eslint-disable-next-line
    import Record from 'videojs-record/dist/videojs.record.js'
    import 'videojs-offset';
    import store from "@/store";
    export default {
        data() {
            return {
                min: 0,
      max: 3000,
      slider: 0,
                id:  'mycomponent'+(Math.floor(Math.random() * Math.floor(9))).toString(),
                player: '',
                options: {
                    controls: true,
                    autoplay: false,
                    fluid: true,
                    loop: false,
     
                    controlBar: {
                        volumePanel: false,

                    },
                    plugins: {
                        // configure videojs-record plugin
                        record: {
                            audio: true,
                            video: true,
                            maxLength: 500,
                            debug: true
                        }
                    }
                }
            };
        },
        mounted() {

            
          //  this.myid = '234'// + (Math.floor(Math.random() * Math.floor(100)))
            /* eslint-disable no-console */
            this.player = videojs('#'+this.id, this.options, () => {
                // print version information at startup
                const msg = 'Using video.js ' + videojs.VERSION +
                    ' with videojs-record ' + videojs.getPluginVersion('record') +
                    ' and recordrtc ' + RecordRTC.version;
                videojs.log(msg);
                
            });

            store.commit("addPlayer", this.player);

            // device is ready
            this.player.on('deviceReady', () => {
                console.log('device is ready!');
            });

            // user clicked the record button and started recording
            this.player.on('startRecord', () => {
                const x = new Date().getTime();
                console.log('time x : ' + x.toString())
                  store.state.players.forEach(element => {

                if(element.recordedData !== undefined)
                    {
                    console.log('play');
                    element.play();
                    }
                });
                const y = new Date().getTime();
                console.log('time y : '+y.toString())
                this.slider = (y-x)
                console.log('offset: ' + this.slider.toString())

            });

            // user completed recording and stream is available
            this.player.on('finishRecord', () => {

                // the blob object contains the recorded data that
                // can be downloaded by the user, stored on server etc.
                console.log('finished recording: ', this.player.recordedData);
                 store.commit("addVideo", this.player.recordedData);
                
            });

            // error handling
            this.player.on('error', (element, error) => {
                console.warn(error);
            });

            this.player.on('deviceError', () => {
                console.error('device error:', this.player.deviceErrorCode);
            });


        },
        
  methods:{

      setOffset(){
        this.player.offset({
                start: this.slider/1000
                //Should the video go to the beginning when it ends
                });
          
      },
              sync(action, target, param, callback) {
                this.me = this,
                this.offset = (this.context.currentTime - target.startTime) % target.buffer.duration;
                const time = target.buffer.duration - this.offset;
                console.log('player.sync', this.context.currentTime + this.time, action);
                if (this.syncTimer) {
                window.clearTimeout(this.syncTimer);
                }
                this.syncTimer = window.setTimeout(function() {
                const returned = this.me[action](param);
                if (callback) {
                    callback(returned);
                }
                }, time * 1000);
            }
        },
        beforeDestroy() { 
            if (this.player) {
                this.player.dispose();
            }
        }
    }
</script>