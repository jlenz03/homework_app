<script>
import AppModal from "@/components/AppModal.vue";
import { firebase, db, auth, storage } from "@/firebase/index";
export default {
  name: "EditClassModal",
  components: {AppModal},
  data(){
    return {
      editClass: {
        //this will copy everything from the prop into this component data
        ...this.modelValue
        //same as
        //title: this.modelValue.title
        //color.this.modelValue.color
      },
      uid: 'ecm-' + Math.floor(Math.random() * 10e16),
    }
  },

  props: {
    modelValue : {
      type: Object,
      required: true,
    }
  },
  emits: ['update:modelValue'],
  methods: {
    editIt: function () {
      console.log(this.editClass);

      // Update the data in the Firebase database
      db.collection('classList').doc(this.modelValue.id)
          .update({
            name: this.editClass.name,
            color: this.editClass.color,
            // Add other properties you want to update
          })
          .then(() => {
            console.log("Document successfully updated!");
            // You may emit an event to inform the parent component about the update
            this.$emit('update:modelValue', this.editClass);
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
                      <button  data-bs-toggle="modal"  :data-bs-target="'#editModal' + uid" class=" btn btn-secondary">
                        Edit
                      </button>
     <app-modal  :id="'editModal' + uid" title="Edit Class">

      <div class="row">
         <div class=" col">
            <label class="mr-sm-2" for="inputClass2"> Enter Class Name </label>
                                <input v-model="editClass.name" class=" py-3 form-control shadow" placeholder="input your class name" type="text" id="inputClass2">

                                <label class="mr-sm-2" for="inputClassColor2">Color</label>

                                <select v-model="editClass.color" class="py-3 form-control shadow" id="inputClassColor2">
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
              <button @click.prevent="editIt" type="submit" data-bs-dismiss="modal" class=" mt-2 btn btn-primary"> Save Changes </button>
            </div>

            </template>


      </app-modal>
    </span>
</template>

<style scoped>

</style>