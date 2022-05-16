const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const dal = require("./dal.js");
const app = express();
const path = require("path");
const port = process.env.PORT || 5000;
// used to serve static files from build directory
app.use(express.static(path.resolve(__dirname, "./client/build")));
app.get("*", function (request, response) {
  response.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});
app.use(cors());

// create user account
app.get("/account/create/:name/:email/:password", function (req, res) {
  // check if account exists
  dal.find(req.params.email).then((users) => {
    // if user exists, return error message
    if (users.length > 0) {
      console.log("User already in exists");
      res.send("User already in exists");
    } else {
      // else create user
      const hash = bcrypt.hashSync(req.params.password, 10);
      dal.create(req.params.name, req.params.email, hash).then((user) => {
        console.log(user);
        res.send(user);
      });
    }
  });
});

// login user
app.get("/account/login/:email/:password", function (req, res) {
  dal.find(req.params.email).then((user) => {
    // if user exists, check password and create token
    if (user.length > 0) {
      if (bcrypt.compareSync(req.params.password, user[0].password)) {
        const token = jwt.sign(
          {
            name: user[0].name,
            email: user[0].email,
            balance: user[0].balance,
            password: user[0].password,
          },
          "topsecret"
        );
        res.send({ status: "ok", user: token });
        console.log(user);
      } else {
        res.send("Login failed: wrong password");
      }
    } else {
      res.send("Login failed: user not found");
    }
  });
});

// find user account using token
app.get("/account/find", function (req, res) {
  const token = req.headers["x-access-token"];
  try {
    const token_decoded = jwt.verify(token, "topsecret");
    const email = token_decoded.email;
    dal.find(email).then((user) => {
      console.log(user);
      res.send(user);
    });
  } catch (error) {
    console.log(error);
    res.json({ status: "error", error: "invalid token" });
  }
});

// find one user by email - alternative to find
app.get("/account/findOne", function (req, res) {
  const token = req.headers["x-access-token"];
  try {
    const token_decoded = jwt.verify(token, "topsecret");
    const email = token_decoded.email;
    dal.findOne(email).then((user) => {
      console.log(user);
      res.send(user);
    });
  } catch (error) {
    console.log(error);
    res.json({ status: "error", error: "invalid token" });
  }
});

// update - deposit/withdraw amount
app.get("/account/update/:amount", function (req, res) {
  const token = req.headers["x-access-token"];
  const amount = Number(req.params.amount);
  try {
    const token_decoded = jwt.verify(token, "topsecret");
    const email = token_decoded.email;
    dal.update(email, amount).then((response) => {
      console.log(response);
      res.send(response);
    });
  } catch (error) {
    console.log(error);
    res.json({ status: "error", error: "invalid token" });
  }
});

// all accounts
app.get("/account/all", function (req, res) {
  const token = req.headers["x-access-token"];
  try {
    const token_decoded = jwt.verify(token, "topsecret");
    const email = token_decoded.email;
    if (email) {
      dal.all().then((docs) => {
        console.log(docs);
        res.send(docs);
      });
    }
  } catch (error) {
    console.log(error);
    res.json({ status: "error", error: "invalid token" });
  }
});

app.listen(port);
console.log("Running on port:" + port);
