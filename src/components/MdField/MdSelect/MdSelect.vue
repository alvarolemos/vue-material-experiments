<template>
  <md-menu :md-active.sync="showSelect" class="md-select">
    <md-input class="md-select-value" v-model="content" readonly @click.prevent="openSelect" @keydown.down="openSelect" />
    <md-drop-down-icon @click.native="openSelect" />

    <md-menu-content class="md-select-menu">
      <slot />
    </md-menu-content>

    <select readonly v-model="content" :required="required"></select>
  </md-menu>
</template>

<script>
  import MdComponent from 'core/MdComponent'
  import MdDropDownIcon from 'core/icons/MdDropDownIcon'
  import MdFieldMixin from '../MdFieldMixin'

  export default {
    name: 'MdSelect',
    components: {
      MdDropDownIcon
    },
    mixins: [MdFieldMixin],
    inject: ['MdField'],
    data: () => ({
      showSelect: false
    }),
    methods: {
      openSelect () {
        this.showSelect = true
      }
    }
  }
</script>

<style lang="scss">
  @import "~components/MdAnimation/variables";

  .md-menu.md-select {
    display: flex;
    flex: 1;

    .md-input {
      flex: 1;
    }

    .md-input,
    .md-icon {
      cursor: pointer;
    }

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
  }

  .md-select-menu {
    width: 100%;
  }
</style>
