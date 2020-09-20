<template>
  <button
    id="dataLoad"
    ref="dataLoadBtn"
    :disabled="!canLoadData"
    @click="onLoadData"
    :class="{
      'swal2-confirm': canLoadData,
      'swal2-cancel': !canLoadData,
      'swal2-styled': true,
    }"
  >
    {{ buttonText }}
  </button>
</template>

<script>
import { getMarkers } from '@/services/BackendAPI'

export default {
  name: 'LoadMarkersButton',
  props: {
    file: {
      type: Object,
    },
    buttonText: {
      type: String,
      default() {
        return 'Load TRC Markers'
      }
    }
  },
  computed: {
    canLoadData() {
      if (this.file && {}.hasOwnProperty.call(this.file, 'hash')) {
        return true
      }
      return false
    },
  },
  methods: {
    onLoadData() {
      getMarkers(this.file.hash)
        .then((data) => {
          this.$emit('markers', data.markers)
        })
        .catch((err) => {
          this.$alert(err.message, 'Get markers error', 'error')
        })
    },
  },
}
</script>

<style scoped></style>
