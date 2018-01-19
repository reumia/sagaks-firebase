<template>
  <div class="cut" @keyup.right="{}">
    <div class="cut-header" :style="{ backgroundImage: `url()` }">
      <div class="cut-title"></div>
    </div>
    <div class="cut-body">
      <div class="siblings" :style="{
        width: `${getSiblingsWidth}px`,
        marginTop: `${sagakWidth / -2}px`,
        transform: `translateX(${scrollHorizontal}px)`
      }">
        <Sagak v-for="item in navigation.siblings"
          :key="item.id"
          :data="item"
          :comicId="comicId"
          :width="sagakWidth"
          :isCurrent="isCurrent(item.id)"
          :margin="sagakMargin"
        ></Sagak>
      </div>
    </div>
  </div>
</template>

<script>
  import Sagak from '@/components/partials/Sagak'

  const spaceUnit = 16

  export default {
    name: 'cut',
    props: [ 'comicId', 'cutId' ],
    components: { Sagak },
    beforeMount () {
      this.$store.dispatch('GET_CUTS_NAVIGATION_BY_ID', { comicId: this.comicId, cutId: this.cutId })
        .then(response => {
          this.navigation = response
        })
        .catch(err => console.warn(err))
    },
    mounted () {
      this.getScrollHorizontal()
    },
    beforeUpdate () {
      this.getScrollHorizontal()
    },
    data () {
      return {
        sagakWidth: spaceUnit * 18,
        sagakMargin: spaceUnit,
        scrollHorizontal: null,
        navigation: {
          siblings: []
        }
      }
    },
    computed: {
      getSiblingsWidth () {
        return (this.sagakWidth + this.sagakMargin) * this.navigation.siblings.length
      }
    },
    methods: {
      isCurrent (id) {
        return id === this.cutId
      },
      getIndex () {
        return this.navigation.siblings.findIndex(item => {
          return this.isCurrent(item.id)
        })
      },
      getScrollHorizontal () {
        const index = this.getIndex()
        const itemWidth = this.sagakWidth + this.sagakMargin

        this.scrollHorizontal = (window.innerWidth - itemWidth) / 2 - (index * itemWidth)
      },
      // TODO : 키보드 이동
      // TODO : 부모 자식 이동
      moveTo () {
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import 'init';

  .cut {
    position: fixed;
    top: $header-height;
    bottom: 0;
    left: 0;
    right: 0;
  }

  .cut-header {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: $space-unit * 20;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
    -webkit-filter: grayscale(100%);
  }

  .cut-title {
    position: relative;
    padding: $space-unit * 2;
  }

  .cut-body {
  }

  .siblings {
    @include transition(transform);
    position: absolute;
    top: 50%;
    padding: 0;
  }
</style>
