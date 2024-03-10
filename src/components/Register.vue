<script>
// import { ref } from 'vue';
import { auth, db } from '@/firebase';
// import { useRouter } from 'vue-router';
import firebase from 'firebase/app';
import AppModal from "@/components/AppModal.vue";
import UserInfo from "@/components/UserInfo.vue";
import { User } from "@/models/User";

export default {
  name: "Register",
  components: { AppModal, UserInfo },
  data() {
    return {
      authUser: new User('', '', '', ''),
    }
  },
  props: {
    id: {
      type: String,
      required: true,
    },
    userInfo: {
      type: Array,
      required: true,
    },
  },
  methods: {
    addUser(uid, displayName, email, photoURL) {
      console.log(uid, displayName, email, photoURL)
      const userData = {
        email: email,
        displayName: displayName,
        photoURL: photoURL,
      };

      db.collection('users').doc(uid)
          .set(userData)
          .then(docRef => {
            console.log('User data added:', docRef);
            //this.authUser = new User('', '', '', '');

            // Emit an event to notify parent component
            this.$emit('user-registered', userData);
          })
          .catch(error => {
            console.error('Error adding user data:', error);
          });
    },
    signInWithGoogle() {
      let provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth()
          .signInWithPopup(provider)
          .then((userCredential) => {
            const user = userCredential.user;
            this.addUser(user.uid, user.displayName, user.email, user.photoURL);
            console.log('Successfully signed in with Google!', user);
            // this.$router.push({name: 'home'}); // Redirect after sign-in
          })
          .catch((error) => {
            console.error(error.code, error.message);
            alert('Google Sign-In Error. Please try again.');
          });
    },
    register() {
      auth.createUserWithEmailAndPassword(this.authUser.email, this.authUser.password)
          .then((userCredential) => {
            const user = userCredential.user;
              this.addUser(user.uid, this.authUser.displayName, user.email, '');
            user.updateProfile({
              displayName: this.authUser.displayName,
            }).then((user) => {
              console.log('Successfully registered with display name!', user);
              // this.$router.push({name: 'home'});
            }).catch((error) => {
              console.error('Error updating display name:', error);
              alert('Registration Error. Please try again.');
            });
          })
          .catch((error) => {
            console.error(error.code, error.message);
            alert('Registration Error. Please try again.');
          });
    },
  },
};
</script>

<template>
  <app-modal :id="id" title="Create an Account">
    <div class="mb-3">
      <label for="email" class="form-label">Email address</label>
      <input type="email" class="form-control" id="email" v-model="authUser.email" placeholder="name@example.com">
    </div>

    <div class="mb-3">
      <label for="password" class="form-label">Password</label>
      <input type="password" class="form-control" id="password" v-model="authUser.password" placeholder="password">
    </div>

    <div class="mb-3">
      <label for="displayname" class="form-label">Display Name</label>
      <input type="text" class="form-control" id="displayName" v-model="authUser.displayName" placeholder="display name here">
    </div>

    <button class="btn btn-primary btn-block mb-3" @click.prevent="register">Create Account</button>

    <div class="text-center mb-3">
      <p>Or sign in with</p>
      <button class="btn btn-secondary me-2" @click="signInWithGoogle">
        <i class="fab fa-google me-1"></i> Google
      </button>
    </div>


  </app-modal>
</template>

<style>
/* Add your styles here if needed */
</style>
