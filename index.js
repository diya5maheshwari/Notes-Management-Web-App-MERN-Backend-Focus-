import express from "express";
import mongoose from "mongoose";
import Note from "./models/Note.js";
import dotenv from "dotenv";


dotenv.config();


const app = express();

app.set("view engine", "ejs");

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("Connected to MongoDB");
})
.catch((err) => {
    console.log("Error connecting to MongoDB:", err);
});


app.use(express.urlencoded({ extended: true }));

// get route
app.get("/", async (req, res) => {
    try{
      const note=await Note.find({});
      res.render("notes",{notes:note});
    }catch(err){
        console.log(err);
    }

});

// add note route
app.post("/", async (req, res) => {
  try{
    await Note.create({
        title:req.body.title,
        content:req.body.content
    });
    res.redirect("/");
  }catch(err){
    console.log(err);
  }
});


app.param("id", (req, res, next, id) => {
  req.params.id = id;
  next();
});

// delete note route
app.post("/delete/:id", async (req, res) => {
  try{
    await Note.findByIdAndDelete(req.params.id);
    res.redirect("/");
  }catch(err){
    console.log(err);
  }
});

// edit note routes
app.get("/edit/:id", async (req, res) => {
   try{
    const note= await Note.findById(req.params.id);
    res.render("edit",{note:note, index:req.params.id});
   }catch(err){
    console.log(err);
   }
});


app.post("/edit/:id", async (req, res) => {
  try{
    await Note.findByIdAndUpdate(req.params.id,{
        title:req.body.title,
        content:req.body.content
    });
    res.redirect("/");
  }catch(err){
    console.log(err);
  }
});

app.listen(process.env.PORT || 5100, () => {
  console.log("Server running");
});


