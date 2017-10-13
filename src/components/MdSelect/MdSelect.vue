<template>
  <div class="md-select" :class="[$mdActiveTheme]">
    <slot />
  </div>
</template>

<script>
  import MdComponent from 'core/MdComponent'

  export default new MdComponent({
    name: 'MdSelect'
  })
</script>

<style lang="scss">
  @import "~components/MdAnimation/variables";

  .md-select {
    transition: .3s $md-transition-default-timing;
  }
</style>