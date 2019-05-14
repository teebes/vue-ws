const express = require('express')
const app = express()
const port = 3000

var expressWs = require('express-ws')(app)

app.ws('/counter', function(ws, req) {

  ws.on('message', function(msg) {
    ws.send(`One might even say... ${msg}!`);
  });

  let i = 0;
  setInterval(function() {
    ws.send(`Iteration ${i}`);
    i += 1;
  }, 3000);

});


app.listen(port, () => console.log(`listening on ${port}`))
