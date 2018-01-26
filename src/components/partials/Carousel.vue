<template>
  <slick class="carousel" ref="slick" :options="slickOptions">
    <div class="carousel-item">
      <div class="carousel-body">
        <div class="title">
          첫번째 슬라이드
        </div>
        <div class="descriptions">첫번째 슬라이드!! 이 기회를 놓치지 마세요!</div>
      </div>
    </div>
    <div class="carousel-item">
      <div class="carousel-body">
        <div class="title">
          두번째 슬라이드
        </div>
        <div class="descriptions">이 기회는 뭐 놓치고 싶으면...<br/>그래도 놓치지 마세요!</div>
      </div>
    </div>
  </slick>
</template>

<script>
  import Slick from 'vue-slick'
  import 'slick-carousel/slick/slick.css'

  export default {
    name: 'carousel',
    components: { Slick },
    data () {
      return {
        slickOptions: {
          arrows: false,
          dots: true,
          dotsClass: 'carousel-dots'
        }
      }
    }
  }
</script>

<style lang="scss">
  @import 'init';

  .carousel {
    background-color: $color-background;
  }
  .carousel-item {
    vertical-align: top;
  }
  .carousel-body {
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    max-width: $site-width;
    height: $space-unit * 20;
    margin: 0 auto;
    padding-bottom: $space-unit * 2;
    text-align: center;
    color: $color-text-light;
    > .title {
      font-size: $font-size-large;
    }
    > .descriptions {
      margin-top: $space-unit;
      white-space: pre-line;
    }
  }
  .carousel-dots {
    position: absolute;
    bottom: $space-unit;
    left: 0;
    right: 0;
    margin: 0 auto;
    list-style: none;
    display: flex;
    justify-content: center;
    li ~ li {
      margin-left: $space-unit / 4;
    }
    .slick-active {
      button {
        background-color: $color-brand;
      }
    }
    button {
      -webkit-appearance: none;
      box-sizing: border-box;
      display: block;
      margin: 0;
      padding: 0;
      border: 0;
      width: $space-unit / 2;
      height: $space-unit / 2;
      background-color: $color-disabled;
      color: transparent;
      outline: none;
    }
  }
</style>
