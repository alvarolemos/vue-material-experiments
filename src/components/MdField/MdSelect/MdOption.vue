<template>
  <md-menu-item :class="optionClasses" :disabled="isDisabled" @click="setSelection">
    <md-checkbox class="md-primary" v-model="isChecked" v-if="MdSelect.multiple" />

    <span class="md-list-item-text">
      <slot />
    </span>
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
      isSelected: false,
      isChecked: false
    }),
    computed: {
      selectValue () {
        return this.MdSelect.modelValue
      },
      isMultiple () {
        return this.MdSelect.multiple
      },
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
          'md-selected': this.isSelected || this.isChecked
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
      setSingleSelection () {
        this.MdSelect.setValue(this.value)
      },
      setMultipleSelection () {
        this.isChecked = !this.isChecked
        this.MdSelect.setMultipleValue(this.value)
      },
      setSelection () {
        if (!this.disabled) {
          if (this.isMultiple) {
            this.setMultipleSelection()
          } else {
            this.setSingleSelection()
          }
        }
      },
      setItem () {
        this.$set(this.MdSelect.items, this.key, this.$el.textContent.trim())
      }
    },
    updated () {
      this.setItem()
    },
    mounted () {
      this.setItem()
      this.setIsSelected()

      if (this.isMultiple && this.selectValue && this.selectValue.length) {
        this.isChecked = this.selectValue.includes(this.value)
      }
    },
    beforeDestroy () {
      this.$delete(this.MdSelect.items, this.key)
    }
  }
</script>

<style lang="scss">

</style>
