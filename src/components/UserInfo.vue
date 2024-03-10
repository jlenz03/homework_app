<script>

import { firebase, db, auth, storage } from "@/firebase/index";
import {User} from "@/models/User";

export default {
  name: "UserInfo",
  components: {},

  data: function() {
    return {
     userInfo:[],

    }},
  props: {
    name: {
      type: String,
      default: '',
    },

    collection: {
      type: String,
    },


  },
  emits: ['delete'],

  methods: {
    loadUserInfo() {
      if (!this.authUser) {
        console.error('No authUser provided');
        return;
      }

      // Load classes from Firebase into userInfo array
      db.collection('users').doc(this.authUser.uid).collection('userInfo')
          .onSnapshot(snapshot => {
            let authUser = snapshot.docs.map(doc => {
              return new User(
                doc.data().email,
                doc.data().password,
                doc.data().displayName,
                doc.data().avatarurl,
                doc.data().completedAssignmentsCount,
                doc.data().lateAssignmentsCount,
                doc.data().onTimeCompletionRate,
                doc.data().tier,
              );
            });
              // Update the toDoList property with the new instances
              this.userInfo = authUser;
          });
    },
  },

  // IMPORTANT!!!
  mounted() {
    this.loadUserInfo();
  },
};
</script>

<template>
  <div class="row rounded bg-white">
    <div class="col-12">
      <ul class="list-group" id="list">

      </ul>
    </div>
  </div>
</template>