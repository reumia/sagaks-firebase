const functions = require('firebase-functions')
const admin = require('firebase-admin')
const cors = require('cors')({origin: true})

admin.initializeApp(functions.config().firebase)

const db = admin.firestore()

// TODO : Storage 업로드시, 썸네일 생성

exports.getComicById = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    const split = req.url.split('/')
    const id = split[split.length - 1]
    const comicRef = db.collection('comics').doc(id)
    const comicSnapshot = comicRef.get()
    const cutsSnapshot = comicRef.collection('cuts').get()

    Promise.all([comicSnapshot, cutsSnapshot])
      .then(values => {
        const comicSnapshot = values[0]
        const cutsSnapshot = values[1]
        const comic = comicSnapshot.data()
        comic.cuts = []
        cutsSnapshot.forEach(doc => {
          const cut = doc.data()
          cut.id = doc.id
          comic.cuts.push(cut)
        })
        res.json(comic)
      })
      .catch(err => { res.status(500).json(err) })
  })
})

exports.getComics = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    db.collection('comics').get()
      .then(snapshot => {
        const comics = []
        snapshot.forEach(item => {
          const comic = item.data()
          comic.id = item.id
          comics.push(comic)
        })
        res.json(comics)
      })
      .catch(err => { res.status(500).json(err) })
  })
})

exports.addComic = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    db.collection('comics').add(req.body)
      .then(result => {
        res.json({ id: result.id })
      })
      .catch(err => { res.status(500).json(err) })
  })
})

exports.addCut = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    const data = req.body
    const comicId = data.comicId
    delete data.comicId
    const ref = db.collection('comics').doc(comicId).collection('cuts')

    ref.add(data)
      .then(result => {
        res.json({ id: result.id })
      })
      .catch(err => { res.status(500).json(err) })
  })
})
