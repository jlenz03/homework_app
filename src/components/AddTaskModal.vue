<script>
import AppModal from "@/components/AppModal.vue";
import { firebase, db, auth, storage } from "@/firebase/index";
import Assignment from "@/models/Assignment";
export default {
  name: "AddTaskModal",
  components: {AppModal},
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
      type: Array, // Assuming classList is an array
      required: true,
    },


  },
  emits: ['add-task', 'update:modelValue'],
  methods: {
    setTaskType(type) {
      this.newTask.type = type;
    },

    addTask: function () {
      this.newTask.formatDate();

      // Ensure all fields have defined values
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

      // Create a plain JavaScript object with the necessary properties
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

      // : add task to Firebase
      db.collection('toDoList')
          .add(taskData)
          .then(docRef => {
            // Clear the form (reset the object)
            this.newTask = new Assignment('', '', false, '', '', '', []);
          })
          .catch(error => {
            console.error('Error adding list item', error);
          })
          .finally(() => {
            // Any additional code to run after success or failure
          });
    },
  },

};
// console.log('old date', this.newTask.due)
// // fix date
// this.newTask.formatDate();
//
// console.log(this.newTask); // Check the 'newTask' object
// console.log('New Task:', this.newTask); // Check the 'newTask' object
// console.log('Class List:', this.classList); // Check the 'classList'
//
// // Add the task to your to-do list or perform other actions
// this.$emit('add-task', this.newTask);
// this.$emit('update:modelValue', this.newTask);
//
// this.$nextTick(() => {
//   // Clear the form (reset the object)
//   this.newTask = new Timer('', '', false,'', '', '', []);
// });
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
          <label class="mr-sm-2" for="inputText"> Enter Title </label>
          <input class=" py-3 form-control shadow" placeholder="input your title" type="text" id="inputText" v-model="newTask.title">

          <label class="mr-sm-2" for="inputClass">Class</label>
          <select class="py-3 form-control shadow" id="inputClass" v-model="newTask.class_name">
            <option selected>Choose Class...</option>
            <option v-for="classItem in classList" :key="classItem.name" :value="classItem.name">{{ classItem.name }}</option>
          </select>

          <label for="inputDate">Due Date</label>
          <input id="inputDate" class=" py-3 form-control shadow" type="date" v-model="newTask.due">

          <label for="inputBreak"> Break it Down</label>
          <!--eventually this will be an options list that users can choose and it'll output in a bulletin list-->
          <input type="text" id="inputBreak" class=" py-3 form-control shadow" v-model="newTask.bid">
          <!--don't want this to show on home page-->


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
          <label class="mr-sm-2" for="inputText"> Enter Title </label>
          <input class=" py-3 form-control shadow" placeholder="input your title" type="text" id="inputText" v-model="newTask.title">

          <label class="mr-sm-2" for="inputClass">Class</label>
          <select class="py-3 form-control shadow" id="inputClass" v-model="newTask.class_name">
            <option selected>Choose Class...</option>
            <option v-for="classItem in classList" :key="classItem.name" :value="classItem.name">{{ classItem.name }}</option>
          </select>

          <label for="inputDate">Due Date</label>
          <input id="inputDate" class=" py-3 form-control shadow" type="date" v-model="newTask.due">

          <label for="inputBreak"> Break it Down</label>
          <!--eventually this will be an options list that users can choose and it'll output in a bulletin list-->
          <input type="text" id="inputBreak" class=" py-3 form-control shadow" v-model="newTask.bid">
          <!--don't want this to show on home page-->


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
          <label class="mr-sm-2" for="inputText"> Enter Title </label>
          <input class=" py-3 form-control shadow" placeholder="input your title" type="text" id="inputText" v-model="newTask.title">

          <label class="mr-sm-2" for="inputClass">Class</label>
          <select class="py-3 form-control shadow" id="inputClass" v-model="newTask.class_name">
            <option selected>Choose Class...</option>
            <option v-for="classItem in classList" :key="classItem.name" :value="classItem.name">{{ classItem.name }}</option>
          </select>

          <label for="inputDate">Due Date</label>
          <input id="inputDate" class=" py-3 form-control shadow" type="date" v-model="newTask.due">

          <label for="inputBreak"> Break it Down</label>
          <!--eventually this will be an options list that users can choose and it'll output in a bulletin list-->
          <input type="text" id="inputBreak" class=" py-3 form-control shadow" v-model="newTask.bid">
          <!--don't want this to show on home page-->


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
          <label class="mr-sm-2" for="inputText"> Enter Title </label>
          <input class=" py-3 form-control shadow" placeholder="input your title" type="text" id="inputText" v-model="newTask.title">

          <label class="mr-sm-2" for="inputClass">Class</label>
          <select class="py-3 form-control shadow" id="inputClass" v-model="newTask.class_name">
            <option selected>Choose Class...</option>
            <option v-for="classItem in classList" :key="classItem.name" :value="classItem.name">{{ classItem.name }}</option>
          </select>

          <label for="inputDate">Due Date</label>
          <input id="inputDate" class=" py-3 form-control shadow" type="date" v-model="newTask.due">

          <label for="inputBreak"> Break it Down Tasks (Optional)</label>
<!--          this is where break it down tasks will appear as you add more of them-->
          <ul>
            <li> </li>

          </ul>

          <div class="dropdown">
            <button type="button" class="btn btn-outline " data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="outside">
              <i class="fa-solid fa-plus"></i>
            </button>
            <form class="dropdown-menu p-4">
              <div class="mb-3">
                <label class="mr-sm-2" for="inputText"> Enter Task </label>
                <input class=" py-3 form-control shadow" placeholder="input your title" type="text" id="inputText" v-model="newTask.title">
              </div>
              <div class="mb-3">
                <label for="inputDate">Due Date</label>
                <input id="inputDate" class=" py-3 form-control shadow" type="date" >
<!--                v-model="newTask.due"-->
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