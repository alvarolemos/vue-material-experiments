<template>
  <div>
    <md-field>
      <label>Single</label>
      <md-select>
        <md-option v-for="item in 15" :key="item" :class="{ 'md-selected': item === 8 }">Test {{ item }}</md-option>
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
