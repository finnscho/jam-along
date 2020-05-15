<template>
  <div class="jo" style="margin-top:10vh">
    <v-app id="inspire">
      <v-container class="pa-4 text-center" style="background:#363636">
        <v-card>
          <h1 class="display-3 " style="color:FF914C">Jams</h1>
          <v-row class="fill-height" align="center" justify="center">
            <template>
              <v-col cols="12" md="4">
                <v-hover v-slot:default="{ hover }">
                  <v-card
                    :elevation="hover ? 12 : 2"
                    :class="{ 'on-hover': hover }"
                    style="background:#e03f3c"
                  >
                    <v-text-field
                      :disabled="true"
                      style="padding:30px"
                      label="New Jam"
                    ></v-text-field>
                    <v-img height="150px">
                      <v-card-title class="title white--text">
                        <v-row
                          class="fill-height flex-column"
                          justify="space-between"
                        >
                          <!-- <p class="mt-4 subheading text-center">
                     
                        </p> -->
                          <div class="align-self-center">
                            <router-link to="/RecorderApp"
                              ><v-btn
                                background-opacity="0"
                                :class="{ 'show-btns': hover }"
                                ><v-icon>mdi-plus</v-icon></v-btn
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
            <template v-for="item in $store.state.userProfile.projects">
              <Project :key="item.key" :item="item" />
            </template>
          </v-row>
        </v-card>
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
}
</script>
