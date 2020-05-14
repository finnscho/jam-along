<template>
  <v-card flat tile class="d-flex"  @mouseenter="alert('d')">
    <v-overlay :absolute="absolute" :opacity="opacity" :value="overlay">
      <v-btn color="orange lighten-2" @click="overlay = false">
        Hide Overlay
      </v-btn>
    </v-overlay>
<v-hover>
    <v-img
      src="../../assets/logo_transparent_background.png"
      aspect-ratio="1"
      class="grey lighten-2"
    
    >
      <template v-slot:placeholder>
        <v-row class="fill-height ma-0" align="center" justify="center">
          <v-progress-circular
            indeterminate
            color="grey lighten-5"
          ></v-progress-circular>
        </v-row>
      </template>
    </v-img>
    </v-hover>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

import store from "../../store";
import { JALProject } from "../models/models";
import JALStateService from "../services/JALStateService";
import firebase from "firebase";

@Component({})
export default class Project extends Vue {
  absolute = true;
  opacity = 1;
  overlay = false;7

  hover(){
      alert('hover')
  }
}
</script>

<style></style>
