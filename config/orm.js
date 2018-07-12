var connection = require("../config/connection");

function questionMarks(num) {
    var arr = [];
  
    for (var i = 0; i < num; i++) {
      arr.push("?");
    }
  
    return arr.toString();
  }

function objToSql(ob) {
var arr = [];

// loop through the keys and push the key/value as a string int arr
for (var key in ob) {
    var value = ob[key];
    // check to skip hidden properties
    if (Object.hasOwnProperty.call(ob, key)) {
    // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
    if (typeof value === "string" && value.indexOf(" ") >= 0) {
        value = "'" + value + "'";
    }
    // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
    // e.g. {sleepy: true} => ["sleepy=true"]
    arr.push(key + "=" + value);
    }
}

// translate array of strings to a single comma-separated string
return arr.toString();
}

var orm = {

    all: function(tableInput, cb){
        var queryString = "SELECT * FROM " + tableInput + ";";
        connection.query(queryString, function(err, res){
            if (err){
                throw err
            } else{
                cb(res);
            }
        })
    },

    create: function(tableInput, cols, vals, cb){
        var queryString = "INSERT INTO " + tableInput + " (" + cols.toString() + ") VALUES (" + questionMarks(vals.length) + ") ;";

        connection.query(queryString, vals, function(err, res){
            if(err) {
                throw err;
            } else{
                cb(res);
            }

        })
    },

    update: function(tableInput, objColVals, condition, cb){
        var queryString = "UPDATE " + tableInput + "SET " + objToSql(objColVals) + " WHERE " + condition;

        connection.query(queryString, function(err, res){
            if(err){
                throw err;
            } else{
                cb(res);
            }
        })
    }
}

module.exports = orm;