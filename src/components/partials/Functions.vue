<template>
  <div class="function-wrap">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'functions'
  }
</script>

<style lang="scss" scoped rel="stylesheet/scss">
  @import 'init';

  .function-wrap {
    position: absolute;
    bottom: 0;
    left: 0;
    display: flex;
    justify-content: flex-start;
    padding: $space-unit;
  }

  .function {
    @extend %form-init;
    display: inline-block;
    border-radius: $radius-unit;
    padding: 0 ($space-unit / 2);
    margin-left: $space-unit / 4;
    width: auto;
    background-color: $color-background;
    color: $color-text-light;
    font-size: $font-size-smallest;
    line-height: $space-unit * 1.25;
    cursor: default;
  }

  button.function,
  a.function {
    cursor: pointer;
  }
</style>
