var MongoClient = require('mongodb').MongoClient;
var urldb = "mongodb+srv://asd:asd@pwdjc11-by9ng.mongodb.net/test?retryWrites=true&w=majority";

const puppeteer = require('puppeteer');
let Url = "https://www.humblebundle.com/store";

(async () => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 926 });
    await page.goto(Url, { waitUntil: 'domcontentloaded' });

    let gameData = await page.evaluate(() => {
        let isi = [];
        // let game = document.querySelectorAll('div.entity-details');
        let game = document.querySelectorAll('li.entity-block-container');
        game.forEach((gamelist) => {
            let isiweb = {};
            try {
                isiweb.nama = gamelist.querySelector('span.entity-title').innerText;
                isiweb.harga = gamelist.querySelector('span.price').innerText;
                isiweb.gambar = gamelist.querySelector('img.entity-image').getAttribute("src");
            }
            catch (exception) {

            }
            isi.push(isiweb);
        })
        return isi;
    })

    // let gambar = await page.evaluate('document.querySelector("img.entity-image").getAttribute("src")')

    // console.log(gameData[200].nama);
    MongoClient.connect(urldb, function (err, db) {
        if (err) throw err;
        let dbo = db.db("tugasakhir").collection("datagame")
        dbo.insertMany(gameData, function (err, res) {
            if (err) throw err;
            console.log("Number of documents inserted: " + res.insertedCount);
            db.close();
        });
    });
})();


