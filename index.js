const http = require('http');
const url = require('url');
const fs = require('fs');

http
  .createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const filename = parsedUrl.pathname === '/' ? 'index.html' : `.${parsedUrl.pathname}.html`;

    fs.readFile(filename, (err, data) => {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        const file = fs.readFileSync('./404.html', 'utf8');
        return res.end(file);
        // return res.end('<h1>Error 404</h1><p>The Page you are looking for is not found</p>');
        // goto 404
      }
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write(data);
      return res.end();
    });
  })
  .listen(8080);
