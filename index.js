
require("dotenv").config();
const { MongoClient, ServerApiVersion, Db, ObjectId } = require('mongodb');
const express = require('express');
const cors = require("cors");
const Port = process.env.PORT || 5000;
const app = express();
const http = require("http");
const {Server } = require("socket.io");
const { Socket } = require("dgram");
const io = new Server();

app.use(express.json())
app.use(cors());


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

    /// create post and get req for data store backend 
    /// and send front-end 
    const taskDB = client.db("taskDB");
    const taskColleection = taskDB.collection("task");


    /// post or add task 

    app.post('/tasks', async (req, res) => {

      try {

        const task = req.body;
        const result = await taskColleection.insertOne(task);
        console.log(result);
        res.send(result);

      } catch (error) {
        console.log(error.code);

      }

    })
    

  


    // get req or find all data 


    app.get('/tasks', async (req, res) => {
     
  
      try {
        const result = await taskColleection.find().toArray();
        res.send(result);
      } catch (error) {
        console.log(error.code);
      }

    })

    // put 

    app.put('/tasks/:id', async (req,res)=>{

      try{
        const id = req.params.id;
      const qury = {_id : new ObjectId(id)}
      const task = req.body;

      const updateTask = {

        $set:{

          Title: task.Title ,
          Description: task.Description,
          Category : task.Category


        }
      }
      const result = await taskColleection.updateOne(qury,updateTask);
      res.send(result);

      }catch(error)
      {
        console.log(error.message);
      }

    })

    // delete

    app.delete('/tasks/:id', async(req,res)=>{

    try{
      const id = req.params.id;
      const qury = {_id: new ObjectId(id)};
      const result = await taskColleection.deleteOne(qury);
      res.send(result);
      
    }catch(error)
    {
      console.log(error.message)
    }
  })

    








    io.on("connection",(socket)=>{
      console.log("user conected")


      socket.on("")










    })


    
    














    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");


  } finally {
    // Ensures that the client will close when you finish/error

  }
}
run().catch(console.log);









app.get('/', async (req, res) => {
  res.send("oky")
})

app.listen(Port, () => console.log(`This serverning on this port ${Port}`))
