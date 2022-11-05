const express = require("express");
const app = express();
const port = process.env.PORT || 5001;

// Use middleware static() to serve all static files in the given folder
app.use(express.static("public"));

// Use middleware urlencoded() to parse an incoming request with a urlencoded payload and return an objectß
app.use(express.urlencoded({ extended: false }));

// POST request
app.post("/submit", (req, res) => {
  // Add your code here
  console.log(req.body);
  const username = req.body.username || "n/a";
  const email = req.body.email || "n/a";
  const comments = req.body.comments || "n/a";
  const newsletter = req.body.newsletter
    ? "Yes I would like to sign up"
    : "No I would not like to sign up";

  res.write(`<p>Username: ${username}</br>
    Email: ${email}</br>
    Comments: ${comments}</br>
    Newsletter: ${newsletter}</br>
    </p>`);
  res.end();
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
