const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017";
let db = null;
const bcrypt = require("bcryptjs");
// connect to mongodb
MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
  console.log("Connected successfully to db server!");
  //connect to db
  db = client.db("badbank");
});

//create a user
const create = (name, email, password) => {
  return new Promise((resolve, reject) => {
    const collection = db.collection("users");
    const doc = { name, email, password, accountType: "Checking", balance: 0 };
    collection.insertOne(doc, { w: 1 }, (err, result) => {
      err ? reject(err) : resolve(doc);
    });
  });
};

//return all users
const all = () => {
  return new Promise((resolve, reject) => {
    const customers = db
      .collection("users")
      .find({})
      .toArray((err, docs) => {
        err ? reject(err) : resolve(docs);
      });
  });
};

// find a users accounts
const find = (email) => {
  return new Promise((resolve, reject) => {
    const customers = db
      .collection("users")
      .find({ email: email })
      .toArray(function (err, docs) {
        err ? reject(err) : resolve(docs);
      });
  });
};

// find a single user account
const findOne = (email) => {
  return new Promise((resolve, reject) => {
    const customers = db
      .collection("users")
      .findOne({ email: email })
      .then((doc) => resolve(doc))
      .catch((err) => reject(err));
  });
};

// update deposit and withdraw amounts
const update = (email, amount) => {
  return new Promise((resolve, reject) => {
    const customers = db
      .collection("users")
      .findOneAndUpdate(
        { email: email },
        { $inc: { balance: amount } },
        { returnOriginal: false },
        function (err, documents) {
          err ? reject(err) : resolve(documents);
        }
      );
  });
};

module.exports = { create, all, find, findOne, update };
