// const express = require('express');
// const path = require('path');
// const cors = require('cors');

// const axios = require('axios');
// const config = require('../config.js');
// const PORT = 3000;
// const app = express();

// app.use(cors());
// app.use(express.static(path.join(__dirname, '..', 'client/dist')));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// app.listen(PORT, () => {
//   console.log(`Listening at localhost:${PORT}!`);
// });

const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
});