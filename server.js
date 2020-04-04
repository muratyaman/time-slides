const express = require('express');
const config = require('./src/config');

const app = express();
const port = config.serverPort;

// serve assets of react app
app.use(express.static('build'));

// TODO: implement image optimisation by serving different cached dimensions
// serve albums behind '/api/albums'
app.use(express.static('assets'));

app.get('/health', (req, res) => res.json({
  app: config.appTitle,
  version: config.appVersion,
  ts: new Date().toISOString(),
}));

app.listen(port, () => console.log(`${config.appTitle} listening on port ${port}!`));
