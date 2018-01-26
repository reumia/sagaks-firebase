<template>
  <div class="cut" @keyup.right="{}">
    <div class="cut-header" :style="{ backgroundImage: `url()` }">
      <div class="cut-title"></div>
    </div>
    <div class="cut-body">
      <div class="parent" :style="{
        marginTop: `${sagakWidth / -2 * 3 - sagakMargin}px`,
        marginLeft: `${sagakWidth / -2 - (sagakMargin / 2)}px`
      }">
        <Sagak
          v-if="navigation.parent"
          :data="navigation.parent"
          :comicId="comicId"
          :width="sagakWidth"
          :margin="sagakMargin"
          @onClick="handleClick(navigation.parent)"
        ></Sagak>
      </div>
      <div class="siblings" :style="{
        width: `${getSiblingsWidth}px`,
        marginTop: `${sagakWidth / -2}px`,
        transform: `translateX(${translate.x}px)`
      }">
        <Sagak
          v-for="item in navigation.siblings"
          :key="item.id"
          :data="item"
          :comicId="comicId"
          :width="sagakWidth"
          :margin="sagakMargin"
          :isCurrent="isCurrent(item.id)"
          @onClick="handleClick(item)"
        ></Sagak>
      </div>
      <div class="child" :style="{
        marginTop: `${sagakWidth / -2 + sagakWidth + sagakMargin}px`,
        marginLeft: `${sagakWidth / -2 - (sagakMargin / 2)}px`
      }">
        <Sagak
          v-if="navigation.child"
          :data="navigation.child"
          :comicId="comicId"
          :width="sagakWidth"
          :margin="sagakMargin"
          @onClick="handleClick(navigation.child)"
        ></Sagak>
      </div>
    </div>
  </div>
</template>

<script>
  import Sagak from '@/components/partials/Sagak'

  const spaceUnit = 16

  // TODO : 키보드 이동
  // TODO : 부모 자식 이동
  export default {
    name: 'cut',
    props: [ 'comicId', 'cutId' ],
    components: { Sagak },
    beforeMount () {
      this.getNavigation()
    },
    data () {
      return {
        sagakWidth: spaceUnit * 18,
        sagakMargin: spaceUnit * 2,
        translate: {
          x: null,
          y: null
        },
        navigation: {
          parent: null,
          siblings: [],
          child: null
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
      getNavigation (id) {
        const cutId = id || this.cutId

        this.$store.dispatch('GET_CUTS_NAVIGATION_BY_ID', { comicId: this.comicId, cutId: cutId })
          .then(response => {
            this.navigation = response
            console.log(response)
          })
          .catch(err => console.warn(err))
      },
      getIndex () {
        return this.navigation.siblings.findIndex(item => this.isCurrent(item.id))
      },
      getX () {
        const index = this.getIndex()
        const itemWidth = this.sagakWidth + this.sagakMargin

        this.translate.x = (window.innerWidth - itemWidth) / 2 - (index * itemWidth)
      },
      handleClick (sagak) {
        this.getNavigation(sagak.id)
        this.$router.push({ name: 'Cut', params: { comicId: this.comicId, cutId: sagak.id } })
      }
    },
    watch: {
      navigation () {
        this.getX()
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

  .parent,
  .child {
    position: absolute;
    top: 50%;
    left: 50%;
  }

  .siblings {
    @include transition(transform);
    position: absolute;
    top: 50%;
    padding: 0;
  }
</style>
