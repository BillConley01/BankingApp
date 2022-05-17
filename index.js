const path = require("path");
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const dal = require("./dal.js");
const app = express();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 5000;

// create user account
app.get("/account/create/:name/:email/:password", function (req, res) {
  // check if account exists
  dal.find(req.params.email).then((users) => {
    // if user exists, return error message
    if (users.length > 0) {
      res.send("User already in exists");
    } else {
      // else create user
      const hash = bcrypt.hashSync(req.params.password, 10);
      dal.create(req.params.name, req.params.email, hash).then((user) => {
        //console.log(user);
        res.send(user);
      });
    }
  });
});
//"https://william-conleyfullstackbanking.herokuapp.com"
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
      //console.log(user);
      res.send(user);
    });
  } catch (error) {
    //console.log(error);
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
      //console.log(user);
      res.send(user);
    });
  } catch (error) {
    //console.log(error);
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
      //console.log(response);
      res.send(response);
    });
  } catch (error) {
    //console.log(error);
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
        //console.log(docs);
        res.send(docs);
      });
    }
  } catch (error) {
    //console.log(error);
    res.json({ status: "error", error: "invalid token" });
  }
});

// used to serve static files from build directory
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(PORT, () => console.log(`Running on port: ${PORT}`));
