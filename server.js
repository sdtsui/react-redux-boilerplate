// Main starting point of the app
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const cors = require('cors');

// Middlewares
app.use(cors()); // Disables CORS
app.use(morgan('combined')); // Logging framework, used for debugging
app.use(bodyParser.json({ type: '*/*' })); // parses incoming requests into json

app.get(
  '/', (req, res) => {
    res.send('asdfsad');
  }
);
// Server Setup
const port = process.env.PORT || 3090;

// Creates an http server and forward it to the express app
const server = http.createServer(app);

// Listen to the port that we created
server.listen(port);
console.log('Server listening on port' + port);