<template>
  <header class="app__header">
    <div class="header-menu">
      <button class="header-menu-button" type="button" @click="TOGGLE_GLOBAL_NAVIGATION">
        <i class="material-icons icon">menu</i>
      </button>
    </div>
    <div class="header-logo">
      <router-link :to="{name: 'Home'}" class="header-logo-link">SAGAKSAGAK</router-link>
    </div>
  </header>
</template>

<script>
  import { mapMutations } from 'vuex'

  export default {
    name: 'app-header',
    methods: mapMutations([ 'TOGGLE_GLOBAL_NAVIGATION' ]),
    data () {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import 'init';

  .app__header {
    position: relative;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    padding: 0 $space-unit / 4;
    background-color: $color-background;
  }

  .header-logo,
  .header-menu {
    padding-left: $space-unit / 2;
  }

  .header-menu-button,
  .header-logo-link {
    @extend %form-init;
    display: inline-block;
    width: auto;
    line-height: $header-height;
    text-align: left;
    white-space: nowrap;
    color: $color-brand;
  }

  .header-logo-link {
    font-weight: bold;
  }
</style>
