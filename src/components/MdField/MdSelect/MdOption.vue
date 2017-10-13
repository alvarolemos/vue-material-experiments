<template>
  <md-menu-item @click="test">
    <slot />
  </md-menu-item>
</template>

<script>
  import MdComponent from 'core/MdComponent'

  export default {
    name: 'MdOption',
    methods: {
      test () {
        console.log(this.$el.textContent)
      }
    }
  }
</script>

<style lang="scss">

</style>
