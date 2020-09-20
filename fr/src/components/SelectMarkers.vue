<template>
  <div class="select-markers">
    <div class="landmark-selection" :disabled="!dataLoaded">
      <div class="essential-markers">
        <h2>Choose your essential markers</h2>
        <check-list-table
          heading="Markers"
          :rows="essentialMarkers"
          @selection-changed="essentialMarkersChanged"
        ></check-list-table>
      </div>
      <div class="spacer"></div>
      <div class="tracking-markers">
        <h2>Choose your tracking markers</h2>
        <check-list-table
          heading="Markers"
          :rows="trackingMarkers"
          @selection-changed="trackingMarkersChanged"
        ></check-list-table>
      </div>
    </div>
  </div>
</template>

<script>
import CheckListTable from '@/components/CheckListTable'

export default {
  name: 'SelectMarkers',
  components: {
    CheckListTable,
  },
  props: {
    file: {
      type: Object,
    },
    markers: {
      type: Array,
      default() {
        return []
      },
    },
  },
  data() {
    return {
      essentialMarkers: [],
      trackingMarkers: [],
    }
  },
  computed: {
    dataLoaded() {
      return this.markers.length !== 0
    },
  },
  watch: {
    markers() {
      this.trackingMarkers = this.markers
      this.essentialMarkers = this.markers
    }
  },
  methods: {
    calculateLeftovers(selected) {
      return this.markers.filter(function(item) {
        return selected.indexOf(item) === -1
      })
    },
    essentialMarkersChanged(selected) {
      this.trackingMarkers = this.calculateLeftovers(selected)
      this.$emit('essential-markers', selected)
    },
    trackingMarkersChanged(selected) {
      this.essentialMarkers = this.calculateLeftovers(selected)
      this.$emit('tracking-markers', selected)
    },
  },
}
</script>

<style scoped>
.landmark-selection {
  display: flex;
}

.landmark-selection[disabled] {
  opacity: 50%;
}

.tracking-markers,
.essential-markers {
  flex: 1;
}
</style>
