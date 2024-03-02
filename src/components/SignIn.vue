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
  <div>
    <h1>Sign In</h1>
    <p><input type="text" placeholder="Email" v-model="email" /></p>
    <p><input type="password" placeholder="Password" v-model="password" /></p>

    <p><button @click="signIn">Sign In</button></p>
    <p><button @click="signInWithGoogle">Sign In With Google</button></p>
    <p>Dont have an account?</p>
    <p><button @click="register">Register Here</button></p>
  </div>
</template>

<style>
/* Add your styles here if needed */
</style>
