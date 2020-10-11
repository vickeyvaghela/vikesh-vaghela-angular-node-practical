const express = require('express')
var cors = require('cors')
const bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
const bcrypt = require('bcrypt');

var url = "mongodb://localhost:27017/";

const app = express()
const port = 3000

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



app.post('/login', async (req, res) => {
  console.log("req.bdy login")
  console.log(req.body)
  res.header('Access-Control-Allow-Origin', '*');

  MongoClient.connect(url, {useUnifiedTopology: true} , async function(err, db) {
    if (err) throw err;
    var dbo = db.db("online_survey_sys_db");
    dbo.collection("users").findOne({email:req.body.email}, async function(err, result) {

      if (err) throw err;

      if(result){

        console.log("result.password",result.password)
        const match = await bcrypt.compare(req.body.password, result.password);

        if(match) {
          res.json({success:true})
        }else{
          res.json({success:false,msg:"Invalid email or password"})
        }
      }else{
        res.json({success:false,msg:"Invalid email or password"})
      }

      db.close();
    });
  });


})



app.post('/fileUpload', (req, res) => {

  let fileNameAry = [];
  let fileName = '';

  var multer = require('multer');
  const storage = multer.diskStorage({
    destination: "uploads",
    filename: function(req, file, cb){
      fileName = file.fieldname +'-'+ generateRandStr() +'-' + Date.now()+'.'+file.originalname.split('.').pop();
      fileNameAry.push(fileName)
      cb(null, fileName)

      console.log("ddl gallllllla")
      console.log(fileName)

    }
  });

  const upload = multer({ storage: storage }).fields([{name: "profilePic"}]);

  upload(req, res, (err) => {








    const bfj = require('bfj');
    const fs = require('fs');
    const {ObjectId} = require('mongodb');

    // let path = "uploads/vikesh_sample.json";
    let path = "uploads/"+fileName;
    let options = {};

// By passing a readable stream to bfj.parse():
    bfj.parse(fs.createReadStream(path), options)
      .then(async (data) => {

        MongoClient.connect(url, {useUnifiedTopology: true} , async function(err, db) {
          for(let i=0; i<=data.length-1; i++){
            data[i]._id = ObjectId(data[i]._id)
            await addImportIntoMongo(data[i],db)
          }

          res.json({success:true,msg:"imported"})


          //db.close();
        });


      })
      .catch(error => {
        console.log("error")
        console.log(error)
      });








    //res.json(fileNameAry)

    if (err) throw err;
  });
});

async function addImportIntoMongo(importObj,db) {
  var dbo = db.db("online_survey_sys_db");
  let query = {_id: importObj._id}
  const options = { upsert: true };

  dbo.collection("imports").updateOne(query,{$set : importObj}, options, async function(err, res) {
    if (err) throw err;
    console.log("1 document inserted");
  });
}


app.get('/test', (req, res) => {
  console.log("test method")
  res.header('Access-Control-Allow-Origin', '*');



  bcrypt.hash('12345', 10, function(err, hash) {
    console.log("pathi pathi hash ",hash)
  });


})



app.get('/jsonread', (req, res) => {
  console.log("test method")
  res.header('Access-Control-Allow-Origin', '*');




  const bfj = require('bfj');
  const fs = require('fs');

  // let path = "uploads/vikesh_sample.json";
  let path = "uploads/generated.json";
  let options = {};

// By passing a readable stream to bfj.parse():
  bfj.parse(fs.createReadStream(path), options)
    .then(data => {
      console.log("json result")
      console.log(data[0])
    })
    .catch(error => {
      console.log("error")
      console.log(error)
    });





  res.send("talla g")


})


function generateRandStr() {
  var result           = '';
  var characters       = 'abcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < 10; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
