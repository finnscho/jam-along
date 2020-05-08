<template>
  <v-app>
    <div id="app" style="width=100vw">
      <v-card>
        <VideoRecorderGrid />
        <div height="50%"><DetailPanel /></div>
      </v-card>
    </div>
  </v-app>
</template>

<script>
import VideoRecorderGrid from "./components/videoRecorder/VideoRecorderGrid.vue";
import DetailPanel from "./components/videoRecorder/DetailPanel.vue";

export default {
  name: "app",
  components: {
    VideoRecorderGrid,
    DetailPanel,
  },
};
</script>

<style>
/* change player background color */
#myVideo {
  background-color: #95ddf5;
}
</style>
