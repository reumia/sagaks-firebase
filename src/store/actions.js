import axios from '../utils/axios'

const actions = {
  async GET_COMICS ({ commit }) {
    const response = await axios.get('/getComics')
    commit('SET_LATEST_COMICS', response.data)
  },
  async GET_COMIC_BY_ID ({ commit }, { id }) {
    const response = await axios.get(`/getComicById/${id}`)
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
  async GET_CUT_BY_ID ({ commit }, { comicId, cutId }) {
    const response = await axios.get(`/getCutById/${comicId}/${cutId}`)
    return response.data
  },
  async INIT_ADD_CUT ({ commit, dispatch }, { comicId, parentId }) {
    let comic, parentCut
    comic = await dispatch('GET_COMIC_BY_ID', { id: comicId })
    if (parentId) parentCut = await dispatch('GET_CUT_BY_ID', { comicId: comicId, cutId: parentId })
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
