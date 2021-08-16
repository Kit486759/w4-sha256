const crypto = require('crypto');
const fs = require('fs');
const process = require('process')
// hash algorithm 
const algorithm = 'sha256';
var hash = crypto.createHash(algorithm);

var filename = "test.txt";
var file_data = fs.ReadStream(filename);

file_data.on('data', function (data) {

      // parse buffer to string
    const body = []
    body.push(data)
    let parseData = Buffer.concat(body).toString()

    // node app.js "input your text"
    console.log(`Your input text: "${process.argv[2]}"`)
    parseData = process.argv[2]
    
    console.log(`Text :${parseData} ready to be hash`)
    hash.update(data)
})

file_data.on('end', function () {
    var gen_hash = hash.digest('hex')
    console.log('Hash generated using ' + algorithm + ' \nHashed output is :  ' + gen_hash + ' \nFile name is :  ' + filename);
    fs.writeFileSync(filename, gen_hash);
})
