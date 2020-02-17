const puppeteer = require('puppeteer');

let bookingUrl = 'https://www.booking.com/searchresults.id.html?label=gen173nr-1FCAEoggI46AdIM1gEaGiIAQGYARK4ARfIAQzYAQHoAQH4AQuIAgGoAgO4AtWupPEFwAIB;sid=5eee88270ee937027cf8ff500c948f7b;city=-2679652;from_idr=1&;dr_ps=IDR;ilp=1;d_dcp=1';
(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1926 });
  await page.goto(bookingUrl, {waitUntil: 'domcontentloaded'});

  // get hotel details
  let hotelData = await page.evaluate(() => {
    let hotels = [];
    // get the hotel elements
    let hotelsElms = document.querySelectorAll('div.sr_property_block[data-hotelid]');
    // get the hotel data
    hotelsElms.forEach((bebas) => {
      let hotelJson = {};
      try {
        hotelJson.name = bebas.querySelector('span.sr-hotel__name').innerText;
        hotelJson.reviews = bebas.querySelector('span.review-score-widget__subtext').innerText;
        hotelJson.rating = bebas.querySelector('span.review-score-badge').innerText;
        if (bebas.querySelector('strong.price')) {
          hotelJson.price = bebas.querySelector('strong.price').innerText;
        }
      }
      catch (exception) {

      }
      hotels.push(hotelJson);
    });
    return hotels;
  });
  
   console.log(hotelData);
  
})();