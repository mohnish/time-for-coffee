const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
let db;

// Connection URL
const url = process.env.MONGODB_URI || "mongodb://localhost:27017/time4coffee";

// Database Name
const collectionName = 'coffeepots';

// Use connect method to connect to the server
MongoClient.connect(url, { useNewUrlParser: true }, function(err, client) {
    assert.equal(null, err);
    console.log("Connected successfully to server");
    db = client.db();
});

module.exports = {
  insert: async function (params) {
    const collection = db.collection(collectionName);
    await collection.insertOne(params);
  },

  update: async function (id, params) {
    const collection = db.collection(collectionName);
    return await collection.updateOne(
      { pot_id: id },
      { $set: params }
    );
  },

  find: async function (params) {
    const collection = db.collection(collectionName);
    return await collection.findOne(params);
  },
};
