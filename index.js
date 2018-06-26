require('dotenv').config();
const path = require('path');
const express = require('express');
const proxy = require('express-http-proxy');
const baseImageUrl = process.env.BASE_IMAGE_URL;
const proxyBaseImageUrl = baseImageUrl
  ? proxy(baseImageUrl, {
      proxyReqPathResolver: req => `${baseImageUrl}${req.path}`
    })
  : express.static(path.join(__dirname, 'public/images'));
const app = express();

app.use('/images', proxyBaseImageUrl);

app.get('/', function (req, res) {
  res.send('<h1>can i haz hug</h1><img src="images/herman.jpg" />')
})

app.listen(8080, () => {
  console.log('Web server running on port 8080');
  require('mongodb').MongoClient.connect(process.env.MONGO_URI, (err, db) => {
    console.log(err ? `Cannot connect to MongoDB, ${err}` : 'Connected to MongoDB');
  })
});
