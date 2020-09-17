var fs = require('fs');
var cheerio = require('cheerio');

var content = fs.readFileSync('data/m02.html');
var $ = cheerio.load(content);
var addressInfo = [];

    $("td[style='border-bottom:1px solid #e3e3e3; width:260px']").each(function(i, elem) {
    var startAddress = $(elem).html();
    var finalAddress = startAddress.split('<br>')[2].trim().split(',')[0].split('(')[0];
    addressInfo.push(finalAddress);
    });

fs.writeFileSync('wa-02/addresses.txt', addressInfo.join('\n'));

