

<script >

import { defineComponent } from "vue";
import AddTaskModal from "@/components/AddTaskModal.vue";
import ToDoList from "@/components/ToDoList.vue";
import Statistics from "@/components/Statistics.vue";
import ClassItem from "@/models/ClassItemModel";
import Timer from "@/models/TimerModel";
import { firebase, db, auth, storage } from "@/firebase/index";
import Assignment from "@/models/Assignment";
import Navigation from "@/components/Navigation.vue";
import ClassList from "@/components/ClassList.vue";

export default defineComponent({
  components: {ClassList, Navigation, Statistics, ToDoList, AddTaskModal},

  data: function() {
    return {
      classList: [
      ],
      props: {
        classList: {
          type: Array,
          required: true,
        },
        toDoList: {
          type: Array,
          required: true,
        },
        modelValue : {
          type: Object,
          required: true,
        }
      },

      toDoList: [],
//got to figure out if I'm going to do a new model for this or figure out how to reuse my timer title
      breakItDownList: [
        new Timer('', '',''),

      ],

      selectedItem:{}
    }
  },

  // methods: usually "events" triggered by v-on:
  methods: {

      loadClassList() {
        // Load classes from Firebase into classList array
        db.collection("classList").onSnapshot(snapshot => {
          this.classList = snapshot.docs.map(doc => new ClassItem(doc.data().name, doc.data().color));
        });
      },
    addClass: function (newClassFromModal) {
      // add item to the list
      this.classList.push(newClassFromModal);

    },
    addTask: function (newTaskFromModal) {
      console.log('new task from modal', newTaskFromModal);
      // add item to the list
      this.toDoList.push(newTaskFromModal);

    },
    addTimer(timer){
      //this.timers.push(timer);
      this.toDoList.push(new Assignment('New Timer', '2023-12-31', 'false', 'Some Class', 'Some Type', 'Some Bid'));
    },

    subtract(item){
      this.classList.splice(this.classList.indexOf(item),1);

    },

    editClass(item) {
      this.selectedItem = item
    },

    deleteClass(item){
      this.selectedItem = item

    }
  },

  computed: {

  },


mounted() {
    this.loadClassList();
}

})



</script>

<template>
  <div id="app">
  <navigation
      :class-list="classList"
      :to-do-list="toDoList"
      auth-user="">

  </navigation>
  <router-view
      :class-list="classList"
      :to-do-list="toDoList"
  ></router-view>




    <!--closes app-->
  </div>

</template>

<style >

</style>
