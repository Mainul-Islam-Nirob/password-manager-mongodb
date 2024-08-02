const express = require('express');
const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors')


dotenv.config();

// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'passop';
client.connect();
const app = express()
const port = 3000

app.use(bodyParser.json())
app.use(cors())


//Get All the Password
app.get('/', async(req, res) => {
  const db = client.db(dbName);
  const collection = db.collection("passwords");
  const findResult = await collection.find({}).toArray();
  res.json(findResult)
})

//Save a Password
app.post('/', async(req, res) => {
  const password = req.body
  const db = client.db(dbName);
  const collection = db.collection("passwords");
  const findResult = await collection.insertOne(password);
  res.send({success: true, result: findResult})
})

// update a Password
app.put('/:id', async (req, res) => {
  const id = req.params.id;
  const password = req.body;
  const db = client.db(dbName);
  const collection = db.collection("passwords");
  const filter = { id: id };
  delete password._id;
  const update = { $set: password };
  const updateResult = await collection.updateOne(filter, update);
  res.send({ success: true, result: updateResult });
});

//Delete a Password by id
app.delete('/', async(req, res) => {
  const password = req.body
  const db = client.db(dbName);
  const collection = db.collection("passwords");
  const findResult = await collection.deleteOne(password);
  res.send({success: true, result: findResult})
})

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})