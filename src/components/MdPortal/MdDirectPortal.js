import Vue from 'vue'

export default {
  name: 'MdDirectPortal',
  abstract: true,
  props: {
    mdTarget: {
      type: window.HTMLElement,
      validator (value) {
        if (value && value instanceof window.HTMLElement) {
          return true
        }

        Vue.util.warn('The md-target-el prop is invalid. You should pass a valid HTMLElement.', this)

        return false
      }
    }
  },
  watch: {
    mdTarget (newTarget, oldTarget) {
      this.changeParentEl(newTarget)

      if (oldTarget) {
        this.$forceUpdate()
      }
    }
  },
  methods: {
    changeParentEl (newTarget) {
      newTarget.appendChild(this.$el)
    }
  },
  mounted () {
    this.changeParentEl(this.mdTarget || document.body)
  },
  beforeDestroy () {
    if (this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el)
    }
  },
  render (createElement) {
    const slot = this.$slots.default[0]

    return slot && slot
  }
}
