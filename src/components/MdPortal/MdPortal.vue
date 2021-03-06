<script>
  import Vue from 'vue'

  const validator = (prop, context, expression, message) => {
    if (expression) {
      return true
    }

    Vue.util.warn(`The ${prop} prop is invalid. ${message}.`, context)

    return false
  }

  export default {
    name: 'MdPortal',
    props: {
      mdIf: {
        type: null,
        validator: value => validator('md-if', this, value === null || typeof value === 'boolean', 'You should pass a Boolean value')
      },
      mdTag: {
        type: String,
        default: 'div'
      },
      mdTransitionName: String,
      mdTransitionAppear: Boolean,
      mdTargetEl: {
        type: HTMLElement,
        validator: value => validator('md-target-el', this, value && value instanceof HTMLElement, 'You should pass a valid HTMLElement')
      }
    },
    data: () => ({
      leaveTimeout: null,
      originalParentEl: null,
      targetEl: null
    }),
    computed: {
      shouldRender () {
        return typeof this.mdIf === 'boolean' ? this.mdIf : true
      },
      leaveClass () {
        return this.mdTransitionName + '-leave'
      },
      leaveActiveClass () {
        return this.mdTransitionName + '-leave-active'
      },
      leaveToClass () {
        return this.mdTransitionName + '-leave-to'
      }
    },
    watch: {
      mdTargetEl (newTarget, oldTarget) {
        this.changeParentEl()
        newTarget.appendChild(this.$el)

        if (oldTarget) {
          this.$forceUpdate()
        }
      }
    },
    methods: {
      getTransitionDuration () {
        const duration = window.getComputedStyle(this.$el).transitionDuration
        const num = parseFloat(duration, 10)
        let unit = duration.match(/m?s/)
        let milliseconds = null

        if (unit) {
          unit = unit[0]
        }

        switch (unit) {
          case 's':
            milliseconds = num * 1000
            break

          case 'ms':
            milliseconds = num
            break

          default:
            milliseconds = 0
            break
        }

        return milliseconds
      },
      prepareSlotRender ($slots) {
        const slotNames = Object.keys($slots)

        slotNames.forEach(slot => {
          $slots[slot]._rendered = false
        })
      },
      changeParentEl () {
        this.targetEl = this.mdTargetEl || document.body
        this.$options._parentElm = this.targetEl
      },
      killGhostElement () {
        if (this.targetEl) {
          const children = Array.from(this.targetEl.childNodes)

          if (children.includes(this.$el)) {
            this.targetEl.removeChild(this.$el)
          }
        }
      },
      destroyElement () {
        window.requestAnimationFrame(() => {
          this.$el.classList.remove(this.leaveClass)
          this.$el.classList.remove(this.leaveActiveClass)
          this.$el.classList.remove(this.leaveToClass)
          this.$emit('md-destroy')
          this.killGhostElement()
        })
      }
    },
    created () {
      this.originalParentEl = this.originalParentEl || this.$options._parentElm
      this.changeParentEl()
    },
    mounted () {
      this.$emit('md-original-parent', this.originalParentEl)
    },
    async beforeDestroy () {
      if (this.$el.classList) {
        this.$el.classList.add(this.leaveClass)
        this.$el.classList.add(this.leaveActiveClass)
        await this.$nextTick()
        this.$el.classList.add(this.leaveToClass)

        window.clearTimeout(this.leaveTimeout)
        this.leaveTimeout = window.setTimeout(this.destroyElement, this.getTransitionDuration())
      } else {
        this.killGhostElement()
      }
    },
    render (createElement) {
      let portalElement = null

      if (this.shouldRender) {
        portalElement = createElement(this.mdTag, {
          class: this.shouldRender,
          style: this.shouldRender,
          on: this.$listeners
        }, [this.$slots.default])
      }

      return createElement('transition', {
        props: {
          name: this.mdTransitionName,
          appear: this.mdTransitionAppear
        }
      }, [portalElement])
    }
  }
</script>
