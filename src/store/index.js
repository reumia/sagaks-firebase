import Vue from 'vue'
import Vuex from 'vuex'
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
  async GET_COMIC_BY_ID ({ commit }, { id }) {
    const comic = await db.collection('comics').doc(id).get()
    const cuts = []
    const cutsSnapshot = await db.collection('comics').doc(id).collection('cuts').get()

    cutsSnapshot.forEach(doc => {
      cuts.push({
        ...doc.data(),
        id: doc.id
      })
    })

    return {
      ...comic.data(),
      cuts: cuts
    }
  },
  async ADD_COMIC ({ commit }, payload) {
    const response = await db.collection('comics').add(payload)
    return response
  },
  async GET_LATEST_COMICS ({ commit }) {
    const response = await db.collection('comics').get()
    const comics = {}

    response.forEach(doc => {
      comics[doc.id] = doc.data()
    })

    commit('SET_LATEST_COMICS', comics)
  },
  async INIT_ADD_CUT ({ commit, dispatch }, { comicId, parentId }) {
    let parentCut = null
    const comic = await dispatch('GET_COMIC_BY_ID', { id: comicId })

    if (parentId) {
      parentCut = await db.collection('comics').doc(comicId).collection('cuts').doc(parentId).get()
      parentCut = parentCut.exists ? parentCut.data() : null
    }

    return {
      comic: comic,
      parentCut: parentCut
    }
  },
  async ADD_CUT ({ commit, state }, { comicId, parentId, title, createAt, imageUrl, email, password }) {
    const response = await db
      .collection('comics')
      .doc(comicId)
      .collection('cuts')
      .add({
        parentId: parentId,
        title: title,
        createAt: createAt,
        imageUrl: imageUrl,
        email: email,
        password: password
      })

    return response
  }
}

const store = {
  state,
  mutations,
  actions
}

export default new Vuex.Store(store)
