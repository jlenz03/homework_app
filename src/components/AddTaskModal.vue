<script>
import AppModal from "@/components/AppModal.vue";
import { firebase, db, auth, storage } from "@/firebase/index";
import Assignment from "@/models/Assignment";
import ClassListItem from "@/components/ClassListItem.vue";
export default {
  name: "AddTaskModal",
  components: {ClassListItem, AppModal},
  data(){
    return {

      newTask:
          new Assignment('', '', false,'', '', '', '', []),

    }
  },

  props: {
    id: {
      type: String,
      required: true,
    },
    classList:{
      type: Array,
      required: true,
    },
    authUser:{
      type: Object,
      default: () => ({})
    }


  },
  emits: ['add-task', 'update:modelValue'],
  methods: {
    setTaskType(type) {
      this.newTask.type = type;
    },

    addTask: function () {
      this.newTask.formatDate();

      if (
          this.newTask.title === undefined ||
          this.newTask.due === undefined ||
          this.newTask.completed === undefined ||
          this.newTask.user_complete === undefined ||
          this.newTask.class_name === undefined ||
          this.newTask.type === undefined ||
          this.newTask.bid === undefined
      ) {
        console.error('Invalid task data. All fields must have defined values.');
        return;
      }

      // Check if authUser is available
      if (!this.authUser) {
        console.error('User is not authenticated.');
        return;
      }

      const dueDate = new Date(this.newTask.due);
      // Set the time to 11:59 PM on the same day
      dueDate.setHours(23, 59, 0, 0);

      const taskData = {
        title: this.newTask.title,
        due: dueDate,
        completed: this.newTask.completed,
        user_complete: this.newTask.user_complete,
        class_name: this.newTask.class_name,
        type: this.newTask.type,
        bid: this.newTask.bid,
      };

      // Add task to Firebase with user's ID
      db.collection('users')
          .doc(this.authUser.uid)
          .collection('toDoList')
          .add(taskData)
          .then(docRef => {
            // Clear the form (reset the object)
            this.newTask = new Assignment('', '', '', false, '', '', []);
          })
          .catch(error => {
            console.error('Error adding list item', error);
          })
          .finally(() => {
            // Any cleanup or additional actions
          });
    },

  },
  created() {
    console.log('Class List in AddTaskModal:', this.classList);
  },

};


</script>

<template>
  <div>
    <app-modal  :id="id" title="New Assignment">
      <div class="d-grid gap-2">

        <button  type="button" @click="setTaskType('Homework')" data-bs-target="#homeworkModal" data-bs-toggle="modal" data-bs-dismiss="modal" class="btn btn-primary">Homework</button>

        <button type="button" @click="setTaskType('Project')" class="btn btn-primary" data-bs-target="#projectModal" data-bs-toggle="modal" data-bs-dismiss="modal" >Project</button>

        <button type="button" @click="setTaskType('Quiz')" class="btn btn-primary" data-bs-target="#quizModal" data-bs-toggle="modal" data-bs-dismiss="modal">Quiz</button>

        <button  type="button" @click="setTaskType('Test')" class="btn btn-primary" data-bs-target="#testModal" data-bs-toggle="modal" data-bs-dismiss="modal">Test</button>

      </div>
    </app-modal>

    <!-- Homework Modal -->
    <app-modal id="homeworkModal" title="Homework" >
      <div class="row">
        <div class="col">
          <label class="mr-sm-2" for="homeworkTitle">Enter Title</label>
          <input class="py-3 form-control shadow" placeholder="Enter title" type="text" id="homeworkTitle" v-model="newTask.title">

          <label class="mr-sm-2" for="homeworkClass">Class</label>
          <select class="py-3 form-control shadow" id="homeworkClass" v-model="newTask.class_name">
            <option selected disabled>Choose Class...</option>
            <option v-for="classItem in classList" :key="classItem.name" :value="classItem.name">{{ classItem.name }}</option>
          </select>

          <label for="homeworkDue">Due Date</label>
          <input class="py-3 form-control shadow" type="date" id="homeworkDue" v-model="newTask.due">

          <label for="homeworkBreak">Break it Down</label>
          <input class="py-3 form-control shadow" type="text" id="homeworkBreak" v-model="newTask.bid">

          <div class="col-4">
            <button @click.prevent="addTask" type="submit" data-bs-dismiss="modal" class="mt-2 btn btn-primary">Add Homework</button>
          </div>
        </div>
      </div>
    </app-modal>

    <!-- Project Modal -->
    <app-modal id="projectModal" title="Project" >
      <div class="row">
        <div class="col">
          <label class="mr-sm-2" for="projectTitle">Enter Title</label>
          <input class="py-3 form-control shadow" placeholder="Enter title" type="text" id="projectTitle" v-model="newTask.title">

          <label class="mr-sm-2" for="projectClass">Class</label>
          <select class="py-3 form-control shadow" id="projectClass" v-model="newTask.class_name">
            <option selected disabled>Choose Class...</option>
            <option  v-for="classItem in classList" :key="classItem.name" :value="classItem.name">{{ classItem.name }}</option>
          </select>

          <label for="projectDue">Due Date</label>
          <input class="py-3 form-control shadow" type="date" id="projectDue" v-model="newTask.due">

          <label for="projectBreak">Break it Down</label>
          <input class="py-3 form-control shadow" type="text" id="projectBreak" v-model="newTask.bid">

          <div class="col-4">
            <button @click.prevent="addTask" type="submit" data-bs-dismiss="modal" class="mt-2 btn btn-primary">Add Project</button>
          </div>
        </div>
      </div>
    </app-modal>

    <!-- Quiz Modal -->
    <app-modal id="quizModal" title="Quiz">
      <div class="row">
        <div class="col">
          <label class="mr-sm-2" for="quizTitle">Enter Title</label>
          <input class="py-3 form-control shadow" placeholder="Enter title" type="text" id="quizTitle" v-model="newTask.title">

          <label class="mr-sm-2" for="quizClass">Class</label>
          <select class="py-3 form-control shadow" id="quizClass" v-model="newTask.class_name">
            <option selected disabled>Choose Class...</option>
            <option v-for="classItem in classList" :key="classItem.name" :value="classItem.name">{{ classItem.name }}</option>
          </select>

          <label for="quizDue">Due Date</label>
          <input class="py-3 form-control shadow" type="date" id="quizDue" v-model="newTask.due">

          <label for="quizBreak">Break it Down</label>
          <input class="py-3 form-control shadow" type="text" id="quizBreak" v-model="newTask.bid">

          <div class="col-4">
            <button @click.prevent="addTask" type="submit" data-bs-dismiss="modal" class="mt-2 btn btn-primary">Add Quiz</button>
          </div>
        </div>
      </div>
    </app-modal>

    <!-- Test Modal -->
    <app-modal id="testModal" title="Test" >
      <div class="row">
        <div class="col">
          <label class="mr-sm-2" for="testTitle">Enter Title</label>
          <input class="py-3 form-control shadow" placeholder="Enter title" type="text" id="testTitle" v-model="newTask.title">

          <label class="mr-sm-2" for="testClass">Class</label>
          <select class="py-3 form-control shadow" id="testClass" v-model="newTask.class_name">
            <option selected disabled>Choose Class...</option>
            <option v-for="classItem in classList" :key="classItem.name" :value="classItem.name">{{ classItem.name }}</option>
          </select>

          <label for="testDue">Due Date</label>
          <input class="py-3 form-control shadow" type="date" id="testDue" v-model="newTask.due">

          <label for="testBreak">Break it Down Tasks (Optional)</label>
          <!-- This is where break it down tasks will appear as you add more of them -->
          <ul>
            <li><!-- Add tasks here --></li>
          </ul>

          <!-- Add more tasks dropdown -->
          <div class="dropdown">
            <button type="button" class="btn btn-outline" data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="outside">
              <i class="fa-solid fa-plus"></i>
            </button>
            <form class="dropdown-menu p-4">
              <div class="mb-3">
                <label class="mr-sm-2" for="testTaskTitle">Enter Task</label>
                <input class="py-3 form-control shadow" placeholder="Enter task title" type="text" id="testTaskTitle">
              </div>
              <div class="mb-3">
                <label for="testTaskDue">Due Date</label>
                <input class="py-3 form-control shadow" type="date" id="testTaskDue">
              </div>
              <button type="submit" class="btn btn-primary">Add New Task</button>
            </form>
          </div>

          <div class="col-4">
            <button @click.prevent="addTask" type="submit" data-bs-dismiss="modal" class="mt-2 btn btn-primary">Add Test</button>
          </div>
        </div>
      </div>
    </app-modal>

  </div>
</template>

<style scoped>

</style>



