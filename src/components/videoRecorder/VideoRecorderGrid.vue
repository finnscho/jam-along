<template>
  <v-container fluid>
      <v-card >
        <v-btn v-on:click="click">play all</v-btn>
        <v-btn v-on:click="record">record all</v-btn>

      <v-row class="pa-0" >
          <v-col class="pa-0"><video-js-recorder  class="pa-0" /></v-col>
          <v-col class="pa-0" ><video-js-recorder class="pa-0" /></v-col>
      </v-row>
      <v-row class="pa-0">
          <v-col class="pa-0" ><video-js-recorder class="pa-0" /></v-col>
          <v-col class="pa-0"><video-js-recorder class="pa-0" /></v-col>
      </v-row>
      </v-card>
  </v-container>
</template>
<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import VideoJSRecord from "./VideoJSRecord.vue";
import store from "../../store";
import {VideoStreamMerger} from 'video-stream-merger'



@Component({
  components: {
    "video-js-recorder": VideoJSRecord
  },
})
export default class VideoRecorderGrid extends Vue {







public click(){
  store.state.players.forEach(element => {

   // if(element.recordedData !== undefined)
    {
      console.log('play');
      element.play();
    }
  });
}
public record(){
}

}
</script>

<style >
v-col{
  padding:0px;
}
<!--  -->
</style>