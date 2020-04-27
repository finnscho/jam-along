<template>
  <div id="app">
    <v-card>
    <audiorecorder />
    </v-card>
  </div>
</template>

<script>
import audiorecorder from './components/audio/audiorecorder.vue'

export default {
  name: 'app',
  components: {
    audiorecorder
  }
}
</script>

<style>
/* change player background color */
#myVideo {
  background-color: #95DDF5;
}
</style>