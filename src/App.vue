<template>
  <v-app>
    <div id="app" style="width=100vw">
      <v-card>
        <router-view />
      </v-card>
    </div>
      <footer>
    <cookie-law theme="blood-orange"></cookie-law>
  </footer>
  </v-app>
  
</template>

<script>
// import VideoRecorderGrid from "./components/videoRecorder/VideoRecorderGrid.vue";
// import DetailPanel from "./components/videoRecorder/DetailPanel.vue";
 import CookieLaw from 'vue-cookie-law'

export default {
  name: "app",
  components: {
    CookieLaw
  },
  data() {
    return {
      valueDeterminate: 50,
    };
  },
};
</script>

<style>
/* change player background color */
#myVideo {
  background-color: #95ddf5;
}

</style>
