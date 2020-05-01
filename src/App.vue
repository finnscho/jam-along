<template>
<v-app>
  <div id="app">
    <v-card>

    <VideoRecorderGrid />

    
    </v-card>
  </div>
</v-app>
</template>

<script>
import VideoRecorderGrid from './components/videoRecorder/VideoRecorderGrid.vue'

export default {
  name: 'app',
  components: {
    VideoRecorderGrid
  }
}
</script>

<style>
/* change player background color */
#myVideo {
  background-color: #95DDF5;
}
</style>