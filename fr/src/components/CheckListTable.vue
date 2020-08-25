<template>
  <table>
    <tr>
      <th>{{ heading }}</th>
    </tr>
    <template v-for="row in rows">
      <tr :key="row">
        <td><label><input type="checkbox" :value="row" @change="toggled" v-model="selected">{{ row }}</label></td>
      </tr>
    </template>
  </table>
</template>

<script>
export default {
  name: "CheckListTable",
  props: {
    heading: {
      type: String
    },
    rows: {
      type: Array
    }
  },
  data() {
    return {
      selected: []
    }
  },
  methods: {
    toggled() {
      this.$emit('selection-changed', this.selected)
    }
  }

}
</script>

<style scoped>
td {
  text-align: start;
}
</style>