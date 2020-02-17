var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://asd:asd@pwdjc11-by9ng.mongodb.net/test?retryWrites=true&w=majority";

MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("tugasakhir").collection("datagame")
    dbo.find().limit(5).toArray(function (err, result) {
        if (err) throw err;
        console.log(result[0].nama);
        db.close();
    });
});
