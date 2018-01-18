<template>
  <router-link :to="{ name: 'Comic', params: { id: id } }" class="index-item">
    <div class="index-item-body">
      <div class="index-item-contents">
        <div class="image-wrap" :style="{ backgroundImage: `url(${imageUrl})` }"></div>
        <div class="texts">
          <div class="title">{{ title }}</div>
          <div class="descriptions">{{ descriptions }}</div>
        </div>
      </div>
    </div>
  </router-link>
</template>

<script>
  import filters from '@/utils/filters'

  export default {
    name: 'index-item',
    props: [ 'width', 'id', 'title', 'createdAt', 'imageUrl', 'descriptions' ],
    filters: filters
  }
</script>

<style lang="scss" scoped>
  @import 'init';

  .index-item {
    box-sizing: border-box;
    display: block;
    padding: $space-unit / 4;
    width: 50%;
    color: $color-text;
    text-decoration: none;
    @media screen and (min-width: 640px) {
      width: 33.333%;
    }
    @media screen and (min-width: 960px) {
      width: 25%;
    }
  }

  .index-item-body {
    position: relative;
    box-sizing: border-box;
    background-color: $color-background;
  }

  .index-item-contents {
    .image-wrap {
      position: relative;
      display: block;
      padding-top: 100%;
      background-size: cover;
      background-color: $color-disabled;
      background-position: center center;
      &:after {
        content: '';
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        border: 1px solid rgba(0,0,0,.1);
      }
    }
    .texts {
      border-color: $color-disabled;
      border-style: solid;
      border-width: 0 1px 1px;
      padding: ($space-unit * .75) ($space-unit * .75) 0;
      font-size: $font-size-smaller;
      .title {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: $font-size-small;
        font-weight: bold;
      }
      .descriptions {
        overflow: hidden;
        margin-top: $space-unit / 2;
        height: $space-unit * 4;
        color: $color-text-lighter;
        font-size: $font-size-smaller;
        word-break: break-all;
      }
    }
  }
</style>
