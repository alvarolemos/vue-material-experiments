<template>
  <md-menu-item :class="optionClasses" :disabled="isDisabled" @click="setSelection">
    <slot />
  </md-menu-item>
</template>

<script>
  import MdUuid from 'core/utils/MdUuid'

  export default {
    name: 'MdOption',
    props: {
      value: [String, Number, Boolean],
      disabled: Boolean
    },
    inject: {
      MdSelect: {},
      MdOptgroup: {
        default: {}
      }
    },
    data: () => ({
      uniqueId: 'md-option-' + MdUuid(),
      isSelected: false
    }),
    computed: {
      isDisabled () {
        return this.MdOptgroup.disabled || this.disabled
      },
      key () {
        return this.value || this.uniqueId
      },
      inputLabel () {
        return this.MdSelect.label
      },
      optionClasses () {
        return {
          'md-selected': this.isSelected
        }
      }
    },
    watch: {
      inputLabel () {
        this.setIsSelected()
      }
    },
    methods: {
      setIsSelected () {
        this.isSelected = this.inputLabel === this.$el.textContent.trim()
      },
      setSelection () {
        if (!this.disabled) {
          this.MdSelect.setValue(this.value)
          this.MdSelect.setContent(this.$el.textContent)
        }
      },
      setItem () {
        this.$set(this.MdSelect.items, this.key, this.$el.textContent)
      }
    },
    updated () {
      this.setItem()
    },
    mounted () {
      this.setItem()
      this.setIsSelected()
    }
  }
</script>

<style lang="scss">

</style>
