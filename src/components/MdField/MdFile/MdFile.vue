<template>
  <div class="md-file">
    <md-file-icon @click.native="openPicker" />

    <input
      class="md-input"
      readonly
      v-model="content"
      v-bind="{ disabled, required, placeholder }"
      @focus="openPicker"
      @blur="onBlur">

    <input type="file" ref="inputFile" v-bind="attributes" v-on="$listeners" @change="onChange" />
  </div>
</template>

<script>
import MdComponent from 'core/MdComponent'
import MdUuid from 'core/utils/MdUuid'
import MdFileIcon from 'core/icons/MdFileIcon'
import MdFieldMixin from '../MdFieldMixin'

export default new MdComponent({
  name: 'MdFile',
  components: {
    MdFileIcon
  },
  props: {
    id: {
      type: String,
      default: () => 'md-file-' + MdUuid()
    },
    name: String
  },
  mixins: [MdFieldMixin],
  inject: ['MdField'],
  methods: {
    getMultipleName (files) {
      let names = [];

      [...files].forEach(({ name }) => names.push(name))

      return names.join(', ')
    },
    getFileName (files, target) {
      if (!files) {
        return target.value.split('\\').pop()
      }

      if (files.length > 1) {
        return this.getMultipleName(files)
      }

      if (files.length === 1) {
        return files[0].name
      }

      return null
    },
    openPicker () {
      this.onFocus()
      this.$refs.inputFile.click()
    },
    onChange ($event) {
      this.onFileSelected($event)
      this.onInput()
    },
    onFileSelected ({ target, dataTransfer }) {
      const files = target.files || dataTransfer.files

      this.content = this.getFileName(files, target)
      this.$emit('md-change', files || target.value)
      this.$emit('input', this.content)
    }
  },
  created () {
    this.MdField.file = true
  },
  beforeDestroy () {
    this.MdField.file = false
  }
})
</script>

<style lang="scss">
  .md-file {
    display: flex;
    flex: 1;

    input[type="file"] {
      width: 1px;
      height: 1px;
      margin: -1px;
      padding: 0;
      overflow: hidden;
      position: absolute;
      clip: rect(0 0 0 0);
      border: 0;
    }

    .md-icon {
      cursor: pointer;
    }
  }
</style>
