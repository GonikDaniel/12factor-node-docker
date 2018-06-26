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

app.listen('8080');

const MongoClient = require('mongodb').MongoClient;

MongoClient.connect(process.env.MONGO_URI, (err, db) => {
  console.log(err ? `Cannot connect to MongoDB, ${err}` : 'Connected to MongoDB');
})
