// const cors = require('cors');
// const axios = require('axios');
// const config = require('../config.js');
// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

const express = require('express')
const path = require('path');
const app = express()
const port = 3000

app.use(express.static(path.join(__dirname, '..', 'client/dist')));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
});