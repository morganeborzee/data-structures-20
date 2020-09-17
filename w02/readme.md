Documentation 
Assignment 2:  

Loading 
```
var fs = require('fs');
var cheerio = require('cheerio');
```

Loading the text file from AA zone 2, into a variable called content.
```
var content = fs.readFileSync('data/m02.html');
```
Using Cheerio to load the content and creating the variable for the final array of addresses
```
var $ = cheerio.load(content);
var addressInfo = [];
```
Selecting especifically all the elements with the precise style
Splitting the element at /<br> and only keeping the 3rd element
Triming and then spliting both at the "," and at the "("
```
    $("td[style='border-bottom:1px solid #e3e3e3; width:260px']").each(function(i, elem) {
    var startAddress = $(elem).html();
    var finalAddress = startAddress.split('<br>')[2].trim().split(',')[0].split('(')[0];
    addressInfo.push(finalAddress);
    
});
```
Writing the files
```
fs.writeFileSync('addresses.txt', addressInfo.join('\n'));
```

