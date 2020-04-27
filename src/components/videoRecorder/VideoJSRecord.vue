<template>
    <video :id="id" class="video-js " playsinline></video>
</template>

<script>
    import 'video.js/dist/video-js.css'
    import 'videojs-record/dist/css/videojs.record.css'

    import 'webrtc-adapter'
    import RecordRTC from 'recordrtc'

    import videojs from 'video.js'
    // eslint-disable-next-line
    import Record from 'videojs-record/dist/videojs.record.js'
    import store from "@/store";
    export default {
        data() {
            return {
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
                  store.state.players.forEach(element => {

                if(element.recordedData !== undefined)
                    {
                    console.log('play');
                    element.play();
                    }
                });
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
        beforeDestroy() { 
            if (this.player) {
                this.player.dispose();
            }
        }
    }
</script>