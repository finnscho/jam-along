<template>
  <v-container fluid>
      <v-card >
      <v-row>
          <v-col><video-js-recorder /></v-col>
          <v-col><video-js-recorder /></v-col>
      </v-row>
      <v-row>
          <v-col><video-js-recorder /></v-col>
          <v-col><video-js-recorder /></v-col>
      </v-row>
      </v-card>
  </v-container>
</template>
<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import VideoJSRecord from "./VideoJSRecord.vue";


@Component({
  components: {
    "video-js-recorder": VideoJSRecord
  },
})
export default class VideoRecorderGrid extends Vue {

getId() {
   
    return (Math.floor(Math.random() * Math.floor(1000))).toString();
}
}
</script>

<style>

</style>