<template>
  <v-container fluid>
    <!-- <div        style="border-top:solid; border-color:orange"> -->

    <v-app-bar
      fixed
      :bottom="true"
      height="auto"
      :extended="false"
      extension-height="auto"
    >
      <v-card width="100%">
        <v-row align-start>

        </v-row>
        <v-row>
          <v-col cols="12">
            <v-tabs color="#FF914C" :centered="true">
              <v-tab href="#tab-up">
                <v-icon>mdi-chevron-down</v-icon>
              </v-tab>

              <v-tab href="#tab-sync">
                <v-icon hint="Timing...">mdi-metronome</v-icon>
              </v-tab>
              <v-tab href="#tab-audio">
                <v-icon hint="Audio...">mdi-microphone</v-icon>
              </v-tab>

              <v-tab href="#tab-filter">
                <v-icon hint="Camera...">mdi-camera</v-icon>
              </v-tab>
              <v-tab-item color="#FF914C" value="tab-sync" height="300px">
                <v-card flat tile>
                  <v-row>
                  </v-row>
                  </v-card>
                  </v-tab-item>
              <v-tab-item color="#FF914C" value="tab-sync" height="300px">
                <v-card flat tile>
                  <v-row>
                    <v-col cols="1"></v-col>
                    <v-col cols="10">
                
                      <v-card-text>
                        <label>Offset</label>
                        <v-row>
                          <v-col cols="12">
                            <v-slider
                              v-model="offset"
                              class="align-center"
                              style="margin-bottom:2%;"
                              max="3000"
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
                    </v-col>
                    <v-col cols="1"></v-col>
                  </v-row>
                </v-card>
              </v-tab-item>
              <v-tab-item color="#FF914C" value="tab-filter" height="300px">
              </v-tab-item>
            </v-tabs>
          </v-col>
        </v-row>
      </v-card>
      <!-- </div> -->
    </v-app-bar>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import VideoJSRecord from "./VideoJSRecord.vue";
import store from "../../store";
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
export default class DetailPanel extends Vue {
  slider = 0;
  get offset() {
    //  return 15;
    if (
      store.state.activePlayer != undefined &&
      store.state.activePlayer.player != undefined
    )
      return store.state.activePlayer.player.slider;
    else return 0;
  }
  set offset(value) {
    this.slider = value;
    console.log("offset: " + value / 1000);
    //@ts-ignore
   // store.state.activePlayer.slider = value / 1000;
    store.state.activePlayer.player.offset({
      start: value / 1000,
      //Should the video go to the beginning when it ends
    });
  }

  constructor(params) {
    super(params);
  }
  // setOffset() {

  // }
}
</script>

<style scoped>
.waveform {
  height: 5px;
}

</style>
