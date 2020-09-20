<template>
  <table>
    <tr>
      <th>{{ heading }}</th>
    </tr>
    <template v-for="(row, index) in data">
      <tr :key="index">
        <td>
          <label>{{ row.source.textContent }}</label>
        </td>
        <td><label> ==> </label></td>
        <td>
          <label>{{ row.target.textContent }}</label>
        </td>
        <td></td>
        <td>
          <button
            type="button"
            class="swal2-styled swal2-error sml-btn"
            @click="removeRow(index)"
          >
            Remove
          </button>
        </td>
      </tr>
    </template>
  </table>
</template>

<script>
// <font-awesome-icon
//               icon="minus"
//               title="delete"
//             ></font-awesome-icon>
export default {
  name: 'ConversionTable',
  props: {
    heading: {
      type: String,
    },
    data: {
      type: Array,
    },
  },
  methods: {
    removeRow(index) {
      this.$emit('remove', index)
    },
  },
}
</script>

<style>
.sml-btn {
  font-size: 0.5rem !important;
}
</style>
