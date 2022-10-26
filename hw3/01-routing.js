const { read } = require("fs");
const http = require("http");
const port = process.env.PORT || 5001;

// http://localhost:5001/welcome should return a status code 200 with a welcome message of your choice in html format

// http://localhost:5001/redirect should redirect the request to '/redirected' by using 302 as the status code / the redirected page should return a redirected message of your choice

// http://localhost:5001/cache should return 'this resource was cached' in html format and set the cache max age to a day

// http://localhost:5001/cookie should return 'cookies… yummm' in plain text and set 'hello=world' as a cookie

// http://localhost:5001/check-cookies should return 'yes' / 'no' in plain text depending on whether the browser has the 'hello' cookie

// For other routes, such as http://localhost:5001/other, this exercise should return a status code 404 with '404 - page not found' in html format

const server = http.createServer((req, res) => {
  const routes = [
    "welcome",
    "redirect",
    "redirected",
    "cache",
    "cookie",
    "check-cookies",
    "other",
  ];

  let getRoutes = () => {
    let result = "";

    routes.forEach(
      (elem) => (result += `<li><a href="/${elem}">${elem}</a></li>`)
    );

    return result;
  };

  if (req.url === "/") {
    let routeResults = getRoutes();

    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(`<h1>Exercise 01</h1>`);
    res.write(`<ul> ${routeResults} </ul>`);
    res.end();
  }

  // Add your code here
  //Welcome route
  else if (req.method === "GET" && req.url === "/welcome") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write("<h1>Welcome to the welcome page</h1>");
    res.end();
  }

  //Redirect route
  else if (req.method === "GET" && req.url === "/redirect") {
    res.writeHead(302, { Location: "/redirected" });
    res.end();
  } else if (req.method === "GET" && req.url === "/redirected") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write("<h1>This is the /redirected page</h1>");
    res.end();
  }

  //Cache route
  else if (req.method === "GET" && req.url === "/cache") {
    res.writeHead(200, {
      "Content-Type": "text/plain",
      "Cache-Control": "max-age = 86400",
    });
    res.write("<h1>this resource was cached</h1>");
    res.end();
  }

  //Cookie route
  else if (req.method === "GET" && req.url === "/cookie") {
    res.writeHead(200, {
      "Content-Type": "text/plain",
      "Set-Cookie": "hello=world",
    });
    res.write("cookies... yummm");
    res.end();
  }

  //Check-Cookies route
  else if (req.method === "GET" && req.url === "/check-cookies") {
    res.writeHead(200, {
      "Content-Type": "text/plain",
    });
    const exists = req.headers.cookie
      .split(";")
      .some((item) => item.trim().startsWith("hello="));
    const output = exists ? "yes" : "no";
    res.write(`${output}`);
    res.end();
  }

  //404 route
  else {
    res.writeHead(404, {
      "Content-Type": "text/html",
    });
    res.write("404 - page not found");
    res.end();
  }
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
