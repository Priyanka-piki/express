var express =  require("express");
var router =  express();
var mysql = require("mysql");
var Joi = require("joi");
var config = require("config");

var connection =  mysql.createConnection({
    host: config.get("host"),
    database:config.get("database"),
    user : config.get("user"),
    password:config.get("password")
});
connection.connect();
router.use(express.json());

router.get("/",(request, response)=>{
    var queryText = "select * from CricStatTB";
    
    connection.query(queryText,(err, result)=>{
        if(err==null)
            {
                response.send(JSON.stringify(result));
            }
            else{
                response.send(JSON.stringify(err));
            }
    });
});

router.get("/:id",(request, response)=>{
    var queryText = `select * from CricStatTB where No = ${request.params.No}`;
    connection.query(queryText,(err, result)=>{
        if(err==null)
            {
                response.send(JSON.stringify(result));
            }
            else{
                response.send(JSON.stringify(err));
            }
    });
});


router.post("/", (request,response)=>{
    var id= request.body.id;
    var Country=request.body.Country;
    var Year=request.body.Year;
    var NoofTeam=request.body.NoofTeam;
    var Venue=request.body.Venue;
  var queryText=`Insert into CricStatTB values(${id},'${Country}',${Year},${NoofTeam},'${Venue}')`;
  connection.query(queryText, (err,result)=>{
      if(err==null)
      {
         response.send(JSON.stringify(result));
      }
      else{
          response.send(JSON.stringify(err));
      }
  });
});
    

router.delete("/:id",(request, response)=>{
    var id = request.params.id;
    var queryText = `delete from CricStatTB where id = ${id}`;
    connection.query(queryText,(err, result)=>{
        if(err==null)
            {
                response.send(JSON.stringify(result));
            }
            else{
                response.send(JSON.stringify(err));
            }
    });
});


module.exports = router;








 








