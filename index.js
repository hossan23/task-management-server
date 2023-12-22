const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

app.use(cors());
app.use(express.json());

// MONGO

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.obx8gyp.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
 serverApi: {
  version: ServerApiVersion.v1,
  strict: true,
  deprecationErrors: true,
 },
});

async function run() {
 try {
  const dataCollection = client.db('data-collection').collection('data');

  app.post('/datas', async (req, res) => {
   const data = req.body;
   const result = await dataCollection.insertOne(data);
   res.send(result);
  });

  app.get('/datas', async (req, res) => {
   const result = await dataCollection.find().toArray();
   res.send(result);
  });

  console.log('Pinged your deployment. You successfully connected to MongoDB!');
 } finally {
 }
}
run().catch(console.dir);

// MONGO

app.get('/', (req, res) => {
 res.send('Hello World!');
});

app.listen(port, () => {
 console.log(`Example app listening on port ${port}`);
});
