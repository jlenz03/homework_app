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
<!--            <a class="nav-link" aria-current="page" href=" ">Home</a>-->
            <router-link   class="nav-link" to="/">Home</router-link>
          </li>
          <li data-bs-toggle="offcanvas" class="nav-item">
            <router-link  class="nav-link" to="/assignments">Assignments</router-link>
          </li>
          <li data-bs-toggle="offcanvas" class="nav-item">
            <router-link   class="nav-link"  to="/classes" >Classes</router-link>
          </li>
          <li data-bs-toggle="offcanvas" class="nav-item">
<!--            <router-link class="nav-link" to="/news">News</router-link>-->
          </li>

          <li>
<!--                  <router-link class="nav-link d-flex justify-content-end" to="/users">LOGIN  </router-link>-->
<!--            <button type="button" class="btn btn-outline-light d-flex justify-content-end"> <i class="fa-solid fa-user"></i></button>-->
          </li>

        </ul>
      </div>



    </div>
    </div>
  </nav>







</template>

<style scoped>

</style>