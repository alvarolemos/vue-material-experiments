<template>
  <div>
    <md-field>
      <label>Single</label>
      <md-select>
        <md-option>Test 1</md-option>
        <md-option>Test 2</md-option>
        <md-option>Test 3</md-option>
      </md-select>
    </md-field>
  </div>
</template>

<script>
  export default {
    name: 'Example'
  }
</script>

<style lang="scss" scoped>
  .md-field {
    max-width: 300px;
    display: inline-flex;
  }
</style>
