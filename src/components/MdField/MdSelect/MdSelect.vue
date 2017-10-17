<template>
  <md-menu class="md-select" :md-active.sync="showSelect" :md-offset-x="offset.x" :md-offset-y="offset.y" @md-opened="onOpen" @md-closed="onClosed">
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

    <md-menu-content class="md-select-menu" :style="menuStyles" :id="uniqueId">
      <slot />
    </md-menu-content>

    <select readonly v-model="content" :required="required"></select>
  </md-menu>
</template>

<script>
  import raf from 'raf'
  import MdUuid from 'core/utils/MdUuid'
  import MdComponent from 'core/MdComponent'
  import MdDropDownIcon from 'core/icons/MdDropDownIcon'
  import MdMenu from 'components/MdMenu/MdMenu'
  import MdMenuContent from 'components/MdMenu/MdMenuContent'
  import MdInput from '../MdInput/MdInput'
  import MdFieldMixin from '../MdFieldMixin'

  const defaultOffset = {
    x: -16,
    y: -48
  }

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
      uniqueId: 'md-select-menu-' + MdUuid(),
      menuStyles: {},
      offset: {
        x: defaultOffset.x,
        y: 0
      },
      showSelect: false
    }),
    methods: {
      async setOffsets () {
        await this.$nextTick()

        const menu = document.getElementById(this.uniqueId)
        const selected = menu.querySelector('.md-selected')

        if (selected) {
          selected.scrollIntoView()

          this.offset.y = defaultOffset.y - selected.offsetTop + menu.scrollTop + 7
          this.menuStyles = {
            'transform-origin': `0 ${Math.abs(this.offset.y)}px`
          }
        } else {
          this.offset.y = defaultOffset.y
          this.menuStyles = {}
        }
      },
      onOpen () {
        this.setOffsets()
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

  .md-menu-content.md-select-menu {
    width: 100%;

    &.md-menu-content-bottom-start {
      transform: translate3d(0, -8px, 0) scaleY(.3);
    }

    &.md-active {
      transform: translate3d(0, 0, 0);
    }
  }
</style>
