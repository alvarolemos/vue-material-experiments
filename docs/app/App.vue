<template>
  <div class="container" :class="containerClass">
    <main-header />

    <div class="container-wrapper md-layout-row" :class="containerClass">
      <main-nav :is-splash="isSplash" />

      <router-view v-if="!loading" />

      <div class="main-container" v-if="loading">
        <code-loading />
      </div>
    </div>

    <main-footer />
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import CodeLoading from './components/CodeLoading'
  import MainHeader from './template/MainHeader'
  import MainNav from './template/MainNav'
  import MainFooter from './template/MainFooter'

  export default {
    name: 'App',
    components: {
      CodeLoading,
      MainHeader,
      MainNav,
      MainFooter
    },
    data: () => ({
      loading: false
    }),
    computed: {
      ...mapState({
        isSplash: 'splashPage'
      }),
      containerClass () {
        return {
          splash: this.isSplash
        }
      }
    },
    methods: {
      beforeRouteRender (to, from, next) {
        this.loading = true
        next()
      },
      afterRouteRender () {
        this.loading = false
      }
    },
    created () {
      this.$router.beforeEach(this.beforeRouteRender)
      this.$router.afterEach(this.afterRouteRender)
    }
  }
</script>

<style lang="scss">
  @import "./themes/default";
  @import "./themes/dark";
  @import "./themes/demo";

  body {
    height: 100%;
  }
</style>

<style lang="scss" scoped>
  @import "~vue-material/components/MdAnimation/variables";
  @import "~vue-material/components/MdLayout/mixins";
  @import "~vue-material/theme/factory";

  .container {
    min-height: 100%;
    padding-top: 64px;
    display: flex;
    flex-direction: column;
    font-family: "Roboto Mono", monospace;
    transition: $md-transition-default;
    transition-property: padding-top;

    @include md-layout-small {
      padding-top: 48px;
    }

    @include md-layout-xsmall {
      padding-top: 56px;
    }

    &.splash .main-header {
      max-width: 1312px;
      transition: .3s $md-transition-default-timing;
      transition-property: max-width;
    }
  }

  .container-wrapper {
    &:not(.splash) {
      padding-left: 230px !important;

      @include md-layout-xsmall {
        padding-left: 0 !important;
      }
    }
  }

  .main-container {
    flex: 1;
    position: relative;
    z-index: 1;
  }

  .code-loading {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
</style>
