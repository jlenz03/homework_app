<script>
import AppModal from "@/components/AppModal.vue";
import { firebase, db, auth, storage } from "@/firebase/index";
import toDoList from "@/components/ToDoList.vue";
export default {
  name: "EditToDoList",
  computed: {
    // ClassList() {
    //   return ClassList
    // },

    toDoList() {
      return toDoList
    }
  },
  components: {AppModal},
  data(){
    return {
      editTask: {
        //this will copy everything from the prop into this component data
        ...this.modelValue
        //same as
        //title: this.modelValue.title
        //color.this.modelValue.color
      },
      uid: 'ecm-' + Math.floor(Math.random() * 10e16),
      inputDate: this.formatTimestampToString(this.modelValue.due),
    }
  },

  props: {
    modelValue : {
      type: Object,
      required: true,
    },
    classList: {
      type: Array,
      required: true,
    },
    authUser:{
      type: Object,
      default: () => ({})
    }
  },
  emits: ['update:modelValue'],

  methods: {
    formatTimestampToString: function (timestamp) {
      // Add validation logic as needed
      const date = new Date(timestamp);
      const year = date.getUTCFullYear();
      const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-based
      const day = String(date.getUTCDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    },

    formatStringToTimestamp: function (formattedDateString) {
      // Add validation logic as needed
      const [year, month, day] = formattedDateString.split('-');
      return new Date(year, month - 1, day);
    },

    editIt: function () {
      console.log(this.editTask);

      // Update the data in the Firebase database
      db.collection('users').doc(this.authUser.uid).collection('toDoList').doc(this.modelValue.id)
          .update({
            title: this.editTask.title,
            due: this.formatStringToTimestamp(this.inputDate),
            completed: this.editTask.completed,
            class_name: this.editTask.class_name,
            type: this.editTask.type,
            bid: this.editTask.bid,
          })
          .then(() => {
            console.log("Document successfully updated to firebase!");



            this.$emit('update:modelValue', this.editTask);
          })
          .catch((error) => {
            console.error("Error updating document: ", error);
          });
    },
  },
};
</script>

<template>
  <span class="edit-item-modal">

    <a href="#" data-bs-toggle="modal"  :data-bs-target="'#editModal' + uid" class="edit-link"> <i class="fa-solid fa-pencil"></i></a>
     <app-modal  :id="'editModal' + uid" title="Edit Assignment">

      <div class="row">
        <div class="col">
          <label class="mr-sm-2" for="inputText"> Enter Title </label>
          <input class=" py-3 form-control shadow" placeholder="input your title" type="text" id="inputText" v-model="editTask.title">

        <label class="mr-sm-2" for="inputClass">Class</label>
          <select class="py-3 form-control shadow" id="inputClass" v-model="editTask.class_name">
            <option selected>Choose Class...</option>
            <option v-for="classItem in classList" :key="classItem.name" :value="classItem.name">{{ classItem.name }}</option>
          </select>

<!--          <label class="mr-sm-2" for="inputType">Type</label>-->
<!--          <select class="py-3 form-control shadow" id="inputClass" v-model="editTask.class_name">-->
<!--            <option selected>Choose Type...</option>-->
<!--            <option  :key="classItem.name" :value="classItem.name">{{ classItem.name }}</option>-->
<!--          </select>-->


          <label for="inputDate2">Due Date</label>
          <input id="inputDate2" class=" py-3 form-control shadow" type="date" v-model="inputDate">

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
                <input class=" py-3 form-control shadow" placeholder="input your title" type="text" id="inputText" >
              </div>
              <div class="mb-3">
                <label for="inputNewDate">Due Date</label>
                <input id="inputNewDate" class=" py-3 form-control shadow" type="date" >
                <!--                v-model="newTask.due"-->
              </div>

              <button type="submit" class="btn btn-primary">Add New Task</button>
            </form>
          </div>

        </div>
      </div>



    <template #footer>
            <div class="col-4">
              <button @click.prevent="editIt" type="submit" data-bs-dismiss="modal" class=" mt-2 btn btn-primary"> Save Changes </button>
            </div>


            </template>


      </app-modal>
    </span>
</template>

<style scoped>

</style>