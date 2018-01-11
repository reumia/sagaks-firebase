import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash'
import * as d3 from 'd3-hierarchy'
import actions from './actions'

Vue.use(Vuex)

const state = {
  isGlobalNavigationVisible: false,
  comicsLatest: [],
  tree: {},
  comic: {},
  cut: {}
}

const mutations = {
  TOGGLE_GLOBAL_NAVIGATION (state) {
    state.isGlobalNavigationVisible = state.isGlobalNavigationVisible === false
  },
  HIDE_GLOBAL_NAVIGATION (state) {
    state.isGlobalNavigationVisible = false
  },
  DELETE_COMIC (state) {
    state.comic = {}
  },
  SET_LATEST_COMICS (state, comics) {
    state.comicsLatest = comics
  },
  SET_CUT (state, cut) {
    state.cut = _.assignIn(state.cut, cut)
  },
  DELETE_CUT (state) {
    state.cut = {}
  },
  async SET_TREE (state, cuts) {
    const stratify = await d3.stratify().id((d) => d.id).parentId((d) => d.parentId)
    state.tree = stratify(cuts)
  }
}

const store = {
  state,
  mutations,
  actions
}

export default new Vuex.Store(store)
