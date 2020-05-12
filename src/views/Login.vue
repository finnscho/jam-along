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
      <v-footer app>
        <span>&copy; 2020</span>
        <span>
          <router-link to="/disclaimer">Disclaimer</router-link>
        </span>
      </v-footer>
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

// import fb from "../firebaseConfig.js";

// export default {
//   data() {
//     return {
//       loginForm: {
//         email: "",
//         password: "",
//       },
//       signupForm: {
//         name: "",
//         title: "",
//         email: "",
//         password: "",
//       },
//       passwordForm: {
//         email: "",
//       },
//       showLoginForm: true,
//       showForgotPassword: false,
//       passwordResetSuccess: false,
//       performingRequest: false,
//       errorMsg: "",
//     };
//   },
//   methods: {
//     toggleForm() {
//       this.errorMsg = "";
//       this.showLoginForm = !this.showLoginForm;
//     },
//     togglePasswordReset() {
//       if (this.showForgotPassword) {
//         this.showLoginForm = true;
//         this.showForgotPassword = false;
//         this.passwordResetSuccess = false;
//       } else {
//         this.showLoginForm = false;
//         this.showForgotPassword = true;
//       }
//     },
//     login() {
//       this.performingRequest = true;

//       fb.auth
//         .signInWithEmailAndPassword(
//           this.loginForm.email,
//           this.loginForm.password
//         )
//         .then((user) => {
//           this.$store.commit("setCurrentUser", user);
//           this.$store.dispatch("fetchUserProfile");
//           this.performingRequest = false;
//           this.$router.push("/home");
//         })
//         .catch((err) => {
//           console.log(err);
//           this.performingRequest = false;
//           this.errorMsg = err.message;
//         });
//     },
//     signup() {
//       this.performingRequest = true;

//       fb.auth
//         .createUserWithEmailAndPassword(
//           this.signupForm.email,
//           this.signupForm.password
//         )
//         .then((user) => {
//           this.$store.commit("setCurrentUser", user);

//           // create user obj
//           fb.usersCollection
//             .doc(user.uid)
//             .set({
//               name: this.signupForm.name,
//               title: this.signupForm.title,
//             })
//             .then(() => {
//               this.$store.dispatch("fetchUserProfile");
//               this.performingRequest = false;
//               this.$router.push("/home");
//             })
//             .catch((err) => {
//               console.log(err);
//               this.performingRequest = false;
//               this.errorMsg = err.message;
//             });
//         })
//         .catch((err) => {
//           console.log(err);
//           this.performingRequest = false;
//           this.errorMsg = err.message;
//         });
//     },
//     resetPassword() {
//       this.performingRequest = true;

//       fb.auth
//         .sendPasswordResetEmail(this.passwordForm.email)
//         .then(() => {
//           this.performingRequest = false;
//           this.passwordResetSuccess = true;
//           this.passwordForm.email = "";
//         })
//         .catch((err) => {
//           console.log(err);
//           this.performingRequest = false;
//           this.errorMsg = err.message;
//         });
//     },
//   },
// };
</script>

<style lang="scss" scoped></style>
