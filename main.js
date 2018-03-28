const express = require('express');
const http = require('http');
const execSync = require('child_process').execSync;
const path = require('path');
const fs = require('fs');
var bodyParser = require("body-parser");
var tmp = require('tmp');

var app = express();
app.use(bodyParser.text());

/**
* Get port from environment and store in Express.
*/
app.set('port', process.env.PANDOC_PORT || '3000');
app.post('*', function (req, res) {
    tmp.file(function _tempFileCreated(err, path, fd, cleanupCallback) {
      if (err) throw err;
      fs.write(fd, req.body, function() {
        let code = execSync('pandoc -f latex -t latex -o ' + path + '.pdf ' + path);
        res.sendFile(path + '.pdf')
        cleanupCallback();
      })

    });
});

var server = http.createServer(app);

/**
* Listen on provided port, on all network interfaces.
*/
server.listen(app.get('port'), function () {
  console.log('Pandoc latex parser listening on port ' + app.get('port'));
});
