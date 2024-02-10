const express = require('express');
const mysql = require('mysql2');
const path = require("path");
const methodOverride = require('method-override')
const app = express();
app.use(express.static(__dirname + '/public'));
const uuid = require("uuid");

app.use(express.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname,"public" )));
app.use(methodOverride('_method'));



app.set("view engine","ejs");
app.set("views", path.join(__dirname,"/views"));

const port = 8080;

app.get("/home",(req,res)=>{
  res.render("home.ejs");
})

app.get("/contact",(req,res)=>{
  let pic = "/Users/abdulazeez/Desktop/GDSC/team.jpg"
  res.render("ContactUs.ejs",{pic});
})



app.post("/search",(req,res)=>{
  let {searchkey} = req.body;
  console.log(searchkey);
  searchkey = searchkey.toUpperCase();
  console.log(searchkey);
  let q = `SELECT * FROM waterData
           WHERE Locations LIKE '%${searchkey}%' OR 
                 Capitalcity LIKE '%${searchkey}%'`;
  connection.query(q,(err,result)=>{
    try{
      if(err) throw err
      console.log(result);
      res.render("Search.ejs",{count:result});
    }catch(err){
      console.log(err);
    }

  })
})

app.get("/news",(req,res)=>{
  res.render("News.ejs");
});

app.get("/new",(req,res)=>{
  res.render("Login.ejs");
});

app.post("/user/add",(req,res)=>{
    let obj = req.body;
    console.log(obj);
    let values = [
      obj.name,
      obj.email,
      obj.password,
      obj.id = uuid.v4()
    ];
    let q = `INSERT INTO user (name,email,password,id) VALUES (?, ?, ?,?)`;
    connection.query(q,values,(err,result)=>{
      try{
        if (err) throw err;
        console.log("row added successfully");
      }catch(err){
        console.log(err);
      }
      
    })
})

app.post("/add", (req, res) => {
  let obj = req.body;
  console.log(req.body);

  let q = `INSERT INTO report (name, email, contact, nameOfWater, LAT, LON, ADDRESS, STATE, typeOfWater, STORY) 
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`; 

  let values = [
    obj.name,
    obj.email,
    obj.contact,
    obj.nameOfWater,
    obj.LAT,
    obj.LON,
    obj.ADDRESS,
    obj.STATE,
    obj.typeOfWater,
    obj.STORY
  ];

  connection.query(q, values, (err, result) => {
    try {
      if (err) throw err;
      console.log("Row added successfully");
    } catch (err) {
      console.log(err);
    }
  });
});









app.get("/search",(req,res)=>{
  let q = `SELECT * FROM waterData LIMIT 10`;
  connection.query(q,(error,result)=>{
      try{
           if (error) throw error;
           let count = result;
          //  console.log(count);
           res.render("Search1.ejs");
      }catch(error){
          console.log(error);
          res.send("Error in DB");
      }
     
  })
})







app.listen(port,()=>{
  console.log("server has started at port 8080");
})




//creating connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'BlueMetics',
    password: 'abcd'
  });

