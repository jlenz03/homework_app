<script>
import ClassListItem from "@/components/ClassListItem.vue";
import ClassItem from "@/models/ClassItemModel";
import { firebase, db, auth, storage } from "@/firebase/index";

export default {
  name: "ClassList",
  components: {ClassListItem},

  data: function() {
    return {
      classList: []

    }},
  props: {
    name: {
      type: String,
      default: '',
    },
    authUser: {
      type: Object,
    }

  },
  emits: ['delete'],

  methods: {
    loadClassList() {
      if (!this.authUser) {
        console.error('No authUser provided');
        return;
      }

      // Load classes from Firebase into classList array
      db.collection('users').doc(this.authUser.uid).collection('classList')
          .onSnapshot(snapshot => {
            this.classList = snapshot.docs.map(doc => new ClassItem(
                doc.data().name,
                doc.data().color,
                doc.id
            ));
          });
    },
  },

  // IMPORTANT!!!
  mounted() {
    this.loadClassList();
  },
};
</script>

<template>
  <div class="row rounded bg-white">
    <div class="col-12">
      <ul class="list-group" id="list">
        <class-list-item
            v-for="(item, i) in classList"
            :key="`classItem-${i}`"
            :item="item"
            v-if="authUser"
            :auth-user="authUser"
            @delete="deleteIt => $emit('delete', deleteIt)"
            :class-list="classList"
        ></class-list-item>
      </ul>
    </div>
  </div>
</template>