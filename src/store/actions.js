import axios from '../utils/axios'
import _ from 'lodash'

const actions = {
  async GET_COMICS ({ commit }) {
    const response = await axios.get('/getComics')

    commit('SET_LATEST_COMICS', response.data)
  },
  async GET_COMIC_BY_ID ({ commit }, { id }) {
    const response = await axios.get(`/getComicById/${id}`)
    const hasCuts = response.data.cuts.length > 0

    commit('SET_COMIC_ID', id)
    commit('SET_CUTS', response.data.cuts)
    if (hasCuts) commit('SET_TREE', response.data.cuts)

    return response.data
  },
  async ADD_COMIC ({ commit }, { status, createAt, title, descriptions, imageUrl, email, password }) {
    const response = await axios.post('/addComic', {
      status: status,
      createAt: createAt,
      title: title,
      descriptions: descriptions,
      imageUrl: imageUrl,
      email: email,
      password: password
    })

    return response.data
  },
  async GET_CUTS_NAVIGATION_BY_ID ({ commit, state, dispatch }, { comicId, cutId }) {
    // TODO : 리팩토링!!
    const isStateEmpty = state.cuts.length <= 0
    const getResult = (cuts) => {
      const isEmpty = cuts.length <= 0
      const current = _.find(cuts, o => o.id === cutId)
      const hasParent = Boolean(current.parentId)

      let parent = null
      let siblings = [current]
      // TODO : 0번쨰 child 말고 우선순위 책정
      let child = _.find(cuts, o => o.parentId === cutId)

      if (hasParent) {
        parent = hasParent ? _.find(cuts, o => o.id === current.parentId) : null
        const wholeSiblings = _.filter(cuts, o => o.parentId === parent.id)

        if (wholeSiblings.length > 1) {
          const currentIndex = wholeSiblings.indexOf(current)
          let prev = wholeSiblings[currentIndex - 1]
          let next = wholeSiblings[currentIndex + 1]

          if (prev) siblings.unshift(prev)
          if (next) siblings.push(next)
        }
      }

      return {
        siblings: siblings,
        parent: isEmpty ? null : parent,
        child: isEmpty ? null : child
      }
    }

    if (isStateEmpty) {
      const response = await dispatch('GET_COMIC_BY_ID', { id: comicId })
      return getResult(response.cuts)
    } else {
      return getResult(state.cuts)
    }
  },
  async INIT_ADD_CUT ({ commit, state, dispatch }, { comicId, parentId }) {
    let comic, parentCut

    comic = await dispatch('GET_COMIC_BY_ID', { id: comicId })
    if (parentId) parentCut = _.filter(state.cuts, o => o.id === parentId)[0]

    return {
      comic: comic,
      parentCut: parentCut
    }
  },
  async ADD_CUT ({ commit }, { comicId, parentId, title, createAt, imageUrl, email, password }) {
    const response = await axios.post('/addCut', {
      comicId: comicId,
      parentId: parentId,
      title: title,
      createAt: createAt,
      imageUrl: imageUrl,
      email: email,
      password: password
    })

    return response.data
  }
}

export default actions
