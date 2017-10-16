import Vue from 'vue'

export default {
  name: 'MdFocusTrap',
  abstract: true,
  methods: {
    async setFocus () {
      await this.$nextTick()

      if (this.$el.tagName) {
        this.$el.setAttribute('tabindex', '-1')
        this.$el.focus()
      }
    }
  },
  mounted () {
    this.setFocus()
  },
  render () {
    try {
      return this.$slots.default[0]
    } catch (e) {
      Vue.util.warn('MdFocusTrap can only render one, and exactly one child component.', this)
    }

    return null
  }
}
