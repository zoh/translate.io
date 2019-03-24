const port = process.env.OPENSHIFT_NODEJS_PORT || process.env.VCAP_APP_PORT || process.env.PORT || process.argv[2] || 8765;

const Gun = require('gun');

// have to do this before instancing gun(?)
Gun.on('out', function (msg) {
  this.to.next(msg);
  msg = JSON.stringify(msg);
  gunPeers.forEach(function (peer) {
    peer.send(msg)
  })
});

const gun = Gun({
  file: 'data.json'
});

const _old_server_server = require('http').createServer(function (req, res) {
  let insert = "";
  if (req.url.endsWith("gun.js"))
    insert = "../";

  require('fs').createReadStream(require('path').join(__dirname, insert, req.url)).on('error', function () { // static files!
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(require('fs').readFileSync(require('path').join(__dirname, 'index.html'))); // or default to index
  }).pipe(res); // stream
});

// do not do this to attach server... instead pull websocket provider and use that.
// gun.wsp(server);

const ws = require('ws');
const prepareGun = require("./prepare.gun").prepareGun; // default websocket provider gun used...
const WebSocketServer = ws.Server;

const wss = new WebSocketServer({
  server: _old_server_server, // 'ws' npm
  autoAcceptConnections: false // want to handle the request (websocket npm?)
});

wss.on('connection', acceptConnection);

let gunPeers = [];  // used as a list of connected clients.

function acceptConnection(connection, req) {
  connection.upgradeReq = req;

  // connection.upgradeReq.headers['sec-websocket-protocol'] === (if present) protocol requested by client
  // connection.upgradeReq.url  === url request
  console.log("connect?", connection.upgradeReq.headers, connection.upgradeReq.url);
  gunPeers.push(connection);
  connection.on('error', function (error) {
    console.log("WebSocket Error:", error)
  });

  connection.on('message', function (msg) {
    msg = JSON.parse(msg);
    if ("forEach" in msg) msg.forEach(m => gun.on('in', JSON.parse(m)));
    else gun.on('in', msg)
  });

  connection.on('close', function (reason, desc) {
    // gunpeers gone.
    const i = gunPeers.findIndex(function (p) {
      return p === connection
    });
    if (i >= 0)
      gunPeers.splice(i, 1);

  })
}


_old_server_server.listen(port);
console.log('Server started on port ' + port + ' with ');
prepareGun(gun);


setTimeout(() => {
  let ws = wss;
  let ctx = gun;
  let opt = ctx.opt;


  function send(msg, peer) {
    peer.send(msg);
  }

  gun.on('out', function (at) {
    let batch = JSON.stringify(at);

    if (!ws.drain) {
      return
    }
    let tmp = ws.drain;
    ws.drain = null;
    if (!tmp.length) {
      return
    }
    Gun.obj.map(gunPeers, send.bind(batch), ctx);

  });
});