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
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .function {
    @extend %form-init;
    box-sizing: border-box;
    width: auto;
    color: $color-text-light;
    font-size: $font-size-smallest;
    cursor: default;
    text-align: center;
    white-space: normal;
  }
  .function ~ .function {
    margin-left: $space-unit / 2;
  }

  button.function,
  a.function {
    cursor: pointer;
  }
</style>
