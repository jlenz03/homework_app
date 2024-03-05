<script>
import { firebase, db, auth, storage } from "@/firebase/index";
import EditToDoList from "@/components/EditToDoList.vue";
import DeleteToDoList from "@/components/DeleteToDoList.vue";
// import ToDoList from "@/components/ToDoList.vue";

export default {
  name: "ToDoListItem",
  components: { DeleteToDoList, EditToDoList},
  data: function () {
    return {

    }
  },
  emits: ['modelValue','delete'],


  props: {
    item: {
      type: Object,
      required: true,
    },
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
    }
  },

  methods: {
    getClassColor(className) {
      const classItem = this.classList.find(item => item.name === className);
      console.log('class data recognized!', this.classList, className)
      return classItem ? classItem.color : 'black';
    },

    getCompletedDate() {
      if (this.item.completed) {
        // Assuming this.item is an instance of Timer
        this.item.completeAssignment();
      }
    },
    handleUpdate(updatedTask) {
      // Handle the updated task
      console.log('Updated task:', updatedTask);
    },
    updateToDoList(newItem) {
      // Find the index of the item in your toDoList
      const index = this.toDoList.findIndex((item) => item.id === newItem.id);

      // Update the toDoList array with the new item
      if (index !== -1) {
        this.$set(this.toDoList, index, newItem);
      }
    },

    updateCompletedStatus() {
      // Call the getCompletedDate function before updating the database
      this.getCompletedDate();
      console.log("Item Object:", this.item);

      // Use the doc method with the document ID
      const assignmentId = this.item.id; // Ensure you have the correct property name

      db.collection('users').doc(this.authUser.uid).collection('toDoList')
          .doc(assignmentId)
          .update({
            completed: this.item.completed,
          })
          .then(() => {
            console.log("Updated completed status in Firebase:", this.item.completed);
          })
          .catch((error) => {
            console.error("Error updating completed status:", error);
          });
    }
  },
};
</script>

<template>
  <li class="my-3 py-3 shadow list-group-item ">
    <div class="row">
      <div class="col-1">
        <input class="larger" type="checkbox" @change="updateCompletedStatus" v-model="item.completed" >
      </div>
      <div :style="{ 'border-color': getClassColor(item.class_name) }" class=" col-6 color-block">
        <span class="h3">{{ item.title }}</span>
        <br>
        <span class="p"><strong>{{ item.class_name }}</strong> {{ item.type }}</span>
        <br>

        <EditToDoList :model-value="item" @update:modelValue="updateToDoList" :class-list="classList"

                      :auth-user="authUser"></EditToDoList>
    <slot name="placement">
      <delete-to-do-list
        :model-value="item" @delete="deleteToDo => $emit('delete', deleteToDo)"

        :auth-user="authUser">
    </delete-to-do-list></slot>




      </div>
      <div class="col d-flex justify-content-end">
        <span class="p ">{{ item.formatDate()}}</span>



      </div>
    </div>
  </li>

</template>

<style scoped>

</style>