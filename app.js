const { MongoClient } = require('mongodb')
const express = require('express')
const url = 'mongodb://localhost/carousel'
const app = express()

MongoClient.connect(url, function(err, db) {
  if (err) {
    console.log(err)
  }
  app.use(express.static('public'))
  const images = db.collection('images')

  app.get('/carousel/images', (req, res) => {
    images
      .find({}, { _id: 0 })
      .toArray()
      .then(list => res.json(list))
      .catch(err => {
        console.error(err)
        res.sendStatus(500)
      })
  })
})

app.listen(3000, () => {
  console.log('Listening on port 3000')
})
