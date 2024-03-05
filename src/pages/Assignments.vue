<script>
import AddTaskModal from "@/components/AddTaskModal.vue";
import ToDoList from "@/components/ToDoList.vue";
import Statistics from "@/components/Statistics.vue";
// import Timer from "@/models/TimerModel";
import Navigation from "@/components/Navigation.vue";
import ClassList from "@/components/ClassList.vue";
import EditToDoList from "@/components/EditToDoList.vue";
import DeleteToDoList from "@/components/DeleteToDoList.vue";
import DeleteClassModal from "@/components/DeleteClassModal.vue";

export default {
  name: "Assignments",
  components: {DeleteClassModal, DeleteToDoList, EditToDoList, ClassList, Navigation, Statistics, ToDoList, AddTaskModal },
  data() {
    return {
      // Initialize selectedTask with the appropriate data structure
      item: {

        id: '',
        title: '',
        due: null,
        completed: false,
        user_complete: '',
        class_name: '',
        type: '',
        bid: [],


      },
    };
  },
emits: ['delete'],
  props: {
    classList: {
      type: Array,
      required: true,
    },
    toDoList: {
      type: Array,
      required: true,
    },
    authUser: {
      type: Object,
      default: () => ({})
    }
    // modelValue: {
    //   type: Object,
    //   required: true,
    // },
  },

  methods: {

    addClass(newClassFromModal) {
      // add item to the list
      this.classList.push(newClassFromModal);
    },
    subtract(item) {
      this.classList.splice(this.classList.indexOf(item), 1);
    },

    deleteClass(item) {
      this.selectedItem = item;
    },
    addTask(newTaskFromModal) {
      console.log('new task from modal', newTaskFromModal);
      // add item to the list
      this.toDoList.push(newTaskFromModal);
    },

  },
};
</script>

<template>
  <div class="container min-vh-100 d-flex flex-column">
    <div class="container rounded-3 border border-2 border-dark my-5 bg-white" style="height:auto;">
      <div class="modal-btn d-flex justify-content-end">
        <a class="btn btn-primary" data-bs-toggle="modal" href="#AddTaskModal" role="button">
          <i class="fa-solid fa-plus"></i>  Add New Assignment
        </a>
      </div>

      <add-task-modal id="AddTaskModal" :class-list="classList" @add-task="addTask"
                      :auth-user="authUser"></add-task-modal>

      <ul class="nav nav-tabs" id="myTab" role="tablist">
        <li class="nav-item" role="presentation">
          <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#upcoming" type="button" role="tab" aria-controls="upcoming" aria-selected="true">Upcoming Assignments</button>
        </li>
        <li class="nav-item" role="presentation">
          <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#completed" type="button" role="tab" aria-controls="completed" aria-selected="false">Completed Assignments</button>
        </li>
      </ul>

      <div class="tab-content" id="myTabContent">
        <div class="tab-pane fade show active" id="upcoming" role="tabpanel" aria-labelledby="upcoming-tab">
          <div class="row rounded bg-white">
            <to-do-list title="Due Tomorrow"
                        :class-list="classList"
                        collection="tomorrowList"
                        v-if="authUser"
                        :auth-user="authUser">


<!--              <template v-slot:bid>-->
<!--                <EditToDoList :model-value="item" @update:modelValue="updateToDoList"></EditToDoList>-->
<!--              </template>-->
            </to-do-list>

            <to-do-list title="Due Next Week"
                        collection="weekList"
                        :class-list="classList"
                        v-if="authUser"
                        :auth-user="authUser">

              <template v-slot:bid>


              </template>
            </to-do-list>

            <to-do-list title="Due Sometime"
                        collection="sometimeList"
                        :class-list="classList"
                        v-if="authUser"
                        :auth-user="authUser"
                       >
<!--              <template v-slot:bid="{ item }">-->
<!--                <EditToDoList :modelValue="item" @update:modelValue="updateToDoList"></EditToDoList>-->
<!--              </template>-->
            </to-do-list>
          </div>
        </div>

        <div class="tab-pane fade" id="completed" role="tabpanel" aria-labelledby="completed-tab">
          <div class="row rounded bg-white">
            <to-do-list title="Completed Tasks"
                        collection="completedList"
                        :class-list="classList"
                       >
            </to-do-list>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

