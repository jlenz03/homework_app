<script>

import firebase from "firebase/app";

export default {
  name: "Navigation",

  props: {
    title: {
      type: String,
    },
    // eventually I'll make
    authUser: {
      required: true},

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
    // login(){
    //   // : Login with Google
    //   let provider = new firebase.auth.GoogleAuthProvider();
    //
    //   firebase.auth()
    //       .signInWithPopup(provider)
    //       .catch(error => {
    //         //let user know
    //         console.error(error, error.code, error.message);
    //       })
    // },

    logout() {
      firebase
          .auth()
          .signOut()
          .then(() => {
            // Successfully signed out
            console.log("User signed out");
            //router.push({ name: "sign-in" }); // Redirect to sign-in page
            //ask tyler how to get it to redirect without having to refresh it or if that's just something you gotta deal with


          })
          .catch((error) => {
            console.error("Sign out error:", error);
          });

    },
  },
}
</script>

<template>
  <nav class="navbar bg-body-tertiary">
    <div class="container-fluid">
      <a class="navbar-brand" href="#"> Homework App</a>
<!--      <img src="../../images/logo.png">-->
      <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
        <span ><i class="fa-solid fa-bars"></i></span>
      </button>

      <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
        <div class="offcanvas-header">
          <h4 class="offcanvas-title" id="offcanvasNavbarLabel">Homework App</h4>
          <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
          <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">

          <li data-bs-toggle="offcanvas" class="nav-item">
            <router-link   class="nav-link" to="/">Home</router-link>
          </li>
          <li data-bs-toggle="offcanvas" class="nav-item">
            <router-link  class="nav-link" to="/assignments">Assignments</router-link>
          </li>
          <li data-bs-toggle="offcanvas" class="nav-item">
            <router-link   class="nav-link"  to="/classes" >Classes</router-link>
          </li>
<!--          <li data-bs-toggle="offcanvas" class="nav-item">-->
<!--            <router-link class="nav-link" to="/register">Register</router-link>-->
<!--          </li>-->


            <li v-if="authUser"><a href="#" @click.prevent="logout">Logout</a></li>
            <li data-bs-toggle="offcanvas" class="nav-item" v-else>
              <router-link  class="nav-link" to="/sign-in">Login</router-link>
            </li>

        </ul>
      </div>



    </div>
    </div>
  </nav>







</template>

<style scoped>

</style>