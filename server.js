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
          console.log("mat")
          res.json({success:false,msg:"Invalid email or password"})
        }else{
          console.log("notm")
          res.json({success:true})
        }
      }else{
        res.json({success:false,msg:"Invalid email or password"})
      }

      db.close();
    });
  });


})

app.get('/test', (req, res) => {
  console.log("test method")
  res.header('Access-Control-Allow-Origin', '*');



  bcrypt.hash('12345', 10, function(err, hash) {
    console.log("pathi pathi hash ",hash)
  });


})



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
