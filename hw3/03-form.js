// http://localhost:5001/form should return a form with input elements for username, email, and submit button
// http://localhost:5001/submit should return all the data the user entered

const http = require("http");
var qs = require("querystring");
const static = require("node-static");
const port = process.env.PORT || 5001;

const file = new static.Server("./public");
let post = "";

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    file.serve(req, res);
  } else if (req.url === "/form") {
    file.serveFile("/03-form.html", 200, {}, req, res);
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
      post = qs.parse(body);
    });
  } else if (req.url === "/submit") {
    const username = post.username || "n/a";
    const email = post.email || "n/a";
    const comments = post.comments || "n/a";
    const newsletter = post.newsletter
      ? "Yes I would like to sign up"
      : "No I would not like to sign up";

    res.write(`<p>Username: ${username}</br>
      Email: ${email}</br>
      Comments: ${comments}</br>
      Newsletter: ${newsletter}</br>
    </p>`);
    res.end();
  } else {
    res.writeHead(404, { "Content-Type": "text/html" });
    res.write("404 - page not found");
    res.end();
  }
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
