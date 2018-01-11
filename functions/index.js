const functions = require('firebase-functions')
const admin = require('firebase-admin')
const cors = require('cors')({origin: 'http://127.0.0.1:8080'})

admin.initializeApp(functions.config().firebase)

const db = admin.firestore()

exports.getComicById = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    const split = req.url.split('/')
    const id = split[split.length - 1]
    const comicRef = db.collection('comics').doc(id)
    const comicSnapshot = await comicRef.get()
    const cutsSnapshot = await comicRef.collection('cuts').get()

    const comic = comicSnapshot.data()
    comic.cuts = []

    cutsSnapshot.forEach(doc => {
      const cut = doc.data()
      cut.id = doc.id
      comic.cuts.push(cut)
    })

    res.json(comic)
  })
})

exports.getComics = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    const snapshot = await db.collection('comics').get()
    const comics = []

    snapshot.forEach(item => {
      const comic = item.data()
      comic.id = item.id
      comics.push(comic)
    })

    res.json(comics)
  })
})

exports.addComic = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    const result = await db.collection('comics').add(req.body)

    res.json({ id: result.id })
  })
})

exports.getCutById = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    const split = req.url.split('/')
    const comicId = split[1]
    const cutId = split[2]

    const ref = db.collection('comics').doc(comicId).collection('cuts').doc(cutId)
    const snapshot = await ref.get()
    const cut = snapshot.exists ? snapshot.data() : null

    res.json(cut)
  })
})

exports.addCut = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    const data = req.body
    const comicId = data.comicId
    delete data.comicId
    const ref = db.collection('comics').doc(comicId).collection('cuts')
    const result = await ref.add(data)

    res.json({ id: result.id })
  })
})