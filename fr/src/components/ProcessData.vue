<template>
  <div class="process">
    <button @click="onProcess" :disabled="!canProcessData">Process</button>
    <template v-if="jobs.length">
      <h3>Processing jobs ...</h3>
      <ul>
        <li v-for="job in jobs" :key="job.id">{{ jobDescription(job) }}</li>
      </ul>
    </template>
  </div>
</template>

<script>
import { processData } from '@/services/BackendAPI'

export default {
  name: 'ProcessData',
  props: {
    demographic: {
      type: Object,
    },
    essentialMarkers: {
      type: Array,
    },
    trackingMarkers: {
      type: Array,
    },
    file: {
      type: Object,
    },
  },
  data() {
    return {
      jobs: [],
      count: 0,
    }
  },
  computed: {
    canProcessData() {
      const demographicGood =
        this.demographic && {}.hasOwnProperty.call(this.demographic, 'id')
      const essentialMarkersGood = this.essentialMarkers.length > 0
      const trackingMarkersGood = this.trackingMarkers.length > 0
      const fileGood =
        this.file &&
        {}.hasOwnProperty.call(this.file, 'hash') &&
        this.file.hash.length > 0
      return (
        demographicGood &&
        essentialMarkersGood &&
        trackingMarkersGood &&
        fileGood
      )
    },
  },
  methods: {
    onProcess() {
      const job = this.createJob()
      this.jobs.push(job)
      processData(
        job.id,
        this.file,
        this.demographic,
        this.essentialMarkers,
        this.trackingMarkers
      ).then((data) => {
        this.$alert(data.message)
        this.jobs = this.jobs.filter(function(item) {
          return data.id !== item.id
        })
      }).catch(err => {
        this.$alert(err.message, 'Process data failed', 'error')
      })
    },
    createJob() {
      this.count += 1
      return {
        id: `${this.count}_${this.file.hash}`,
        title: this.file.title,
        demographic_id: this.demographic.id,
      }
    },
    jobDescription(job) {
      const index = job.id.split('_')[0]
      return `${index}) ${job.demographic_id} - ${job.title}`
    },
  },
}
</script>

<style></style>
