<template>
  <div
    class="card"
    :id="id"
    :draggable="draggable"
    @dragstart="onDragStart"
    @dragover.stop
  >
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    id: { required: true },
    draggable: {
      default: true,
      type: Boolean,
    },
  },
  methods: {
    onDragStart(e) {
      e.dataTransfer.setData('card_id', e.target.id)
    },
  },
}
</script>
<style></style>
