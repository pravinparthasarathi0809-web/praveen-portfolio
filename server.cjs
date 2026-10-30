
const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 5000;
const ROOT = __dirname;

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2"
};

const server = http.createServer((req, res) => {
  const pathname = decodeURIComponent(
    new URL(req.url, `http://${req.headers.host}`).pathname
  );

  const requestedPath = pathname === "/" ? "/index.html" : pathname;
  const filePath = path.resolve(ROOT, "." + requestedPath);

  if (!filePath.startsWith(ROOT + path.sep) &&
      filePath !== path.join(ROOT, "index.html")) {
    res.writeHead(403);
    return res.end("403 Forbidden");
  }

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      return res.end("404 - Page Not Found");
    }

    const ext = path.extname(filePath).toLowerCase();

    res.writeHead(200, {
      "Content-Type": mimeTypes[ext] || "application/octet-stream"
    });

    res.end(content);
  });
});

server.listen(PORT, () => {
  console.log("=================================");
  console.log("PRAVEEN PORTFOLIO");
  console.log(`Local: http://localhost:${PORT}`);
  console.log("=================================");
});
