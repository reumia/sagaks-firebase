<template>
  <router-link :to="{ name: 'Comic', params: { id: id } }" class="index-item">
    <div class="index-item-body">
      <div class="index-item-contents">
        <div class="image-wrap" :style="{ backgroundImage: `url(${imageUrl})` }"></div>
        <div class="texts">
          <div class="title">{{ title }}</div>
          <div class="date">{{ createdAt | formatDate }}</div>
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
    color: $color-text;
    text-decoration: none;
    @media screen and (min-width: 376px) {
    }
    @media screen and (min-width: 769px) {
    }
  }

  .index-item ~ .index-item {
    margin-top: $space-unit;
  }

  .index-item-body {
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
      border: 1px solid rgba(0,0,0,.1);
    }
  }

  .index-item-contents {
    position: relative;
    display: flex;
    flex-direction: column;
    padding-top: 33.333%;
    .image-wrap,
    .texts {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
    }
    .image-wrap {
      background-size: cover;
      background-color: $color-disabled;
      background-position: center center;
    }
    .texts {
      padding: $space-unit;
      font-size: $font-size-small;
      color: $color-background;
      background-image: linear-gradient(90deg, transparentize($color-text-lighter, .2) 20%, rgba(180,180,180,.1) 80%);
      .title,
      .date {
        text-shadow: 0 2px 1px rgba(0,0,0,.2);
      }
      .date,
      .descriptions {
        margin-top: $space-unit / 4;
        font-size: $font-size-smaller;
        color: $color-background-darker;
      }
      .descriptions {
        display: none;
        margin-top: $space-unit / 2;
        word-break: break-all;
      }
    }
  }
</style>
