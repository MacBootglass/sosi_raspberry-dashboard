var express = require('express');
var app = express();
var opener = require('opener');
var port = 3000;

app.use("/ressources", express.static('ressources'));
app.use("/flipclock", express.static('node_modules/flipclock/compiled'));
app.use("/jquery", express.static('node_modules/jquery/dist'));
app.use("/dashboard", express.static('index.html'));

app.get("/", (req, res) => {
  res.send("Index");
});

app.listen(port, () => {
  console.log('Server listening on port ' + port + '!')
});

opener('http://localhost:' + port + '/dashboard');
