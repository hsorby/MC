<template>
  <div class="upload-files">
    <h2>Upload file</h2>
    <form enctype="multipart/form-data" novalidate>
      <div class="dropbox">
        <input
          type="file"
          accept=".trc,text/plain"
          :name="uploadFieldName"
          :disabled="isSaving"
          @change="onChange"
          class="input-file"
        />
        <p v-if="isInitial">
          Drag your file(s) here to upload<br />
          or click to browse
        </p>
        <p v-if="isSaving">Uploading {{ fileCount }} file(s) ...<br />
        Progress ({{ resolvedCount }} / {{ fileCount }})</p>
      </div>
    </form>
  </div>
</template>

<script>
import { upload } from '@/services/BackendAPI'

const STATUS_INITIAL = 0,
  STATUS_SAVING = 1

export default {
  name: 'UploadFile',
  data() {
    return {
      currentStatus: null,
      uploadFieldName: 'trcs',
      fileCount: 0,
      resolvedCount: 0,
    }
  },
  computed: {
    isInitial() {
      return this.currentStatus === STATUS_INITIAL
    },
    isSaving() {
      return this.currentStatus === STATUS_SAVING
    },
  },
  methods: {
    reset() {
      // reset form to initial state
      this.currentStatus = STATUS_INITIAL
      this.resolvedCount = 0
    },
    onChange(event) {
      this.filesChanged(event.target.name, event.target.files)
      this.fileCount = event.target.files.length
    },
    save(formData) {
      // upload data to the server
      this.currentStatus = STATUS_SAVING

      upload(formData)
        .then((x) => {
          this.$emit('upload-success', x)
          this.resolvedCount += 1
          if (this.resolvedCount === this.fileCount) {
            this.reset()
          }
        })
        .catch((err) => {
          this.$alert(err.message, 'Upload file(s) error', 'error')
          this.resolvedCount += 1
          if (this.resolvedCount === this.fileCount) {
            this.reset()
          }
        })
    },
    filesChanged(fieldName, fileList) {
      // handle file changes
      Array.from(Array(fileList.length).keys()).map((x) => {
        fileList[x].text().then((content) => {
          const requestContent = {
            ['fileName']: fileList[x].name,
            ['fileContent']: content,
          }
          const stringContent = JSON.stringify(requestContent)
          this.save(stringContent)
        })
      })
    },
  },
  mounted() {
    this.reset()
  },
}
</script>

<style lang="scss">
.dropbox {
  outline: 2px dashed grey; /* the dash box */
  outline-offset: -10px;
  background: lightcyan;
  color: dimgray;
  padding: 10px 10px;
  min-height: 200px; /* minimum height */
  position: relative;
  cursor: pointer;
}

.input-file {
  opacity: 0; /* invisible but it's there! */
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  position: absolute;
  cursor: pointer;
}

.dropbox:hover {
  background: lightblue; /* when mouse over to the drop zone, change color */
}

.dropbox p {
  font-size: 1.2em;
  text-align: center;
  padding: 50px 0;
}

.upload-files {
  flex: 1;
}
</style>
