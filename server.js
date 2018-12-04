// Set up the MQTT server to communicate with the procedure viewer
var mosca = require('mosca');

var backendSettings = {
  type: 'mongo',
  url: 'mongodb://localhost:27017/mqtt',
  pubsubCollection: 'ascoltatori',
  mongo: {}
};

var moscaSettings = {
  port: 1883,
  backend: backendSettings
};

var express = require("express");
var http = require("http");
var path = require("path");

var app = express()
var srv = http.createServer(app)
var broker = new mosca.Server(moscaSettings);
broker.attachHttpServer(srv);

// Serve the assets
app.use(express.static(path.dirname(require.resolve("mosca")) + "/public"))
app.use(express.static(path.dirname(require.resolve("jquery"))))

app.use('/css', express.static('css'));
app.use('/img', express.static('img'));
app.use('/js', express.static('js'));
app.use('/vid', express.static('vid'));

// Serve the procedure viewer at the root directory
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

srv.listen(3000)

// Log when the client connects
broker.on('clientConnected', function (client) {
  console.log('client connected', client.id);
});

// Logic to set the filename and write the data on user actions
const fs = require('fs');
var started = false;
var filename = '';

broker.on('published', function(packet, client) {
  var topic = packet.topic.toString();
  var payload = packet.payload.toString();
  console.log('Published', topic, payload);

  if (topic == 'filename') {
    started = true;
    filename = payload;
  }

  if (started && topic == 'action') {
    fs.writeFile('data/' + filename + '.txt', payload + '\n', { flag: 'a+' }, (err) => {
      if (err) {
        console.error(err)
        return
      }
      //file written successfully
    })
  }
});

broker.on('ready', setup);

// fired when the mqtt broker is ready
function setup() {
  console.log('Server is up and running');
}

