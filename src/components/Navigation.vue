<script>
import firebase from "firebase/app";

export default {
  name: "Navigation",

  props: {
    title: {
      type: String,
    },
    authUser: {
      type: Object,
      required: true,
      default: () => ({}), // Default to an empty object
    },
    toDoList: {
      type: Array,
      required: true,
    },
    classList: {
      type: Array,
      required: true,
    },
  },
  methods: {
    logout() {
      firebase
          .auth()
          .signOut()
          .then(() => {
            console.log("User signed out");
          })
          .catch((error) => {
            console.error("Sign out error:", error);
          });
    },
  },
};
</script>

<template>
  <nav class="navbar navbar-expand-lg">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/">Homework App</router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <router-link class="nav-link" to="/">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/assignments">Assignments</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/classes">Classes</router-link>
          </li>
          <li v-if="authUser" @click="logout" class="nav-item">
            <a class="nav-link" href="#">Logout</a>
          </li>
          <li v-else class="nav-item">
            <router-link class="nav-link" to="/sign-in">Login</router-link>
          </li>
        </ul>
        <div v-if="authUser">
          <img :src="authUser.photoURL" class="avatar" alt="">
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
/* Your styles */
</style>