<template>
  <div class="config">
    <h2>Create Conversion</h2>
    <button class="swal2-confirm swal2-styled" @click="onCreateConversion">
      Create
    </button>
    <modal-dialog v-if="showDialog" @cancel="onCancel" @confirm="onOK">
      <h1 slot="header">Create a marker conversion</h1>
      <map-landmarks slot="body" @conversion="onConversion"></map-landmarks>
    </modal-dialog>
  </div>
</template>

<script>
import { createConversion } from '@/services/BackendAPI'

import ModalDialog from '@/components/ModalDialog.vue'
import MapLandmarks from '@/components/MapLandmarks.vue'

export default {
  name: 'CreateConfig',
  components: { ModalDialog, MapLandmarks },
  data() {
    return {
      showDialog: false,
      consersions: {},
    }
  },
  methods: {
    onModalChange(state) {
      const htmlElements = document.getElementsByTagName('html')
      if (htmlElements.length > 0) {
        let htmlElement = htmlElements[0]
        if (state) {
          htmlElement.classList.add('modal-open')
        } else {
          htmlElement.classList.remove('modal-open')
        }
      }
    },
    onCreateConversion() {
      this.onModalChange(true)
      this.showDialog = true
    },
    onCancel() {
      this.onModalChange(false)
      this.showDialog = false
    },
    onOK() {
      this.onModalChange(false)
      this.showDialog = false
      createConversion(this.conversion).then(response => {
        this.$emit('created-conversion', response)
      }).catch(err => {
        this.$alert(err.message, 'Create conversion error', 'error')
      })
    },
    onConversion(event) {
      this.conversion = event
    }
  },
}
</script>

<style></style>
