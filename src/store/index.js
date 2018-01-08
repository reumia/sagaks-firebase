import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../utils/axios'
import _ from 'lodash'
import * as d3 from 'd3-hierarchy'
import firebase from '../utils/firebase'

Vue.use(Vuex)

const db = firebase.firestore()

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

const actions = {
  async GET_COMIC_BY_ID ({commit}, {id}) {
    const response = await db.collection('comics').doc(id).get()
    return response.data()
  },
  async ADD_COMIC ({commit}, payload) {
    const response = await db.collection('comics').add(payload)
    return response
  },
  async GET_LATEST_COMICS ({commit}) {
    const response = await db.collection('comics').get()
    const comics = {}

    response.forEach(doc => {
      comics[doc.id] = doc.data()
    })

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
  }
}

const store = {
  state,
  mutations,
  actions
}

export default new Vuex.Store(store)
