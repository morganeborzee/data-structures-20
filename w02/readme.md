Documentation 
Assignment 2:  
For this assignment the goal was to retrieve just the addresses of meetings contained in the HTML of the AA zone 2 using cheerio

```
var fs = require('fs');
var cheerio = require('cheerio');
```

Here I'm loading the html file from AA zone 2, into a variable called content.
```
var content = fs.readFileSync('data/m02.html');
```
Here I'm using Cheerio to load the content and creating the variable for the final array of addresses
```
var $ = cheerio.load(content);
var addressInfo = [];
```
Here I'm selecting especifically all the elements with the precise style
Then, splitting the elements contained in the td at /<br> and only keeping the 3rd element
And, triming and then spliting both at the "," and at the "("
```
    $("td[style='border-bottom:1px solid #e3e3e3; width:260px']").each(function(i, elem) {
    var startAddress = $(elem).html();
    var finalAddress = startAddress.split('<br>')[2].trim().split(',')[0].split('(')[0];
    addressInfo.push(finalAddress);
    
});
```
Lastly, here I'm writing the text file with the final addresses
```
fs.writeFileSync('addresses.txt', addressInfo.join('\n'));
```

