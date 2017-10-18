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
        this.MdSelect.setContent(this.$el.textContent)
      },
      setMultipleSelection () {
        this.isChecked = !this.isChecked
        this.MdSelect.setMultipleValue(this.value)
        this.MdSelect.setMultipleContent(this.$el.textContent)
      },
      setSelection () {
        if (!this.disabled) {
          if (this.MdSelect.multiple) {
            this.setMultipleSelection()
          } else {
            this.setSingleSelection()
          }
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
