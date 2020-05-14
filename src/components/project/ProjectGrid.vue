<template>
  <div id="app">
    <v-app id="inspire">
      <v-container class="pa-4 text-center">
        <v-row class="fill-height" align="center" justify="center">
          <template v-for="item in $store.state.userProfile.projects">
            <v-col :key="item.projectid" cols="12" md="4">
              <v-hover v-slot:default="{ hover }">
                <v-card
                  :elevation="hover ? 12 : 2"
                  :class="{ 'on-hover': hover }"
                >
                  <v-img
                    src="../../assets/logo_transparent_background.png"
                    height="150px"
                  >
                    <v-card-title class="title white--text">
                      <v-row
                        class="fill-height flex-column"
                        justify="space-between"
                      >
                        <p class="mt-4 subheading text-left">
                          JAM {{ item.name }}
                        </p>

                        <!-- <div>
                        <p class="ma-0 body-1 font-weight-bold font-italic text-left">
                          {{ item.text }}
                        </p>
                        <p class="caption font-weight-medium font-italic text-left">
                          {{ item.subtext }}
                        </p>
                      </div> -->

                        <div class="align-self-center">
                          <router-link to="/RecorderApp">
                            <v-btn
                              :class="{ 'show-btns': hover }"
                              @click="click({ item })"
                              ><v-icon :class="{ 'show-btns': hover }"
                                >mdi-pencil</v-icon
                              ></v-btn
                            ></router-link
                          >
                        </div>
                      </v-row>
                    </v-card-title>
                  </v-img>
                </v-card>
              </v-hover>
            </v-col>
          </template>
          <template>
            <v-col cols="12" md="4">
              <v-hover v-slot:default="{ hover }">
                <v-card
                  :elevation="hover ? 12 : 2"
                  :class="{ 'on-hover': hover }"
                >
                  <v-img
                  
                    height="150px"
                  >
                    <v-card-title class="title white--text">
                      <v-row
                        class="fill-height flex-column"
                        justify="space-between"
                      >
                        <p class="mt-4 subheading text-left">
                          New
                        </p>
                        <div class="align-self-center">
                          <router-link to="/RecorderApp"
                            ><v-btn :class="{ 'show-btns': hover }"
                              ><v-icon>mdi-plus</v-icon></v-btn
                            ></router-link
                          >
                          >
                        </div>
                      </v-row>
                    </v-card-title>
                  </v-img>
                </v-card>
              </v-hover>
            </v-col>
          </template>
        </v-row>
      </v-container>
    </v-app>
  </div>
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
import Project from "./Project.vue";
@Component({
  components: {
    Project: Project,
  },
})
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
<style scoped>
.v-card {
  transition: opacity 0.4s ease-in-out;
}

.v-card:not(.on-hover) {
  opacity: 0.6;
}

.show-btns {
  color: rgba(255, 255, 255, 1) !important;
}
</style>
