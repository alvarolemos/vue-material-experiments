<template>
  <md-menu class="md-select" :md-active.sync="showSelect" @md-opened="onOpen" @md-closed="onClosed">
    <md-input
      class="md-select-value"
      v-model="content"
      readonly
      @focus.prevent="onFocus"
      @click="openSelect"
      @keydown.down="openSelect"
      @keydown.enter="openSelect"
      @keydown.space="openSelect"  />
    <md-drop-down-icon ref="icon" @blur.native="removeHighlight" @click.native="openSelect" />

    <md-menu-content class="md-select-menu">
      <slot />
    </md-menu-content>

    <select readonly v-model="content" :required="required"></select>
  </md-menu>
</template>

<script>
  import MdComponent from 'core/MdComponent'
  import MdDropDownIcon from 'core/icons/MdDropDownIcon'
  import MdMenu from 'components/MdMenu/MdMenu'
  import MdMenuContent from 'components/MdMenu/MdMenuContent'
  import MdInput from '../MdInput/MdInput'
  import MdFieldMixin from '../MdFieldMixin'

  export default {
    name: 'MdSelect',
    components: {
      MdInput,
      MdMenu,
      MdMenuContent,
      MdDropDownIcon
    },
    mixins: [MdFieldMixin],
    inject: ['MdField'],
    data: () => ({
      showSelect: false
    }),
    methods: {
      onOpen () {
        window.setTimeout(() => {
          this.MdField.focused = true
        }, 10)
      },
      applyHighlight () {
        this.MdField.focused = false
        this.MdField.highlighted = true
        this.$refs.icon.$el.focus()
      },
      onClosed () {
        this.$refs.icon.$el.setAttribute('tabindex', 1)
        this.applyHighlight()
      },
      onFocus () {
        this.applyHighlight()
      },
      removeHighlight () {
        this.MdField.highlighted = false
        this.$refs.icon.$el.removeAttribute('tabindex')
      },
      openSelect () {
        console.log('test')
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
      outline: none;
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
