const express = require('express');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors');
const app = express()
const port = process.env.PORT || 5000


// middleware
app.use(cors())
app.use(express.json());


// doctorDB
// DuMkWf5WDsL7baxR









const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.n2defbf.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)


    const doctorsCollection = client.db('doctordb').collection('doctors')
    const appointCollection = client.db('doctordb').collection('appoints')


//normal get doctors
app.get('/doctors', async(req, res)=>{
    const cursor = doctorsCollection.find()
    const result = await cursor.toArray();
    res.send(result)
})

//get single doctor
app.get('/doctors/:id', async(req, res)=>{
    const id = req.params.id;
    const query = {_id: new ObjectId(id)}
    const result = await doctorsCollection.findOne(query);
    res.send(result);
  });

  // post appoints
  app.post('/appoints', async(req, res)=>{
    const usersdata = req.body;
    console.log(req.body)
    const result = await appointCollection.insertOne(usersdata);
    res.send(result)
  });



    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);










app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})