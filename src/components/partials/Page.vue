<template>
  <div class="page" :class="pageClass">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'page',
    props: ['name'],
    computed: {
      pageClass () {
        console.log(this.name)
        return this.name ? { [`page-${this.name}`]: true } : {}
      }
    }
  }
</script>

<style lang="scss" scoped rel="stylesheet/scss">
  @import 'init';

  .page {
    max-width: $site-width;
    margin: ($space-unit * 3) auto $space-unit;
    padding: 0 $space-unit;
    @media screen and (min-width: 640px) {
      margin-top: $space-unit * 4;
      padding: 0 ($space-unit * 2);
    }
  }

  .page-add-comic {
    max-width: $site-width-narrow;
  }
</style>
