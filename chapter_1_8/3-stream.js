const fs = require('fs');

//This is for large files
const rs = fs.createReadStream('./files/first.txt', {encoding: 'utf-8'});
const ws = fs.createWriteStream('./files/newlorem.txt');

// rs.on('data', (dataChuck) => {
//     ws.write(dataChuck);
// });

rs.pipe(ws);