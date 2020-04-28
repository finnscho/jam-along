<template>
  <v-container fluid>
    <v-layout justify-center>
      <v-app-bar fixed dense>
        <v-btn v-on:click="click">
          <v-icon color="orange">mdi-play</v-icon>
        </v-btn>
        <v-btn v-on:click="pause">
          <v-icon color="orange">mdi-pause</v-icon>
        </v-btn>
        <v-btn v-on:click="stop">
          <v-icon color="orange">mdi-stop</v-icon>
        </v-btn>
        <v-btn v-on:click="save" style="margin-left:50px">
          <v-icon color="orange">mdi-download</v-icon>
        </v-btn>
      </v-app-bar>
      <v-hover>
        <!-- <v-card :style="{background-color: bulkselected?'primary':'black'}" > -->
        <v-card class="maincard" width="100%">
          <v-row>
            <v-col>
              <v-row>
                <v-col v-for="n in children" :key="n" cols="6" md="5">
                  <video-js-recorder />
                </v-col>

                <v-col>
                  <v-btn v-on:click="children.push('Hallo')">
                    <v-icon color="orange">mdi-plus</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-card>
      </v-hover>
    </v-layout>
  </v-container>
  <!-- <v-container fluid>
      <v-card >
        <v-btn v-on:click="click">play all</v-btn>
        <v-btn v-on:click="save">save</v-btn>

      <v-row class="pa-0" >
          <v-col class="pa-0"><video-js-recorder  class="pa-0" /></v-col>
          <v-col class="pa-0" ><video-js-recorder class="pa-0" /></v-col>
      </v-row>
      <v-row class="pa-0">
          <v-col class="pa-0" ><video-js-recorder class="pa-0" /></v-col>
          <v-col class="pa-0"><video-js-recorder class="pa-0" /></v-col>
      </v-row>
      </v-card>
  </v-container>-->
</template>
<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import VideoJSRecord from "./VideoJSRecord.vue";
import store from "../../store";
import { VideoStreamMerger } from "video-stream-merger";

@Component({
  components: {
    "video-js-recorder": VideoJSRecord
  }
})
export default class VideoRecorderGrid extends Vue {
  children: any;

  constructor(params) {
    super(params);
    this.children = ["Gustav"];
  }

  // public addPlayer(){

  // alert('')
  // //   const ComponentClass = Vue.extend(VideoJSRecord)

  // // const componentInstance = new Vue( Object.assign({}, VideoJSRecord))
  //   this.children.push({nam:'Hallo'});
  // }
  public click() {
    store.state.players.forEach(element => {
      // if(element.recordedData !== undefined)
      {
        console.log("play");
        element.play();
      }
    });
  }
  public pause() {
    store.state.players.forEach(element => {
      // if(element.recordedData !== undefined)
      {
        console.log("pause");
        element.pause();
      }
    });
  }
  public stop() {
    store.state.players.forEach(element => {
      // if(element.recordedData !== undefined)
      {
        console.log("stop");
        element.stop();
      }
    });
  }
  public save() {
    let i = 1;
    store.state.players.forEach(element => {
      if (element.record() !== undefined) {
        console.log("save");
        element.record().saveAs({ video: "video" + i + ".webm" });
        i++;
      }
    });
  }
}
</script>

<style >
v-col {
  padding: 0px;
}
.maincard {
  padding-top: 25%;
}
</style>