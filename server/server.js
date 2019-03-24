// variables from env.
const token = process.env.TOKEN_API || 'dnyas87dtab7s6tdbrvas6rdisa6rda';

const port = process.env.OPENSHIFT_NODEJS_PORT
  || process.env.VCAP_APP_PORT
  || process.env.PORT
  || 8765;
const mongodb = {
  host: process.env.MONGODB_HOST || 'localhost',
  port: process.env.MONGODB_PORT || '27017',
  database: process.env.MONGODB_PORT || 'gun',
  collection: process.env.MONGODB_PORT || 'gun-mongo111',
};

console.log("If module not found, install express globally `npm i express -g`!");

require = require('esm')(module);
const path = require('path');
const express = require('express');
const Gun = require('gun');
const {prepareGun, createRootUser} = require('./prepare.gun');
const {makeTreeJSONWithOneLang} = require('../common/gun.export');

// require('gun/axe');
require('gun-mongo');


const app = express();
app.use(Gun.serve);
app.use(express.static(path.join(__dirname, '../dist/')));

const server = app.listen(port);
const gun = new Gun({
  file: false,

  mongo: {
    ...mongodb,
    query: ''
  },
  web: server,
});

prepareGun(gun);
createRootUser(gun);

global.Gun = Gun; /// make global to `node --inspect` - debug only
global.gun = gun; /// make global to `node --inspect` - debug only

console.log('Server started on port ' + port + ' with /gun');

/// Routers
app.get('/projects/export/:name/lang/:lang', async (req, res) => {
  const $token = req.query.token || req.headers.token;

  if ($token !== token) {
    res.status(500);
    res.send('Incorrect token api.');
    return
  }

  let result = {};
  const name = req.params.name;
  const lang = req.params.lang;
  if (!name || !lang) {
    res.status(400);
    res.send('You must defined project name and lang.');
    return
  }


  await makeTreeJSONWithOneLang(lang, JSON.parse(await gun.get('projects').get(name).get('data')), result);

  res.json(result)
});


//
app.post('/projects/:id/import', async (req, res) => {

});
