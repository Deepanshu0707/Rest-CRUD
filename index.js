const express = require("express");
const app = express();
const port = 8080;

const path = require("path");
app.set("view engine","ejs");

app.set("views",path.join(__dirname,"views"));

app.use(express.urlencoded({extended : true}));

app.use(express.static(path.join(__dirname,"public")));

const { v4: uuidv4 } = require('uuid');

const methodOverride = require("method-override");
app.use(methodOverride("_method"));

app.listen(port,()=>{
    console.log(`App is listening to port ${port}`);
})

let posts = [
    {
        id : uuidv4(),
      username : "Payal",
      content : "I am new to this coding world but i start liking coding."  
    },
    {
        id : uuidv4(),
        username : "Deepanshu",
        content : "Stay Focused because if you want to achieve your dreams you need to work hard right now then only you can achieve your goals." 
    },
    {
        id : uuidv4(),
        username : "Kiran",
        content : "Hardwork is the only key if you are looking for success." 
    }
]

app.get("/posts",(req,res)=>{
    res.render("posts.ejs",{posts});
})

app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
})

app.post("/posts",(req,res)=>{
    let {username,content} = req.body;
    let id = uuidv4();
    posts.push({id,username,content});
    res.redirect("/posts");
})

app.get("/posts/:id",(req,res)=>{
    let {id} = req.params;
    const find = posts.find((item)=>id === item.id);
    console.log(find);
    res.render("show.ejs",{find});
})

app.patch("/posts/:id",(req,res)=>{
    let {id} = req.params;
    console.log(id);
    let updateContent = req.body.content;
    console.log(updateContent);
    const find = posts.find((item)=>id === item.id);
    find.content = updateContent;
    res.redirect("/posts");
})

app.get("/posts/:id/edit",(req,res)=>{
 let {id} = req.params;
 const find = posts.find((item)=>id === item.id);
 res.render("edit.ejs",{find});
})

app.delete("/posts/:id",(req,res)=>{
    let {id} = req.params;
    posts = posts.filter((item)=>id !== item.id);
   res.redirect("/posts");
})