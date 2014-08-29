var connect = require('connect')
  , http = require('http')
  , fs = require('fs')
;

var app = connect()
  .use(function (req, res, next) {
    // just a place to log stuff out or do whatever
    next();
  })
  .use(connect.favicon())
  .use(connect.bodyParser())
  .use(connect.static(__dirname + '/public'))
  /*
  .use(function (req, res, next) {
    fs.readFile(__dirname + '/public/index.html',
    function (err, data) {
      res.writeHead(200);
      res.end(data);
    });
  })
  */
;

http.createServer(app).listen(9002);
console.log('listening on 9002');
