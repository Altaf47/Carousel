const { MongoClient } = require('mongodb')
const url = 'mongodb://localhost/carousel'

MongoClient.connect(url, (err, db) => {
  if (err) {
    console.error(err)
  }
  const images = db.collection('images')

  images
    .insertMany([
      {
        url: 'https://static.pexels.com/photos/461958/pexels-photo-461958.jpeg'
      },
      {
        url: 'https://static.pexels.com/photos/131413/pexels-photo-131413.jpeg'
      },
      {
        url: 'https://static.pexels.com/photos/290766/pexels-photo-290766.jpeg'
      }
    ])
    .then(() => db.close())
    .catch(error => console.error(error))
})
