<script>
import { ref } from 'vue';
import { auth } from '@/firebase';
import { useRouter } from 'vue-router';
import firebase from 'firebase/app'; // Import firebase

export default {
  setup() {
    const email = ref('');
    const password = ref('');
    const router = useRouter();

    const signIn = () => {
      auth.signInWithEmailAndPassword(email.value, password.value)
          .then((userCredential) => {
            const user = userCredential.user;
            console.log('Successfully signed in!', user);

            router.push({ name: 'home' }); // Redirect after sign-in
          })
          .catch((error) => {
            console.error(error.code);
            alert(error.message);
          });
    };

    const signInWithGoogle = () => {
      let provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth()
          .signInWithPopup(provider)
          .then((userCredential) => {
            const user = userCredential.user;
            console.log('Successfully signed in with Google!', user);

            router.push({ name: 'home' }); // Redirect after sign-in
          })
          .catch((error) => {
            console.error(error.code, error.message);
            alert('Google Sign-In Error. Please try again.');
          });
    };

    const register = () => {
      auth.createUserWithEmailAndPassword(email.value, password.value)
          .then((userCredential) => {
            const user = userCredential.user;
            console.log('Successfully registered!', user);
            router.push({ name: 'home' }); // Redirect after registration
          })
          .catch((error) => {
            console.error(error.code, error.message);
            alert('Registration Error. Please try again.');
          });
    };

    return { email, password, signIn, signInWithGoogle, register };
  },
};
</script>

<template>

  <div class="container min-vh-100 d-flex align-items-center justify-content-center">
    <div class="container rounded-3 border border-2 border-dark my-5 bg-white sign-in p-5">
      <h1 class="text-center mb-4">Sign In</h1>
      <p class="text-center"> You need to be signed in to gain access to the homework tracking app</p>

      <!-- Email Input -->
      <div class="mb-3">
        <label for="emailsign" class="form-label">Email address</label>
        <input type="email" class="form-control" id="emailsign" v-model="email" placeholder="name@example.com">
      </div>

      <!-- Password Input -->
      <div class="mb-3">
        <label for="passwordsign" class="form-label">Password</label>
        <input type="password" class="form-control" id="passwordsign" v-model="password" placeholder="password">
      </div>

      <!-- Sign In Button -->
      <button class="btn btn-primary btn-block mb-3" @click="signIn">Sign In</button>

      <!-- Alternative Sign-In Options -->
      <div class="text-center mb-3">
        <p>Or sign in with</p>
        <button class="btn btn-secondary me-2" @click="signInWithGoogle">
          <i class="fab fa-google me-1"></i> Google
        </button>
        <!-- Add other sign-in options here -->
      </div>

      <!-- Register Link -->
      <div class="text-center">
        <p>Don't have an account?</p>
        <button class="btn btn-outline-primary" @click="register">Register Here</button>
      </div>
    </div>
  </div>


</template>

<style>
/* Add your styles here if needed */
</style>
