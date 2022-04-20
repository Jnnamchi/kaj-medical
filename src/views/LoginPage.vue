<template>
  <div>Login Page</div>
  <div id="firebaseui-auth-container" class="main-panel"></div>
</template>

<script>
// Firebase Libs
import { firebasePackage } from "../firebase";
import "firebase/auth";
import * as firebaseui from "firebaseui";

import router from "../router/index";

export default {
  name: "LoginPage",
  components: {},
  mounted() {
    this.initializeFirebaseUI()
  },
  methods: {
    initializeFirebaseUI() {
      var uiConfig = {
        signInOptions: [
          {
            provider:
            firebasePackage.auth.EmailAuthProvider.EMAIL_PASSWORD_SIGN_IN_METHOD,
          },
        ],
        // signInSuccessUrl: '/home',
        callbacks: {
          signInSuccessWithAuthResult() {
            router.push("/home");
            return;
          },
        },
      };
      var ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(firebasePackage.auth());
      ui.start('#firebaseui-auth-container', uiConfig);
    },
  },
};
</script>

<style></style>
