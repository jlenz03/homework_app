<script>
import { defineComponent } from "vue";
import AddTaskModal from "@/components/AddTaskModal.vue";
import ToDoList from "@/components/ToDoList.vue";
import Statistics from "@/components/Statistics.vue";
import Timer from "@/models/TimerModel";
import { User } from '@/models/User';
import { firebase, db, auth, storage } from "@/firebase/index";
import Assignment from "@/models/Assignment";
import Navigation from "@/components/Navigation.vue";
import ClassList from "@/components/ClassList.vue";
import SignIn from "@/pages/SignIn.vue";
import ClassItem from "@/models/ClassItemModel";

export default defineComponent({
  components: { ClassList, Navigation, Statistics, ToDoList, AddTaskModal, SignIn },

  data() {
    return {
      classList: [],
      toDoList: [],
      breakItDownList: [
        new Timer('', '', ''),
      ],
      authUser: {},
      selectedItem: {},
    };
  },
  props: {
    userInfo: {
      type: Array, // Update this with the correct type for userInfo
      default: () => [] // Example default value, change as needed
    },
    // classList: {
    //   type: Array,
    //
    // },
    // toDoList: {
    //   type: Array,
    //
    // },
  },

  methods: {


    loadClassList() {
      if (!this.authUser) {
        console.error('No authUser provided');
        return;
      }

      // Load classes from Firebase into user's classList array
      db.collection('users').doc(this.authUser.uid).collection('classList')
          .onSnapshot(snapshot => {
            this.classList = snapshot.docs.map(doc => new ClassItem(
                doc.data().name,
                doc.data().color,
                doc.id
            ));
          });
    },
    addClass(newClassFromModal) {
      this.classList.push(newClassFromModal);
    },
    addTask(newTaskFromModal) {
      this.toDoList.push(newTaskFromModal);
    },
    addTimer(timer) {
      this.toDoList.push(new Assignment('New Timer', '2023-12-31', 'false', 'Some Class', 'Some Type', 'Some Bid'));
    },
    subtract(item) {
      this.classList.splice(this.classList.indexOf(item), 1);
    },
    editClass(item) {
      this.selectedItem = item;
    },
    deleteClass(item) {
      this.selectedItem = item;
    }
  },
  created() {
    // Check for logged-in user
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        // They are logged in
        console.log('logged in!')
        this.authUser = new User(user);
        // Load initial data
        this.loadClassList();
      } else {
        // Not logged in
        console.log('logged out');
        this.authUser = null;
      }
    });


  },


});
</script>

<template>
  <div id="app">
    <navigation
        :class-list="classList"
        :to-do-list="toDoList"
        :auth-user="authUser"
        :user-info="userInfo"
    ></navigation>
    <router-view
        :class-list="classList"
        :to-do-list="toDoList"

        :auth-user="authUser"
        :user-info="userInfo"
    ></router-view>
  </div>
</template>

<style>
/* Your styles */
</style>
