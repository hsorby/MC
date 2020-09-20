<template>
  <div id="app">
    <div id="main-page">
      <h1>MAP Client</h1>
      <div class="source-creation">
        <upload-file @upload-success="fileAdded = !fileAdded"></upload-file>
        <div class="spacer"></div>
        <create-conversion
          @created-conversion="conversionCreated = !conversionCreated"
        ></create-conversion>
        <div class="spacer"></div>
        <create-demographic
          @created-demographic="demographicCreated = !demographicCreated"
        ></create-demographic>
      </div>
      <div class="input-selection">
        <div class="available-files">
          <h2>Select TRC Data</h2>
          <div class="file-select-load">
            <available-files
              :updateFileListing="fileAdded"
              @input="currentFile = $event"
            ></available-files>
            <load-markers-button
              :file="currentFile"
              @markers="markers = $event"
            ></load-markers-button>
          </div>
        </div>
        <div class="spacer"></div>
        <div class="available-conversions">
          <h2>Select Conversion</h2>
          <available-conversions
            :file="currentFile"
            :updateConversionsListing="conversionCreated"
            @input="currentConversion = $event"
          ></available-conversions>
        </div>
        <div class="spacer"></div>
        <available-demographics
          :updateDemographicsListing="demographicCreated"
          @input="currentDemographic = $event"
        ></available-demographics>
      </div>
      <div class="marker-selection">
        <select-markers
          :file="currentFile"
          :markers="markers"
          @essential-markers="essentialMarkers = $event"
          @tracking-markers="trackingMarkers = $event"
        ></select-markers>
      </div>
      <div class="process">
        <process-data
          :demographic="currentDemographic"
          :essentialMarkers="essentialMarkers"
          :trackingMarkers="trackingMarkers"
          :file="currentFile"
        ></process-data>
      </div>
    </div>
  </div>
</template>

<script>
import UploadFile from '@/components/UploadFile.vue'
import CreateDemographic from '@/components/CreateDemographic.vue'
import CreateConversion from '@/components/CreateConversion.vue'
import AvailableFiles from '@/components/AvailableFiles.vue'
import AvailableDemographics from '@/components/AvailableDemographics.vue'
import AvailableConversions from '@/components/AvailableConversions.vue'
import SelectMarkers from '@/components/SelectMarkers.vue'
import ProcessData from '@/components/ProcessData.vue'
import LoadMarkersButton from '@/components/LoadMarkersButton.vue'

import 'vue-select/dist/vue-select.css'

export default {
  name: 'App',
  components: {
    UploadFile,
    CreateDemographic,
    CreateConversion,
    AvailableFiles,
    AvailableDemographics,
    AvailableConversions,
    SelectMarkers,
    ProcessData,
    LoadMarkersButton,
  },
  data() {
    return {
      fileAdded: false,
      conversionCreated: false,
      demographicCreated: false,
      currentFile: {},
      currentDemographic: {},
      currentConversion: {},
      markers: [],
      essentialMarkers: [],
      trackingMarkers: [],
    }
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

#nonEssential {
  width: 100%;
  height: 700px;
  background: #e8e8e8;
}

.source-creation,
.input-selection {
  display: flex;
}

.trc-container {
  flex: 1;
}

.spacer {
  flex: 0.2;
}

.available-files {
  flex: 1;
}

.file-select-load {
  display: flex;
  align-items: center;
}
</style>
