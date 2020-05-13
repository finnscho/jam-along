<template>
  <v-row align="center" justify="center">
    <v-col
      v-for="item in $store.state.userProfile.projects"
      :key="item.projectid"
      sm="8"
      md="4"
    >
      <v-card class="elevation-12">
        <v-toolbar dark flat>
          <v-toolbar-title class="primary--text">Project></v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-card-text>
          <router-link to="/RecorderApp"
            ><v-btn @click="click({ item })">öffnen</v-btn></router-link
          >
        </v-card-text>
      </v-card>
    </v-col>
    <v-col sm="8" md="4">
      <v-card class="elevation-12">
        <v-toolbar dark flat>
          <v-toolbar-title class="primary--text">Project></v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-card-text>
          <router-link to="/RecorderApp"><v-btn>NEU</v-btn></router-link>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

import store from "../../store";
import { JALProject } from "../models/models";
import JALStateService from "../services/JALStateService";
import firebase from "firebase";

@Component({})
export default class ProjectGrid extends Vue {
  constructor() {
    super();
  }
  mounted() {
    store.commit("setProject", "");
  }
  click(item) {
    store.commit("setProject", item.item.projectid);
  }
}
</script>

<style></style>
