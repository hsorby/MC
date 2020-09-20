<template>
  <div class="radio-table-container">
    <table class="radio-table">
      <tr>
        <th>{{ heading }}</th>
      </tr>
    </table>

    <div class="table-data-rows" @scroll="$emit('scroll')" :style="{'overflow-y': 'auto', 'max-height': maxHeight + 'px'}">
      <table ref="tableData">
        <template v-for="row in rows">
          <tr :key="row">
            <td :id="row" :ref="row">
              <label
                ><input :value="row" type="radio" v-model="selected" />{{
                  row
                }}</label
              >
            </td>
          </tr>
        </template>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RadioListTable',
  props: {
    heading: {
      type: String,
    },
    rows: {
      type: Array,
    },
    clear: {
      type: Boolean,
    },
   },
  data() {
    return {
      selected: [],
      ro: null,
      modalHeader: 0,
      modalFooter: 0,
      maxHeight: 0,
    }
  },
  watch: {
    selected: function() {
      this.$emit('selection-changed', this.selected)
    },
    clear: function() {
      this.selected = []
    },
  },
  mounted() {
    this.ro = new ResizeObserver((entries) => {
      let taskEntry = entries[0]
      const dataRows = taskEntry.target.parentElement.getBoundingClientRect()
        .height
      const modalBody = taskEntry.target.parentElement.parentElement.parentElement
      let occupiedSpace = 0
      modalBody.children.forEach(element => {
        occupiedSpace += element.getBoundingClientRect()
        .height
      });
      const vh = Math.max(
        document.documentElement.clientHeight || 0,
        window.innerHeight || 0
      )
      const maxHeight =
        0.8 * vh - /* matches modal dialog maximum height of 80vh. */
        64 - /* container padding two * 32 */
        64 - /* modal body margin two * 32 */
        occupiedSpace +
        dataRows -
        this.modalHeader -
        this.modalFooter
      this.maxHeight = maxHeight
    })
    this.ro.observe(this.$refs.tableData)
    this.modalHeader = document
      .querySelector('div.modal-header')
      .getBoundingClientRect().height
    this.modalFooter = document
      .querySelector('div.modal-footer')
      .getBoundingClientRect().height
  },
}
</script>

<style scoped>
td {
  text-align: start;
}

</style>
