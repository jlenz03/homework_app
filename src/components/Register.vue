<script>
import { ref } from 'vue';
import { auth, db } from '@/firebase';
import { useRouter } from 'vue-router';
import firebase from 'firebase/app';
import AppModal from "@/components/AppModal.vue";
import UserInfo from "@/components/UserInfo.vue";
import {User} from "@/models/User";

export default {
  name: "Register",
  components: { AppModal, UserInfo },
  data() {
    return {
      newUser: new User('', '', '', ''),
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
    authUser: {
      type: Object,
      required: true,
    },
  },
  methods: {
    addUser: function () {

      const userData = {
        email: this.newUser.email,
        password: this.newUser.password,
        displayName: this.newUser.displayName,
        photoURL: this.newUser.photoURL,
        // completedAssignmentsCount: this.newUser.completedAssignmentsCount,
        // lateAssignmentsCount: this.newUser.lateAssignmentsCount,
        // onTimeCompletionRate: this.newUser.onTimeCompletionRate,
        // tier: this.newUser.tier,
      };

      // Add user data to Firebase collection
      db.collection('users')
          .add(userData)
          .then(docRef => {
            console.log('User data added:', docRef.id);
            // Clear the form (reset the object)
            this.newUser = new User('', '', '', '');
          })
          .catch(error => {
            console.error('Error adding user data:', error);
          });
    },
  },
  setup() {
    const email = ref('');
    const password = ref('');
    const displayName = ref('');
    const router = useRouter();

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

            // Set the display name for the user
            user.updateProfile({
              displayName: displayName.value,
            }).then(() => {
              console.log('Successfully registered with display name!', user);
              router.push({ name: 'home' }); // Redirect after registration
            }).catch((error) => {
              console.error('Error updating display name:', error);
              alert('Registration Error. Please try again.');
            });
          })
          .catch((error) => {
            console.error(error.code, error.message);
            alert('Registration Error. Please try again.');
          });
    };

    return { email, password, displayName, signInWithGoogle, register };
  },
};
</script>

<template>
  <app-modal :id="id" title="Create an Account">
    <div class="mb-3">
      <label for="email" class="form-label">Email address</label>
      <input type="email" class="form-control" id="email" v-model="newUser.email" placeholder="name@example.com">
    </div>

    <div class="mb-3">
      <label for="password" class="form-label">Password</label>
      <input type="password" class="form-control" id="password" v-model="newUser.password" placeholder="password">
    </div>

    <div class="mb-3">
      <label for="displayname" class="form-label">Display Name</label>
      <input type="text" class="form-control" id="displayName" v-model="newUser.displayName" placeholder="display name here">
    </div>

    <button class="btn btn-primary btn-block mb-3" @click="register" @click.prevent="addUser">Create Account</button>

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
