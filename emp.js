var express =  require("express");
var router =  express();
var mysql = require("mysql");
var config = require("config");

var connection =  mysql.createConnection({
    host: config.get("localhost"),
    database:config.get("Employee"),
    user : config.get("root"),
    password:config.get("manager")
});
connection.connect();
router.use(express.json());

router.get("/",(request, response)=>{
    var queryText = "select * from Employee";
    
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

router.get("/:No",(request, response)=>{
    var queryText = `select * from Employee where No = ${request.params.No}`;
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


router.post("/",(request, response)=>{
    var validationResult = Validate(request);

    //console.log(validationResult.error);
    if(validationResult.error==null)
    {
            var No = request.body.No;
            var Name = request.body.Name;
            var Age = request.body.Age;

            var queryText = `insert into Emp values(${No}, '${Name}', ${Age})`;
            connection.query(queryText,(err, result)=>{
            if(err==null)
                {
                    response.send(JSON.stringify(result));
                }
                else{
                    response.send(JSON.stringify(err));
                }
        });
    }
    else{
        response.send(JSON.stringify(validationResult.error));
    }
});




module.exports = router;


