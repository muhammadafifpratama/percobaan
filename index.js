const mysql = require('mysql');
const axios = require('axios');
const db = require('../../backendfinalproject/database/mysql');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://asd:asd@pwdjc11-by9ng.mongodb.net/test?retryWrites=true&w=majority";
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'afif',
    password: 'asd123',
    database: 'finalproject'
});
var tampung = []
function getdata() {
    return axios.post("https://api-v3.igdb.com/games", {
        headers: {
            'Accept': 'application/json',
            'user-key': '2cde79ae740ae030142c85eba55de81f'
        },
        data: "fields cover,name; where cover>0; limit 10;"
    })
        .then(function (response) {
            console.log(response);
        })
    // .catch(function(error){
    //     console.log(error);
    // });
}

lempardata = async (req, res) => {
    let response = await axios.get("http://api.steampowered.com/ISteamApps/GetAppList/v0002")
    // console.log(response.data.applist.apps);
    let data = response.data.applist.apps.map((item) => {
        return item.appid
    })
    let lempar = data[3]
    // console.log(data[3]);
    let anotherresponse = await axios.get(`https://store.steampowered.com/api/appdetails/?appids=${lempar}`)
    // console.log(anotherresponse.data);
    // let apaan = [anotherresponse.data]
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        let dbo = db.db("tugasakhir").collection("tampung")
        dbo.insertMany([anotherresponse.data], function (err, res) {
            if (err) throw err;
            console.log("Number of documents inserted: " + res.insertedCount);
            db.close();
        });
    });
}

tarikdata = () => {
    MongoClient.connect(url, (err, client) => {
        if (err) throw err;
        var dbo = client.db("tugasakhir").collection("tampung")
        dbo.find().toArray(function (err, result) {
            if (err) throw err;
            client.close();
            console.log(result[0][283811].data.name);
        })
    })
}

// console.log(tarikdata());

tes = async (req, res) => {
    let response = await axios({
        method: 'post',
        url: 'https://api-v3.igdb.com/games',
        headers: {
            'Accept': 'application/json',
            'user-key': '2cde79ae740ae030142c85eba55de81f',
            "Access-Control-Allow-Origin": "*"
        },
        data: "fields cover,name; where cover>0; limit 10;"
    })
    let data = response.data.map((item) => {
        return item
    })
    // console.log(item);
    console.log(response.data.length);
    console.log(response.data);
    const query = "insert into tes set ?;"
    // for (var i = 0; i < response.data.length; i++) {
    //     connection.query(query, response.data[i], (error, result) => {
    //         if (error) {
    //             console.log(error);
    //         }
    //         console.log(result);
    //     })
    // }
}

isidatabase = async (req, res) => {
    let response = await axios.get("http://api.steampowered.com/ISteamApps/GetAppList/v1?key=D0FE373CC933D50CD2306F6A146B013F")
    let data = response.data.applist.apps.app.map((item) => item.appid)
    let lempar = data[3]
    let anotherresponse = await axios.get(`https://store.steampowered.com/api/appdetails/?appids=${lempar}`)
    let tes = [anotherresponse.data]
    let isi = tes[0][lempar].data
    let nama = isi.name
    let gambar = isi.header_image
    let harga = isi.price_overview.initial
    let id = isi.steam_appid
    let description = isi.detailed_description
    let developers = isi.developers
    let publishers = isi.publishers
    let genres = isi.genres[0].description
    // let body = { nama: nama, harga: harga, gambar: gambar, steamid: gameid, description: sad }
    console.log(id);
    //     console.log("-----------------------------------------------------");
    //     console.log(nama);
    //     console.log(gambar);
    //     console.log(harga);
    //     console.log(body);
}

teslooping = async () => {
    let response = await axios.get("http://api.steampowered.com/ISteamApps/GetAppList/v1?key=D0FE373CC933D50CD2306F6A146B013F")
    let data = response.data.applist.apps.app.map((item) => item.appid)
    for (var i = 0; i < 123; i++) {
        try {
            let lempar = data[i]
            let anotherresponse = await axios.get(`https://store.steampowered.com/api/appdetails/?appids=${lempar}`)
            let tes = [anotherresponse.data]
            let isi = tes[0][lempar].data
            let body = {
                nama: isi.name,
                harga: isi.price_overview.initial / 100,
                gambar: isi.header_image,
                steamid: isi.steam_appid,
                description: isi.detailed_description,
                developers: isi.developers,
                publishers: isi.publishers,
                genres: isi.genres[0].description,
                tipe: isi.type
            }
            const query = "insert into gamedata set ?"
            connection.query(query, body, (error, result) => {
                if (error) { console.log(error) }
                console.log(result)
            })
        }
        catch (error) {
            // console.log(error);
            console.log("data skipped");
        }
    }
}

function createtable() {
    // db.createCollection("counters")
    MongoClient.connect(url, (err, client) => {
        if (err) throw err;
        var dbo = client.db("tomato")
        dbo.createCollection("counters")
    })
}

function getNextSequenceValue(sequenceName) {
    // var sequenceDocument = db.counters.findAndModify({
    //     query: { _id: sequenceName },
    //     update: { $inc: { sequence_value: 1 } },
    //     new: true
    // });
    // return sequenceDocument.sequence_value;
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        let dbo = db.db("tomato").collection("counters")
        dbo.findOneAndUpdate({

        })
    });
}

function insertable() {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        let dbo = db.db("tomato").collection("counters")
        dbo.insertOne({ id: 0, username: "a", password: "a", role: "user", saldo: "500000", status: "unverified", tanggal: Date.now() }, function (err, res) {
            if (err) throw err;
            db.close();
        })
    });
}

function tesdate() {
    var d = new Date();
    return d
}

function tesaxios() {
    axios.get("https://store.steampowered.com/api/appdetails?appids=275060")
        .then((res) => {
            if (res === undefined) {
                console.log('no response');
            }
            else {
                console.log(res.data);
            }
        })
}


convert = async (req, res) => {
    let response = await axios.get("http://localhost:2000/data/all")
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        let dbo = db.db("tomato").collection("game")
        dbo.insertMany(response.data, function (err, res) {
            if (err) throw err;
            console.log("Number of documents inserted: " + res.insertedCount);
            db.close();
        });
    });
}

convert()