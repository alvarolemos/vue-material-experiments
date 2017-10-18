<script>
  import Popper from 'popper.js'
  import deepmerge from 'deepmerge'
  import MdPortal from 'components/MdPortal/MdPortal'

  export default {
    name: 'MdPopover',
    components: {
      MdPortal
    },
    props: {
      mdIf: Boolean,
      mdTag: {
        type: String,
        default: 'div'
      },
      mdSettings: {
        type: Object,
        default: () => ({})
      }
    },
    data: () => ({
      popperInstance: null,
      originalParentEl: null,
      shouldRender: false,
      shouldActivate: false,
      isHidden: true,
      didMount: false
    }),
    computed: {
      popoverClasses () {
        if (this.shouldActivate) {
          return 'md-active'
        } else if (this.shouldRender) {
          return 'md-rendering'
        }
      }
    },
    watch: {
      mdIf: {
        immediate: true,
        handler (shouldRender) {
          this.shouldRender = shouldRender

          if (shouldRender) {
            this.bindPopper()
          } else {
            this.shouldActivate = false
          }
        }
      },
      mdSettings (settings) {
        if (this.popperInstance) {
          this.killPopper()
          this.createPopper()
        }
      }
    },
    methods: {
      getPopperOptions () {
        return {
          placement: 'bottom',
          modifiers: {
            preventOverflow: {
              boundariesElement: 'viewport',
              padding: 16
            },
            computeStyle: {
              gpuAcceleration: false
            }
          },
          onCreate: () => {
            this.shouldActivate = true
            this.$emit('md-active')
          }
        }
      },
      setOriginalParent (el) {
        this.originalParentEl = el
      },
      killPopper () {
        if (this.popperInstance) {
          this.popperInstance.destroy()
          this.popperInstance = null
        }
      },
      async bindPopper () {
        await this.$nextTick()

        if (this.originalParentEl) {
          this.createPopper()
        }
      },
      async createPopper () {
        const options = deepmerge(this.getPopperOptions(), this.mdSettings)
        const el = this.$children[0].$el

        if (el.constructor.name.toLowerCase() !== 'comment') {
          this.popperInstance = new Popper(this.originalParentEl, el, options)
        }
      }
    },
    beforeDestroy () {
      this.killPopper()
    },
    render (createElement) {
      return createElement('md-portal', {
        staticClass: 'md-popover',
        class: this.popoverClasses,
        props: {
          ...this.$attrs,
          mdTag: this.mdTag,
          mdIf: this.shouldRender
        },
        on: {
          ...this.$listeners,
          'md-original-parent': this.setOriginalParent,
          'md-destroy': this.killPopper
        }
      }, [this.$slots.default])
    }
  }
</script>

<style lang="scss">
  .md-popover {
    &.md-rendering {
      opacity: 0;
      transition: none !important;
    }
  }
</style>
