<template>
  <div class="available-demographics">
    <h2>Select Demographic</h2>
    <v-select label="id" :options="demographicsListing" @input="setSelected"></v-select>
  </div>
</template>

<script>
import vSelect from "vue-select"
import { getAvailableDemographics } from '@/services/BackendAPI'

export default {
  name: 'AvailableDemographics',
  components: {
    vSelect
  },
  props: {
    updateDemographicsListing: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      demographicsListing: [],
      timeoutHandle: 0,
    }
  },
  watch: {
    updateDemographicsListing() {
      if (this.timeoutHandle !== 0) {
        clearTimeout(this.timeoutHandle)
      }
      this.timeoutHandle = setTimeout(() => {
        this.timeoutHandle = 0
        this.fetchDemographics()
      }, 500)
    }
  },
  created() {
    this.fetchDemographics()
  },
  methods: {
    fetchDemographics() {
      getAvailableDemographics().then(data => {
        this.demographicsListing = data.demographics
      }).catch(err => {
        this.$alert(err.message, 'Fetch demographics error', 'error')
      })
    },
    setSelected(value) {
      this.$emit('input', value)
    }
  }
}
</script>

<style scoped>
.available-demographics {
  flex: 1;
}
</style>