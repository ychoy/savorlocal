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

// SMALLBIZ API ROUTES BELOW

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

/*  "/api/smallbiz"
 *    GET: finds all smallbiz
 *    POST: creates a new SmallBiz
 */

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
  newSmallBiz.createDate = new Date();

  if (!req.body.name) {
    handleError(res, "Invalid user input", "Must provide a name.", 400);
  }

  db.collection(SMALLBIZ_COLLECTION).insertOne(newSmallBiz, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to create new SmallBiz.");
    } else {
      res.status(201).json(doc.ops[0]);
    }
  });
});

/*  "/api/smallbiz/:id"
 *    GET: find SmallBiz by id
 *    PUT: update SmallBiz by id
 *    DELETE: deletes SmallBiz by id
 */

app.get("/api/smallbiz/:id", function(req, res) {
  db.collection(SMALLBIZ_COLLECTION).findOne({ _id: new ObjectID(req.params.id) }, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to get SmallBiz");
    } else {
      res.status(200).json(doc);
    }
  });
});

app.put("/api/smallbiz/:id", function(req, res) {
  var updateDoc = req.body;
  delete updateDoc._id;

  db.collection(SMALLBIZ_COLLECTION).updateOne({_id: new ObjectID(req.params.id)}, updateDoc, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to update SmallBiz");
    } else {
      updateDoc._id = req.params.id;
      res.status(200).json(updateDoc);
    }
  });
});

app.delete("/api/smallbiz/:id", function(req, res) {
  db.collection(SMALLBIZ_COLLECTION).deleteOne({_id: new ObjectID(req.params.id)}, function(err, result) {
    if (err) {
      handleError(res, err.message, "Failed to delete SmallBiz");
    } else {
      res.status(200).json(req.params.id);
    }
  });
});
