<template>
  <v-content>
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="5.5"> </v-col>
        <v-col cols="1">
          <v-img src="../assets/logo_transparent_background.png" />
        </v-col>
        <v-col cols="5.5"> </v-col>
      </v-row>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="4">
          <v-card class="elevation-12">
            <v-toolbar dark flat>
              <v-toolbar-title class="primary--text">Login</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-card-text>
              <v-form>
                <v-text-field
                  v-model="email"
                  placeholder="Email"
                  label="Email"
                  name="Email"
                  type="text"
                ></v-text-field>
                <v-text-field
                  id="password"
                  v-model="password"
                  placeholder="Password"
                  type="password"
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" @click="login">Login</v-btn>
              <br />
              <v-spacer></v-spacer>
              <p>
                
                You don't have an account ? You can
                <router-link to="/sign-up">create one</router-link>
              </p>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
import firebase from "firebase";

export default {
  name: "login",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    login: function() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(
          (user) => {
            this.$router.replace("home");
          },
          (err) => {
            alert("Oops. " + err.message);
          }
        );
    },
  },
};
</script>

<style scoped>
/* "scoped" attribute limit the CSS to this component only */
</style>
