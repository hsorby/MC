<template>
  <v-select
    label="name"
    :options="conversionsListing"
    @input="setSelected"
  ></v-select>
</template>

<script>
import vSelect from 'vue-select'
import { getAvailableConversions } from '@/services/BackendAPI'

export default {
  name: 'AvailableConverions',
  components: {
    vSelect,
  },
  props: {
    updateConverionsListing: {
      type: Boolean,
      default: false,
    },
    file: {
      type: Object,
    },
  },
  data() {
    return {
      conversionsListing: [],
      timeoutHandle: 0,
    }
  },
  watch: {
    updateConverionsListing() {
      this.debounceFetchConversions()
    },
    file() {
      this.debounceFetchConversions()
    },
  },
  created() {
    this.fetchConversions()
  },
  methods: {
    debounceFetchConversions() {
      if (this.timeoutHandle !== 0) {
        clearTimeout(this.timeoutHandle)
      }
      this.timeoutHandle = setTimeout(() => {
        this.timeoutHandle = 0
        this.fetchConversions()
      }, 500)
    },
    fetchConversions() {
      getAvailableConversions(this.file)
        .then((data) => {
          this.conversionsListing = data.conversions
        })
        .catch((err) => {
          this.$alert(err.message, 'Fetch conversions error', 'error')
        })
    },
    setSelected(value) {
      this.$emit('input', value)
    },
  },
}
</script>

<style scoped></style>
