const express = require('express')
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express()
const port = process.env.PORT || 3000;

const cors = require("cors");
//middleware
app.use(cors());
app.use(express.json());

const categories= require('./Data/category.json');
const place= require('./Data/place.json');



const uri = "mongodb+srv://nazmulhasan16021998:FYJjMhAt7neZSKYj@cluster0.wi6lqah.mongodb.net/?retryWrites=true&w=majority";

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


    const database = client.db("travelDB");
    const userCollection = database.collection("user");

    app.get('/bookings', async(req,res)=>{
      const cursor=userCollection.find();
      const result= await cursor.toArray();
      res.send(result);
    })
    

    app.post('/bookings', async(req, res)=>{
      const user=req.body;
      console.log(user);
      const result= await userCollection.insertOne(user);
      res.send(result);
    })


    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.log);


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/categories',(req, res)=>{
  res.send(categories);
})

app.get('/categories/:id', (req, res)=>{
  const id= parseInt(req.params.id);
  if(id===0){
    res.send(place);
  }
  else{
    const category=place.filter(p=>parseInt(p.categoryId)===id);
    res.send(category);
    // console.log(category);

  }
})

app.get('/place', (req, res)=>{
  res.send(place);
})

app.get('/place/:id', (req, res)=>{
  const id= parseInt(req.params.id);
  const singlePlace=place.find(p=>p.id===id);
  res.send(singlePlace);
})

app.get('/booking/:id', (req, res)=>{
  const id= parseInt(req.params.id);
  const singlePlace=place.find(p=>p.id===id);
  res.send(singlePlace);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})