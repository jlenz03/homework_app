<script>

import EditClassModal from "@/components/EditClassModal.vue";
import DeleteClassModal from "@/components/DeleteClassModal.vue";
import ToDoList from "@/components/ToDoList.vue";


export default {
  name: "ClassListItem",
  components: {ToDoList, EditClassModal, DeleteClassModal, },

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
    authUser:{
      type: Object,
    }

  },

}
</script>

<template>
  <li class="my-3 py-3 shadow list-group-item">
    <div class="row">
      <div :class="{ 'color-block': item.color }" :style="{ 'border-left-color': item.color }" class="col-6 color-block">
        <span class="h3">{{ item.name }}</span>
      </div>
      <div class="col-6 d-flex justify-content-end">
        <edit-class-modal :modelValue="item" @update:modelValue="newItem => Object.assign(item, newItem)"
                          :auth-user="authUser"></edit-class-modal>
        <delete-class-modal :model-value="item" @delete="deleteIt => $emit('delete', deleteIt)" :auth-user="authUser" ></delete-class-modal>
      </div>
    </div>
  </li>

<!--  v-model="item" -->

</template>

<style scoped>

</style>