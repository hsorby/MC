<template>
  <div class="available-files">
    <h2>Select TRC Data</h2>
    <v-select label="title" :options="fileListing" @input="setSelected"></v-select>
  </div>
</template>

<script>
import vSelect from "vue-select"
import { getAvailableFiles } from '@/services/BackendAPI'

export default {
  name: 'AvailableFiles',
  components: {
    vSelect
  },
  props: {
    updateFileListing: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      fileListing: [],
      timeoutHandle: 0,
    }
  },
  watch: {
    updateFileListing() {
      if (this.timeoutHandle !== 0) {
        clearTimeout(this.timeoutHandle)
      }
      this.timeoutHandle = setTimeout(() => {
        this.timeoutHandle = 0
        this.fetchFiles()
      }, 500)
    }
  },
  created() {
    this.fetchFiles()
  },
  methods: {
    fetchFiles() {
      getAvailableFiles().then(data => {
        this.fileListing = data.files
      }).catch(err => {
        this.$alert(err.message, 'Fetch files error', 'error')
      })
    },
    setSelected(value) {
      this.$emit('input', value)
    }
  }
}
</script>

<style scoped>
.available-files {
  flex: 1;
}
</style>