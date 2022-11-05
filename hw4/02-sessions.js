const express = require("express");
const session = require("express-session");
const app = express();
const port = process.env.PORT || 5001;

// Use the express-session module
app.use(
  session({
    store: new session.MemoryStore(),
    secret: "a secret to sign the cookie",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 86400000,
    },
  })
);

//Middleware gets executed for every route
app.use((req, res, next) => {
  res.set({ "Content-Type": "text/plain" });
  res.write(`Currently on route ${req.url}\n\n`);
  if (req.session.example === undefined) {
    req.session.example = [];
    req.session.example.push(`${req.url}`);
  } else {
    req.session.example.push(`${req.url}`);
    res.write("Previously visited: \n");
    res.write(req.session.example.join("\n"));
  }
  next();
});

//Welcome the user on the main route
app.get("/", (req, res, next) => {
  res.write(`Welcome to http://localhost:${port}\n\n`);
  res.end();
});

//All other routes
app.get("*", (req, res, next) => {
  res.end();
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
