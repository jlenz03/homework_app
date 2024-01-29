<script>
import ToDoListItem from "@/components/ToDoListItem.vue";
import Assignment from "@/models/Assignment";
import {firebase, db, auth, storage} from "@/firebase/index";
import EditToDoList from "@/components/EditToDoList.vue";




export default {
  name: "ToDoList",
  components: {ToDoListItem},

  data: function () {
    return {
      toDoList: [],


    }
  },
  props: {
    title: {
      type: String,
      default: 'sometimeList',
    },
    classList: {
      type: Array,
      required: true,

    },

    collection: {
      type: String
    }
  },
  emits: ['update:modelValue', 'delete'],
  methods: {


    loadToDoList() {


      // Load tasks from Firebase into toDoList array


      let query = db.collection("toDoList");

      const today = new Date();
      const tomorrow = new Date();
      const twoday = new Date();
      tomorrow.setDate(today.getDate() + 1);
      twoday.setDate(today.getDate() + 2);
      tomorrow.setHours(23, 59, 59, 999); // Set the time to the end of the day
      twoday.setHours(23, 59, 59, 999); // Set the time to the end of the day
      const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000); // Calculate next week's date

      // console.log('tomorrow is this date', tomorrow)
      switch (this.collection) {
        case 'tomorrowList':
          query = query
              .where('due', '<=', tomorrow)
              .where('due', '>', today)
              .where('due', '<', twoday)
              .where('completed', '==', false)
          ;
          break;
        case 'weekList':
          query = query.where('due', '>', tomorrow)
              .where('due', '<=', nextWeek)
              .where('completed', '==', false);
          break;
        case 'sometimeList':
          query = query.where('due', '>', nextWeek)
              .where('completed', '==', false);
          break;
        case 'completedList':
          query = query.where('completed', '==', true);
          break;
      }


      query.onSnapshot((snapshot) => {

        let newTask = snapshot.docs.map(doc => {
          return new Assignment(
              doc.id, // Include the document ID
              doc.data().title,
              doc.data().due,
              doc.data().completed,
              doc.data().user_complete,
              doc.data().class_name,
              doc.data().type,
              doc.data().bid,

          );

        });

        // Update the toDoList property with the new instances
        this.toDoList = newTask; // Assuming "this" refers to the component instance
      });
    },
  },
  // IMPORTANT!!!
  mounted() {
    this.loadToDoList();
  },

}

</script>

<template>
  <div class=" col-12">
    <ul class=" list-group">
      <h4>{{ title }}</h4>
      <to-do-list-item
          v-for="(item, i) in toDoList"
          :key="'classItem.name' + 'uid'"
          :item="item"
          :class-list="classList"
          :to-do-list="toDoList"

      >
        <template v-slot:placement>
          <slot name="bid"></slot>
        </template>


      </to-do-list-item>

    </ul>
    <br>


  </div>


</template>

<style scoped>

</style>