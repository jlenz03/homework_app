<script>
import { firebase, db, auth, storage } from "@/firebase/index";
export default {
  name: "DeleteClassModal",

  data(){
    return {
      deleteClass: {
        //this will copy everything from the prop into this component data
        ...this.modelValue
        //same as
        //title: this.modelValue.title
        //color.this.modelValue.color
      },
      uid: 'dcm-' + Math.floor(Math.random() * 10e16),

    }
  },

  props: {
    modelValue : {
      type: Object,
      required: true,
    }
  },
  emits: ['delete'],
  methods: {
    deleteIt: function () {
      console.log(this.deleteClass); // Check the 'deleteClass' object
      this.$emit('delete', this.modelValue);

      db.collection('classList').doc(this.modelValue.id).delete();



    },

  },
};
</script>

<template>
  <span class="delete-class-modal">
                      <button  data-bs-toggle="modal"  :data-bs-target="'#deleteModal' + uid" class=" btn btn-danger">
                        Delete
                      </button>

            <div class="modal fade" :id="'deleteModal' + uid" aria-hidden="true" :aria-labelledby=" 'deleteModal' + uid" tabindex="-1">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Delete Class</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>

                    <div class="modal-body">
                     <div class="row" >
                            <div class=" col">
                                <p> Are you sure you want to delete your {{modelValue.name}} class?</p>

                            </div>

                            <div class="modal-footer">
                            <div class="col-4">
                              <button @click.prevent="deleteIt"  data-bs-dismiss="modal" class=" btn btn-danger"> Delete </button>
            </div>
                            </div>

                        </div>


                    </div>
                </div>
            </div>
        </div>

    </span>
</template>

<style scoped>

</style>