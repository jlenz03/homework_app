<script>

import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js'
import {Pie} from 'vue-chartjs'
import ToDoListItem from "@/components/ToDoListItem.vue";
import {firebase, db, auth, storage} from "@/firebase/index";
import Timer from "@/models/TimerModel.js";

import ToDoList from "@/components/ToDoListItem.vue";
// import * as chartConfig from './chartConfig.js'
ChartJS.register(ArcElement, Tooltip, Legend)

export default {
  name: 'Statistics',
  components: { Pie, ToDoListItem},

  data() {
    return {
      chartConfig: {
        data: {
          labels: ['On Time Assignments', 'Late Assignments'],
          datasets: [
            {
              backgroundColor: ['#99e1d9', '#ffdab9'],
              data: [81, 19],
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
        },
      },
    };
  },

  props: {
    title: {
      type: String,
    },

    toDoList: {
      type: Array,
      required: true,
    },


  },

  computed: {
    completedAssignmentsCount() {
      const count = this.toDoList.filter((item) => item.completed).length;
      console.log('Completed Assignments Count:', count);
      return count;
    },

    LateAssignmentsCount() {

      const count = this.toDoList.filter((item) => !item.completed && new Date(item.due) < item.user_complete).length;
      console.log('Late Assignments Count:', count);
      return count;
    },

    onTimeCompletionRate() {
      const completedAssignments = this.toDoList.filter((item) => item.completed);
      const totalAssignments = completedAssignments.length;

      const completedOnTime = completedAssignments.filter((item) => !this.isAssignmentLate(item)).length;

      // Check if totalAssignments is not 0 to avoid division by zero
      // const userStats = totalAssignments !== 0 ? (completedOnTime / totalAssignments) * 100 : 0;

      return totalAssignments !== 0 ? (completedOnTime / totalAssignments) * 100 : 0;
    },
  },

  methods: {
    isAssignmentLate(item) {

      return  new Date(item.due) < item.user_complete;
    },
  },
};


</script>

<template>
  <div class="stats text-center">
    <h3> How are We Doing?</h3>
    <div>
      <p>Completed Assignments Count: {{ completedAssignmentsCount }}</p>
      <p>Late Assignments Count: {{ LateAssignmentsCount }}</p>
      <p>On-time completion rate: {{ onTimeCompletionRate }}%</p>
    </div>

    <div class="row">
      <div class="col-sm">
        <div class="card text-center">
          <div class="card-body">
            <h5 class="card-title">On Time</h5>
            <h2 class="card-text">{{ completedAssignmentsCount }}</h2>
          </div>
        </div>
      </div>


      <div class="col-sm">
        <div class="card text-center">
          <div class="card-body">
            <h5 class="card-title">Late</h5>
            <h2 class="card-text">{{ LateAssignmentsCount }}</h2>

          </div>
        </div>
      </div>
    </div>
<!--    eventually going to be a circle graph and show percentage according to streak-->
<div>
  <p>On-time completion rate: {{ onTimeCompletionRate }}%</p>
</div>
    <div>

      <Pie :data="this.chartConfig.data" :options="this.chartConfig.options"/>
    </div>



    <p> Need Help Improving Your Stats?</p>
    <a href="#"> Check out our Tips & Tricks for a Productive Year!</a>
  </div>


</template>

<style scoped>

</style>