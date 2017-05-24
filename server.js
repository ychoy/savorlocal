var express = require("express");
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;

var SMALLBIZ_COLLECTION = "smallbiz";

var app = express();
app.use(bodyParser.json());

// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
var db;

// Connect to the database before starting the application server.
mongodb.MongoClient.connect(process.env.MONGODB_URI, function (err, database) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  // Save database object from the callback for reuse.
  db = database;
  console.log("Database connection ready");

  // Initialize the app.
  var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
  });
});

// SMALL BIZ API ROUTES BELOW
//
// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

/*  "/api/smallbiz"
 *    GET: finds all smallbiz
 *    POST: creates a new smallbiz
 */

app.get("/api/smallbiz", function(req, res) {
});

app.post("/api/smallbiz", function(req, res) {
});

/*  "/api/smallbiz/:id"
 *    GET: find smallbiz by id
 *    PUT: update smallbiz by id
 *    DELETE: deletes smallbiz by id
 */

app.get("/api/smallbiz/:id", function(req, res) {
});

app.put("/api/smallbiz/:id", function(req, res) {
});

app.delete("/api/smallbiz/:id", function(req, res) {
});

app.get("/api/smallbiz", function(req, res) {
  db.collection(SMALLBIZ_COLLECTION).find({}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get smallbiz.");
    } else {
      res.status(200).json(docs);
    }
  });
});

app.post("/api/smallbiz", function(req, res) {
  var newSmallBiz = req.body;

  if (!req.body.name) {
    handleError(res, "Invalid user input", "Must provide a name.", 400);
  }

  db.collection(SMALLBIZ_COLLECTION).insertOne(newSmallBiz, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to create new smallbiz.");
    } else {
      res.status(201).json(doc.ops[0]);
    }
  });
});
