<template>
  <div id="nav">
    <span v-if="userLoggedIn"><a v-on:click="logout()" class="nav-item">Logout</a> | </span>
    <span v-else><router-link to="/login">Login</router-link> | </span>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </div>
  <router-view />
</template>
<script>

// Firebase Libs
import { firebasePackage, logoutFirebase } from './firebase'

export default {
  data () {
    return {
      userLoggedIn: false
    }
  },
  mounted() {
    this.userLoggedIn = false
    this.isLoggedIn()
  },
  methods: {
    isLoggedIn () {
      // Check if authenticated for protected navigation
      firebasePackage.auth().onAuthStateChanged((user) => {
        if (user) {
          this.userLoggedIn = true
        } else {
          this.userLoggedIn = false
        }
      })
    },
    logout () {
      logoutFirebase()
      firebasePackage.auth().signOut().then(() => {
        this.$router.push("/login")
      })
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
