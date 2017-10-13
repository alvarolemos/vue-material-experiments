<template>
  <md-menu class="md-select">
    <md-input class="md-select-value" readonly v-model="content" md-menu-trigger />
    <!-- <md-file-icon @click.native="openPicker" /> -->

    <md-menu-content class="md-select-menu">
      <slot />
    </md-menu-content>

    <select readonly v-model="content" :required="required"></select>
  </md-menu>
</template>

<script>
  import MdComponent from 'core/MdComponent'
  import MdFieldMixin from '../MdFieldMixin'

  export default {
    name: 'MdSelect',
    mixins: [MdFieldMixin],
    inject: ['MdField']
  }
</script>

<style lang="scss">
  @import "~components/MdAnimation/variables";

  .md-select {
    display: flex;
    flex: 1;

    select {
      width: 1px;
      height: 1px;
      margin: -1px;
      padding: 0;
      overflow: hidden;
      position: absolute;
      clip: rect(0 0 0 0);
      border: 0;
    }

    .md-icon {
      cursor: pointer;
    }
  }

  .md-select-menu {
    width: 100%;
  }
</style>
