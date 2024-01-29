<script>
import AppModal from "@/components/AppModal.vue";
import ClassListItem from "@/components/ClassListItem.vue";
import ClassList from "@/components/ClassList.vue";
import ClassItem from "@/models/ClassItemModel";

import { firebase, db, auth, storage } from "@/firebase/index";

export default {
  name: "AddClassModal",
  components: {AppModal, ClassListItem, ClassList},
  data(){
    return {
      newClass: {
        name: '',
        color: '',
      },
    }
  },

  props: {
    id: {
      type: String,
      required: true,
    },


  },
  emits: ['add-class'],
  methods: {

    addClass: function () {
      // console.log(this.newClass); // Check the 'newClass' object
      // // add item to the list
      // //this.classList.push(this.newClass);
      // this.$emit('add-class', this.newClass);
      //
      // // clear the form
      // this.$nextTick(() => {
      //   // Clear the form (reset the object)
      //   this.newClass = new ClassItem('', '',);
      // });

      // : add recipe to firebase
      db.collection('classList')
          .add(this.newClass)
          .then(docRef => {

            this.newClass =  {
              name: '',
              color: '',
            }
          })
          .catch(error => {
            console.error('error adding class', error)
          })
          .finally(() => {

          })


    },
  },
};
</script>

<template>
  <app-modal  :id="id" title="New Class">

    <div class="row">
      <div class=" col">
        <label class="mr-sm-2" for="inputName"> Enter Class Name </label>
        <input v-model="newClass.name" class=" py-3 form-control shadow" placeholder="input your class name" type="text" id="inputName">

        <label class="mr-sm-2" for="inputClass2">Color</label>

        <select v-model="newClass.color" class="py-3 form-control shadow" id="inputClass2">
          <option selected>Choose Color...</option>
          <option value="red"> Red </option>
          <option value="pink">Pink </option>
          <option value="orange"> Orange</option>
          <option value="yellow"> Yellow</option>
          <option value="green">Green </option>
          <option value="blue">Blue </option>
          <option value="purple">Purple </option>
        </select>

      </div>
    </div>

    <template #footer>
      <div class="col-4">
        <button @click.prevent="addClass" type="submit" data-bs-dismiss="modal" class=" mt-2 btn btn-primary"> Add Class </button>
      </div>

    </template>


  </app-modal>

</template>

<style scoped>

</style>