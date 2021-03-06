var express = require("express");

var router = express.Router();

var burger = require("../models/burger.js");


router.get("/", function(req, res){
    burger.all(function(data){
        var hbsObject = {
            burgers: data
        };
        // console.log(hbsObject);

        res.render("index", hbsObject);
    })
});

router.post("/api/burgers", function(req, res){
    burger.create([
        "burger_name", "devoured"
    ],[req.body.name, req.body.devoured],
    function(result){
        res.json({ id: result.inserId});
    });
});

router.put("/api/burgers/:id", function(req, res){
    var burgerID = req.params.id;   
    

    burger.update(burgerID, function(result){
            if (result.changedRows === 0) {
                // If no rows were changed, then the ID must not exist, so 404
                return res.status(404).end();
              } else {
                res.status(200).end();
            }            
        }

    )
})


module.exports = router;