<template>
  <div class="page">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'page'
  }
</script>

<style lang="scss" scoped rel="stylesheet/scss">
  @import 'init';

  .page {
    padding: ($space-unit * 2) $space-unit;
    background-color: $color-background;
    @media screen and (min-width: 640px) {
      padding: ($space-unit * 3) ($space-unit * 2);
    }
  }

  .page-grey {
    background-color: $color-background-dark;
  }

</style>
