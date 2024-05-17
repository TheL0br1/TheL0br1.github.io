const http = require('http');
const fs = require('fs');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');


const app = express();
const PORT = process.env.PORT || 3000; // Use port 3000 by default


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://l0br1artem:gZEvaLFqkyzN6egv@cluster0.lmijfom.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
async function listDatabases(){
  databasesList = await client.db().admin().listDatabases();

  const cursor = client.db("sample_mflix").collection("posts").find();
  console.log("async");
  for await (const doc of cursor) {
    console.log(doc);
  }
  console.log("Databases:");
  databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    listDatabases()
  } finally {
    // Ensures that the client will close when you finish/error
    
  }
}
async function addPostData(data)
{  await client.db("sample_mflix").collection('posts').insertOne({
    name: data.name,
    topic: data.topic,
    message: data.message,
  });
}


app.use(bodyParser.json()); // Parse JSON request bodies

// POST endpoint to handle incoming data
app.post('/submitData', (req, res) => {
    const data = req.body;
    console.log('Received data from client:', data);
    // Process the received data here
    res.status(200).json({ message: 'Data received successfully!' });
    addPostData(data)
});

app.use(express.static(path.join(__dirname, '../')));


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

run().catch(console.dir);

app.get('/api/data', async (req, res) => {
  try {
    const collection = client.db("sample_mflix").collection('posts');
    const data = await collection.find({}).toArray();
    res.json(data);
  } catch (err) {
    res.status(500).send(err.toString());
  }
});





//mongodb+srv://l0br1artem:<password>@cluster0.lmijfom.mongodb.net/


//mongodb+srv://l0br1artem:gZEvaLFqkyzN6egv@cluster0.lmijfom.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0