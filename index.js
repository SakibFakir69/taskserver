


const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express');
const cors = require("cors");
const Port  = process.env.PORT || 5000;
const app =express();




const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.mzodb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

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
    await client.connect();















    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");


  } finally {
    // Ensures that the client will close when you finish/error
    
  }
}
run().catch(console.log);









app.get('/', async(req,res)=>{
    res.send("oky")
})

app.listen(Port,()=>console.log(`This serverning on this port ${Port}`))
