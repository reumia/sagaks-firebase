<template>
  <router-link :to="{ name: 'Comic', params: { id: id } }" class="index-item">
    <div class="index-item-body">
      <div class="image-wrap" :style="{ backgroundImage: `url(${imageUrl})` }"></div>
      <div class="texts">
        <div class="title">{{ title }}</div>
        <div class="descriptions">{{ descriptions }}</div>
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
    &:hover {
      .texts {
        opacity: 1;
      }
    }
    @media screen and (min-width: 480px) {
      width: 33.333%
    }
    @media screen and (min-width: 640px) {
      width: 25%;
    }
    @media screen and (min-width: 960px) {
      width: 16.666%;
    }
  }

  .index-item-body {
    overflow: hidden;
    position: relative;
    box-sizing: border-box;
    background-color: $color-background;
    &:after {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      border-bottom: 2px solid rgba(0,0,0,.1);
    }
    .image-wrap {
      display: block;
      padding-top: 100%;
      background-color: $color-disabled;
      background-size: cover;
      background-position: center center;
    }
    .texts {
      opacity: 0;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      padding: $space-unit $space-unit 0;
      color: $color-background;
      background-color: transparentize($color-brand, .1);
      font-size: $font-size-smaller;
      transition: opacity 0.2s ease;
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
        font-size: $font-size-smaller;
        word-break: break-all;
        opacity: .75;
      }
    }
  }
</style>
