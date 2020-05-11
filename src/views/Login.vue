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
              <v-btn class="primary--text" @click="login">Login</v-btn>
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

<style lang="scss" scoped>
.sign-in-detail {
  color: var(--iq-white);
}
.sign-in-page {
  height: 100vh;
  background: var(--iq-primary);
}
.sign-in-detail {
  padding: 100px;
  height: 100vh;
}
.sign-in-logo {
  display: inline-block;
  width: 100%;
}
.sign-in-logo img {
  height: 50px;
}
.sign-in-from {
  padding: 0 60px;
}
.sign-info {
  border-top: 1px solid var(--iq-border-dark);
  margin-top: 30px;
  padding-top: 20px;
}
.iq-social-media {
  margin: 0;
  padding: 0;
  float: right;
}
.iq-social-media li {
  list-style: none;
  float: left;
  margin-right: 10px;
}
.iq-social-media li:last-child {
  margin-right: 0;
}
.iq-social-media li a {
  height: 30px;
  width: 30px;
  text-align: center;
  font-size: 18px;
  line-height: 30px;
  display: inline-block;
  -webkit-border-radius: 7px;
  -moz-border-radius: 7px;
  border-radius: 7px;
  background: var(--iq-dark-primary);
  color: var(--iq-primary) !important;
}
.iq-social-media li a:hover {
  text-decoration: none;
}
section.sign-in-page .bg-white {
  background: var(--iq-dark-box) !important;
}
.sign-in-page .container {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.sign-in-page {
  background: var(--iq-dark-bg);
  background: -moz-linear-gradient(-45deg, red 0%, blue 100%);
  background: -webkit-linear-gradient(-45deg, #1b2441 0%, #182039 100%);
  background: linear-gradient(135deg, #1b2441 0%, #182039 100%);
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#00adef', endColorstr='#0076e5', GradientType=1);
  position: relative;
  overflow: hidden;
  height: 100vh;
  width: 100%;
  margin: 0px auto;
  padding: 0px auto;
}
#container-inside {
  position: relative;
  min-width: 960px;
  max-width: 1280px;
  height: auto;
  min-height: 100%;
  margin: 0px auto;
  padding: 0px auto;
  overflow: visible;
}
#circle-small {
  -webkit-animation: circle-small-scale 3s ease-in-out infinite alternate;
  animation: circle-small-scale 3s ease-in-out infinite alternate;
  animation-timing-function: cubic-bezier(0.6, 0, 0.4, 1);
  animation-delay: 0s;
  position: absolute;
  top: 200px;
  left: -150px;
  background: #34416d;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  opacity: 0.4;
}
#circle-medium {
  -webkit-animation: circle-small-scale 3s ease-in-out infinite alternate;
  animation: circle-small-scale 3s ease-in-out infinite alternate;
  animation-timing-function: cubic-bezier(0.6, 0, 0.4, 1);
  animation-delay: 0.3s;
  position: absolute;
  top: 50px;
  left: -300px;
  background: #303f6b;
  width: 600px;
  height: 600px;
  border-radius: 50%;
  opacity: 0.3;
}
#circle-large {
  -webkit-animation: circle-small-scale 3s ease-in-out infinite alternate;
  animation: circle-small-scale 3s ease-in-out infinite alternate;
  animation-timing-function: cubic-bezier(0.6, 0, 0.4, 1);
  animation-delay: 0.6s;
  position: absolute;
  top: -100px;
  left: -450px;
  background: #3d4d82;
  width: 900px;
  height: 900px;
  border-radius: 50%;
  opacity: 0.2;
}
#circle-xlarge {
  -webkit-animation: circle-small-scale 3s ease-in-out infinite alternate;
  animation: circle-small-scale 3s ease-in-out infinite alternate;
  animation-timing-function: cubic-bezier(0.6, 0, 0.4, 1);
  animation-delay: 0.9s;
  position: absolute;
  top: -250px;
  left: -600px;
  background: #6482e2;
  width: 1200px;
  height: 1200px;
  border-radius: 50%;
  opacity: 0.1;
}
#circle-xxlarge {
  -webkit-animation: circle-small-scale 3s ease-in-out infinite alternate;
  animation: circle-small-scale 3s ease-in-out infinite alternate;
  animation-timing-function: cubic-bezier(0.6, 0, 0.4, 1);
  animation-delay: 1.2s;
  position: absolute;
  top: -400px;
  left: -750px;
  background: #18203a;
  width: 1500px;
  height: 1500px;
  border-radius: 50%;
  opacity: 0.05;
}
@-webkit-keyframes circle-small-scale {
  0% {
    -webkit-transform: scale(1);
  }
  100% {
    -webkit-transform: scale(1.1);
  }
}
@keyframes circle-small-scale {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(1.1);
  }
}
</style>
