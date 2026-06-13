//express basics

const express = require("express");
const path = require("path")
const app = express();

//app.use
//static means server need not to change anything and middileware
//SSR
//adding to static assets 

//API             vs           SSR
// API-JSON                SSR - Template
// Send data               send Template
// Res.JSon                Res.render
app.use(express.static("./navbar-app"))

//app.get
app.get("/",(req,res)=>{
     
})
app.use((req,res)=>{
  res.status(404).send("Resource Not found")
  
})
app.listen(5000,()=>{
  console.log("server is listening on port 5000")
})

//app.get
//app.Post
//app.Update
//app.Delete
//app.put
//app.patch
//app.all
//app.use
//app.listen