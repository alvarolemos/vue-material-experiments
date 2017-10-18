<template>
  <button type="button" :disabled="disabled" class="md-list-item-button">
    <md-list-item-content :md-disabled="isDisabled">
      <slot />
    </md-list-item-content>
  </button>
</template>

<script>
  import MdListItemMixin from './MdListItemMixin'

  export default {
    name: 'MdListItemButton',
    mixins: [MdListItemMixin]
  }
</script>
