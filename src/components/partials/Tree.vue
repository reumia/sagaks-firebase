<template>
  <div class="tree">
    <svg :width="viewerWidth" :height="viewerHeight" :viewBox="`0 0 ${viewerWidth} ${viewerHeight}`" ref="svg" @click="resetZoom">
      <g :transform="`translate(${zoom.translateX}, ${zoom.translateY})scale(${zoom.scale})`">
        <path v-for="line in lines" class="link" :d="getDiagonal(line)" :key="`line-${line.id}`"></path>
        <g v-for="node in nodes" class="node" :transform="getNodeTransform(node)" :key="`node-${node.id}`" @click="handleClick(node)">
          <rect class="rect-background" r="10" :width="rectWidth" :height="rectHeight" :transform="`translate(${rectWidth / -2}, ${rectHeight / -2})`"></rect>
          <!-- https://stackoverflow.com/a/43754117/6081244 -->
          <!-- Safari에서 image의 정상적인 렌더링을 위해서는 href 대신 xlink:href를 사용해야 한다. -->
          <image :width="rectWidth" :height="rectHeight" :transform="`translate(${rectWidth / -2}, ${rectHeight / -2})`" :xlink:href="node.data.imageUrl"></image>
          <rect class="rect-mask" r="10" :width="rectWidth" :height="rectHeight" :transform="`translate(${rectWidth / -2}, ${rectHeight / -2})`"></rect>
        </g>
      </g>
    </svg>
  </div>
</template>

<script>
  import * as d3 from 'd3'
  import { mapState, mapMutations } from 'vuex'

  export default {
    name: 'tree',
    created () {
      this.$nextTick(() => {
        this.renderTree()
      })
    },
    computed: mapState([ 'tree', 'comicId' ]),
    data () {
      // TODO : 뷰어크기 윈도우 리사이즈 대응
      return {
        viewerWidth: window.innerWidth,
        viewerHeight: window.innerHeight,
        viewerSpacing: 80,
        nodeWidth: 130,
        nodeHeight: 160,
        rectWidth: 120,
        rectHeight: 120,
        nodes: [],
        lines: [],
        zoom: {
          translateX: 0,
          translateY: 0,
          scale: 1
        }
      }
    },
    methods: {
      ...mapMutations([ 'SET_TREE_WORKING_STATE' ]),
      getTree () {
        const tree = d3
          .tree()
          .size([this.viewerWidth - this.viewerSpacing, this.viewerHeight - this.viewerSpacing])
          .nodeSize([this.nodeWidth, this.nodeHeight])

        this.nodes = this.tree.descendants()
        this.lines = this.tree.descendants().slice(1)

        tree(this.tree)
      },
      renderTree () {
        this.getTree()
        this.initZoom()
      },
      getDiagonal (d) {
        const rectBetween = (this.nodeHeight - this.rectHeight)

        return `
          M${d.x},${d.y - this.rectHeight / 2}
          L${d.x},${d.parent.y + (this.rectHeight / 2) + (rectBetween / 2)}
          L${d.parent.x},${d.parent.y + (this.rectHeight / 2) + (rectBetween / 2)}
          L${d.parent.x},${d.parent.y + this.rectHeight / 2}
        `
      },
      getNodeTransform (d) {
        return `translate(${d.x},${d.y})`
      },
      setInitialZoom () {
        this.zoom.translateX = window.innerWidth / 2
        this.zoom.translateY = this.$el.offsetTop + this.rectHeight
        this.zoom.scale = 1
      },
      initZoom (isTransition) {
        this.setInitialZoom()
        // Drag & Zoom simple example - https://bl.ocks.org/mbostock/6123708
        // D3 Zoom initial transition state - https://github.com/d3/d3/issues/2521
        // Zoom to bound box - https://bl.ocks.org/mbostock/9656675
        const zoom = d3.zoom().scaleExtent([0.2, 1.5]).on('zoom', this.onZoom)
        const selection = d3.select(this.$refs.svg)
        const initialZoomState = d3.zoomIdentity
          .translate(this.zoom.translateX, this.zoom.translateY)
          .scale(this.zoom.scale)

        selection.call(zoom)
        if (isTransition) selection.transition().call(zoom.transform, initialZoomState)
        else selection.call(zoom.transform, initialZoomState)
      },
      resetZoom () {
        this.initZoom(true)
      },
      onZoom () {
        this.toggleTreeState()
        this.zoom.translateX = d3.event.transform.x
        this.zoom.translateY = d3.event.transform.y
        this.zoom.scale = d3.event.transform.k
      },
      toggleTreeState () {
        const isOverride = this.zoom.translateY < this.$el.offsetTop + (this.rectHeight * (d3.event.transform.k / 2))
        if (isOverride) this.SET_TREE_WORKING_STATE(true)
        else this.SET_TREE_WORKING_STATE(false)
      },
      handleClick (d) {
        this.$router.push({ name: 'Cut', params: { 'comicId': this.comicId, 'cutId': d.id } })
      }
    }
  }
</script>

<style lang="scss">
  @import 'init';

  .tree {
    svg {
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
    }
    .node {
      cursor: pointer;
    }

    .node .rect-background {
      fill: #fff;
      stroke-width: 0;
    }

    .node .rect-mask {
      fill: transparent;
      stroke: #333;
      stroke-width: 1px;
      stroke-opacity: .5;
    }

    .node text {
      font: 10px sans-serif;
    }

    .node--internal text {
      text-shadow: 0 1px 0 #fff, 0 -1px 0 #fff, 1px 0 0 #fff, -1px 0 0 #fff;
    }

    .link {
      fill: none;
      stroke: #aaa;
      stroke-width: 1px;
    }
  }
</style>
