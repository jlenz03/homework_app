<script>

export default {
  name: "Navigation",

  props: {
    title: {
      type: String,
    },
    //eventually I'll make
    // authUser: {
    //   required: true},

    toDoList: {
      type: Array,
      required: true,
    },

    classList: {
      type: Array,
      required: true,
    },

  },
  // methods: {
  //   login(){
  //     // : Login with Google
  //     let provider = new firebase.auth.GoogleAuthProvider();
  //
  //     firebase.auth()
  //         .signInWithPopup(provider)
  //         .catch(error => {
  //           //let user know
  //           console.error(error, error.code, error.message);
  //         })
  //   },
  //
  //   logout(){
  //     // TODO: logout
  //   },
  // },
}
</script>

<template>
<!--  <ul class="list-unstyled components">-->
<!--   -->
<!--    <li v-if="authUser"><a href="#" @click.prevent="logout">Logout</a></li>-->
<!--    <li v-else><a href="#" @click.prevent="login">Login</a></li>-->
<!--  </ul>-->

  <nav class="navbar navbar-expand-lg">
    <div class="container-fluid">
      <a href="#" class="navbar-brand">
        <img src="../../images/logo.png" class="homeworkapplogo" alt="logo for homework app" width="100px" height="auto"  >
      </a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>


      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">

          <li class="nav-item">
<!--            <a class="nav-link" aria-current="page" href=" ">Home</a>-->
            <router-link class="nav-link" to="/">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/assignments">Assignments</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/classes">Classes</router-link>
          </li>
          <li class="nav-item">
<!--            <router-link class="nav-link" to="/news">News</router-link>-->
          </li>

        </ul>
      </div>

      <button type="button" class="btn btn-outline-light d-flex justify-content-end"> <i class="fa-solid fa-user"></i></button>

    </div>

  </nav>







</template>

<style scoped>

</style>