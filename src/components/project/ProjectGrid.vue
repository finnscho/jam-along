<template>
  <v-row>
    <v-col cols="12" >
      <v-card>
        <v-container fluid>
          <v-row>
            <v-col
              v-for="item in $store.state.userProfile.projects"
              :key="item.projectid"
              class="d-flex child-flex"
              cols="4"
            >
           <Project/>
             
            </v-col>

            <v-col class="d-flex child-flex" cols="4">
              <v-card flat tile class="d-flex">
                <!-- <v-img
                  src="../../assets/logo.png"
                  aspect-ratio="1"
                  class="grey lighten-2"
                >
                  <template v-slot:placeholder>
                    <v-row
                      class="fill-height ma-0"
                      align="center"
                      justify="center"
                    >
                      <v-card-text> -->
                        <router-link to="/RecorderApp">
                          <v-btn>
                            <v-icon>mdi-plus</v-icon>
                          </v-btn>
                        </router-link>
                      <!-- </v-card-text>
                    </v-row>
                  </template>
                </v-img> -->
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-col>
  </v-row>
</template>

<!-- 

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
            ><v-btn @click="click({ item })"
              ><v-icon>mdi-pencil</v-icon></v-btn
            ></router-link
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
          <router-link to="/RecorderApp"
            ><v-btn><v-icon>mdi-plus</v-icon></v-btn></router-link
          >
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template> -->

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

import store from "../../store";
import { JALProject } from "../models/models";
import JALStateService from "../services/JALStateService";
import firebase from "firebase";
import Project from './Project.vue'
@Component({  components: {
   Project: Project
  }})
export default class ProjectGrid extends Vue {
  constructor() {
    super();
  }
  mounted() {
    store.commit("setProject", "");
  }
  click(item) {
    store.commit("setProject", item.item.projectid);
    store.commit(
      "setProjectName",
      item.item.name != "" ? "Jam" : item.item.name
    );
  }
}
</script>
