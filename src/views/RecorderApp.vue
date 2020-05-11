<template>
  <div class="RecorderApp">
    <button @click="logout">Logout</button>
    <VideoRecorderGrid />
    <div height="50%"><DetailPanel /></div>
  </div>
</template>

<script>
import firebase from "firebase";
import VideoRecorderGrid from "../components/videoRecorder/VideoRecorderGrid.vue";
import DetailPanel from "../components/videoRecorder/DetailPanel.vue";

export default {
  name: "RecorderApp",
  components: { VideoRecorderGrid, DetailPanel },
  methods: {
    logout: function() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace("login");
        });
    },
  },
};
</script>

<style>
/* change player background color */
#myVideo {
  background-color: #95ddf5;
}
html {
  overflow-y: hidden !important;
}
</style>

¨
