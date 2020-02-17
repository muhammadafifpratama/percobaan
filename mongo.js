// await db.collection('inventory').insertMany([
//     {
//         item: 'journal',
//         qty: 25,
//         tags: ['blank', 'red'],
//         size: { h: 14, w: 21, uom: 'cm' }
//     },
//     {
//         item: 'mat',
//         qty: 85,
//         tags: ['gray'],
//         size: { h: 27.9, w: 35.5, uom: 'cm' }
//     },
//     {
//         item: 'mousepad',
//         qty: 25,
//         tags: ['gel', 'blue'],
//         size: { h: 19, w: 22.85, uom: 'cm' }
//     }
// ]);

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://asd:asd@pwdjc11-by9ng.mongodb.net/test?retryWrites=true&w=majority";

MongoClient.connect(url, function (err, db) {
  if (err) throw err;
  let dbo = db.db("tugasakhir").collection("ngetes")
  // var dbo = db.db("mydb");
  var myobj = [
    { name: 'John', address: 'Highway 71' },
    { name: 'Peter', address: 'Lowstreet 4' },
    { name: 'Amy', address: 'Apple st 652' },
    { name: 'Hannah', address: 'Mountain 21' },
    { name: 'Michael', address: 'Valley 345' },
    { name: 'Sandy', address: 'Ocean blvd 2' },
    { name: 'Betty', address: 'Green Grass 1' },
    { name: 'Richard', address: 'Sky st 331' },
    { name: 'Susan', address: 'One way 98' },
    { name: 'Vicky', address: 'Yellow Garden 2' },
    { name: 'Ben', address: 'Park Lane 38' },
    { name: 'William', address: 'Central st 954' },
    { name: 'Chuck', address: 'Main Road 989' },
    { name: 'Viola', address: 'Sideway 1633' }
  ];
  dbo.insertMany(myobj, function (err, res) {
    if (err) throw err;
    console.log("Number of documents inserted: " + res.insertedCount);
    db.close();
  });
});
// var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb+srv://asd:asd@pwdjc11-by9ng.mongodb.net/test?retryWrites=true&w=majority";

// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   var dbo = db.db("mydb");
//   var myobj = [
//     { name: 'John', address: 'Highway 71'},
//     { name: 'Peter', address: 'Lowstreet 4'},
//     { name: 'Amy', address: 'Apple st 652'},
//     { name: 'Hannah', address: 'Mountain 21'},
//     { name: 'Michael', address: 'Valley 345'},
//     { name: 'Sandy', address: 'Ocean blvd 2'},
//     { name: 'Betty', address: 'Green Grass 1'},
//     { name: 'Richard', address: 'Sky st 331'},
//     { name: 'Susan', address: 'One way 98'},
//     { name: 'Vicky', address: 'Yellow Garden 2'},
//     { name: 'Ben', address: 'Park Lane 38'},
//     { name: 'William', address: 'Central st 954'},
//     { name: 'Chuck', address: 'Main Road 989'},
//     { name: 'Viola', address: 'Sideway 1633'}
//   ];
//   dbo.collection("customers").insertMany(myobj, function(err, res) {
//     if (err) throw err;
//     console.log("Number of documents inserted: " + res.insertedCount);
//     db.close();
//   });
// });