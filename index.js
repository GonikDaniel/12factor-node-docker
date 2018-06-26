require('dotenv').config();
const path = require('path');
const express = require('express');
const proxy = require('express-http-proxy');
const fileUpload = require('express-fileupload');
const baseImageUrl = process.env.BASE_IMAGE_URL;
const proxyBaseImageUrl = baseImageUrl
  ? proxy(baseImageUrl, {
      proxyReqPathResolver: req => `${baseImageUrl}${req.path}`
    })
  : express.static(path.join(__dirname, 'public/images'));
const app = express();

app.use('/images', proxyBaseImageUrl);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(fileUpload());

app.get('/', (req, res) => {
  res.send(`
    <h1>Super app</h1>

    <form action="/upload" enctype="multipart/form-data" method="post">
      <input type="file" name="foo" /><br /><br />
      <input type="submit" value="Upload" />
    </form>

    <img src="images/herman.jpeg" />
  `);
});

app.post('/upload', (req, res) => {
  if (!req.files) return res.status(400).send('No files were uploaded!');

  const { foo } = req.files;
  const uploadTo = `uploads/${foo.name}`;

  foo.mv(uploadTo, (err) => {
    if (err) return res.status(500).send(err);

    res.send(`File uploaded to <a href="${uploadTo}">${uploadTo}</a>`);
  });
});


app.listen(process.env.PORT, () => {
  console.log(`Web server running on port ${process.env.PORT}`);
  // require('mongodb').MongoClient.connect(process.env.MONGO_URI, (err, db) => {
  //   console.log(err ? `Cannot connect to MongoDB, ${err}` : 'Connected to MongoDB');
  // });
});
