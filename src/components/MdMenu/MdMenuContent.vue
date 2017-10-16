<template>
  <md-popover
    class="md-menu-content md-scrollbar"
    :class="[menuClasses, $mdActiveTheme]"
    md-transition-name="md-menu-content"
    md-follow-el="original"
    :md-settings="popperSettings"
    :md-if="shouldRender">
    <md-focus-trap>
      <md-list @keydown.esc="onEsc">
        <slot />
      </md-list>
    </md-focus-trap>
  </md-popover>
</template>

<script>
  import MdComponent from 'core/MdComponent'
  import MdPropValidator from 'core/utils/MdPropValidator'
  import MdObserveEvent from 'core/utils/MdObserveEvent'
  import MdPopover from 'components/MdPopover/MdPopover'
  import MdFocusTrap from 'components/MdFocusTrap/MdFocusTrap'
  import MdList from 'components/MdList/MdList'

  export default new MdComponent({
    name: 'MdMenuContent',
    components: {
      MdPopover,
      MdFocusTrap,
      MdList
    },
    inject: ['MdMenu'],
    data: () => ({
      targetEl: null
    }),
    computed: {
      shouldRender () {
        return this.MdMenu.active
      },
      menuClasses () {
        const prefix = 'md-menu-content-'

        return {
          [prefix + this.MdMenu.direction]: true,
          [prefix + this.MdMenu.size]: true
        }
      },
      popperSettings () {
        const { direction, alignTrigger } = this.MdMenu

        if (this.targetEl) {
          let { offsetX, offsetY }= this.getOffsets()

          if (!this.hasCustomOffsets()) {
            offsetY = -this.targetEl.offsetHeight - 12

            if (direction.includes('start')) {
              offsetX = -8
            } else if (direction.includes('end')) {
              offsetX = 8
            }
          }

          return {
            placement: direction,
            modifiers: {
              keepTogether: {
                enabled: true
              },
              flip: {
                enabled: false
              },
              offset: {
                offset: `${offsetX}, ${offsetY}`
              }
            }
          }
        }

        return {}
      }
    },
    watch: {
      async shouldRender (shouldRender) {
        if (shouldRender) {
          window.setTimeout(this.createClickEventObserver, 10)
        }
      }
    },
    methods: {
      onEsc () {
        this.MdMenu.active = false
      },
      getOffsets () {
        return {
          offsetX: this.MdMenu.offsetX || 0,
          offsetY: this.MdMenu.offsetY || 0
        }
      },
      hasCustomOffsets () {
        const { offsetX, offsetY, alignTrigger } = this.MdMenu

        return alignTrigger || offsetX || offsetY
      },
      createClickEventObserver () {
        this.MdMenu.eventObserver = new MdObserveEvent(document.body, 'click', $event => {
          if (!this.$el.contains($event.target)) {
            this.MdMenu.active = false
            this.MdMenu.eventObserver.destroy()
          }
        })
      }
    },
    async mounted () {
      await this.$nextTick()

      this.targetEl = this.$children[0].originalParentEl
    },
    beforeDestroy () {
      if (this.MdMenu.eventObserver) {
        this.MdMenu.eventObserver.destroy()
      }
    }
  })
</script>

<style lang="scss">
  @import "~components/MdAnimation/variables";
  @import "~components/MdElevation/mixins";
  @import "~components/MdLayout/mixins";

  $md-menu-base-width: 56px;

  .md-menu-content {
    @include md-elevation(8);
    min-width: $md-menu-base-width * 2;
    max-width: $md-menu-base-width * 5;
    max-height: 50vh;
    position: fixed !important;
    z-index: 60;
    overflow: auto;
    border-radius: 2px;
    opacity: 0;
    transition: transform 0s .3s,
                opacity .4s $md-transition-default-timing;
    will-change: opacity, transform, top, left !important;

    &.md-menu-content-top-start {
      transform-origin: bottom left;
      transform: translate3d(0, 8px, 0) scaleY(.54);
    }

    &.md-menu-content-top-end {
      transform-origin: bottom right;
      transform: translate3d(0, 8px, 0) scaleY(.54);
    }

    &.md-menu-content-right-start {
      transform-origin: left top;
      transform: translate3d(0, -8px, 0) scaleY(.54);
    }

    &.md-menu-content-right-end {
      transform-origin: left bottom;
      transform: translate3d(0, 8px, 0) scaleY(.54);
    }

    &.md-menu-content-bottom-start {
      transform-origin: top left;
      transform: translate3d(0, -8px, 0) scaleY(.54);
    }

    &.md-menu-content-bottom-end {
      transform-origin: top right;
      transform: translate3d(0, -8px, 0) scaleY(.54);
    }

    &.md-menu-content-left-start {
      transform-origin: right top;
      transform: translate3d(0, -8px, 0) scaleY(.54);
    }

    &.md-menu-content-left-end {
      transform-origin: right bottom;
      transform: translate3d(0, 8px, 0) scaleY(.54);
    }

    &.md-menu-content-medium {
      min-width: $md-menu-base-width * 3;
    }

    &.md-menu-content-big {
      min-width: $md-menu-base-width * 4;
    }

    &.md-menu-content-huge {
      min-width: $md-menu-base-width * 5;
    }

    &.md-active {
      opacity: 1;
      transform: translate3d(0, 0, 0);
      transition: transform .15s $md-transition-stand-timing,
                  opacity .3s $md-transition-stand-timing;

      .md-list {
        opacity: 1;
      }
    }

    .md-list {
      opacity: 0;
      transition: opacity .3s $md-transition-drop-timing;
      will-change: opacity;
      font-family: 'Roboto', sans-serif;
      text-transform: none;
      white-space: nowrap;

      @include md-layout-small {
        font-size: 14px;
      }
    }
  }
</style>
