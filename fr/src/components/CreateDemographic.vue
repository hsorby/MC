
<template>
  <div class="demographics">
    <h2>Create Demographic</h2>
    <form enctype=multipart/form-data v-on:submit.prevent="create">
      <p><label>Identifier:</label><input type="text" name="id" v-model.trim="demographic.id"></p>
      <p><label>Mass:</label><input type="number" name="mass" v-model.number="demographic.mass"></p>
      <p><label>Height:</label><input type="number" name="height" v-model.number="demographic.height"></p>
      <p><label>Age:</label><input type="number" name="age" v-model.number="demographic.age"></p>
      
      <p>
        <label></label>
        <span class="gender-group">
          <input type="radio" id="male" name="gender" value="male" v-model="demographic.gender">
          <label for="male">Male</label>
          <input type="radio" id="female" name="gender" value="female" v-model="demographic.gender">
          <label for="female">Female</label>
          <input type="radio" id="other" name="gender" value="other" v-model="demographic.gender">
          <label for="other">Other</label>
        </span>
      </p>
      <!-- <p>
        <label></label>
        <span class="visibility-group">
          <input type="radio" id="public" name="visibility" value="public" v-model="demographic.visibility"><label for="public">
          Public</label>
          <label for="private"><input type="radio" id="private" name="visibility" value="private" v-model="demographic.visibility">
          Private</label>
        </span>
      </p> -->
      <p>
      <label></label>
      <!-- <input type=submit value=Create> -->
      <button type="submit" class="swal2-confirm swal2-styled">Create</button>
      </p>
    </form>
  </div>
</template>

<script>
import { createDemographic } from '@/services/BackendAPI'

export default {
  name: 'CreateDemographic',
  data() {
    return {
      demographic: {
        id: -1,
        mass: 0,
        height: 0,
        age: 0,
        gender: 'other',
        visibility: 'public',
      }
    }
  },
  methods: {
    reset() {
      this.demographic.id = -1
      this.demographic.mass = 0
      this.demographic.height = 0
      this.demographic.age = 0
      this.demographic.gender = 'other'
      this.demographic.visibility = 'public'
    },
    create() {
      createDemographic(this.demographic).then(response => {
        this.$emit('created-demographic', response)
        this.reset()
      }).catch(err => {
        this.$alert(err.message, 'Create demograhpic error', 'error')
        this.reset()
      })
    }
  }
}
</script>

<style scoped>
form {
  display: table;
}
p {
  display: table-row;
}
label {
  display: table-cell;
  text-align: end;
}
input {
  display: table-cell;
}
.demographics {
  flex: 1;
}
</style>
