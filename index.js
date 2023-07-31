// index.js
// where your node app starts
require('dotenv').config()
// init project
const express = require('express');
const app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
const cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:date?", (req, res) => {
  let dateString = req.params['date'];

  if (!dateString) {
    dateString = new Date().toUTCString();
  }
  dateString = Number(dateString) ? Number(dateString) : dateString;

  const dateValidObject = new Date(dateString);

   if (isNaN(dateValidObject.getTime())) {
    return res.json({ error: "Invalid Date" });    
  }
  
  const unixTimestamp = Math.floor(dateValidObject.getTime());   
  
  const utcDate = dateValidObject.toUTCString()
    
  res.json({
    unix: unixTimestamp,
    utc: utcDate
  });

})


// listen for requests :)
const listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
