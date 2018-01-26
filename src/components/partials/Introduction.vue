<template>
  <Card>
    <div class="introduction" @click="handleClick">
      <div class="introduction-body">
        <div class="introduction-title">{{ title }}</div>
        <div class="introduction-descriptions">{{ descriptions }}</div>
        <div class="introduction-functions">
          <slot></slot>
        </div>
      </div>
    </div>
  </Card>
</template>

<script>
  import Card from '@/components/partials/Card'

  export default {
    name: 'introduction',
    components: { Card },
    props: [ 'imageUrl', 'title', 'status', 'descriptions', 'imageUrl' ],
    mounted () {
      console.log(this.$el.offsetTop, this.$el.offsetHeight)
    },
    methods: {
      handleClick () {
        this.isActive = this.isActive === false
      }
    }
  }
</script>

<style lang="scss" scoped rel="stylesheet/scss">
  @import 'init';

  .introduction {
    box-sizing: border-box;
  }
  .introduction-body {
  }
  .introduction-title {
    font-size: $font-size-large;
    color: $color-text-light;
  }
  .introduction-descriptions {
    margin-top: $space-unit;
    color: $color-text-lighter;
    white-space: pre-line;
    word-break: break-all;
  }
  .introduction-functions {
    margin-top: $space-unit * 1.5;
  }
</style>
