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
              <v-toolbar-title>Sign up</v-toolbar-title>
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
                  v-model="name"
                  placeholder="Name"
                  label="name"
                  name="name"
                  type="text"
                ></v-text-field>
                <v-text-field
                  v-model="lastname"
                  placeholder="Lastname"
                  label="lastname"
                  name="lastname"
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
              <v-btn class="primary--text" @click="signUp">Sign Up</v-btn>
              <br />
              <v-spacer></v-spacer>
              <p></p>
              <p>or go back to <router-link to="/login">login</router-link></p>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-footer app>
      <span>&copy; 2020</span>
      <p>
        <router-link to="/disclaimer">Disclaimer</router-link>
      </p>
    </v-footer>
  </v-content>
</template>
<script>
import firebase from "firebase";
import JALStateService from "../components/services/JALStateService";
export default {
  name: "signUp",
  data() {
    return {
      email: "",
      password: "",
      name: "",
      lastname: "",
    };
  },
  methods: {
    signUp: function() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(
          (user) => {
            JALStateService.prototype.createUser(
              firebase.auth().currentUser.uid,
              this.email,
              this.name,
              this.lastname
            );
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
.sign-up {
  margin-top: 40px;
}
input {
  margin: 10px 0;
  width: 20%;
  padding: 15px;
}
button {
  margin-top: 10px;
  width: 10%;
  cursor: pointer;
}
span {
  display: block;
  margin-top: 20px;
  font-size: 11px;
}
</style>
