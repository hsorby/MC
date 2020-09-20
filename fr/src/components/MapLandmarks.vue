<template>
  <div class="map-landmarks-container">
    <div class="map-landmarks-left">
      <h2>Set identifier</h2>
      <input type="text" name="id" v-model.trim="name" />
      <h2>Select markers</h2>
      <div class="bob">
        <available-files @input="currentFile = $event"></available-files>
        <load-markers-button
          :file="currentFile"
          buttonText="Load markers"
          @markers="onMarkersLoaded"
        ></load-markers-button>
      </div>
    </div>
    <div class="map-landmarks-right">
      <div class="select-markers">
        <div class="landmark-mapping">
          <div class="spacer"></div>
          <div class="source-markers">
            <h2>Select a source marker</h2>
            <radio-list-table
              heading="Source markers"
              :rows="sourceMarkers"
              :clear="clearSelectedMarkers"
              @selection-changed="sourceMarkersChanged"
              @scroll="onTableRowScroll"
            ></radio-list-table>
          </div>
          <div class="spacer"></div>
          <div class="target-markers">
            <h2>to map to a target marker</h2>
            <radio-list-table
              heading="Fixed markers"
              :rows="targetMarkers"
              :clear="clearSelectedMarkers"
              @selection-changed="targetMarkersChanged"
              @scroll="onTableRowScroll"
            ></radio-list-table>
          </div>
          <div class="spacer"></div>
          <div class="conversion-table">
            <h2>Confirmed conversions</h2>
            <conversion-table
              heading="Conversions"
              :data="confirmedConversions"
              @remove="onRemoveConversion"
            ></conversion-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// {
//   ;[
//     { landmark: 'femur-GT-l' },
//     { landmark: 'femur-GT-r' },
//     { landmark: 'femur-HC-l' },
//     { landmark: 'femur-HC-r' },
//     { landmark: 'femur-LEC-l' },
//     { landmark: 'femur-LEC-r' },
//     { landmark: 'femur-MEC-l' },
//     { landmark: 'femur-MEC-r' },
//     { landmark: 'femur-kneecentre-l' },
//     { landmark: 'femur-kneecentre-r' },
//     { landmark: 'pelvis-LASIS' },
//     { landmark: 'pelvis-LHJC' },
//     { landmark: 'pelvis-LIS' },
//     { landmark: 'pelvis-LIT' },
//     { landmark: 'pelvis-LPS' },
//     { landmark: 'pelvis-LPSIS' },
//     { landmark: 'pelvis-RASIS' },
//     { landmark: 'pelvis-RHJC' },
//     { landmark: 'pelvis-RIS' },
//     { landmark: 'pelvis-RIT' },
//     { landmark: 'pelvis-RPS' },
//     { landmark: 'pelvis-RPSIS' },
//     { landmark: 'pelvis-Sacral' },
//     { landmark: 'tibiafibula-LC-l' },
//     { landmark: 'tibiafibula-LC-r' },
//     { landmark: 'tibiafibula-LM-l' },
//     { landmark: 'tibiafibula-LM-r' },
//     { landmark: 'tibiafibula-MC-l' },
//     { landmark: 'tibiafibula-MC-r' },
//     { landmark: 'tibiafibula-MM-l' },
//     { landmark: 'tibiafibula-MM-r' },
//     { landmark: 'tibiafibula-TT-l' },
//     { landmark: 'tibiafibula-TT-r' },
//   ]
// }

import LeaderLine from 'leader-line-vue'

import AvailableFiles from '@/components/AvailableFiles.vue'
import RadioListTable from '@/components/RadioListTable.vue'
import ConversionTable from '@/components/ConversionTable.vue'
import LoadMarkersButton from '@/components/LoadMarkersButton.vue'

// const initialTargetMarkers = ['femur-GT-l', 'femur-GT-r', 'pelvis-Sacral']
const initialTargetMarkers = [
  'femur-GT-l',
  'femur-GT-r',
  'femur-HC-l',
  'femur-HC-r',
  'femur-LEC-l',
  'femur-LEC-r',
  'femur-MEC-l',
  'femur-MEC-r',
  'femur-kneecentre-l',
  'femur-kneecentre-r',
  'pelvis-LASIS',
  'pelvis-LHJC',
  'pelvis-LIS',
  'pelvis-LIT',
  'pelvis-LPS',
  'pelvis-LPSIS',
  'pelvis-RASIS',
  'pelvis-RHJC',
  'pelvis-RIS',
  'pelvis-RIT',
  'pelvis-RPS',
  'pelvis-RPSIS',
  'pelvis-Sacral',
  'tibiafibula-LC-l',
  'tibiafibula-LC-r',
  'tibiafibula-LM-l',
  'tibiafibula-LM-r',
  'tibiafibula-MC-l',
  'tibiafibula-MC-r',
  'tibiafibula-MM-l',
  'tibiafibula-MM-r',
  'tibiafibula-TT-l',
  'tibiafibula-TT-r',
]

export default {
  name: 'MapLandmarks',
  components: {
    RadioListTable,
    AvailableFiles,
    ConversionTable,
    LoadMarkersButton,
  },
  props: {
    inputMarkers: {
      type: Array,
      default() {
        return []
      },
    },
  },
  data() {
    return {
      currentLine: undefined,
      currentMakeButton: undefined,
      currentSource: undefined,
      currentTarget: undefined,
      sourceMarkers: [],
      targetMarkers: [],
      currentFile: {},
      name: 'unknown',
      confirmedConversions: [],
      clearSelectedMarkers: false,
    }
  },
  created() {
    this.reset()
  },
  beforeDestroy() {
    this.clearPotentialMap()
  },
  computed: {
    canLoadData() {
      if (
        this.currentFile &&
        {}.hasOwnProperty.call(this.currentFile, 'hash')
      ) {
        return true
      }
      return false
    },
  },
  watch: {
    confirmedConversions(value) {
      let marker_maps = []
      for (let v of value) {
        marker_maps.push({
          source: v.source.textContent,
          target: v.target.textContent,
        })
      }
      let data = { name: this.name, file: this.currentFile, marker_maps }
      this.$emit('conversion', data)
    },
  },
  methods: {
    reset() {
      this.clearPotentialMap()
      this.sourceMarkers = []
      this.confirmedConversions = []
      this.targetMarkers = initialTargetMarkers
      this.clearSelectedMarkers = !this.clearSelectedMarkers
      this.currentSource = undefined
      this.currentTarget = undefined
    },
    clearPotentialMap() {
      if (this.currentMakeButton) {
        this.currentMakeButton.parentElement.removeChild(this.currentMakeButton)
        this.currentMakeButton = undefined
      }
      if (this.currentLine) {
        this.currentLine.remove()
        this.currentLine = undefined
      }
    },
    positionMakeButton() {
      const x = document.getElementsByClassName('leader-line')
      if (x.length === 1) {
        let ll = x[0]
        const targetArea = ll.getBoundingClientRect()
        const scrollTopOffset =
          window.pageYOffset !== undefined
            ? window.pageYOffset
            : (
                document.documentElement ||
                document.body.parentNode ||
                document.body
              ).scrollTop
        document.body.appendChild(this.currentMakeButton)
        const buttonArea = this.currentMakeButton.getBoundingClientRect()
        const targetCenterHorizontal =
          targetArea.left + targetArea.width / 2 - buttonArea.width / 2
        const targetCenterVertical =
          targetArea.top +
          (scrollTopOffset * 3) / 4 +
          targetArea.height / 2 -
          buttonArea.height / 2

        this.currentMakeButton.style.left = `${targetCenterHorizontal}px`
        this.currentMakeButton.style.top = `${targetCenterVertical}px`
      }
    },
    onTableRowScroll() {
      if (this.currentLine) {
        this.currentLine.position()
        this.positionMakeButton()
      }
    },
    onMarkersLoaded(markers) {
      this.reset()
      this.sourceMarkers = markers
    },
    setupPotentialMap() {
      this.clearPotentialMap()
      this.currentMakeButton = document.createElement('BUTTON')
      this.currentMakeButton.innerHTML = 'Apply'
      this.currentMakeButton.classList.add('btn-apply', 'apply-button')
      this.currentMakeButton.classList.add('swal2-styled', 'swal2-confirm')
      this.currentMakeButton.onclick = this.onApply
      // this.currentTarget.appendChild(this.currentMakeButton)
      this.currentLine = LeaderLine.setLine(
        this.currentSource,
        this.currentTarget,
        {
          color: '#aaa',
          'z-index': 9998,
        }
      )
      this.positionMakeButton()
    },
    updateMatch(source, selected) {
      if (source === 'source') {
        this.currentSource = document.getElementById(selected)
      } else {
        this.currentTarget = document.getElementById(selected)
      }
      if (this.currentSource && this.currentTarget) {
        this.setupPotentialMap()
      }
    },
    onApply() {
      this.confirmedConversions.push({
        source: this.currentSource,
        target: this.currentTarget,
      })
      const sourceText = this.currentSource.textContent
      this.sourceMarkers = this.sourceMarkers.filter(function(item) {
        return item !== sourceText
      })
      const targetText = this.currentTarget.firstChild.textContent
      this.targetMarkers = this.targetMarkers.filter(function(item) {
        return item !== targetText
      })
      this.clearSelectedMarkers = !this.clearSelectedMarkers
      this.clearPotentialMap()
      this.currentSource = undefined
      this.currentTarget = undefined
    },
    onRemoveConversion(index) {
      const removed = this.confirmedConversions.splice(index, 1)
      const removedItem = removed[0]
      removedItem.source.checked = false
      removedItem.target.checked = false
      this.sourceMarkers.push(removedItem.source.textContent)
      this.targetMarkers.push(removedItem.target.textContent)
    },
    sourceMarkersChanged(selected) {
      this.updateMatch('source', selected)
    },
    targetMarkersChanged(selected) {
      this.updateMatch('target', selected)
    },
  },
}
</script>

<style>
.btn-apply {
  position: absolute;
}

.map-landmarks-container {
  display: flex;
}

.landmark-mapping,
.map-landmarks-left,
.map-landmarks-right {
  display: flex;
}

.map-landmarks-left {
  flex: 1;
  flex-direction: column;
}

.map-landmarks-right {
  flex: 3;
}

.landmark-mapping[disabled] {
  opacity: 50%;
}

.target-markers,
.source-markers {
  flex: 1;
}

.bob {
  display: flex;
  align-items: center;
}
</style>
