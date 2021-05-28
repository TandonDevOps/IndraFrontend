const express = require('express');
const path = require('path');

const BUILD_FOLDER = 'build';
const INDRA_WEB_FRONTEND_FOLDER = 'IndraReactWeb'

const PORT = process.env.PORT || 5000;

const app = express();  

// Priority serve any static files.
const STATIC_BUILD_FOLDER = path.resolve(__dirname, INDRA_WEB_FRONTEND_FOLDER, BUILD_FOLDER);
app.use(express.static(STATIC_BUILD_FOLDER));

// Answer API requests.
app.get('/api', function (req, res) {
  res.set('Content-Type', 'application/json');
  res.send('{"message":"Hello from the custom server!"}');
});

// All remaining requests return the React app, so it can handle routing.
app.get('*', function(request, response) {
  response.sendFile('index.html', {root: STATIC_BUILD_FOLDER});
});

app.listen(PORT, function () {
  console.error(`Server listening on port ${PORT}`);
});
