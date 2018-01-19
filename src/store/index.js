import Vue from 'vue'
import Vuex from 'vuex'
import * as d3 from 'd3-hierarchy'
import actions from './actions'

Vue.use(Vuex)

const state = {
  isGlobalNavigationVisible: false,
  isTreeWorking: false,
  comicsLatest: [],
  cuts: [],
  tree: {},
  comicId: null,
  cut: {}
}

const mutations = {
  TOGGLE_GLOBAL_NAVIGATION (state) {
    state.isGlobalNavigationVisible = state.isGlobalNavigationVisible === false
  },
  HIDE_GLOBAL_NAVIGATION (state) {
    state.isGlobalNavigationVisible = false
  },
  SET_COMIC_ID (state, id) {
    state.comicId = id
  },
  SET_LATEST_COMICS (state, comics) {
    state.comicsLatest = comics
  },
  SET_CUTS (state, cuts) {
    state.cuts = cuts
  },
  async SET_TREE (state, cuts) {
    const stratify = await d3.stratify().id(d => d.id).parentId(d => d.parentId)
    state.tree = stratify(cuts)
  },
  SET_TREE_WORKING_STATE (state, boolean) {
    state.isTreeWorking = boolean
  }
}

const store = {
  state,
  mutations,
  actions
}

export default new Vuex.Store(store)
