<template>
  <v-app id="inspire">
    <v-overlay :opacity="1" :value="overlay" :z-index="99">
      <v-img src="../assets/logo_transparent_background.png" />
      <v-progress-linear indeterminate color="#FF914C"></v-progress-linear>
    </v-overlay>
    <v-navigation-drawer v-model="drawer" app clipped>
      <v-list dense>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-view-dashboard</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Dashboard</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-settings</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Settings</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar overflow-hidden app clipped-left>
      <v-app-bar-nav-icon color="primary" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-side-icon>
        <v-img class="mr-3" src="../assets/logo_transparent_background.png" width="30%"> </v-img>
      </v-toolbar-side-icon>
    </v-app-bar>
    <v-container class="fill-height" fluid style="background:#FF914C">
      <v-row align="center" justify="center">
        <v-col cols="3"></v-col>
        <v-col align="center" cols="6" style="flex-basis:auto" class=" center">
          <ProjectGrid />
        </v-col>
        <v-col cols="3"></v-col>
      </v-row>
    </v-container>
    <v-footer app>
      <span>&copy; 2020</span>
      <span>
        <router-link to="/disclaimer">Disclaimer</router-link>
      </span>
    </v-footer>
  </v-app>
</template>

<script>
import firebase from 'firebase';
import VideoRecorderGrid from '../components/videoRecorder/VideoRecorderGrid.vue';
import DetailPanel from '../components/videoRecorder/DetailPanel.vue';
import store from '../store';
import JALStateService from '../components/services/JALStateService';
import ProjectGrid from '../components/project/ProjectGrid.vue';
export default {
  name: 'home',
  components: {
    ProjectGrid: ProjectGrid,
  },
  props: {
    source: String,
  },
  data: () => ({
    drawer: null,
    overlay: true,
  }),

  mounted: function() {
    this.overlay = true;
    this.init();
  },
  //   components: { VideoRecorderGrid, DetailPanel },
  methods: {
    async init() {
      JALStateService.prototype.loadUser(firebase.auth().currentUser.uid);
      await this.sleep(1000);
      this.overlay = false;
    },
    sleep(ms) {
      return new Promise(resolve => {
        setTimeout(resolve, ms);
      });
    },
    logout: function() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace('login');
        });
    },
  },
};
</script>

<style scoped>
/* change player background color */
#myVideo {
  background-color: #95ddf5;
}
</style>
