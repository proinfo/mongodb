const express = require('express');
const mongoose = require('mongoose')
const app = express();
const { MongoClient } = require("mongodb");

// serve files from the public directory
app.use(express.static('public'));

const uri = `mongodb+srv://npintaric:MojaOpera1@nebcluster.myhlto6.mongodb.net/?retryWrites=true&w=majority`

const client = new MongoClient(uri);

async function getFirstReview() {
  try {
    client.connect((err) => {
      if (err) {
        console.log('err');
        console.log(err);
        return
      }
    })

    const database = client.db('sample_airbnb');
    const reviews = database.collection('listingsAndReviews');
    // Query for a movie that has the title 'Back to the Future'
    // const query = { title: 'Back to the Future' };
    const first = await reviews.findOne({})

    return first
  } catch (error) {
    console.error(error)
  }
}



app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.listen(3001, () => {
  console.log('Server started on port 3001')
})

app.get('/clicked', async (req, res) => {
  const review = await getFirstReview()
  res.send(JSON.stringify(review))
});
