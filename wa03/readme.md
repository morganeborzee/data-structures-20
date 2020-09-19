
In this assignment I'm using the API to match the addresses from the previous assignment to a latitude and longitude coordinate. First I'm working with dependencies and using .ENV to protect the API key so that it doesn't end up here.

```
"use strict"

// dependencies
const fs = require('fs'),
      querystring = require('querystring'),
      request = require('request'),
      async = require('async'),
      dotenv = require('dotenv');

// TAMU api key
dotenv.config();
const API_KEY = process.env.MY_API;
const API_URL = 'https://geoservices.tamu.edu/Services/Geocode/WebService/GeocoderWebServiceHttpNonParsed_V04_01.aspx'
```

Then I'm creating an array that will contain the data and then parsing the addresses.json file.
```

// geocode addresses
let meetingsData = [];
let addresses = JSON.parse(fs.readFileSync('data/addresses.json'));
```
Then I'm using eachSeries an Asynchronous module to iterate over the arrays one at a time

```
// eachSeries in the async module iterates over an array and operates on each item in the array in series

async.eachSeries(addresses, function(value, callback) {
    let query = {
        streetAddress: value,
        city: "New York",
        state: "NY",
        apikey: API_KEY,
        format: "json",
        version: "4.01"
    };
```

Here I'm constructing the URL using querystring and the API key, previously stored in the .ENV file

```
    // construct a querystring from the 'query' object's values and append it to the api URL
    let apiRequest = API_URL + '?' + querystring.stringify(query);
```
Here I'm parsing the data on the address file and then creating an array latLong where I'm pushing only the parsed data that I need, in this case Latitude, Longitude and InputAddress, this will be pushed into meetingsData array.

```
    request(apiRequest, function(err, resp, body) {
        if (err){ throw err; }

        let tamuGeo = JSON.parse(body);
        console.log(tamuGeo['FeatureMatchingResultType'], apiRequest);
        console.log(body);
        
        const latLong = []
        
        latLong.push(tamuGeo['OutputGeocodes'][0]['OutputGeocode']['Latitude']);
        latLong.push(tamuGeo['OutputGeocodes'][0]['OutputGeocode']['Longitude']);
        latLong.push(tamuGeo['InputAddress']);
        
        console.log(latLong);
        meetingsData.push(latLong);
        
    });
```
Here I'm using the Async module function to pause/wait for 2 seconds before continuing with the next iteration of the request so that I don't overload the API with too many requests at the same time.

```
    // sleep for a couple seconds before making the next request
    setTimeout(callback, 2000);
```
Lastly I'm using a function to write the final file, I'm using stringify to have the final file to retain the format of a JSON object, so that it can be parsed back in the future.
```

}, function() {
    
    
    fs.writeFileSync('data/first.json', JSON.stringify(meetingsData));
    console.log('*** *** *** *** ***');
    console.log(`Number of meetings in this zone: ${meetingsData.length}`);
});
