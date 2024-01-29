<script>

import AddTaskModal from "@/components/AddTaskModal.vue";
import ToDoList from "@/components/ToDoList.vue";
import Statistics from "@/components/Statistics.vue";
import Timer from "@/models/TimerModel";
import Navigation from "@/components/Navigation.vue";
import ClassList from "@/components/ClassList.vue";



export default {
  name: "Home",
  components: {ClassList, Navigation, Statistics, ToDoList, AddTaskModal},

  props: {
    classList: {
      type: Array,
      required: true,
    },
    toDoList: {
      type: Array,
      required: true,
    },


  },

  // methods: usually "events" triggered by v-on:
  methods: {
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
      this.timers.push(timer);
      this.toDoList.push(new Timer('New Timer', '2023-12-31', 'false', 'Some Class', 'Some Type', 'Some Bid'));

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


}
</script>

<template>

  <!-- the home page where it'll show your current to do list-->
  <div class="container min-vh-100 d-flex flex-column">
    <div class=" container rounded-3 border border-2 border-dark my-5 bg-white" style="height:auto;">
      <div class=" modal-btn d-flex justify-content-end">
        <a class=" btn btn-primary" data-bs-toggle="modal" href="#AddTaskModal" role="button"> <i class="fa-solid fa-plus"></i>  Add New Assignment</a>
        <!--depending on which assignment type you choose it'll say New ____ -->

      </div>
      <add-task-modal id="AddTaskModal"  :class-list="classList" @add-task="addTask" > </add-task-modal>

      <div class="row">

        <!--this section below is gonna be part of user profile and will hold tier information and user information-->
        <h1><a href="#" class="navbar-brand">
          <img src="../../images/gold-tier.png" class="" alt="trophy tier for user" width="85" height="79">
        </a>Hello, Julia</h1>

      </div>
      <hr>


      <!--I want a blank table or some type of message to pop up when there's no assignments in the app but for now it's just blank until information is put in-->
      <h2>Upcoming Tasks</h2>
      <div class="row rounded bg-white">

        <to-do-list title="Due Tomorrow"
                    :class-list="classList"
                    collection="tomorrowList">
        </to-do-list>

        <to-do-list title="Due Next Week"
                    :class-list="classList"
                    collection="weekList"
        ></to-do-list>

        <to-do-list title="Due Sometime"
                    :class-list="classList"
                    collection="sometimeList"
        >
        </to-do-list>

      </div>
      <statistics
          :class-list="classList"
          :to-do-list="toDoList"
      >
      </statistics>






    </div>
    <footer class="mt-auto pt-5 text-center">
      <h6 class="border-top p-3 m-0 text-light">&copy; 2023 &mdash; Buy It</h6>
    </footer>
  </div>











</template>

<style scoped>

</style>