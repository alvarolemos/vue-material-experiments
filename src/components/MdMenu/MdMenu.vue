<template>
  <div class="md-menu">
    <slot />
  </div>
</template>

<script>
  import MdPropValidator from 'core/utils/MdPropValidator'

  export default {
    name: 'MdMenu',
    props: {
      mdActive: Boolean,
      mdAlignTrigger: Boolean,
      mdOffsetX: Number,
      mdOffsetY: Number,
      mdDirection: {
        type: String,
        default: 'bottom-start',
        ...MdPropValidator('md-direction', [
          'top-end',
          'top-start',
          'bottom-end',
          'bottom-start'
        ])
      },
      mdCloseOnSelect: {
        type: Boolean,
        default: true
      },
      mdSize: {
        type: String,
        default: 'small',
        ...MdPropValidator('md-size', [
          'auto',
          'small',
          'medium',
          'big',
          'huge'
        ])
      }
    },
    data () {
      return {
        triggerEl: null,
        MdMenu: {
          active: this.mdActive,
          direction: this.mdDirection,
          size: this.mdSize,
          alignTrigger: this.mdAlignTrigger,
          offsetX: this.mdOffsetX,
          offsetY: this.mdOffsetY,
          closeOnSelect: this.mdCloseOnSelect,
          eventObserver: null
        }
      }
    },
    provide () {
      return {
        MdMenu: this.MdMenu
      }
    },
    computed: {
      isActive () {
        return this.MdMenu.active
      }
    },
    watch: {
      mdActive (isActive) {
        this.MdMenu.active = isActive
      },
      mdDirection (direction) {
        this.MdMenu.direction = direction
      },
      mdSize (size) {
        this.MdMenu.size = size
      },
      mdAlignTrigger (aligned) {
        this.MdMenu.alignTrigger = aligned
      },
      mdOffsetX (offset) {
        this.MdMenu.offsetX = offset
      },
      mdOffsetY (offset) {
        this.MdMenu.offsetY = offset
      },
      isActive (isActive) {
        this.$emit('update:mdActive', isActive)
      }
    },
    methods: {
      toggleContent () {
        this.MdMenu.active = !this.MdMenu.active
      }
    },
    async mounted () {
      await this.$nextTick()

      this.triggerEl = this.$el.querySelector('[md-menu-trigger]')

      if (this.triggerEl) {
        this.triggerEl.addEventListener('click', this.toggleContent)
      }
    },
    beforeDestroy () {
      if (this.triggerEl) {
        this.triggerEl.removeEventListener('click', this.toggle)
      }
    }
  }
</script>

<style lang="scss">
  @import "~components/MdAnimation/variables";
  @import "~components/MdLayout/mixins";

  .md-menu {
    display: inline-block;

    > .md-button {
      margin: 0;
    }
  }
</style>
