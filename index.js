const express = require('express');
const path = require('path');

const BUILD_FOLDER = 'build';
const INDRA_WEB_FRONTEND_FOLDER = 'IndraReactWeb'

const PORT = process.env.PORT || 5000;

const app = express();  

// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, INDRA_WEB_FRONTEND_FOLDER, BUILD_FOLDER)));

// Answer API requests.
app.get('/api', function (req, res) {
  res.set('Content-Type', 'application/json');
  res.send('{"message":"Hello from the custom server!"}');
});

// All remaining requests return the React app, so it can handle routing.
app.get('*', function(request, response) {
  response.sendFile(path.resolve(__dirname, INDRA_WEB_FRONTEND_FOLDER, BUILD_FOLDER, 'index.html'));
});

app.listen(PORT, function () {
  console.error(`Node ${isDev ? 'dev server' : 'cluster worker '+process.pid}: listening on port ${PORT}`);
});
