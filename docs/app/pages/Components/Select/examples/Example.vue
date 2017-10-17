<template>
  <div>
    <md-field>
      <label>Single</label>
      <md-select>
        <md-option>Single</md-option>
        <md-option>Test 1</md-option>
        <md-option>Test 2</md-option>
        <md-option class="md-selected">Test 3</md-option>
        <md-option>Test 4</md-option>
        <md-option>Test 5</md-option>
        <md-option>Test 6</md-option>
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
