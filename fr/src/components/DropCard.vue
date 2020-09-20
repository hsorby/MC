<template>
  <div
    :id="id"
    class="card"
    @dragover.prevent
    @drop.prevent="onDrop"
    @dragenter="onDragEnter"
    @dragleave="onDragLeave"
  >
    <slot />
  </div>
</template>

<script>
import LeaderLine from 'leader-line-vue'

export default {
  props: ['id'],
  methods: {
    onDrop(e) {
      this.setDragState(e, false)
      const source_id = e.dataTransfer.getData('card_id')
      const srcElement = document.getElementById(source_id)
      LeaderLine.setLine(srcElement, e.target)
    },
    setDragState: (e, state) => {
      if (state) {
        e.target.classList.add('drop-zone-active')
      } else {
        e.target.classList.remove('drop-zone-active')
      }
    },
    onDragEnter(e) {
      this.setDragState(e, true)
    },
    onDragLeave(e) {
      this.setDragState(e, false)
    },
  },
}
</script>

<style>
.card {
  border-color: white;
  border-width: 0.1em;
  border-style: solid;
}

.drop-zone-active {
  border-color: grey;
  border-style: dashed;
}
</style>
