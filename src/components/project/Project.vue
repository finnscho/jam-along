<template>
  <v-col cols="12" md="4">
    <v-hover v-slot:default="{ hover }">
      <v-card style="background:#FF914C" :elevation="hover ? 12 : 2" :class="{ 'on-hover': hover }">
        <v-text-field
          autocomplete="off"
          @change="updateProjectName"
          style="padding:30px"
          label="Jam"
          color="white"
          :value="name"
        ></v-text-field>

        <v-img height="150px">
          <v-card-title class="title white--text">
            <v-row class="fill-height flex-column" justify="space-between">
              <!-- <p class="mt-4 subheading text-center">
                          JAM {{ item.name }}
                        </p> -->

              <!-- <div>
                        <p class="ma-0 body-1 font-weight-bold font-italic text-center">
                          {{ item.text }}
                        </p>
                        <p class="caption font-weight-medium font-italic text-center">
                          {{ item.subtext }}
                        </p>
                      </div> -->

              <div class="align-self-center">
                <v-btn :class="{ 'show-btns': hover }" @click="click"
                  ><v-icon :class="{ 'show-btns': hover }">mdi-pencil</v-icon></v-btn
                >
              </div>
            </v-row>
          </v-card-title>
        </v-img>
      </v-card>
    </v-hover>
  </v-col>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

import store from '../../store';
import { JALProject } from '../models/models';
import JALStateService from '../services/JALStateService';
import firebase from 'firebase';

@Component({})
export default class Project extends Vue {
  @Prop() item: any;
  projectName = 'no name';

  mounted() {
    const ref = firebase.database().ref('project/' + this.item.projectid);
    ref.on('value', function(snapshot) {
      store.commit('addProject', snapshot.val());
    });
  }
  get name() {
    this.projectName = this.item.name;
    return this.projectName;
  }

  click() {
    store.commit('setProject', this.item.projectid);
    store.commit('setProjectName', this.projectName);
    this.$router.replace('RecorderApp');
  }
  updateProjectName(value) {
    const updates = {};
    updates['project/' + this.item + '/name'] = value;

    return firebase
      .database()
      .ref()
      .update(updates);
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
