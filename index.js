// import express from "express";
// import mongoose from "mongoose";
// import Note from "./models/Note.js";
// import dotenv from "dotenv";


// dotenv.config();
// const app = express();

// app.set("view engine", "ejs");

// // mongoose.connect("mongodb://127.0.0.1:27017/NoteDB")
// // .then(()=>{
// //     console.log("Connected to MongoDB");
// // })
// // .catch((err) => {
// //     console.log("Error connecting to MongoDB:", err);
// // });

// mongoose.set("bufferCommands", false);

// mongoose.connect(process.env.MONGO_URI, {
//   serverSelectionTimeoutMS: 5000
// })
// .then(() => console.log("MongoDB Connected"))
// .catch(err => {
//   console.error("Mongo connection failed:", err.message);
//   process.exit(1);
// });



// app.use(express.urlencoded({ extended: true }));

// // get route
// app.get("/", async (req, res) => {
//     try{
//       const note=await Note.find({});
//       res.render("notes",{notes:note});
//     }catch(err){
//         console.log(err);
//     }

// });

// // add note route
// app.post("/", async (req, res) => {
//   try{
//     await Note.create({
//         title:req.body.title,
//         content:req.body.content
//     });
//     res.redirect("/");
//   }catch(err){
//     console.log(err);
//   }
// });


// app.param("id", (req, res, next, id) => {
//   req.params.id = id;
//   next();
// });

// // delete note route
// app.post("/delete/:id", async (req, res) => {
//   try{
//     await Note.findByIdAndDelete(req.params.id);
//     res.redirect("/");
//   }catch(err){
//     console.log(err);
//   }
// });

// // edit note routes
// app.get("/edit/:id", async (req, res) => {
//    try{
//     const note= await Note.findById(req.params.id);
//     res.render("edit",{note:note, index:req.params.id});
//    }catch(err){
//     console.log(err);
//    }
// });


// app.post("/edit/:id", async (req, res) => {
//   try{
//     await Note.findByIdAndUpdate(req.params.id,{
//         title:req.body.title,
//         content:req.body.content
//     });
//     res.redirect("/");
//   }catch(err){
//     console.log(err);
//   }
// });

// app.post("/status/:id", async (req, res) => {
//     const { status } = req.body;

//     await Note.findByIdAndUpdate(req.params.id, { status });
//     res.redirect("/");
// });


// const PORT = process.env.PORT || 3000;


// app.listen(PORT, "0.0.0.0", () => {
//   console.log("Server running on port", PORT);
// });



import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Note from "./models/Note.js";

dotenv.config();

const app = express();

app.set("view engine", "ejs");

mongoose.set("bufferCommands", false);

mongoose.connect(process.env.MONGO_URI, {
  serverSelectionTimeoutMS: 5000
})
.then(() => console.log("MongoDB Connected"))
.catch(err => {
  console.error("Mongo connection failed:", err.message);
  process.exit(1);
});

app.use(express.urlencoded({ extended: true }));

// get route
app.get("/", async (req, res) => {
  const notes = await Note.find({});
  res.render("notes", { notes });
});

// add note
app.post("/", async (req, res) => {
  await Note.create({
    title: req.body.title,
    content: req.body.content
  });
  res.redirect("/");
});

// delete note
app.post("/delete/:id", async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  res.redirect("/");
});

// edit note
app.get("/edit/:id", async (req, res) => {
  const note = await Note.findById(req.params.id);
  res.render("edit", { note });
});

app.post("/edit/:id", async (req, res) => {
  await Note.findByIdAndUpdate(req.params.id, {
    title: req.body.title,
    content: req.body.content
  });
  res.redirect("/");
});

// status update
app.post("/status/:id", async (req, res) => {
  const { status } = req.body;
  await Note.findByIdAndUpdate(req.params.id, { status });
  res.redirect("/");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});

