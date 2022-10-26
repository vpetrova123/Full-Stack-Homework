const http = require("http");
var qs = require("querystring");
const port = process.env.PORT || 5001;

// http://localhost:5001/form should return a form with input elements for username, email, and submit button

// http://localhost:5001/submit should return all the data the user entered

//This should be in a separate HTML file
const postHTML = `<html><body>
<form method='post'>
<label for="username">Userame: </label>
<input type="text" name="username" id="username"><br />
<label for="email">Email: </label>
<input type="text" name="email" id="email"><br />
<label for="comments">Comments: </label>
<input type="text" name="comments" id="comments"><br />
<input type="radio" name="newsletter">
<label for="newsletter">Sign up for the newsletter</label><br>
<input type='submit' value="Submit">
</form></body></html>`;
let post = "";

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(`<h1>Exercise 03</h1>`);
    res.write(`<li><a href="/form">/form</a></li>`);
    res.write(`<li><a href="/submit">/submit</a></li>`);
    res.end();
  } else if (req.url === "/form") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
      console.log("BODY on data: " + body);
      post = qs.parse(body);
      console.log("POST on /form " + post.username);
    });
    req.on("end", () => {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(postHTML);
      res.end();
    });
  } else if (req.url === "/submit") {
    if (post.username !== undefined) {
      res.write(`<p>Username: ${post.username}</p>`);
    } else {
      res.write(`<p>Username:</p>`);
    }
    if (post.email !== undefined) {
      res.write(`<p>Email: ${post.email}</p>`);
    } else {
      res.write(`<p>Email:</p>`);
    }
    if (post.comments !== undefined) {
      res.write(`<p>Comments: ${post.comments}</p>`);
    } else {
      res.write(`<p>Comments:</p>`);
    }
    if (post.newsletter) {
      res.write(`<p>Newsletter: Yes I would like to sign up</p>`);
    } else {
      res.write(`<p>Newsletter: No I would not like to sign up</p>`);
    }

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
