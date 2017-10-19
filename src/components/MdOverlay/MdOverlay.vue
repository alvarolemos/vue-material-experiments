<template>
  <md-direct-portal :md-target="targetEl">
    <transition name="md-overlay">
      <div class="md-overlay" :class="overlayClasses" v-on="$listeners" v-if="mdVisible"></div>
    </transition>
  </md-direct-portal>
</template>

<script>
  import MdDirectPortal from 'components/MdPortal/MdDirectPortal'

  export default {
    name: 'MdOverlay',
    components: {
      MdDirectPortal
    },
    props: {
      mdVisible: Boolean,
      mdAttachToParent: Boolean,
      mdFixed: Boolean
    },
    data: () => ({
      targetEl: null
    }),
    computed: {
      isVisible () {
        return (!this.mdAttachToParent || this.targetEl) && this.mdVisible
      },
      overlayClasses () {
        return {
          'md-fixed': this.mdFixed
        }
      }
    },
    mounted () {
      if (this.mdAttachToParent) {
        this.targetEl = this.$el.parentNode
      }
    }
  }
</script>

<style lang="scss">
  @import "~components/MdAnimation/variables";

  .md-overlay {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 10;
    overflow: hidden;
    background: rgba(#000, .6);
    transition: .35s $md-transition-default-timing;
    transition-property: opacity;
    will-change: opacity;

    body > &,
    &.md-fixed {
      position: fixed;
    }
  }

  .md-overlay-enter,
  .md-overlay-leave-active {
    opacity: 0;
  }
</style>
