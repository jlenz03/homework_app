<script>
import Timer from "@/models/TimerModel"
export default {
  name: "BreakItDownItem",
  data: function () {
    return {
      uid: 'cli-' + Math.floor(Math.random() * 10e16),
    }
  },
  emits: ['delete'],


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
  },

  methods: {
    getCompletedDate(){
      if (this.item.completed) {
        // Assuming this.item is an instance of Timer
        this.item.completeAssignment();
      }
    }
  },
}
</script>

<template>
  <li class="my-3 py-3 shadow list-group-item ">
    <div class="row">
      <div class="col-1">
        <input class="larger" type="checkbox" v-model="item.completed">
      </div>
      <div  class="col-6">
        <span class="h3">{{ item.title }}</span>
      </div>

      <div class="col d-flex justify-content-end">
        <span class="p">{{ item.formatDate()}}</span>
      </div>
    </div>
  </li>

</template>

<style scoped>

</style>