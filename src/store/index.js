import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../utils/axios'
import _ from 'lodash'
import * as d3 from 'd3-hierarchy'
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
  SET_COMIC (state, comic) {
    state.comic = _.assignIn(state.comic, comic)
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

const actions = {
  async GET_COMIC_BY_ID ({commit}, {id}) {
    if (id) {
      const response = await axios.get(`/comics/${id}`)
      const comic = response.data

      commit('SET_COMIC', comic)
      commit('SET_TREE', comic.cuts)
    } else {
      commit('DELETE_COMIC')
    }
  },
  async ADD_COMIC ({commit, state}) {
    const response = await axios.post('/comics', {
      title: state.comic.title,
      descriptions: state.comic.descriptions,
      imageUrl: state.comic.imageUrl
    })
    const comic = response.data

    return comic
  },
  async UPDATE_COMIC ({commit, state}, {id}) {
    const response = await axios.put(`/comics/${id}/update`, {
      title: state.comic.title,
      descriptions: state.comic.descriptions,
      imageUrl: state.comic.imageUrl
    })
    const comic = response.data

    return comic
  },
  async GET_LATEST_COMICS ({commit}) {
    const response = await axios.get(`/comics/latest`)
    const comics = response.data

    commit('SET_LATEST_COMICS', comics)
  },
  async ADD_CUT ({commit, state}, payload) {
    const response = await axios.post('/cuts', {
      ...payload,
      title: state.cut.title,
      imageUrl: state.cut.imageUrl
    })
    const cut = response.data

    return cut
  },

  async ADD_LIKE ({commit}, {type, id}) {
    const response = await axios.post(`/likes/${type}/${id}`)
    return response.data
  },
  async DELETE_LIKE ({commit}, {type, id}) {
    const response = await axios.delete(`/likes/${type}/${id}`)
    return response.data
  }
}

const store = {
  state,
  mutations,
  actions
}

export default new Vuex.Store(store)
