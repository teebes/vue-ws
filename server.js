const express = require('express')
const app = express()
const port = 3000

var expressWs = require('express-ws')(app)

app.ws('/counter', function(ws, req) {

  ws.on('message', function(msg) {
    ws.send(msg);
  });

  let i = 0;
  setInterval(function() {
    i += 1;
    ws.send(`Iteration ${i}`);
  }, 3000);

});

app.listen(port, () => console.log(`listening on ${port}`))
