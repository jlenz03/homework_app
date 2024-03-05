<script>

import ClassList from "@/components/ClassList.vue";
import ClassListItem from "@/components/ClassListItem.vue";
import AddClassModal from "@/components/AddClassModal.vue";



export default {
  name: "Classes",
  components: {AddClassModal, ClassList, ClassListItem},

  props: {
    classList: {
      type: Array,
      required: true,
    },
    authUser: {
      type: Object,
      default: () => ({})
    }
  },

  methods: {
    addClass: function (newClassFromModal) {
      // add item to the list
      this.classList.push(newClassFromModal);

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

<!--  <div id="app">-->

    <!-- the home page where it'll show your current to do list-->
    <div class="container min-vh-100 d-flex flex-column">
      <div class=" container rounded-3 border border-2 border-dark my-5 bg-white" style="height:auto;">

        <div class="modal-btn d-flex justify-content-end">
          <a class=" btn btn-primary" data-bs-toggle="modal" href="#AddClassModal" role="button"><i class="fa-solid fa-plus"></i> Add New Class</a>
        </div>
        <add-class-modal id="AddClassModal" @add-class="addClass"
                         :auth-user="authUser"></add-class-modal>


        <h1> Your Classes</h1>
        <class-list :class-list="classList" @delete="subtract" v-if="authUser"
                    :auth-user="authUser"></class-list>

      </div>
    </div>
    <!--closes app div-->
<!--  </div>-->







</template>

<style scoped>

</style>