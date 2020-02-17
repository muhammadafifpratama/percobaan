const mysql = require('mysql');
const axios = require('axios');
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
    let response = await axios.get("http://api.steampowered.com/ISteamApps/GetAppList/v0002")
    let data = response.data.applist.apps.map((item) => item.appid)
    let lempar = data[3]
    let anotherresponse = await axios.get(`https://store.steampowered.com/api/appdetails/?appids=${lempar}`)
    let tes = [anotherresponse.data]
    let isi = tes[0][lempar].data
    let nama = isi.name
    let gambar = isi.header_image
    let harga = isi.price_overview.initial
    let body = { nama: nama, harga: harga, gambar: gambar }
    const query = "insert into gamedata set ?"
    console.log(isi);
    console.log("-----------------------------------------------------");
    console.log(nama);
    console.log(gambar);
    console.log(harga);
    console.log(body);
    connection.query(query, body, (error, result) => {
        if (error) { console.log(error) }
        console.log(result)
    })
}

teslooping = async () => {
    let response = await axios.get("http://api.steampowered.com/ISteamApps/GetAppList/v0002")
    let data = response.data.applist.apps.map((item) => item.appid)
    for (var i = 0; i < 50; i++) {
        try {
            let lempar = data[i]
            let anotherresponse = await axios.get(`https://store.steampowered.com/api/appdetails/?appids=${lempar}`)
            let tes = [anotherresponse.data]
            let isi = tes[0][lempar].data
            let nama = isi.name
            let gambar = isi.header_image
            let harga = isi.price_overview.initial
            let body = { nama: nama, harga: harga, gambar: gambar }
            console.log(isi);
            console.log("-----------------------------------------------------");
            console.log(nama);
            console.log(gambar);
            console.log(harga);
            const query = "insert into gamedata set ?"
            connection.query(query, body, (error, result) => {
                if (error) { console.log(error) }
                console.log(result)
            })
        }
        catch (error) {
            // let harga = null
            // let nama = null
            // let gambar = null
            // let body = { nama: nama, harga: harga, gambar: gambar }
            console.log("data skipped");
            
        }
        // finally {
        //     const query = "insert into gamedata set ?"
        //     connection.query(query, body, (error, result) => {
        //         if (error) { console.log(error) }
        //         console.log(result)
        //     })
        // }
    }
}

console.log(teslooping());